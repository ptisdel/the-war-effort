import io from 'socket.io-client';

// new socket connection to server
const socket = io('https://the-war-effort-server.herokuapp.com/?role=host');

export const subscribeToPlayerAddition = callback => socket.on('add-player', playerId => callback(playerId));
export const subscribeToRoleHire = callback => socket.on('hire-for-role', ({ playerId, roleName }) => callback({ playerId, roleName }));
export const subscribeToRemovePlayerFromRole = callback => socket.on('remove-player-from-role', roleName => callback(roleName));
export const subscribeToPlayerDeletion = callback => socket.on('delete-player', playerId => callback(playerId));
export const subscribeToRoleAction = callback => socket.on('role-action', ({ type, payload }) => callback(({ type, payload })));

export const sendGameState = gameState => socket.emit('game-state', gameState);
