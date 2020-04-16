import express from 'express';
import http from 'http';
import path from 'path';
import socketIO from 'socket.io';
import api from './api';

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

io.on('connection', api.onboardSocket);

server.listen(80, () => {
  console.log('listening on *:80');
});
