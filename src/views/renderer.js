// Función para dibujar los ladrillos
function drawBricks(ctx, brickGrid) {
    for (let c = 0; c < brickGrid.columnCount; c++) {
        for (let r = 0; r < brickGrid.rowCount; r++) {
            const brick = brickGrid.bricks[c][r];
            if (brick.status === 1) {
                const brickX = (c * (brick.width + brick.padding)) + brick.offsetLeft;
                const brickY = (r * (brick.height + brick.padding)) + brick.offsetTop;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brick.width, brick.height);
                ctx.fillStyle = "#0095DD"; // Color del ladrillo
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// Función para dibujar la pelota
function drawBall(ctx, ball) {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD"; // Color de la pelota
    ctx.fill();
    ctx.closePath();
}

// Función para dibujar el paddle
function drawPaddle(ctx, paddle) {
    ctx.beginPath();
    ctx.rect(paddle.x, ctx.canvas.height - paddle.height, paddle.width, paddle.height);
    ctx.fillStyle = "#0095DD"; // Color del paddle
    ctx.fill();
    ctx.closePath();
}

export { drawBricks, drawBall, drawPaddle };
