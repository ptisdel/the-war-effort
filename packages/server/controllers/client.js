import { ALL_ROLES } from '@the-war-effort/common/constants.js';
import {
    addClientToRoom,
    changeClientRole,
    forwardRoleAction,
    removeClientFromRoom,
} from '../store.js';

export const initialize = socket => {

    // JOINS ROOM
    socket.on('room-code-submitted', roomCode => {
        try {
            addClientToRoom({ socket, roomCode });
        } catch (err) {
            console.log(`${socket.id} submitted invalid room code`, roomCode);
            // TODO: handle invalid code client-side
            socket.emit('invalid-room-code');
        }
    });

    // DISCONNECTS
    socket.on('disconnect', () => {
        try {
        removeClientFromRoom({ socket, roomCode });
        } catch (err) {
            // TODO: handle error
        }
    });

    // SELECTS ROLE
    socket.on('role-requested', roleName => {
        try { 
            changeClientRole({ socket, roleName })
        } catch (err) {
            // TODO: handle error
        }
    });

    // RESIGNS FROM ROLE
    socket.on('player-resigned', () => {
        try { 
            changeClientRole({ socket, roleName: ALL_ROLES.AUDIENCE})
        } catch (err) {
            // TODO: handle error
        }
    });

    // TAKES ACTION
    socket.on('role-action', ({ type, data }) => {
        try {
            forwardRoleAction({ socket, type, data });
        } catch (err) {
            // TODO: handle error
        }
    });    
};
