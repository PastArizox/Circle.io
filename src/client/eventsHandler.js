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
        this.socket.on('playerMoved', this.handlePlayerMoved.bind(this));
    }

    handleCanvasSize(size) {
        ClientGameData.canvas.width = size.width;
        ClientGameData.canvas.height = size.height;
    }

    handleCurrentPlayers(players) {
        ClientGameData.players = players.map(
            (player) => new Player(player.id, player.x, player.y)
        );
    }

    handleNewPlayer(player) {
        ClientGameData.players.push(new Player(player.id, player.x, player.y));
    }

    handlePlayerDisconnected(playerId) {
        ClientGameData.players = ClientGameData.players.filter(
            (player) => player.id !== playerId
        );
    }

    handlePlayerMoved(data) {
        ClientGameData.players = ClientGameData.players.map((p) =>
            p.id === data.id ? { ...p, x: data.x, y: data.y } : p
        );
    }
}
