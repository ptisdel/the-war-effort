import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8000');

export const subscribeToMessages = (cb) => {
  socket.on('message', msg => cb(msg));
} 

export const sendMessage = (msg) => {
  socket.emit('message', msg);
} 

