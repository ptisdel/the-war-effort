import io from 'socket.io-client';
import { store } from './store';

const socket = io('http://localhost:8000?role=client');

// registration already happened before subscription. what do?

const subscribeToRegistration = () => {
  socket.on('register-player', playerId => {
    store.setPlayerId(playerId);
    console.log('incoming:', playerId);
  });
}

const subscribeToGameState = cb => {
  socket.on('game-state', gameState => {
    cb(gameState);
    console.log('new game state:', gameState);
  });
}

const subscribeToMessages = cb => {
  socket.on('broadcast', msg => {
    cb(msg);
    console.log('incoming:', msg);
  });
} 

const sendMessage = msg => {
  socket.emit('message', msg);
  console.log('outgoing:', msg);
} 

const chooseRole = roleName => {
  socket.emit('choose-role', { playerId: store.getPlayerId(), roleName });
  console.log('outgoing:', roleName);
}

const subscribeToEverything = () => {
  subscribeToRegistration();
  subscribeToGameState();
  subscribeToMessages();
}

export default {
  subscribeToEverything,
  sendMessage,
  chooseRole,
};