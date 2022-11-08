const content = document.querySelector(".content");

const DEFAULT_GRID_SIZE = 16; 
const CONTENT_WIDTH = 640;
const CONTENT_HEIGHT = 480;
const OPACITY_STEP = 0.2;

const PX = "px";

let mousePressed = false;

function init(){ 
    const body = document.querySelector("body");
    body.addEventListener('mousedown', () => mousePressed = true);
    body.addEventListener('mouseup', () => mousePressed = false);

    const slider = document.querySelector(".slider_input");  
    const label = document.querySelector(".slider_label");

    slider.addEventListener('input', () => {
        label.innerHTML = `${slider.value}x${slider.value}`;
    });
    slider.addEventListener('change', () => resizeGrid(slider.value));

    resizeGrid(DEFAULT_GRID_SIZE);
}

function resizeGrid(gridSize) {
    if(gridSize === null) return;

    removeBlocks();
    createBlocks(gridSize);    
}

function createBlocks(gridSize) {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            content.appendChild(createBlock(gridSize));
        }
    }
}

function increaseElementOpacity() {
    this.style.opacity = Number(this.style.opacity) + OPACITY_STEP;
}

function createBlock(gridSize) {
    const div = document.createElement("div");
    div.classList.add("block");
    div.style.width = CONTENT_WIDTH / gridSize + PX;
    div.style.height = CONTENT_HEIGHT / gridSize + PX;

    div.addEventListener('mousedown', () => increaseElementOpacity);
    div.addEventListener('mouseover', () => {
        if(mousePressed) div.style.opacity = Number(div.style.opacity) + OPACITY_STEP;
    });

    return div;
}

function removeBlocks() {
    while(content.childElementCount > 0) {
        content.removeChild(content.lastChild);
    }
}
