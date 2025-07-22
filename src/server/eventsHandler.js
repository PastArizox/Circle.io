import ServerGameData from './serverGameData.js';

export default class EventsHandler {
    bindEvents(socket) {
        this.socket = socket;
        this.socket.on(
            'mouseCoordinates',
            this.handleMouseCoordinates.bind(this)
        );
    }

    handleMouseCoordinates(mouseData) {
        const player = ServerGameData.players.find(
            (player) => player.id === this.socket.id
        );

        ServerGameData.playersMouseCoordinates[this.socket.id] = mouseData;
    }
}
