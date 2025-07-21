import io from 'socket.io-client';
import DisplayManager from './displayManager.js';
import EventsHandler from './eventsHandler.js';
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
ClientGameData.canvas = canvas;

const eventsHandler = new EventsHandler(socket);
eventsHandler.bindEvents();

const displayManager = new DisplayManager(canvas);
requestAnimationFrame(displayManager.render);

function update() {
    // Update game state or animations here
}

setInterval(update, 1000 / 60);
