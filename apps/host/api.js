import io from 'socket.io-client';

// new socket connection to server
const socket = io('http://localhost:8000?role=host');

const subscribeToPlayerRegistration = callback => 
  socket.on('register-player', ({ playerId, role = null }) =>
  callback({ playerId, role }));

const subscribeToPlayerDeregistration = callback => 
  socket.on('deregister-player', playerId =>
  callback(playerId));

const subscribeToMessages = callback => socket.on('message', msg => callback(msg));

const sendMessage = msg => socket.emit('broadcast', msg);

const sendGameState = gameState => socket.emit('game-state', gameState);

export default {
  sendGameState,
  sendMessage,
  subscribeToPlayerDeregistration,
  subscribeToPlayerRegistration,
  subscribeToMessages,
};