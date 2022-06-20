import common from '@the-war-effort/common';
import _ from 'lodash-es';

const { ROOM_CODES, ALL_ROLES } = common.constants;

/*   ROOM EXAMPLE
 *
 *   'Solitary Scorpion': {
 *      code: 'Solitary Scorpion',
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
    return (_.some(oldRooms, (room, code) => code === newRoomCode)
      ? generateRoomCode()
      : newRoomCode);
  };

  const roomCode = generateRoomCode();
  console.log('room created ', roomCode);
  const newRoom = {
    code: roomCode,
    hostId: hostSocket.id,
    clients: {},
  };

  store.rooms = {
    ...oldRooms,
    [roomCode]: newRoom,
  };

  hostSocket.join(roomCode);

  return { room: newRoom, roomCode };
};

export const closeRoom = roomCode => {
  // error
  if (!roomCode) throw new Error('No room code found.');

  const room = _.get(store.rooms, roomCode);
  if (!room) throw new Error('No room found to close.');

  // success
  console.log('room closing:', roomCode);
  store.rooms = _.omit(store.rooms, roomCode);
};

export const removeClientFromRoom = ({ socket }) => {
  const roomCode = getRoomCodeFromSocket(socket);
  const roomExists = _.some(store.rooms, (room, code) => code === roomCode);
  const clientId = socket.id;

  // failure
  if (!roomExists) throw new Error('Room not found.');
  if (roomExists && !_.has(store.rooms[roomCode].clients, clientId)) {
    throw new Error('Client not registered to this room.');
  }

  // success
  console.log(`Removing ${clientId} from room `, roomCode);
  socket.leave(roomCode);
  const room = store.rooms[roomCode];
  const oldClients = room.clients;
  const newClients = _.omit(oldClients, clientId);
  room.clients = newClients;
  return { room, roomCode };
};

// ADD CLIENT TO ROOM
export const addClientToRoom = ({ socket, submittedRoomCode }) => {
  // failure
  const roomExists = _.some(store.rooms, (room, code) => code === submittedRoomCode);
  if (!roomExists) throw new Error('Room not found.');

  // success
  const clientId = socket.id;
  console.log(`${clientId} joining room `, submittedRoomCode);
  socket.join(submittedRoomCode);

  const room = store.rooms[submittedRoomCode];
  const oldClients = _.get(room, 'clients');
  room.clients = {
    ...oldClients,
    [clientId]: ALL_ROLES.AUDIENCE,
  };
  return { room, roomCode: submittedRoomCode };
};

// CHANGE CLIENT ROLE
export const changeClientRole = ({ socket, roleName }) => {
  const roomCode = getRoomCodeFromSocket(socket);

  // failure
  if (!roomCode) throw new Error('Client does not belong to a room.');

  const room = _.get(store.rooms, roomCode);
  if (!room) throw new Error('Client belongs to a room that does not exist.');

  const allRoles = _.values(ALL_ROLES);
  const isRoleValid = _.includes(allRoles, roleName);
  if (!isRoleValid) throw new Error('Client requesting role that does not exist.');

  const occupiedRoles = _.values(room.clients);
  const isRoleAvailable = (roleName === ALL_ROLES.AUDIENCE) || !_.includes(occupiedRoles, roleName);
  if (!isRoleAvailable) throw new Error('Another client already occupies that role.');

  // success
  console.log(`${socket.id} gets the role `, roleName);
  const oldClients = _.get(room, 'clients');
  room.clients = {
    ...oldClients,
    [socket.id]: roleName,
  };

  return { room, roomCode };
};

// FORWARD CLIENT ACTION TO HOST
export const forwardRoleAction = ({
  io, socket, type, data,
}) => {
  const roomCode = getRoomCodeFromSocket(socket);

  if (!roomCode) throw new Error('Client does not belong to room.');

  const room = _.get(store.rooms, roomCode);
  if (!room) throw new Error('Client room does not exist.');

  const hostId = _.get(room, 'hostId');
  if (!hostId) throw new Error('Room does not have host.');

  // TODO: enforce that this socket has the authority for this action
  io.to(hostId).emit('role-action', { type, data });
};

export function getRoomCodeFromSocket(socket) {
  // all sockets have a default private room containing just themselves
  return _.find(Array.from(socket.rooms), roomCode => roomCode !== socket.id);
}

export const getRoomCodesAvailable = () => Object.keys(store.rooms);
