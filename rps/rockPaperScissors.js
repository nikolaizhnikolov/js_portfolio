let playerScore = 0;
let computerScore = 0;
let gameOver = false;

const GAME_OVER_TRESHOLD = 3;

const GUESSES_MAP = {
    'rock' : 0,
    'paper' : 1,
    'scissors' : 2
}

const RESULT_MAP = {
    0 : 'Draw',
    1 : 'You win this round!',
    2 : 'Computer wins this round!',
    3 : 'You won, congratulations!!!',
    4 : 'You lose, game over XXX'
}

const playerScoreElement = document.querySelector('.result_player_value');
const computerScoreElement = document.querySelector('.result_computer_value');
const lastRoundElement = document.querySelector('.lastRound');

function updateScores() {
    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;
}

function updateResult(resultValue) {
    if(resultValue >= GAME_OVER_TRESHOLD)
        gameOver = true
    lastRoundElement.textContent = RESULT_MAP[resultValue]
}

function resetGame() {
    playerScore = 0
    computerScore = 0
    gameOver = false;
    updateScores()
}

function isGuessValid(playerGuess) {
    if( typeof playerGuess === 'string' && 
        playerGuess !== undefined &&
        playerGuess.toLowerCase() in GUESSES_MAP )
            return true;
    
    return false;
}

/**
 * Generates a random number between 0 and 2 representing
 * rock, paper or scissors.
 */
function generateComputerGuess() {
    return Math.floor(Math.random() * 3);
}

/**
 * Simulates a played round of RPS using numbers.
 * Logic: if the difference is 1 or -2, then the player has picked the stronger item. 
 * 
 *      Rock = 0, Paper = 1, Scissors = 2
 * 
 *      Paper - Rock = 1
 *      Scissors - Paper = 1
 *      Rock - Scissors = -2
 * 
 */
function playRound(playerGuess) {
    // Don't play if somebody has already won
    if (gameOver) return;

    // Check validity
    if ( ! isGuessValid(playerGuess)) {
        console.log('Invalid guess! Please only use \'Rock\', \'Paper\' or \'Scissors\'.')
        return;
    } else {
        // Else set guess to numerical value
        playerGuess = GUESSES_MAP[playerGuess.toLowerCase()]
    }

    // Generate random computer guess for this round
    let computerGuess = generateComputerGuess(); 
    
    // Use numbers and calculate difference,
    // instead of comparing values individually as strings.
    let diff = playerGuess - computerGuess

    if(diff == 0){
        updateResult(0)
    } else if (diff == 1 || diff == -2) {
        playerScore++
        if(playerScore === 5) updateResult(3)
        else updateResult(1)
    } else {
        computerScore++
        if(computerScore === 5) updateResult(4)
        else updateResult(2)
    }

    updateScores();
}
