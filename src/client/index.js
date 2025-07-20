import io from 'socket.io-client';

console.log('Client-side code is running!');

const socket = io();

socket.on('connect', () => {
    console.log('Connected to server with ID:', socket.id);
});

socket.on('disconnect', () => {
    console.log('Disconnected from server with ID:', socket.id);
});

const canvas = document.getElementById('canvas');
const canvasContext = canvas.getContext('2d');
