import io from 'socket.io-client';

// new socket connection to server
// https://the-war-effort-server.herokuapp.com/
const socket = io(`${process.env.SERVER_URL}?role=client`);

export const getPlayerId = () => socket.id;

export const sendMessage = (message, data) => socket.emit(message, data);
export const subscribe = (event, callback) => socket.on(event, callback);
export const unsubscribe = (event, callback) => socket.removeEventListener(event, callback);