import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import Player from '../common/player.js';
import ServerGameData from '../client/clientGameData.js';

console.log('Server-side code is running!');

const port = process.env.PORT || 8080;

const canvasSize = {
    width: 800,
    height: 800,
};

const app = express();
app.use(express.static('dist'));
app.use(express.static('src/public'));

const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('A user connected with ID:', socket.id);

    initializeCanvas(socket);
    initializeNewPlayer(socket);

    socket.on('disconnect', () => {
        console.log('User disconnected with ID:', socket.id);

        disconnectUser(socket);
    });
});

function initializeCanvas(socket) {
    socket.emit('canvasSize', canvasSize);
}

function initializeNewPlayer(socket) {
    const newPlayer = new Player(
        socket.id,
        Math.random() * canvasSize.width,
        Math.random() * canvasSize.height
    );

    ServerGameData.players.push(newPlayer);

    socket.emit('currentPlayers', ServerGameData.players);
    socket.broadcast.emit('newPlayer', newPlayer);
}

function disconnectUser(socket) {
    ServerGameData.players = ServerGameData.players.filter(
        (player) => player.id !== socket.id
    );

    socket.broadcast.emit('playerDisconnected', socket.id);
}

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
