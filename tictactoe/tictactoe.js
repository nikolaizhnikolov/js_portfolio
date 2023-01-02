const tictacttoe = (function () {
    const EMPTY = "";
    const X = "X";
    const O = "O";

    /**
     * Player marker controller.
     * Automatically returns next marker to be used.
     */
    const marker = (function (m1, m2) {
        let p1turn = true;

        /**
         * Consumes the marker as soon as it is called.
         * If you need to call the same marker multiple times,
         * store it on first call.
         * @returns marker for next move
         */
        const next = function () {
            if (p1turn) {
                p1turn = false;
                return m1;
            } else {
                p1turn = true;
                return m2;
            }
        };

        return { next };
    })(X, O);

    /**
     * Naive implementation of a cell factory.
     * Assumes a 3x3 grid.
     */
    const cellFactory = (function () {
        const createCell = function (index) {
            const cell = document.createElement("div");
            const row = parseInt(index / 3);
            const col = index % 3;

            cell.className = "cell empty";
            cell.textContent = EMPTY;
            cell.dataset.row = row;
            cell.dataset.col = col;

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
        let gameGrid = null;

        const initGrid = function () {
            if (!gameGrid) {
                createGrid();
            } else {
                resetGrid();
            }

            return gameGrid;
        };

        const createGrid = function () {
            gameGrid = document.createElement("div");
            gameGrid.classList.add("gameGrid");

            for (let index = 0; index < 9; index++) {
                const cell = cellFactory.createCell(index);

                cell.addEventListener("click", () => makeMove(cell));

                gameGrid.appendChild(cell);
            }
        };

        const resetGrid = function () {
            gameGrid.childNodes.forEach((cell) => {
                cell.textContent = EMPTY;
                cell.classList.add("empty");
            });
        };

        const makeMove = function (cell) {
            if (cell.textContent !== EMPTY) return;

            const mark = marker.next();
            cell.textContent = mark;
            cell.classList.remove("empty");
            // if cell not empty - return
            // else do stuff without the else lol
            //  change text value
            //  game result =
            //      evaluateScore(row, col);
            //      check tie
            //  output result if game end
            // else return
        };

        const evaluateScore = function (row, col) {
            console.log(`Evaluating change at row: ${row} col: ${col}`);
            // check row
            // check col
            // if diag check diag
            // return true or false
        };

        return { initGrid };
    })(cellFactory);

    const gameGrid = gameManager.initGrid();

    const content = document.querySelector(".content");
    if (content) {
        content.appendChild(gameGrid);
    } else {
        throw ReferenceError(
            "Container with class '.content' not found! \n Cannot append game grid."
        );
    }

    return { gameGrid, cellFactory, gameManager };
})();
