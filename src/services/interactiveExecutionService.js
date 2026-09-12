import { io } from 'socket.io-client';
import { API_BASE_URL } from '../config/api.config.js';

let socket = null;

/**
 * Gets base URL for Socket.IO connection (strips /api/v1 prefix if present)
 */
function getSocketBaseUrl() {
  const url = API_BASE_URL || 'https://bca-department-backend.onrender.com';
  return url.replace(/\/api\/v1\/?$/, '');
}

/**
 * Starts a real-time interactive execution session via Socket.IO (/compiler namespace)
 */
export function startInteractiveSession({ language, code, onStdout, onStderr, onExit, onError, onStatusChange }) {
  stopInteractiveSession();

  const token = typeof localStorage !== 'undefined'
    ? (localStorage.getItem('apex_token') || localStorage.getItem('token'))
    : null;

  if (!token) {
    onError('Authentication required for interactive code execution. Please log in.');
    onStatusChange('ERROR');
    return;
  }

  const baseUrl = getSocketBaseUrl();
  onStatusChange('CONNECTING');

  socket = io(`${baseUrl}/compiler`, {
    auth: { token },
    transports: ['websocket', 'polling'],
    reconnection: false,
    timeout: 10000,
  });

  socket.on('connect', () => {
    onStatusChange('RUNNING');
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
    onStatusChange('COMPLETED');
    if (onExit) {
      onExit(result);
    }
    disconnectSocket();
  });

  socket.on('interactive:error', (data) => {
    onStatusChange('ERROR');
    if (onError) {
      onError(data?.error || 'Execution error encountered.');
    }
    disconnectSocket();
  });

  socket.on('connect_error', (err) => {
    onStatusChange('ERROR');
    const msg = err?.message || 'Failed to connect to execution server.';
    if (msg.includes('token') || msg.includes('Authentication')) {
      onError('Session expired or invalid authentication token. Please log in again.');
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
