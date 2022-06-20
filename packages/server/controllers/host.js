import {
  closeRoom,
  createRoom,
} from '../store.js';

export const initialize = ({ io, socket }) => {
  // ON CONNECT
  const { roomCode, room } = createRoom(socket);
  io.to(roomCode).emit('room-updated', room);

  // DISCONNECTS
  socket.on('disconnect', () => {
    // when testing, we do not want a room to close when the host disconnects
    if (process.env.TEST_MODE) return;

    try {
      console.log('closing');
      closeRoom(roomCode);
      io.to(roomCode).emit('room-updated', null);
    } catch (err) {
      // TODO: handle error
      console.log('error', err);
    }
  });

  // GAME STATE UPDATED
  socket.on('game-state-updated', gameState => {
    socket.to(roomCode).emit('game-state-updated', gameState);
  });

  // ON FIRE PLAYER
  // eslint-disable-next-line
  socket.on('player-fired', playerId => {
    // TODO: implement
  });
};
