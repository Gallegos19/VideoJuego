class GameState {
    constructor() {
        this.score = 0;
        this.isGameOver = false;
        this.isLevelComplete = false;

        this.worker = new Worker('src/Workers/scoreWorker.js');

        this.worker.onmessage = (event) => {
            this.incrementScoreBy(event.data);
        };
    }

    incrementScore() {
        this.worker.postMessage('increment');
    }

    incrementScoreBy(value) {
        this.score += value;
        document.getElementById('puntaje').innerText = this.score; 
    }

    reset() {
        this.score = 0;
        this.isGameOver = false;
        this.isLevelComplete = false;
        document.getElementById('puntaje').innerText = this.score;
    }
}

export default GameState;
