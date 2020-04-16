import express from 'express';
import http from 'http';
import path from 'path';
import socketIO from 'socket.io';
import api from './api';

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

io.on('connection', api.onboardSocket);

server.listen(port, () => {
  console.log('listening on *:80');
});
