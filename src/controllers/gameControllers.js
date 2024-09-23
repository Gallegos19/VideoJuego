import Ball from "../models/ball.js";
import Paddle from "../models/paddle.js";
import { BrickGrid, collisionDetection } from "../models/bricks.js";
import { drawBricks, drawBall, drawPaddle } from "../views/renderer.js";
import GameState from "../models/gameState.js";

const ballWorker = new Worker('src/Workers/ballWorker.js');

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const ball = new Ball(canvas.width / 2, canvas.height - 30, 10, canvas.width, canvas.height);
const paddle = new Paddle(canvas);
let fila = 1;
let columna = 9;
const brickGrid = new BrickGrid(fila, columna, canvas);
const gameState = new GameState();

let rightPressed = false;
let leftPressed = false;
let isGameOver = false;
let isLevelComplete = false;

let nivel = 1; 
const maxNivel = 10;

document.addEventListener("keydown", (e) => {
    if (!isGameOver && !isLevelComplete) {
        if (e.key === "Right" || e.key === "ArrowRight") rightPressed = true;
        else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = true;
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key === "Right" || e.key === "ArrowRight") rightPressed = false;
    else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = false;
});

function update() {
    if (isGameOver || isLevelComplete) {
        return; 
    }

    if (rightPressed) paddle.move('right', canvas);
    if (leftPressed) paddle.move('left', canvas);

    ballWorker.postMessage({
        ball: {
            x: ball.x,
            y: ball.y,
            dx: ball.dx,
            dy: ball.dy,
            radius: ball.radius,
            canvasWidth: canvas.width,
            canvasHeight: canvas.height
        },
        paddle: {
            x: paddle.x,
            width: paddle.width
        }
    });

    if (areBricksVisible(brickGrid)) {
        collisionDetection(ball, brickGrid, gameState);
    }

    if (areAllBricksDestroyed()) {
        isLevelComplete = true;
        win(); 
    }
}

ballWorker.onmessage = function(e) {
    if (e.data.gameOver) {
        gameOver();
    } else {
        Object.assign(ball, e.data.ball);
    }
};

function areBricksVisible(brickGrid) {
    return brickGrid.bricks.some(column => column.some(brick => brick.status === 1));
}

function areAllBricksDestroyed() {
    return !brickGrid.bricks.some(column => column.some(brick => brick.status === 1));
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks(ctx, brickGrid);
    drawBall(ctx, ball);
    drawPaddle(ctx, paddle);
}

function gameLoop() {
    if (!isGameOver && !isLevelComplete) {
        update();
        draw();
        requestAnimationFrame(gameLoop);
    }
}

function gameOver() {
    isGameOver = true;
    document.getElementById('gameOverScreen').style.display = 'block';
}

function win() {
    isLevelComplete = true;
    document.getElementById('winScreen').style.display = 'block';
}


function restartGame() {
    isGameOver = false;
    isLevelComplete = false;
    document.getElementById('gameOverScreen').style.display = 'none';
    document.getElementById('winScreen').style.display = 'none';
    nivel = 1;
    updateLevelDisplay()
    fila = 1; 
    brickGrid.rowCount = fila; 
    brickGrid.createBricks(); 
    gameState.reset();
    ball.resetPosition();
    paddle.x = (canvas.width - paddle.width) / 2;
    brickGrid.createBricks();
    
    document.getElementById('puntaje').textContent = 0;

    gameLoop(); 

}


function updateLevelDisplay() {
    document.getElementById('nivel').textContent = nivel;
}

function nextlevel() {
    if (nivel < maxNivel) { 
        isGameOver = false;
        isLevelComplete = false;
        document.getElementById('gameOverScreen').style.display = 'none';
        document.getElementById('winScreen').style.display = 'none';

        fila += 1; 
        brickGrid.rowCount = fila; 
        brickGrid.createBricks(); 

        nivel++; 
        updateLevelDisplay();

        ball.resetPosition();
        paddle.x = (canvas.width - paddle.width) / 2;

        gameLoop();
    } else {
        document.getElementById('victoryModal').style.display = 'block';

    }
}

function closeVictoryModal() {
    document.getElementById('victoryModal').style.display = 'none';
    restartGame();
}


updateLevelDisplay();

gameLoop();

export { update, draw, gameLoop, restartGame, nextlevel, closeVictoryModal };

