import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import { Server as IoServer } from 'socket.io';
import { onboardSocket } from './controllers/index.js';

dotenv.config({ path: '../../.env' });

const whiteList = [process.env.CLIENT_URL, process.env.HOST_URL];

const app = express();
app.use(cors({ methods: ['GET', 'POST'], origin: whiteList }));

const server = http.createServer(app);
const port = 8000;
server.listen(port, () => {
  console.log(`listening on ${port}`);
});

console.log('creating websockets server');
const io = new IoServer(server);
console.log('websockets server created');
console.log(`traffic allowed: ${process.env.CLIENT_URL}, ${process.env.HOST_URL}`);
io.on('connection', socket => onboardSocket({ io, socket }));
