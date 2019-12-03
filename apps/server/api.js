import { store } from './store';

const emitToHost = (emissionType, data = null) => () => {
  const hostId = store.getHost();
  if (hostId) socket.broadcast.to(hostId).emit(emissionType, data);
}

/* any broadcast sent from host should be repeated to clients */
const initializeHostSubscriptions = socket => {
  socket.on('broadcast', msg => socket.broadcast.emit('broadcast', msg));
  socket.on('game-state', gameState => socket.broadcast.emit('game-state', gameState));
};

/* any message sent from clients should be repeated to host */
const initializeClientSubscriptions = socket => {
  socket.on('message', msg => {
    emitToHost('message', msg);
  });

  socket.on('choose-role', ({ playerId, roleName}) => {
    emitToHost('register-player', { playerId, roleName});
  });
};

export const onboardSocket = socket => {
  const socketId = socket.id;
  const role = socket.handshake.query.role || 'mystery person';
  console.log(`A ${role} connected.`);

  if (role === 'host') {
    store.setHost(socketId);
    initializeHostSubscriptions(socket);
  };
  if (role === 'client')  {
    initializeClientSubscriptions(socket);
    socket.broadcast.to(socketId).emit('register-player', socketId);
    emitToHost('register-player', { playerId: socketId, roleName: null})
    console.log('Registering client.')
  };

  socket.on('disconnect', () => console.log(`A ${role} disconnected.`));
}