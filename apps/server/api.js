const _ = require('lodash');
const socket = require('socket.io');

const emitMessage = ({ message, clients = null }) => {
  if (clients === null) return;

  if (_.isArray(clients)) {
    _.forEach(clients, c => c.emit('message', message));
  }

  clients.emit('message', message);
};

const subscribeToMessages = client => {
  client.on('message', msg => {
    client.emit('message', 'Thanks for your message!');
  });
};

const initializeSubscriptions = server => {
  socket.on('connection', client => {
    emitMessage({ 
      message: 'Welcome, traveler!',
      clients: client,
    });
    
    subscribeToMessages(client);    
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
};

export const startServer = ({ port }) => {
  const socket = socketIO();
  socket.listen(port);
  initializeSubscriptions(socket);

  return socket;
}
