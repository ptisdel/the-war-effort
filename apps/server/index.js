import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
const { onboardSocket } = require('./api');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', onboardSocket);

server.listen(8000, () => {
  console.log('listening on *:8000');
});
