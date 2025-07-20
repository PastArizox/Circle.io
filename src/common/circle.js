export default class Circle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw(canvasContext) {
        canvasContext.beginPath();
        canvasContext.lineWidth = 2;
        canvasContext.strokeStyle = 'black';
        canvasContext.fillStyle = this.color;
        canvasContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        canvasContext.fill();
        canvasContext.stroke();
    }
}
