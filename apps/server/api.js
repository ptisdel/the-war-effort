class Store {
  constructor() {
    this._hostId = null;
  } 

  getHost() {
    return this._hostId;
  }

  setHost(hostId) {
    this._hostId = hostId;
  }
};

const store = new Store();

const initializeHostSubscriptions = socket => {
  /* any broadcast sent from host should be repeated to clients */
  socket.on('broadcast', msg => socket.broadcast.emit('broadcast', msg));
};

const initializeClientSubscriptions = socket => {
  /* any message sent from clients should be repeated to host */
  socket.on('message', msg => {
    const hostId = store.getHost();
    if (hostId) socket.broadcast.to(hostId).emit('message', msg);
  });
};

export const onboardSocket = socket => {
  const role = socket.handshake.query.role || 'mystery person';
  console.log(`A ${role} connected.`);

  if (role === 'host') {
    store.setHost(socket.id);
    initializeHostSubscriptions(socket);
  };
  if (role === 'client') initializeClientSubscriptions(socket);

  socket.on('disconnect', () => console.log(`A ${role} disconnected.`));
}