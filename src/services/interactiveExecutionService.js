import { io } from 'socket.io-client';
import axios from 'axios';
import { API_BASE_URL } from '../config/api.config.js';
import { auth } from '../firebase';

let socket = null;

/**
 * Gets base URL for Socket.IO connection (strips /api/v1 prefix if present)
 */
function getSocketBaseUrl() {
  const url = API_BASE_URL || 'https://bca-department-backend.onrender.com';
  return url.replace(/\/api\/v1\/?$/, '');
}

/**
 * Helper to inspect if a JWT access token is expired or expiring within 30 seconds.
 */
function isJwtExpired(token) {
  if (!token || typeof token !== 'string') return true;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return true;
    const payload = JSON.parse(atob(parts[1]));
    if (!payload.exp) return false;
    const nowSec = Math.floor(Date.now() / 1000);
    return nowSec >= (payload.exp - 30);
  } catch {
    return true;
  }
}

/**
 * Retrieves a valid, fresh backend access token:
 * 1. Checks existing 'apex_token' from localStorage. If valid and not expired, reuses it immediately.
 * 2. If expired or missing, invokes the existing backend refresh mechanism (/auth/refresh).
 * 3. If refresh fails or no refresh token is stored, exchanges the active Firebase ID token (/auth/firebase)
 *    if the user is authenticated in the current frontend session.
 * 4. Persists the fresh token in 'apex_token' and returns { token, errorType }.
 */
export async function getValidAccessToken() {
  let token = typeof localStorage !== 'undefined'
    ? (localStorage.getItem('apex_token') || localStorage.getItem('token'))
    : null;

  // 1. Fast path: return existing token if still valid
  if (token && !isJwtExpired(token)) {
    return { token, errorType: null };
  }

  const hadExpiredToken = !!token;

  // 2. Attempt existing refresh token rotation (/auth/refresh)
  try {
    const devRefreshToken = typeof localStorage !== 'undefined'
      ? localStorage.getItem('apex_refresh_token')
      : null;
    const payload = devRefreshToken ? { refreshToken: devRefreshToken } : {};

    const refreshResponse = await axios.post(`${API_BASE_URL}/auth/refresh`, payload, {
      withCredentials: true,
      timeout: 10000,
    });

    const refreshedToken = refreshResponse.data?.data?.accessToken;
    if (refreshedToken) {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('apex_token', refreshedToken);
      }
      return { token: refreshedToken, errorType: null };
    }
  } catch (refreshErr) {
    // Refresh failed or not available; proceed to Firebase ID token fallback
  }

  // 3. Attempt Firebase ID token exchange if user is authenticated in Firebase
  try {
    const currentUser = auth?.currentUser;
    if (currentUser) {
      const idToken = await currentUser.getIdToken(true);
      const exchangeResponse = await axios.post(
        `${API_BASE_URL}/auth/firebase`,
        {},
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
          withCredentials: true,
          timeout: 15000,
        }
      );

      const exchangedToken = exchangeResponse.data?.data?.accessToken;
      if (exchangedToken) {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('apex_token', exchangedToken);
          if (exchangeResponse.data?.data?.refreshToken) {
            localStorage.setItem('apex_refresh_token', exchangeResponse.data.data.refreshToken);
          }
        }
        return { token: exchangedToken, errorType: null };
      }
    }
  } catch (firebaseErr) {
    // Firebase exchange failed
  }

  // 4. Token cannot be obtained or refreshed
  if (auth?.currentUser) {
    return { token: null, errorType: 'REFRESH_FAILED' };
  } else if (hadExpiredToken) {
    return { token: null, errorType: 'EXPIRED_TOKEN' };
  } else {
    return { token: null, errorType: 'NO_TOKEN' };
  }
}

/**
 * Starts a real-time interactive execution session via Socket.IO (/compiler namespace)
 */
export async function startInteractiveSession({ language, code, onStdout, onStderr, onExit, onError, onStatusChange }) {
  stopInteractiveSession();

  if (onStatusChange) {
    onStatusChange('CONNECTING');
  }

  // Obtain a valid and fresh access token before initiating socket handshake
  const { token, errorType } = await getValidAccessToken();

  if (!token) {
    if (errorType === 'NO_TOKEN') {
      onError('Authentication required for interactive code execution. Please log in.');
    } else if (errorType === 'EXPIRED_TOKEN') {
      onError('Your session has expired. Please log in again to execute code.');
    } else if (errorType === 'REFRESH_FAILED') {
      onError('Unable to authenticate interactive session. Please check your connection or log in again.');
    } else {
      onError('Authentication required for interactive code execution. Please log in.');
    }
    if (onStatusChange) {
      onStatusChange('ERROR');
    }
    return;
  }

  const baseUrl = getSocketBaseUrl();

  socket = io(`${baseUrl}/compiler`, {
    auth: {
      token,
    },
    transports: ['websocket', 'polling'],
    reconnection: false,
    timeout: 15000,
  });

  socket.on('connect', () => {
    if (onStatusChange) {
      onStatusChange('RUNNING');
    }
    socket.emit('interactive:start', { language, code });
  });

  socket.on('interactive:stdout', (data) => {
    if (data?.text && onStdout) {
      onStdout(data.text);
    }
  });

  socket.on('interactive:stderr', (data) => {
    if (data?.text && onStderr) {
      onStderr(data.text);
    }
  });

  socket.on('interactive:exit', (result) => {
    if (onStatusChange) {
      onStatusChange('COMPLETED');
    }
    if (onExit) {
      onExit(result);
    }
    disconnectSocket();
  });

  socket.on('interactive:error', (data) => {
    if (onStatusChange) {
      onStatusChange('ERROR');
    }
    if (onError) {
      onError(data?.error || 'Execution error encountered.');
    }
    disconnectSocket();
  });

  socket.on('connect_error', (err) => {
    if (onStatusChange) {
      onStatusChange('ERROR');
    }
    const msg = err?.message || 'Failed to connect to execution server.';
    
    if (msg.includes('Authentication token missing')) {
      onError('Authentication token missing. Please log in.');
    } else if (msg.includes('Invalid or expired') || msg.includes('jwt expired')) {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('apex_token');
      }
      onError('Session expired or invalid authentication token. Please run again to refresh.');
    } else if (msg.includes('CORS') || msg.includes('Origin')) {
      onError('CORS authorization error: Connection rejected by server origin policy.');
    } else if (msg.includes('timeout') || msg.includes('xhr poll error') || msg.includes('websocket error')) {
      onError('Unable to connect to the execution server. Please check your network or server status.');
    } else {
      onError(`Interactive Execution Connection Error: ${msg}`);
    }
    disconnectSocket();
  });

  socket.on('disconnect', () => {
    socket = null;
  });
}

/**
 * Sends stdin input string to running execution process
 */
export function sendInteractiveStdin(input) {
  if (socket && socket.connected) {
    socket.emit('interactive:stdin', { input });
    return true;
  }
  return false;
}

/**
 * Immediately stops active interactive session and terminates running process
 */
export function stopInteractiveSession() {
  if (socket) {
    if (socket.connected) {
      socket.emit('interactive:stop');
    }
    disconnectSocket();
  }
}

function disconnectSocket() {
  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
  }
}
