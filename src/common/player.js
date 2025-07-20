import Circle from './circle.js';

export default class Player extends Circle {
    constructor(x, y) {
        super(x, y, 20, 'blue');
        this.id = null; // Player ID will be set when connected to the server
        this.name = 'Player';
        this.velocity = 2;
    }

    draw(canvasContext) {
        super.draw(canvasContext);

        canvasContext.fillStyle = 'white';
        canvasContext.font = '12px Arial';
        canvasContext.textAlign = 'center';
        canvasContext.textBaseline = 'middle';
        canvasContext.fillText(this.name, this.x, this.y);
    }
}
