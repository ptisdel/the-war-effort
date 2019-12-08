import io from 'socket.io-client';

// new socket connection to server
const socket = io('http://localhost:8000?role=client');

const subscribeToRegistration = cb => {
  socket.on('register-player', playerId => cb(playerId));
};

const subscribeToGameState = cb => {
  socket.on('game-state', gameState => cb(gameState));
};

const chooseRole = roleName => {
  socket.emit('choose-role', roleName);
};

const sendRegistrationRequest = () => {
  socket.emit('request-registration');
};

const commanderActions = ({
  decreaseRoleBudget: roleName => socket.emit('role-action', { type: 'commander/decreaseRoleBudget', payload: roleName }),
  increaseRoleBudget: roleName => socket.emit('role-action', { type: 'commander/increaseRoleBudget', payload: roleName }),
});

const logisticsActions = ({
  sendResource: ({ contents, from, to }) => socket.emit('role-action', {
    type: 'logistics/sendResource',
    payload: { contents, from, to },
  }),
});

export default {
  chooseRole,
  commanderActions,
  logisticsActions,
  sendRegistrationRequest,
  subscribeToRegistration,
  subscribeToGameState,
};
