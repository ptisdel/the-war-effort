import io from 'socket.io-client';

// new socket connection to server
const socket = io('http://localhost:8000?role=host');

const subscribeToPlayerAddition = callback => 
  socket.on('add-player', playerId =>
  callback(playerId));

const subscribeToRoleHire = callback => 
  socket.on('hire-for-role', ({ playerId, roleName }) =>
  callback({ playerId, roleName }));

  const subscribeToRoleFire = callback => 
  socket.on('fire-from-role', roleName =>
  callback(roleName));

const subscribeToPlayerDeletion = callback => 
  socket.on('delete-player', playerId =>
  callback(playerId));

const subscribeToRoleAction = callback =>
  socket.on('role-action', ({type, payload}) => callback(({type, payload})));

const sendGameState = gameState => socket.emit('game-state', gameState);

export default {
  sendGameState,
  subscribeToPlayerDeletion,
  subscribeToPlayerAddition,
  subscribeToRoleAction,
  subscribeToRoleHire,
  subscribeToRoleFire,
};