import ClientGameData from './clientGameData.js';
import Player from '../common/player.js';

export default class EventsHandler {
    constructor(socket) {
        this.socket = socket;
    }

    bindEvents() {
        this.socket.on('canvasSize', this.handleCanvasSize.bind(this));
        this.socket.on('currentPlayers', this.handleCurrentPlayers.bind(this));
        this.socket.on('newPlayer', this.handleNewPlayer.bind(this));
        this.socket.on(
            'playerDisconnected',
            this.handlePlayerDisconnected.bind(this)
        );
    }

    handleCanvasSize(size) {
        console.log('Canvas size received from server:', size);
        ClientGameData.canvas.width = size.width;
        ClientGameData.canvas.height = size.height;
    }

    handleCurrentPlayers(players) {
        console.log('Current players:', players);
        ClientGameData.players = players.map(
            (player) => new Player(player.id, player.x, player.y)
        );
    }

    handleNewPlayer(player) {
        console.log('New player joined:', player);
        ClientGameData.players.push(new Player(player.id, player.x, player.y));
    }

    handlePlayerDisconnected(playerId) {
        console.log('Player disconnected:', playerId);
        ClientGameData.players = ClientGameData.players.filter(
            (player) => player.id !== playerId
        );
    }
}
