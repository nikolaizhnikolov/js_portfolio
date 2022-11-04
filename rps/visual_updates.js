const RESULT_MAP = {
    "RoundDraw" : "Draw",
    "RoundWon" : "You win this round, pure luck!",
    "RoundLost" : "Haha, I won, my skill is immense!",
    "GameWon" : "What, you won, impossible!!!",
    "GameLost" : "You lose, just as I planned!"
};

const RESULT_MAP_TRESHOLD = 3;

const TURQUOISE = "turquoise";
const WHITE = "white";
const ORANGE = "orange";

const playerScoreBlock = document.querySelector(".playerScoreBlock");
const computerScoreBlock = document.querySelector(".computerScoreBlock");
const playerScoreElement = document.querySelector(".result_player_value");
const computerScoreElement = document.querySelector(".result_computer_value");
const lastRoundElement = document.querySelector(".lastRound");

const content = document.querySelector(".content");
const newGameButton = document.createElement("button");
newGameButton.textContent = "NEW GAME";
newGameButton.classList.add("newGameButton");
newGameButton.classList.add("text");
newGameButton.addEventListener("click", resetGame);

/**
 * Single point of access between logic and interface layer.
 * Supply the result of the last round
 * In effect, we iteratively change visual elements.
 *
 * @param {Result of last round} result - can be 'player', 'computer' or 'draw'
 */
function updateVisualElements(result) {
    let textResult = "";
    if(result === "player") {
        updatePlayerScoreBlock(playerScore-1);
        if(playerScore === 5) {
            textResult = "GameWon";
        } else {
            textResult = "RoundWon";
        }
    } else if (result === "computer"){
        updateComputerScoreBlock(computerScore-1);
        if(computerScore === 5) {
            textResult = "GameLost";
        } else {
            textResult = "RoundLost";
        }
    } else {
        textResult = "RoundDraw";
    }
    updateScoreNumbers();
    updateScoreTextResult(textResult);
}

/**
 * Resets all visual elements to a blank game state.
 */
function resetVisualElements() {
    resetScoreBlock();
    updateScoreNumbers();
    lastRoundElement.textContent = "";
    content.removeChild(newGameButton);
}

function updatePlayerScoreBlock(index) {
    playerScoreBlock.children[index].style.background = TURQUOISE;
}

function updateComputerScoreBlock(index) {
    computerScoreBlock.children[index].style.background = ORANGE;
}

function resetScoreBlock() {
    for(let i = 0; i < 5; i++) {
        playerScoreBlock.children[i].style.background = WHITE;
        computerScoreBlock.children[i].style.background = WHITE;
    }
}

function updateScoreNumbers() {
    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;
}

function updateScoreTextResult(resultValue) {
    if(resultValue === "GameWon" || resultValue === "GameLost") {
        content.appendChild(newGameButton);
    }
    lastRoundElement.textContent = RESULT_MAP[resultValue];
}
