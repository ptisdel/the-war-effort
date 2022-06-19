import { ALL_ROLES } from '@the-war-effort/common/constants.js';
import {
  addClientToRoom,
  changeClientRole,
  forwardRoleAction,
  removeClientFromRoom,
} from '../store.js';

export const initialize = ({ io, socket }) => {
  // JOINS ROOM
  socket.on('room-code-submitted', submittedRoomCode => {
    try {
      const { room, roomCode } = addClientToRoom({ socket, submittedRoomCode });
      io.to(roomCode).emit('room-updated', room);
    } catch (err) {
      console.log(`${socket.id} submitted invalid room code`, submittedRoomCode);
      // TODO: handle invalid code client-side
      socket.emit('invalid-room-code');
    }
  });

  // DISCONNECTS
  socket.on('disconnect', () => {
    try {
      const { room, roomCode } = removeClientFromRoom({ socket });
      io.to(roomCode).emit('room-updated', room);
    } catch (err) {
      // TODO: handle error
      console.log('remove client error');
    }
  });

  // SELECTS ROLE
  socket.on('role-requested', roleName => {
    try {
      const { room, roomCode } = changeClientRole({ socket, roleName });
      io.to(roomCode).emit('room-updated', room);
    } catch (err) {
      // TODO: handle error
      console.log('role request error', err);
    }
  });

  // RESIGNS FROM ROLE
  socket.on('player-resigned', () => {
    try {
      const { room, roomCode } = changeClientRole({ socket, roleName: ALL_ROLES.AUDIENCE });
      io.to(roomCode).emit('room-updated', room);
    } catch (err) {
      // TODO: handle error
      console.log('player resign error');
    }
  });

  // TAKES ACTION
  socket.on('role-action', ({ type, data }) => {
    try {
      forwardRoleAction({
        io, socket, type, data,
      });
    } catch (err) {
      console.log('role action error');
      // TODO: handle error
    }
  });
};
