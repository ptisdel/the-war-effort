import * as host from './host.js';
import * as client from './client.js';

export const onboardSocket = ({ io, socket }) => {
  const role = socket.handshake.query.role || 'mystery person';
  console.log(`A ${role} connected.`);

  if (role === 'host') host.initialize({ io, socket });
  if (role === 'client') client.initialize({ io, socket });

  socket.on('disconnect', () => console.log(`A ${role} disconnected.`));
};
