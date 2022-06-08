import io from 'socket.io-client';

// new socket connection to server
const socket = io('https://the-war-effort-server.herokuapp.com/?role=client');

export const subscribe = (message, callback) => socket.on(message, callback);
export const sendMessage = (message, data) => socket.emit(message, data);

export const subscribeToRegistration = cb => subscribe('register-player', playerId => cb(playerId));
export const subscribeToGameState = cb => subscribe('game-state', gameState => cb(gameState));
export const resignFromRole = roleName => sendMessage('resign-from-role', roleName);
export const sendRegistrationRequest = () => sendMessage('request-registration');
