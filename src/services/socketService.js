import { io } from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000/contests';

let socket = null;

export const connectSocket = (token) => {
  if (socket) {
    if (socket.connected) return socket;
    socket.connect();
    return socket;
  }

  console.log('[SocketService] Initializing authenticated Socket.io connection to /contests...');
  
  socket = io(SOCKET_URL, {
    auth: {
      token,
    },
    transports: ['websocket'],
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 2000,
  });

  socket.on('connect', () => {
    console.log('[SocketService] Connected successfully. Connection ID:', socket.id);
  });

  socket.on('connect_error', (error) => {
    console.error('[SocketService] Connection handshake error:', error.message);
  });

  socket.on('disconnect', (reason) => {
    console.log('[SocketService] Disconnected. Reason:', reason);
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    console.log('[SocketService] Terminating active socket session.');
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => {
  return socket;
};

export const subscribeToEvent = (event, callback) => {
  if (socket) {
    socket.on(event, callback);
  }
};

export const unsubscribeFromEvent = (event, callback) => {
  if (socket) {
    if (callback) {
      socket.off(event, callback);
    } else {
      socket.off(event);
    }
  }
};
