import io from 'socket.io-client';

// new socket connection to server
const socket = io('http://localhost:8000?role=client');

export const subscribeToRegistration = cb => {
  socket.on('register-player', playerId => cb(playerId));
};

export const subscribeToGameState = cb => {
  socket.on('game-state', gameState => cb(gameState));
};

export const chooseRole = roleName => {
  socket.emit('choose-role', roleName);
};

export const resignFromRole = roleName => {
  socket.emit('resign-from-role', roleName);
};

export const sendRegistrationRequest = () => {
  socket.emit('request-registration');
};

export const commanderActions = ({
  decreaseRoleBudget: roleName => socket.emit('role-action', { type: 'commander/decreaseRoleBudget', payload: roleName }),
  increaseRoleBudget: roleName => socket.emit('role-action', { type: 'commander/increaseRoleBudget', payload: roleName }),
});

export const logisticsActions = ({
  sendResource: ({ contents, from, to }) => socket.emit('role-action', {
    type: 'logistics/sendResource',
    payload: { contents, from, to },
  }),
});
