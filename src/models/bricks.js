class Brick {
    constructor(row, column, width = 75, height = 20, padding = 10, offsetTop = 30, offsetLeft = 30) {
        this.row = row;
        this.column = column;
        this.width = width;
        this.height = height;
        this.padding = padding;
        this.offsetTop = offsetTop;
        this.offsetLeft = offsetLeft;
        this.x = (column * (this.width + this.padding)) + this.offsetLeft;
        this.y = (row * (this.height + this.padding)) + this.offsetTop;
        this.status = 1; // El ladrillo está visible inicialmente
    }
};
class BrickGrid {
    constructor(rowCount, columnCount) {
        this.bricks = [];
        this.rowCount = rowCount;
        this.columnCount = columnCount;
        this.createBricks();
    }

      createBricks() {
        for (let c = 0; c < this.columnCount; c++) {
            this.bricks[c] = [];
            for (let r = 0; r < this.rowCount; r++) {
                this.bricks[c][r] = new Brick(r, c);
            }
        }
    }
}

function collisionDetection(ball, brickGrid, gameState) {
    for (let c = 0; c < brickGrid.columnCount; c++) {
        for (let r = 0; r < brickGrid.rowCount; r++) {
            const brick = brickGrid.bricks[c][r];
            if (brick.status === 1) { // Solo considerar los ladrillos visibles
                // Verificar si la pelota está dentro de los límites del ladrillo
                if (ball.x > brick.x && ball.x < brick.x + brick.width &&
                    ball.y > brick.y && ball.y < brick.y + brick.height) {
                        ball.dy = -ball.dy; 
                        brick.status = 0;   
                        gameState.incrementScore();
                        break;             
                }
            }
        }
    }
};


export { Brick, BrickGrid, collisionDetection };
