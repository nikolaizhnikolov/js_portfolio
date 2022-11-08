const content = document.querySelector(".content");
const GRID_SIZE = 16;

function paint(event) {
    console.log(event.srcElement.classList.add("block__hover"));
}

function createBlocks() {

    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            const div = document.createElement("div");
            div.textContent = GRID_SIZE * i + j + 1;
            div.classList.add("block");
            div.addEventListener('mouseenter', paint);
            content.appendChild(div);
        }
    }
}

createBlocks();