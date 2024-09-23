class Ball {
    constructor(x, y, radius, canvasWidth, canvasHeight) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = 2; // Velocidad horizontal inicial
        this.dy = -2; // Velocidad vertical inicial
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
    }

    // move(paddle) {
    //     // Rebote en los bordes laterales
    //     if (this.x + this.dx > this.canvasWidth - this.radius || this.x + this.dx < this.radius) {
    //         this.dx = -this.dx;
    //     }

    //     // Rebote en la parte superior
    //     if (this.y + this.dy < this.radius) {
    //         this.dy = -this.dy;
    //     }
    //     // Si la pelota toca la parte inferior del canvas
    //     else if (this.y + this.dy > this.canvasHeight - this.radius) {
    //         if (this.x > paddle.x && this.x < paddle.x + paddle.width) {
    //             this.dy = -this.dy; // Rebote en el paddle
    //         } else {
    //             // Aquí podrías manejar el "Game Over" o reiniciar la posición de la pelota
    //             console.log('Game Over');
    //         }
    //     }

    //     // Actualiza la posición de la pelota
    //     this.x += this.dx;
    //     this.y += this.dy;
    // }

    resetPosition() {
        this.x = this.canvasWidth / 2;
        this.y = this.canvasHeight - 30;
        this.dx = 2;
        this.dy = -2;
    }
}

export default Ball;
