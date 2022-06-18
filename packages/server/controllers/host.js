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
    try {
      closeRoom(socket);
      io.to(roomCode).emit('room-updated', null);
    } catch (err) {
      // TODO: handle error
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
