import io from 'socket.io-client';

// new socket connection to server
const socket = io('http://localhost:8000?role=client');

const subscribeToRegistration = cb => {
  socket.on('register-player', playerId => cb(playerId));
}

const subscribeToGameState = cb => {
  socket.on('game-state', gameState => cb(gameState));
}

const subscribeToMessages = cb => {
  socket.on('broadcast', msg => cb(msg));
}

const chooseRole = role => {
  socket.emit('choose-role', role);
}

const sendMessage = msg => {
  socket.emit('message', msg);
} 

const sendRegistrationRequest = () => {
  socket.emit('request-registration');
} 


export default {
  chooseRole,
  sendMessage,
  sendRegistrationRequest,
  subscribeToRegistration,
  subscribeToGameState,
  subscribeToMessages,
};