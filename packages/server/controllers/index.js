import * as host from './host.js';
import * as client from './client.js';

export const onboardSocket = socket => {
    const role = socket.handshake.query.role || 'mystery person';
    console.log(`A ${role} connected.`);

    if (role === 'host') host.initialize(socket);
    if (role === 'client') client.initialize(socket);

    socket.on('disconnect', () => console.log(`A ${role} disconnected.`));
};
