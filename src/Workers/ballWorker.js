self.onmessage = function(e) {
    let { ball, paddle } = e.data;

    if (ball.x + ball.dx > ball.canvasWidth - ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx;
    }

    if (ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy;
    } else if (ball.y + ball.dy > ball.canvasHeight - ball.radius) {
        if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
            ball.dy = -ball.dy;
        } else {
            // Envía un mensaje indicando game over si la pelota toca el fondo
            self.postMessage({ gameOver: true });
            return;
        }
    }

    ball.x += ball.dx;
    ball.y += ball.dy;
    
    self.postMessage({ ball });
};
