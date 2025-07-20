export default class DisplayManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.canvasContext = canvas.getContext('2d');
        this.render = this.render.bind(this);
    }

    render() {
        this.canvasContext.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
        this.canvasContext.save();

        this.renderBackground('lightgray');
        this.renderPlayers([]);
        this.renderFood([]);

        this.canvasContext.restore();

        requestAnimationFrame(this.render);
    }

    renderBackground(color) {
        this.canvasContext.fillStyle = color;
        this.canvasContext.fillRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
    }

    renderPlayers(players) {}

    renderFood(blobs) {}
}
