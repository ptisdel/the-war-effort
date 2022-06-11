import store from './store';

const emitToHost = ({ emissionType, data = null }) => {
  console.log('emitting to host', data);
  const host = store.hostSocket;
  if (host) host.emit(emissionType, data);
};

const initializeHostSubscriptions = socket => {
  store.hostSocket = socket;
  console.log('host initialized');
  /* any broadcast sent from host should be repeated to clients */
  socket.on('broadcast', msg => {
    console.log('broadcasting');
    socket.broadcast.emit('broadcast', msg);
  });
  socket.on('game-state-updated', gameState => socket.broadcast.emit('game-state-updated', gameState));
};

const initializeClientSubscriptions = socket => {
  const socketId = socket.id;

  socket.on('request-registration', () => {
    socket.emit('player-registered', socketId);
    emitToHost({ emissionType: 'add-player', data: socketId });
  });

  /* any message sent from clients should be repeated to host */
  socket.on('role-action', ({ type, payload }) => emitToHost({ emissionType: 'role-action', data: { type, payload } }));
  socket.on('role-requested', roleName => emitToHost({ emissionType: 'role-requested', data: { playerId: socketId, roleName } }));
  socket.on('player-resigned', playerId => emitToHost({ emissionType: 'player-resigned', data: playerId }));
  socket.on('disconnect', () => emitToHost({ emissionType: 'delete-player', data: socketId }));
};

const onboardSocket = socket => {
  const role = socket.handshake.query.role || 'mystery person';
  console.log(`A ${role} connected.`);

  if (role === 'host') initializeHostSubscriptions(socket);
  if (role === 'client') initializeClientSubscriptions(socket);

  socket.on('disconnect', () => console.log(`A ${role} disconnected.`));
};

export default {
  onboardSocket,
};
