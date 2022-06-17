import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import { onboardSocket } from './controllers/index.js';

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log('listening on *:80');
});

export const io = socketIO(server);
io.on('connection', onboardSocket);

