import io from 'socket.io-client';
import DisplayManager from './displayManager.js';

console.log('Client-side code is running!');

const socket = io();

socket.on('connect', () => {
    console.log('Connected to server with ID:', socket.id);
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

const canvas = document.getElementById('canvas');
const canvasContext = canvas.getContext('2d');

function update() {
    // Update game state or animations here
}

requestAnimationFrame(new DisplayManager(canvas).render);
setInterval(update, 1000 / 60);
