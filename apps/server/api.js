import { store } from './store';

const emitToHost = ({ emissionType, data = null }) => {
  const host = store.getHost();
  if (host) host.emit(emissionType, data);
}

const initializeHostSubscriptions = socket => {
  store.setHost(socket);

  /* any broadcast sent from host should be repeated to clients */
  socket.on('broadcast', msg => socket.broadcast.emit('broadcast', msg));
  socket.on('game-state', gameState => socket.broadcast.emit('game-state', gameState));
};

const initializeClientSubscriptions = socket => {
  const socketId = socket.id;

  socket.on('request-registration', () => {
    socket.emit('register-player', socketId);
    emitToHost({ emissionType: 'add-player', data: socketId })
  });

  /* any message sent from clients should be repeated to host */
  socket.on('message', msg => emitToHost({ emissionType: 'message', data: msg }));
  socket.on('choose-role', role => emitToHost({ emissionType: 'hire-for-role', data: { playerId: socketId, role } }));
  socket.on('disconnect', () => emitToHost({ emissionType: 'delete-player', data: socketId }));
};

const onboardSocket = socket => {
  const role = socket.handshake.query.role || 'mystery person';
  console.log(`A ${role} connected.`);

  if (role === 'host') initializeHostSubscriptions(socket);
  if (role === 'client') initializeClientSubscriptions(socket);

  socket.on('disconnect', () => console.log(`A ${role} disconnected.`));
}

export default {
  onboardSocket,
};