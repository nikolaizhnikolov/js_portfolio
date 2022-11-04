// const visual = require("./visual_updates");

let playerScore = 0;
let computerScore = 0;
let gameOver = false;

const GAME_OVER_TRESHOLD = 5;

const GUESSES_MAP = {
    "rock" : 0,
    "paper" : 1,
    "scissors" : 2
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    gameOver = false;
}

/**
 * Checks whether player input is valid.
 * Technically not needed after using GUI
 */
function isGuessValid(playerGuess) {
    if( typeof playerGuess === "string" &&
        playerGuess !== undefined &&
        playerGuess.toLowerCase() in GUESSES_MAP ){
            return true;
        }

    return false;
}

/**
 * Generates a random number between 0 and 2 representing
 * rock, paper or scissors.
 */
function generateGuess() {
    return Math.floor(Math.random() * 3);
}

function incrementPlayerScore() {
    playerScore++;
}

function incrementComputerScore() {
    computerScore++;
}

function drawRound() {
    // updateResult(0)
    console.log("Draw");
}

function winRound() {
    incrementPlayerScore();
    console.log("win");
}

function loseRound() {
    incrementComputerScore();
    console.log("lose");
}

function evaluteGameState() {
    if(playerScore === GAME_OVER_TRESHOLD) {
        // Update visual elements
        gameOver = true;
    }
    else if(computerScore === GAME_OVER_TRESHOLD) {
        // Update visual elements
        gameOver = true;
    }
}

/**
 * Simulates a played round of RPS using numbers.
 * Logic: if the difference is 1 or -2,
 * then the player has picked the stronger item.
 *
 *      Rock = 0, Paper = 1, Scissors = 2
 *
 *      Paper - Rock = 1
 *      Scissors - Paper = 1
 *      Rock - Scissors = -2
 *
 */
function playRound(playerGuess) {
    // Don"t play if somebody has already won
    if (gameOver) return;

    // Check validity
    if ( ! isGuessValid(playerGuess)) {
        console.log("Invalid guess! Please only use \"Rock\", \"Paper\" or \"Scissors\".")
        return;
    } else {
        // Else set guess to numerical value
        playerGuess = GUESSES_MAP[playerGuess.toLowerCase()]
    }

    // Generate random computer guess for this round
    const computerGuess = generateGuess();

    // Use numbers and calculate difference,
    // instead of comparing values individually as strings.
    const difference = playerGuess - computerGuess;

    // Increment scores and update GUI accordingly
    if(difference == 0){
        drawRound();
    } else if (difference == 1 || difference == -2) {
        winRound();
    } else {
        loseRound();
    }

    evaluteGameState();
}
