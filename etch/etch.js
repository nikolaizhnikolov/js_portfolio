const canvas = document.querySelector(".canvas");

const MIN_GRID_SIZE = 1;
const DEFAULT_GRID_SIZE = 16;
const MAX_GRID_SIZE = 64;

const CANVAS_WIDTH = 480;
const CANVAS_HEIGHT = 480;

const WHITE = "white";
const PX = "px";

const linearGradient = function (c) {
    return `linear-gradient(to right, ${WHITE}, ${c})`;
};

const decToHex = function(decimal) {
    let hex = Number(decimal).toString(16);
    if(hex.length === 1) 
        hex = "0" + hex;        
    return hex;
}

const hexToDec = function(hex) {
    return parseInt(hex, 16);
}

const hexToRgb = function(hex) {
    return `rgb(${hexToDec(hex.slice(1, 3))}, 
                 ${hexToDec(hex.slice(3, 5))}, 
                 ${hexToDec(hex.slice(5))})`;
}

const rgbToHex = function(rgb) {
    const colors = rgb.match(/[\d]{1,3}/g);
    return `#${decToHex(colors[0])}${decToHex(colors[1])}${decToHex(colors[2])}`;
}

let useTool = paint;
let activeTool = '';
let gridSize = DEFAULT_GRID_SIZE;
let mousePressed = false;
let drawGrid = true;
let color = "#000000";

function init() {
    // Set mouse events to only paint when mouse is clicked/held.
    initMouseControls();
    // Visual changes on color sliders for reactivity and tactile feedback.
    initColorControls();
    // Tool change logic
    initTools();
    // Grid size slider logic.
    initGridChange();
    // Finally make the initial grid.
    resizeGrid(gridSize);
}

function initMouseControls() {
    const body = document.querySelector("body");
    body.addEventListener("mousedown", () => mousePressed = true);
    body.addEventListener("mouseup", () => mousePressed = false);
}

function initColorControls() {
    const colorWrapper = document.querySelector(".settings__colorWrapper");
    const colorPicker = document.querySelector(".settings__color");
    colorPicker.addEventListener("input", () => {
        color = colorPicker.value;
        colorWrapper.style.backgroundColor = hexToRgb(color);
    });
}

const toggleActiveButton = function(tool) {
    if(activeTool)
        activeTool.classList.remove("tools__button--active");
    activeTool = tool;
    activeTool.classList.add("tools__button--active");
}

function initTools() {
    // Select all tools
    const paintTool = document.querySelector(".tools__brush");
    const eraserTool = document.querySelector(".tools__eraser");
    const colorGrabTool = document.querySelector(".tools__colorGrab");
    const bucketFillTool = document.querySelector(".tools__bucketFill");
    const rainbowTool = document.querySelector(".tools__rainbow");
    const toggleGridTool = document.querySelector(".tools__gridToggle");

    // Set active tool and visual change on click
    const toggleTool = function(tool, element) {
        useTool = tool;
        toggleActiveButton(element);
    }

    toggleTool(paint, paintTool);

    paintTool.addEventListener("click", () => toggleTool(paint, paintTool));
    eraserTool.addEventListener("click", () => toggleTool(erase, eraserTool));
    bucketFillTool.addEventListener("click", () => toggleTool(bucketFill, bucketFillTool));
    rainbowTool.addEventListener("click", () => toggleTool(rainbow, rainbowTool));
    toggleGridTool.addEventListener("click", () => toggleGrid());
    colorGrabTool.addEventListener("click", () => {
        // Invoke color grab, but also set the current tool
        // to it, to avoid NPE on next click for clor.
        useTool = colorGrab;
        colorGrab();
        toggleActiveButton(colorGrabTool);
    });        
}

function initGridChange() {
    const gridSizeSlider = document.querySelector(".gridSizeSlider__value");
    const gridSizeLabel = document.querySelector(".gridSizeSlider__label");
    gridSizeSlider.addEventListener("input", () => {
        gridSizeLabel.innerHTML = `${gridSizeSlider.value}x${gridSizeSlider.value}`;
    });
    gridSizeSlider.addEventListener("change", () => resizeGrid(gridSizeSlider.value));
}

function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
}

function resizeGrid(newSize) {
    if (newSize === null) {
        return;
    }

    gridSize = clamp(newSize, MIN_GRID_SIZE, MAX_GRID_SIZE);

    removeBlocks();
    createBlocks();
}

function createBlocks() {
    for (let i = 0; i < gridSize; i += 1) {
        for (let j = 0; j < gridSize; j += 1) {
            const block = createBlock(gridSize);
            if(drawGrid) {
                toggleGridLines(block, i+1, j+1);
            }
            canvas.appendChild(block);
        }
    }
}

function createBlock() {
    const div = document.createElement("div");
    div.classList.add("block");
    div.style.width = (CANVAS_WIDTH / gridSize) + PX;
    div.style.height = (CANVAS_HEIGHT / gridSize) + PX;

    div.addEventListener("mousedown", () => useTool(div));
    div.addEventListener("mouseover", () => {
        if (mousePressed) useTool(div)
    });

    return div;
}

function toggleGridLines(block, row, column) {
    block.classList.toggle("block--defaultgrid");
    if(column % gridSize === 0) {
        block.classList.toggle("block--rightcol");
    }
    if(row / gridSize === 1) {
        block.classList.toggle("block--bottomrow");
    }
}

function removeBlocks() {
    while (canvas.childElementCount > 0) {
        canvas.removeChild(canvas.lastChild);
    }
}
