function paint(element) {
    element.style.backgroundColor = color;
    element.style.opacity = opacity;
}

function erase(element) {
    element.style.backgroundColor = WHITE;
}

function bucketFill() {
    for(const block of canvas.children) {
        block.style.backgroundColor = color;
        block.style.opacity = opacity;
    }
}

function generateRandomColor() {
    const R = Math.floor(Math.random()*256);
    const G = Math.floor(Math.random()*256);
    const B = Math.floor(Math.random()*256);
    return `rgb(${R},${G},${B})`;

    /**
     * Second way of doing things.
     * Hex conversion was annoying. 
     * Leaving this here as a reminder.
     */
    // const RGB = Math.floor(Math.random()*0xffffff).toString(16);
    // return `#${RGB}`;
}

function rainbow(element) {
    element.style.backgroundColor = generateRandomColor();
    element.style.opacity = opacity;
}

function toggleGrid() {
    const blocks = canvas.children;

    for (let i = 0; i < gridSize; i += 1) {
        for (let j = 0; j < gridSize; j += 1) {
            const block = blocks[(i*gridSize) + j];
            toggleGridLines(block, i+1, j+1);
        }
    }
}