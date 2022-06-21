import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import { Server as IoServer } from 'socket.io';
import { onboardSocket } from './controllers/index.js';

dotenv.config({ path: '../../.env' });

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`listening on ${port}`);
});
const io = new IoServer(server, {
  cors: {
    origin: [process.env.CLIENT_URL, process.env.HOST_URL],
    methods: ['GET', 'POST'],
  },
});
io.on('connection', socket => onboardSocket({ io, socket }));
