import io from 'socket.io-client';
import DisplayManager from './displayManager.js';
import Player from '../common/player.js';
import ClientGameData from './clientGameData.js';

console.log('Client-side code is running!');

const socket = io();

socket.on('connect', () => {
    console.log('Connected to server with ID:', socket.id);
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

const canvas = document.getElementById('canvas');
canvas.width = 500;
canvas.height = 500;

const localPlayer = new Player(null, 250, 250);
ClientGameData.players = [localPlayer];

function update() {
    // Update game state or animations here
}

requestAnimationFrame(new DisplayManager(canvas).render);
setInterval(update, 1000 / 60);
