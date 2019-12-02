import io from 'socket.io-client';

const socket = io('http://localhost:8000?role=host');

export const subscribeToMessages = (cb) => {
  socket.on('message', msg => {
    cb(msg);
    console.log('incoming: ', msg);
  });
} 

export const sendMessage = (msg) => {
  socket.emit('broadcast', msg);
  console.log('outgoing: ', msg);
} 

