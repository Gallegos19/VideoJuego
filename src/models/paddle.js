class Paddle {
    constructor(canvas) {
        this.height = 10;
        this.width = 145;
        this.x = (canvas.width - this.width) / 2;
        this.speed = 7;

        this.worker = new Worker('src/Workers/paddleWorker.js');

        this.worker.onmessage = (e) => {
            this.x = e.data; 
        };
    }

    move(direction, canvas) {

        this.worker.postMessage({
            direction,
            position: this.x,
            canvasWidth: canvas.width, 
            paddleWidth: this.width,   
            speed: this.speed
        });
    }
}

export default Paddle;
