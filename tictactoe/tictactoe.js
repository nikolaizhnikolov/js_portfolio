const tictacttoe = (function () {
    const EMPTY = "";
    const X = "X";
    const O = "O";

    const cellFactory = (function () {
        const createCell = function () {
            const cell = document.createElement("div");
            cell.textContent = EMPTY;
            cell.classList.add("cell");
            cell.classList.add("empty");
            return cell;
        };

        return { createCell };
    })();

    /**
     * Manager for playing Tic Tac Toe.
     *
     * Use createGrid() to return an Array of HTMLElements
     * to attach to your container. The manager will automatically attach 
     * onclick events to evalute game state whenever one of the cells is clicked.
     *
     */
    const gameManager = (function (cellFactory) {
        const gameGrid = [[], [], []];
        const createGrid = function () {
            const gameGridElement = document.createElement("div");
            gameGridElement.classList.add("gameGrid")
            for (let counter = 0; counter < 9; counter++) {
                const cell = cellFactory.createCell();
                // cell add data - row
                // cell add data - col
                // cell.onclick evaluate score (row, col)
                gameGrid[parseInt(counter / 3)].push(EMPTY);
                gameGridElement.appendChild(cell);
            }

            // Create html nodes to return
            return gameGridElement;
        };

        const evaluateScore = function (row, col) {
            // check row
            // check col
            // if diag check diag
            // return true or false
        };

        return { createGrid };
    })(cellFactory);

    const gameGrid = gameManager.createGrid();

    const content = document.querySelector(".content");
    content.appendChild(gameGrid);

    return {gameGrid, cellFactory, gameManager };
})();
