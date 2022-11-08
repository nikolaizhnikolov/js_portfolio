const content = document.querySelector(".content");
const resizeButton = document.querySelector(".resizeButton");

const OPACITY_STEP = 0.2;

resizeButton.addEventListener('click', () => {
    resizeGrid(prompt("New Grid Size:"));
})

function resizeGrid(gridSize) {
    if(gridSize === null) return;

    removeBlocks();
    createBlocks(gridSize);    
}

function createBlocks(gridSize) {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            content.appendChild(createBlock());
        }
    }
}

function createBlock() {
    const div = document.createElement("div");
    div.classList.add("block");
    div.addEventListener('mouseenter', () => {
        div.style.opacity = Number(div.style.opacity) + OPACITY_STEP;
    });
    return div;
}

function removeBlocks() {
    while(content.childElementCount > 0) {
        content.removeChild(content.lastChild);
    }
}

resizeGrid(16);