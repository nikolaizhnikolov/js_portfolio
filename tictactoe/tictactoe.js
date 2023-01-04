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
     * Assumes a 3x3 game board.
     */
    const cellFactory = (function () {
        const factory = Object.create(null);

        factory.boardSize = 3;

        factory.createCell = function (index) {
            const cell = document.createElement("div");
            const row = parseInt(index / factory.boardSize);
            const col = index % factory.boardSize;

            cell.className = "cell empty";
            cell.textContent = EMPTY;
            cell.dataset.row = row;
            cell.dataset.col = col;

            return cell;
        };

        factory.setBoardSize = function (size) {
            factory.boardSize = size;
        };

        return factory;
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
        let boardSize = 3;
        let rows = [];
        let cols = [];
        let diag = [];
        let adiag = [];

        const createBoard = function (size) {
            if (boardSize !== size) {
                boardSize = size;
                cellFactory.setBoardSize(boardSize);
                document.documentElement.style.setProperty(
                    "--board-size",
                    boardSize
                );
            }

            if (!board) {
                initBoard();
            } else {
                resetBoard();
            }

            return board;
        };

        const initBoard = function () {
            board = document.createElement("div");
            board.classList.add("board");

            for (let i = 0; i < boardSize; i++) {
                rows.push([]);
                cols.push([]);
            }

            for (let i = 0; i < boardSize * boardSize; i++) {
                const cell = cellFactory.createCell(i);

                cell.addEventListener("click", () => makeMove(cell));

                board.appendChild(cell);

                // Add to internal representation as well.
                // This helps win evaluation later on
                rows[parseInt(i / boardSize)].push(cell);
                cols[i % boardSize].push(cell);
                if (i % (boardSize + 1) === 0) diag.push(cell);
                if (
                    i % (boardSize - 1) === 0 &&
                    i !== 0 &&
                    i !== boardSize * boardSize - 1
                )
                    adiag.push(cell);
            }
        };

        const resetBoard = function () {
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

            let gameState = evaluateScore(
                cell.dataset.row,
                cell.dataset.col,
                cell.textContent
            );

            if (gameState === 1) {
                console.log(
                    `${p1Turn ? player1.marker : player2.marker} has won!`
                );
            } else if (gameState === -1) {
                console.log("draw");
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

            const rowWin = rows[row].every((c) => c.textContent === marker);
            const colWin = cols[col].every((c) => c.textContent === marker);
            const diagWin =
                row === col
                    ? diag.every((c) => c.textContent === marker)
                    : false;
            const adiagWin =
                row + col === boardSize - 1
                    ? adiag.every((c) => c.textContent === marker)
                    : false;

            let hasWon = rowWin || colWin || diagWin || adiagWin;

            if (hasWon) {
                return 1;
            } else if (isDraw()) {
                return -1;
            } else {
                return hasWon;
            }
        };

        /**
         * Checks if all cells have a value when a winner is not present
         */
        const isDraw = function () {
            return [...board.children].every((c) => c.textContent !== EMPTY);
        };

        return { createBoard };
    })(cellFactory);

    return { createBoard: gameManager.createBoard };
})();

const board = tictactoe.createBoard(3);

const content = document.querySelector(".content");
if (content) {
    content.appendChild(board);
} else {
    throw ReferenceError(
        "Container with class '.content' not found! \n Cannot append game board."
    );
}
