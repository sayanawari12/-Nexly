import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Necessary to send/receive secure httpOnly cookies automatically
});

// Request Interceptor: Inject APEX JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('apex_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Response Interceptor: Manage 401 token rotations
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if 401 Unauthorized error and the request hasn't been retried yet
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Fallback refresh token logic for local development if cookie-based is not set
        const devRefreshToken = localStorage.getItem('apex_refresh_token');
        const payload = devRefreshToken ? { refreshToken: devRefreshToken } : {};

        // Request refresh token rotation
        const response = await axios.post(`${API_BASE_URL}/auth/refresh`, payload, {
          withCredentials: true,
        });

        const newAccessToken = response.data?.data?.accessToken;
        
        if (!newAccessToken) {
          throw new Error('Refresh token rotation failed to return a new access token.');
        }

        // Store new access token
        localStorage.setItem('apex_token', newAccessToken);

        // Update authorization headers on retry
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);
        isRefreshing = false;

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;

        // Perform clean logout procedures on complete refresh failure
        localStorage.removeItem('apex_token');
        localStorage.removeItem('apex_refresh_token');
        
        // Trigger a global custom event so the application contexts know to logout
        window.dispatchEvent(new Event('apex-logout'));
        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
