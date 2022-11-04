const RESULT_MAP = {
    'RoundDraw' : "Draw",
    'RoundWin' : "You win this round, pure luck!",
    'RoundLose' : "Haha, I won, my skill is immense!",
    'GameWin' : "What, you won, impossible!!!",
    'GameLose' : "You lose, just as I planned!"
};

const GAME_OVER_TRESHOLD = 3;

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
newGameButton.textContent = "NEW GAME"
newGameButton.classList.add("newGameButton")
newGameButton.classList.add("text")
newGameButton.addEventListener("click", resetGame)

function updatePlayerScoreBlock(index) {
    playerScoreBlock.children[index].style["background"] = TURQUOISE
}

function updateComputerScoreBlock(index) {
    computerScoreBlock.children[index].style["background"] = ORANGE
}

function resetScoreBlock() {
    for(let i = 0; i < 5; i++) {
        playerScoreBlock.children[i].style["background"] = WHITE
        computerScoreBlock.children[i].style["background"] = WHITE
    }
}

function updateScoreTextValues() {
    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;
}

function updateTextResult(resultValue) {
    if(resultValue >= GAME_OVER_TRESHOLD) {
        content.append(newGameButton);
    }

    lastRoundElement.textContent = RESULT_MAP[resultValue];
}

function resetVisualElements() {
    lastRoundElement.textContent = '';
    content.removeChild(newGameButton);
    updateScores();
    resetScoreBlock();
}

module.exports = {

}