const content = document.querySelector(".content");

const DEFAULT_GRID_SIZE = 16;
const CONTENT_WIDTH = 640;
const CONTENT_HEIGHT = 480;
const OPACITY_STEP = 0.2;

const PX = "px";

let mousePressed = false;

function init(){
    const body = document.querySelector("body");
    body.addEventListener("mousedown", () => mousePressed = true);
    body.addEventListener("mouseup", () => mousePressed = false);

    const slider = document.querySelector(".slider__input");
    const label = document.querySelector(".slider__label");

    slider.addEventListener("input", () => {
        label.innerHTML = `${slider.value}x${slider.value}`;
    });
    slider.addEventListener("change", () => resizeGrid(slider.value));

    resizeGrid(DEFAULT_GRID_SIZE);
}

function resizeGrid(gridSize) {
    if(gridSize === null) {
        return;
    }

    removeBlocks();
    createBlocks(gridSize);
}

function createBlocks(gridSize) {
    for (let i = 0; i < gridSize; i+=1) {
        for (let j = 0; j < gridSize; j+=1) {
            content.appendChild(createBlock(gridSize));
        }
    }
}

function paint(element) {
    element.style.opacity = Number(element.style.opacity) + OPACITY_STEP;
}

function createBlock(gridSize) {
    const div = document.createElement("div");
    div.classList.add("block");
    div.style.width = CONTENT_WIDTH / gridSize + PX;
    div.style.height = CONTENT_HEIGHT / gridSize + PX;

    div.addEventListener("mousedown", () => paint(div));
    div.addEventListener("mouseover", () => {
        if(mousePressed) paint(div)
    });

    return div;
}

function removeBlocks() {
    while(content.childElementCount > 0) {
        content.removeChild(content.lastChild);
    }
}
