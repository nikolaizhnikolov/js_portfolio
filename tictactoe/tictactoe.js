const tictacttoe = (function () {

    /**
     * Expected CSS vars in :root
     * 
     * --p1-color: ...;
     * --p2-color: ...;
     * --p1-marker: ...;
     * --p2-marker: ...;
     * 
     * --active-color: var(--p1-color);
     * --active-marker: var(--p1-marker);        
     */

    const EMPTY = "";
    const X = "X";
    const O = "O";
    const RED = "rgba(230, 15, 76, 1)";
    const BLUE = "rgba(1, 111, 185, 1)";

    /**
     * Player object
     */
    const player = function (marker, color) {
        return { marker, color };
    }

    // /**
    //  * Player marker controller.
    //  * Automatically returns next marker to be used.
    //  */
    // const marker = (function (m1, m2) {

    //     /**
    //      * Consumes the marker as soon as it is called.
    //      * If you need to call the same marker multiple times,
    //      * store it on first call.
    //      * @returns marker for next move
    //      */
    //     const next = function () {
    //         if (p1turn) {
    //             p1turn = false;
    //             return m1;
    //         } else {
    //             p1turn = true;
    //             return m2;
    //         }
    //     };

    //     return { next };
    // })(X, O);

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
        const player1 = player(X, BLUE);
        const player2 = player(O, RED);
        let p1Turn = true;

        let gameGrid = null;

        const createGrid = function () {
            if (!gameGrid) {
                initGrid();
            } else {
                resetGrid();
            }

            return gameGrid;
        };

        const initGrid = function () {
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

        const setCellP1Props = function (cell) {
            cell.textContent = player1.marker;
            cell.classList.remove("empty");
            cell.classList.add("p1");
            document.documentElement.style.setProperty('--active-color', 'var(--p2-color)');  
            document.documentElement.style.setProperty('--active-marker', 'var(--p2-marker)');            
        }

        const setCellP2Props = function (cell) {
            cell.textContent = player2.marker;
            cell.classList.remove("empty");
            cell.classList.add("p2");
            document.documentElement.style.setProperty('--active-color', 'var(--p1-color)');  
            document.documentElement.style.setProperty('--active-marker', 'var(--p1-marker)');   
        }

        const makeMove = function (cell) {
            if (cell.textContent !== EMPTY) return;

            if(p1Turn) {
                setCellP1Props(cell);
            } else {
                setCellP2Props(cell);
            }



            // TODO let gameState = ...
            evaluateScore(cell.dataset.row, cell.dataset.col);
            // checkTie();

            //TODO if gameState ... end game
            //  output result

            p1Turn = !p1Turn;
        };

        const evaluateScore = function (row, col) {
            console.log(`Evaluating change at row: ${row} col: ${col}`);
            // check row
            // check col
            // if diag check diag
            // return true or false
        };

        return { createGrid };
    })(cellFactory);

    const gameGrid = gameManager.createGrid();

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
