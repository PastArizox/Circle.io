import Circle from './circle.js';

export default class Player extends Circle {
    constructor(id, x, y) {
        super(x, y, 20, 'blue');
        this.id = id;
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

    moveTo(x, y) {
        const dx = x - this.x;
        const dy = y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 0) {
            this.x += (dx / distance) * this.velocity;
            this.y += (dy / distance) * this.velocity;
        }
    }
}
