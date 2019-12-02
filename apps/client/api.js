import io from 'socket.io-client';

const socket = io('http://localhost:8000?role=client');

export const subscribeToMessages = (cb) => {
  socket.on('broadcast', msg => {
    cb(msg);
    console.log('incoming: ', msg);
  });
} 

export const sendMessage = (msg) => {
  socket.emit('message', msg);
  console.log('outgoing: ', msg);
} 

