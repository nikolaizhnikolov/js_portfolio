const content = document.querySelector(".content");

const DEFAULT_GRID_SIZE = 16;

const CONTENT_WIDTH = 640;
const CONTENT_HEIGHT = 480;

const PX = "px";
const linearGradient = function(c) {
    return `linear-gradient(to right, white, ${c})`;
};

let mousePressed = false;
let color = "#000000";
let opacity = 1.0;

function init(){
    const body = document.querySelector("body");
    body.addEventListener("mousedown", () => mousePressed = true);
    body.addEventListener("mouseup", () => mousePressed = false);

    const colorWrapper = document.querySelector(".settings__colorWrapper");
    const colorPicker = document.querySelector(".settings__color");
    const opacitySlider = document.querySelector(".settings__opacity");
    colorPicker.addEventListener("input", () => {
        color = colorPicker.value;
        colorWrapper.style.backgroundColor = color;
        opacitySlider.style.backgroundImage = linearGradient(color);
    });
    opacitySlider.addEventListener("change", () => opacity = opacitySlider.value);

    const gridSizeSlider = document.querySelector(".slider__value");
    const gridSizeLabel = document.querySelector(".slider__label");
    gridSizeSlider.addEventListener("input", () => {
        gridSizeLabel.innerHTML = `${gridSizeSlider.value}x${gridSizeSlider.value}`;
    });
    gridSizeSlider.addEventListener("change", () => resizeGrid(gridSizeSlider.value));

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
    element.style.backgroundColor = color;
    element.style.opacity = opacity;
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
