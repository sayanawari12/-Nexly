/**
 * Centralized API & WebSocket Configuration for BCA Department Web Application
 */

const getProductionBackendUrl = () => {
  if (process.env.REACT_APP_API_BASE_URL) {
    return process.env.REACT_APP_API_BASE_URL;
  }
  
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return 'https://bca-department-backend.onrender.com/api/v1';
  }

  return 'http://localhost:5000/api/v1';
};

export const API_BASE_URL = getProductionBackendUrl();

export const SOCKET_URL =
  process.env.REACT_APP_SOCKET_URL ||
  (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1'
    ? 'https://bca-department-backend.onrender.com/contests'
    : API_BASE_URL.replace(/\/api\/v1\/?$/, '') + '/contests');

const apiConfig = {
  API_BASE_URL,
  SOCKET_URL,
};

export default apiConfig;
