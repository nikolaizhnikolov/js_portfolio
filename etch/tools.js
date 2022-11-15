function paint(element) {
    element.style.backgroundColor = color;
}

function erase(element) {
    element.style.backgroundColor = WHITE;
}

/**
 * Add listeners so that on the next click,
 * if it is inside the canvas - use the clicked block's element
 * else - just reset to paint mode
 */
function colorGrab() {
    canvas.style.cursor = "url(../images/colorGrab_cursor.png) 6 24, auto";

    document.querySelector('body').addEventListener("mousedown", (e) => {
        if(e.target.classList.contains('block')) {
            // Get color at X, Y of mouse click.
            const block = document.elementFromPoint(e.x, e.y);
            color = rgbToHex(window.getComputedStyle(block).backgroundColor);

            // Update color-related elements
            const colorWrapper = document.querySelector(".settings__colorWrapper");
            const colorPicker = document.querySelector(".settings__color");

            colorPicker.value = color;
            colorWrapper.style.backgroundColor = hexToRgb(color);
        }
        // Reset tool and cursor
        useTool = paint;
        canvas.style.cursor = "auto";
        toggleActiveButton(document.querySelector(".tools__brush"));
    }, {once: true}); // Only do it once
}

function bucketFill() {
    for(const block of canvas.children) {
        block.style.backgroundColor = color;
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