import io from 'socket.io-client';
import { store } from './store';

const socket = io('http://localhost:8000?role=host');

const subscribeToRegistration = () => {
  socket.on('register-player', ({ playerId, role = null }) => {
    store.addPlayer({ playerId, role });
    console.log('incoming:', playerId);
  });
}

const subscribeToMessages = cb => {
  socket.on('message', msg => {
    cb(msg);
    console.log('incoming:', msg);
  });
} 

const sendMessage = msg => {
  socket.emit('broadcast', msg);
  console.log('outgoing:', msg);
}

const sendGameState = gameState => {
  socket.emit('game-state', gameState);
  console.log('outgoing:', gameState);
} 

export default {
  sendGameState,
  sendMessage,
  subscribeToMessages,
  subscribeToRegistration,
};