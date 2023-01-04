const tictactoe = (function () {
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
        let p = Object.create(null);
        p.marker = marker;
        p.color = color;
        return p;
    };

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
     * Use createBoard() to return an Array of HTMLElements
     * to attach to your container. The manager will automatically attach
     * onclick events to evalute game state whenever one of the cells is clicked.
     *
     */
    const gameManager = (function (cellFactory) {
        const player1 = player(X, BLUE);
        const player2 = player(O, RED);
        let p1Turn = true;

        let board = null;
        let rows = [[],[],[]];
        let cols = [[],[],[]];
        let diag = [];
        let adiag = [];

        const createBoard = function () {
            if (!board) {
                initGrid();
            } else {
                resetGrid();
            }

            return board;
        };

        const initGrid = function () {
            board = document.createElement("div");
            board.classList.add("gameGrid");

            for (let i = 0; i < 9; i++) {
                const cell = cellFactory.createCell(i);

                cell.addEventListener("click", () => makeMove(cell));

                board.appendChild(cell);

                // Add to internal representation as well.
                // This helps win evaluation later on
                rows[parseInt(i / 3)].push(cell);                
                cols[i % 3].push(cell);
                if (i % (3 + 1) === 0) diag.push(cell);
                if (i % (3 - 1) === 0 && i !== 0 && i !== 3 * 3 - 1)
                    adiag.push(cell);
            }
        };

        const resetGrid = function () {
            board.childNodes.forEach((cell) => {
                cell.textContent = EMPTY;
                cell.classList.add("empty");
            });
        };

        const setCellP1Props = function (cell) {
            cell.textContent = player1.marker;
            cell.classList.remove("empty");
            cell.classList.add("p1");
            document.documentElement.style.setProperty(
                "--active-color",
                "var(--p2-color)"
            );
            document.documentElement.style.setProperty(
                "--active-marker",
                "var(--p2-marker)"
            );
        };

        const setCellP2Props = function (cell) {
            cell.textContent = player2.marker;
            cell.classList.remove("empty");
            cell.classList.add("p2");
            document.documentElement.style.setProperty(
                "--active-color",
                "var(--p1-color)"
            );
            document.documentElement.style.setProperty(
                "--active-marker",
                "var(--p1-marker)"
            );
        };

        const makeMove = function (cell) {
            if (cell.textContent !== EMPTY) return;

            if (p1Turn) {
                setCellP1Props(cell);
            } else {
                setCellP2Props(cell);
            }

            let hasWon = evaluateScore(
                cell.dataset.row,
                cell.dataset.col,
                cell.textContent
            ); 

            //TODO:
            if(hasWon) {
                console.log("you win");
            }



            p1Turn = !p1Turn;
        };

        /**
         * Called after a move has been made.
         * Checks row, col and if applicable diag and anti-diag where the move was made.
         *
         * @param row
         * @param col
         * @returns whether the last move is a winning one
         */
        const evaluateScore = function (row, col, marker) {
            row = Number(row);
            col = Number(col);

            const rowWin = (rows[row].every((c) => c.textContent === marker));
            const colWin = (cols[col].every((c) => c.textContent === marker));
            const diagWin = (row === col) ? (diag.every((c) => c.textContent === marker)) : false;
            const adiagWin = (row + col === (3-1)) ? (adiag.every((c) => c.textContent === marker)) : false;
            
            let hasWon = rowWin || colWin || diagWin || adiagWin;

            if(!hasWon) hasWon = isDraw();
            return hasWon;
        };

        /**
         * Checks if all cells have a value when a winner is not present
         */
        const isDraw = function() {
            return false;
            // return gameGrid.every((c) => c.textContent !== EMPTY);
        }

        return { createBoard };
    })(cellFactory);

    return { createBoard: gameManager.createBoard };
})();

const board = tictactoe.createBoard();

const content = document.querySelector(".content");
if (content) {
    content.appendChild(board);
} else {
    throw ReferenceError(
        "Container with class '.content' not found! \n Cannot append game grid."
    );
}
