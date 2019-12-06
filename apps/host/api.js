import io from 'socket.io-client';

// new socket connection to server
const socket = io('http://localhost:8000?role=host');

const subscribeToPlayerAddition = callback => 
  socket.on('add-player', playerId =>
  callback(playerId));

const subscribeToRoleHire = callback => 
  socket.on('hire-for-role', ({ playerId, role }) =>
  callback({ playerId, role }));

  const subscribeToRoleFire = callback => 
  socket.on('fire-from-role', role =>
  callback(role));

const subscribeToPlayerDeletion = callback => 
  socket.on('delete-player', playerId =>
  callback(playerId));

const subscribeToMessages = callback => socket.on('message', msg => callback(msg));

const sendMessage = msg => socket.emit('broadcast', msg);

const sendGameState = gameState => socket.emit('game-state', gameState);

export default {
  sendGameState,
  sendMessage,
  subscribeToPlayerDeletion,
  subscribeToPlayerAddition,
  subscribeToRoleHire,
  subscribeToRoleFire,
  subscribeToMessages,
};