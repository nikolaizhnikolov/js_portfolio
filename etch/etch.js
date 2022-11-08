const content = document.querySelector(".content");
const resizeButton = document.querySelector(".resizeButton");

resizeButton.addEventListener('click', () => {
    resizeGrid(prompt("New Grid Size:"));
})

function paint(event) {
    console.log(event.srcElement.classList.add("block__hover"));
}

function removeBlocks() {
    while(content.childElementCount > 0) {
        content.removeChild(content.lastChild);
    }
}

function createBlock() {
    const div = document.createElement("div");
    div.classList.add("block");
    div.addEventListener('mouseenter', paint);
    return div;
}

function createBlocks(gridSize) {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            content.appendChild(createBlock());
        }
    }
}

function resizeGrid(gridSize) {
    if(gridSize === null) return;

    removeBlocks();
    createBlocks(gridSize);    
}

resizeGrid(16);