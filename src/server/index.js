import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import Player from '../common/player.js';
import ServerGameData from '../server/serverGameData.js';
import EventsHandler from './eventsHandler.js';

console.log('Server-side code is running!');

const port = process.env.PORT || 8080;
const eventsHandler = new EventsHandler();

const app = express();
app.use(express.static('dist'));
app.use(express.static('src/public'));

const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('A user connected with ID:', socket.id);

    initializeCanvas(socket);
    initializeNewPlayer(socket);

    eventsHandler.bindEvents(socket);

    socket.on('disconnect', () => {
        console.log('User disconnected with ID:', socket.id);

        disconnectUser(socket);
    });
});

function initializeCanvas(socket) {
    socket.emit('canvasSize', ServerGameData.canvasSize);
}

function initializeNewPlayer(socket) {
    const newPlayer = new Player(
        socket.id,
        Math.random() * ServerGameData.canvasSize.width,
        Math.random() * ServerGameData.canvasSize.height
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

function updateGameData() {
    movePlayers();
}

function movePlayers() {
    ServerGameData.players.forEach((players) => {
        const mouseCoordinates =
            ServerGameData.playersMouseCoordinates[players.id];
        if (mouseCoordinates) {
            players.moveTo(mouseCoordinates.x, mouseCoordinates.y);
            io.emit('currentPlayers', ServerGameData.players);
        }
    });
}

setInterval(updateGameData, 1000 / 60);
