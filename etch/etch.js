const canvas = document.querySelector(".canvas");

const MIN_GRID_SIZE = 16;
const DEFAULT_GRID_SIZE = 16;
const MAX_GRID_SIZE = 64;

const CANVAS_WIDTH = 480;
const CANVAS_HEIGHT = 480;

const WHITE = "white";
const PX = "px";
const linearGradient = function (c) {
    return `linear-gradient(to right, white, ${c})`;
};

let mousePressed = false;
let color = "#000000";
let opacity = 1.0;

function init() {
    // Set mouse events to only paint when mouse is clicked/held.
    const body = document.querySelector("body");
    body.addEventListener("mousedown", () => mousePressed = true);
    body.addEventListener("mouseup", () => mousePressed = false);

    // Visual changes on color/opacity sliders for reactivity and tactile feedback.
    const colorWrapper = document.querySelector(".settings__colorWrapper");
    const colorPicker = document.querySelector(".settings__color");
    const opacitySlider = document.querySelector(".settings__opacity");
    colorPicker.addEventListener("input", () => {
        color = colorPicker.value;
        colorWrapper.style.backgroundColor = color;
        opacitySlider.style.backgroundImage = linearGradient(color);
    });
    opacitySlider.addEventListener("change", () => opacity = opacitySlider.value);
    body.addEventListener("keydown", (e) => changeOpacityOnKeyDown(e, opacitySlider))

    // Tool change logic
    const paintTool = document.querySelector(".tools__brush");
    const eraserTool = document.querySelector(".tools__eraser");
    const bucketFillTool = document.querySelector(".tools__bucketFill");
    const rainbowTool = document.querySelector(".tools__rainbow");
    paintTool.addEventListener("click", () => useTool = paint);
    eraserTool.addEventListener("click", () => useTool = erase);
    bucketFillTool.addEventListener("click", () => useTool = bucketFill);
    rainbowTool.addEventListener("click", () => useTool = rainbow);

    // Grid size slider logic.
    const gridSizeSlider = document.querySelector(".gridSizeSlider__value");
    const gridSizeLabel = document.querySelector(".gridSizeSlider__label");
    gridSizeSlider.addEventListener("input", () => {
        gridSizeLabel.innerHTML = `${gridSizeSlider.value}x${gridSizeSlider.value}`;
    });
    gridSizeSlider.addEventListener("change", () => resizeGrid(gridSizeSlider.value));

    // Finally make the initial grid.
    resizeGrid(DEFAULT_GRID_SIZE);
}

function changeOpacityOnKeyDown(e, opacitySlider) {
    let opacityChange = 0;

    if (e.code === "KeyA") 
        opacityChange = -0.1;
    else if (e.code === "KeyD")
        opacityChange = 0.1;

    if(opacityChange !== 0) {
        opacitySlider.value = Number(opacitySlider.value) + opacityChange;
        opacity = opacitySlider.value;
    }
}

function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
}

function resizeGrid(gridSize) {
    if (gridSize === null) {
        return;
    }

    gridSize = clamp(gridSize, MIN_GRID_SIZE, MAX_GRID_SIZE);

    removeBlocks();
    createBlocks(gridSize);
}

function createBlocks(gridSize) {
    for (let i = 0; i < gridSize; i += 1) {
        for (let j = 0; j < gridSize; j += 1) {
            canvas.appendChild(createBlock(gridSize));
        }
    }
}

/**
 * Sets the current tool to use.
 */
let useTool = paint;

function createBlock(gridSize) {
    const div = document.createElement("div");
    div.classList.add("block");
    div.style.width = CANVAS_WIDTH / gridSize + PX;
    div.style.height = CANVAS_HEIGHT / gridSize + PX;

    div.addEventListener("mousedown", () => useTool(div));
    div.addEventListener("mouseover", () => {
        if (mousePressed) useTool(div)
    });

    return div;
}

function removeBlocks() {
    while (canvas.childElementCount > 0) {
        canvas.removeChild(canvas.lastChild);
    }
}
