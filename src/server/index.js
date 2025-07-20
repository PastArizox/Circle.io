import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

console.log('Server-side code is running!');

const port = process.env.PORT || 8080;

const app = express();
app.use(express.static('dist'));
app.use(express.static('src/public'));

const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('A user connected with ID:', socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected with ID:', socket.id);
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
