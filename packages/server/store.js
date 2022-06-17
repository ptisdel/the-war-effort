import _ from 'lodash-es';
import common from '@the-war-effort/common';
import { io } from './index.js';

const { ROOM_CODES, ALL_ROLES } = common.constants;

/*   ROOM EXAMPLE
 *
 *   'Solitary Scorpion': {
 *      hostId: '14124125-9853895-102874124',
 *      roles: [
 *        '89325403-018749135-9872535': 'Air Force Officer',
 *        '89325403-018749135-9872535': 'Audience',
 *        '89325403-018749135-9872535': 'Audience',
 *      ],
 *    }
 *
 */

const store = {
  rooms: {},
};

// CREATE ROOM 
export const createRoom = hostSocket => {
  const oldRooms = store.rooms;

  const generateRoomCode = () => {
    const newRoomCode = `${_.sample(ROOM_CODES.adjectives)} ${_.sample(ROOM_CODES.nouns)}`;
    return (_.some(oldRooms, (room, code) => code === newRoomCode) ? generateRoomCode() : newRoomCode);
  }

  const roomCode = generateRoomCode();
  console.log('room created ', roomCode);
  const newRoom = {
    hostId: hostSocket.id,
    clients: {},
  };

  store.rooms = {
    ...oldRooms,
    [roomCode]: newRoom,
  };
  
  hostSocket.join(roomCode);
  io.to(roomCode).emit('room-updated', _.get(store.rooms, roomCode));

  return newRoom;
} 

export const closeRoom = hostSocket => {
  const roomCode = getRoomCodeFromSocket(hostSocket);
  
  // error
  if (!roomCode) throw 'No room code found on host.';

  const room = _.get(store.rooms, roomCode);
  if (!room) throw 'No room found to close.';

  // success
  console.log('room closing:', roomCode);
  io.to(roomCode).emit('room-updated', null);
  store.rooms = _.omit(store.rooms, roomCode);
};

export const removeClientFromRoom = ({ socket, roomCode }) => {
  const roomExists = _.some(store.rooms, (room, code) => code === roomCode);
  const clientId = socket.id;

  // failure
  if (!roomExists) throw 'Room not found.';
  if (roomExists && !_.has(store.rooms[roomCode].clients, clientId)) {
    throw 'Client not registered to this room.';
  }

  // success
  console.log(`Removing ${clientId} from room `, roomCode);
  socket.leave(roomCode);
  const oldClients = store.rooms[roomCode].clients;
  const newClients = _.omit(oldClients, clientId);
  store.rooms[roomCode].clients = newClients;
  io.to(roomCode).emit('room-updated', _.get(store.rooms, roomCode));
};

// ADD CLIENT TO ROOM
export const addClientToRoom = ({ socket, roomCode }) => {
  // failure
  const roomExists = _.some(store.rooms, (room, code) => code === roomCode);
  if (!roomExists) throw 'Room not found.';

  // success
  const clientId = socket.id;
  console.log(`${clientId} joining room `, roomCode);
  socket.join(roomCode);

  const oldClients = _.get(store.rooms[roomCode], 'clients');
  store.rooms[roomCode].clients = {
    ...oldClients,
    [clientId]: ALL_ROLES.AUDIENCE,
  };

  io.to(roomCode).emit('room-updated', _.get(store.rooms, roomCode));
};

// CHANGE CLIENT ROLE
export const changeClientRole = ({ socket, roleName }) => {
  const roomCode = getRoomCodeFromSocket(socket);
  
  // failure
  if (!roomCode) throw 'Client does not belong to a room.';

  const room = _.get(store.rooms, roomCode);
  if (!room) throw 'Client belongs to a room that does not exist.';

  const allRoles = _.values(ALL_ROLES);
  const isRoleValid = _.includes(allRoles, roleName);
  if (!isRoleValid) throw 'Client requesting role that does not exist.';

  const occupiedRoles = _.values(room.clients);
  const isRoleAvailable = (roleName === ALL_ROLES.AUDIENCE) || !_.includes(occupiedRoles, roleName);
  if (!isRoleAvailable) throw 'Another client already occupies that role.';

  // success
  console.log(`${socket.id} gets the role `, roleName)
  const oldClients = _.get(store.rooms, [roomCode, 'clients']);
  store.rooms[roomCode].clients = {
    ...oldClients,
    [socket.id]: roleName,
  };

  io.to(roomCode).emit('room-updated', _.get(store.rooms, roomCode));
}

// FORWARD CLIENT ACTION TO HOST 
export const forwardRoleAction = ({ socket, type, data }) => {
  const roomCode = getRoomCodeFromSocket(socket);
  
  if (!roomCode) throw 'Client does not belong to room.';

  const room = _.get(store.rooms, roomCode);
  if (!room) throw 'Client room does not exist.';
  
  const hostId = _.get(room, 'hostId');
  if (!hostId) throw 'Room does not have host.';

  // TODO: enforce that this socket has the authority for this action
  io.to(hostId).emit('role-action', { type, data });
}

export function getRoomCodeFromSocket(socket) {
  // all sockets have a default private room containing just themselves
  return _.find(Object.keys(socket.rooms), roomCode => roomCode != socket.id);  
}