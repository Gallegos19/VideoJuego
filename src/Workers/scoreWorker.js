self.onmessage = function(event) {
    if (event.data === 'increment') {
        postMessage(1); 
    }
};