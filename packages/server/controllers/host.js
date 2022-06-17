import {
  closeRoom,
  createRoom,
  getRoomCodeFromSocket,
} from "../store.js";

export const initialize = socket => {
  
  // ON CONNECT
  createRoom(socket);

  // DISCONNECTS
  socket.on('disconnect', () => {
    try {
      closeRoom(socket);
    } catch (err) {
        // TODO: handle error
    }
  });
    
  // GAME STATE UPDATED
  socket.on('game-state-updated', gameState => {
    const roomCode = getRoomCodeFromSocket(socket);
    socket.to(roomCode).emit('game-state-updated', gameState);
  });
    
  // ON FIRE PLAYER
  socket.on('player-fired', playerId => {
    // TODO: implement
  });
  
};
