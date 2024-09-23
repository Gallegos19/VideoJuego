self.onmessage = function(e) {
    const { direction, position, canvasWidth, paddleWidth, speed } = e.data;

    let newPosition = position;

    if (direction === 'right' && position < canvasWidth - paddleWidth) {
        newPosition += speed;
    } else if (direction === 'left' && position > 0) {
        newPosition -= speed;
    }

    self.postMessage(newPosition);
};
