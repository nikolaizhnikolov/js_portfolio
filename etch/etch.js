const content = document.querySelector(".content");
const GRID_SIZE = 16;

function createBlocks() {

    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            const div = document.createElement("div");
            div.classList.add("block");
            div.textContent = GRID_SIZE * i + j + 1;
            // div.style.gridRow = i+1;
            // div.style.gridColumn = j+1;
            content.appendChild(div);
        }
    }
}

createBlocks();