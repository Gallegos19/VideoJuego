import { update, draw, restartGame, nextlevel, closeVictoryModal} from "./controllers/gameControllers.js";

// Iniciar el juego cuando se carga la página
document.addEventListener("DOMContentLoaded", () => {
    // Inicia el ciclo de renderizado
    function gameLoop() {
        update();  // Actualiza el estado del juego
        draw();    // Renderiza el juego en el canvas
        requestAnimationFrame(gameLoop); // Continuar el ciclo del juego
    }

    gameLoop();

    const restartButton = document.getElementById("restartButton");
    if (restartButton) {
        restartButton.addEventListener("click", () => {
            restartGame(); 
        });
    }
    const nextlevelButton = document.getElementById("nextLevelButton");
    if (nextlevelButton) {
        nextlevelButton.addEventListener("click", () => {
            nextlevel(); 
        });
    }
    const closeVictoryButton = document.getElementById("closeVictoryButton");
    if (closeVictoryButton) {
        closeVictoryButton.addEventListener("click", () => {
            closeVictoryModal(); 
        });
    }
});
