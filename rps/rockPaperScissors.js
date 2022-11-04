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
    1 : 'You win this round, pure luck!',
    2 : 'Haha, I won, my skill is immense!',
    3 : 'What, you won, impossible!!!',
    4 : 'You lose, just as I planned!'
}

const TURQUOISE = 'turquoise'
const WHITE = 'white'
const ORANGE = 'orange'

const playerScoreElement = document.querySelector('.result_player_value');
const computerScoreElement = document.querySelector('.result_computer_value');
const lastRoundElement = document.querySelector('.lastRound');

const playerScoreBlock = document.querySelector('.playerScoreBlock');
const computerScoreBlock = document.querySelector('.computerScoreBlock');

const content = document.querySelector('.content');
const newGameButton = document.createElement('button');
newGameButton.textContent = 'NEW GAME'
newGameButton.classList.add('newGameButton')
newGameButton.classList.add('text')
newGameButton.addEventListener('click', resetGame)

function updateScoreBlock() {
    playerScoreBlock.children[value].style['background'] = TURQUOISE
    computerScoreBlock.children[value].style['background'] = ORANGE
}

function resetScoreBlock() {
    for(let i = 0; i < 5; i++) {
        playerScoreBlock.children[i].style['background'] = WHITE
        computerScoreBlock.children[i].style['background'] = WHITE
    }
}

function updateScores() {
    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;
}

function updateResult(resultValue) {
    if(resultValue >= GAME_OVER_TRESHOLD) {
        gameOver = true;
        content.append(newGameButton);
    }

    lastRoundElement.textContent = RESULT_MAP[resultValue];
}

function resetGame() {
    gameOver = false;
    playerScore = 0;
    computerScore = 0;
    lastRoundElement.textContent = '';
    content.removeChild(newGameButton);
    updateScores();
    resetScoreBlock();
}

/**
 * Checks whether player input is valid.
 * Technically not needed after using GUI
 */
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
function generateGuess() {
    return Math.floor(Math.random() * 3);
}

function incrementPlayerScore() {
    playerScore++
}

function incrementComputerScore() {
    computerScore++
}

function drawRound() {
    updateResult(0)
}

function winRound() {
    incrementPlayerScore();

    if(playerScore === 5) updateResult(3)
    else updateResult(1)
}

function loseRound() {
    incrementComputerScore();

    if(computerScore === 5) updateResult(4)
    else updateResult(2)
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
    let computerGuess = generateGuess(); 
    
    // Use numbers and calculate difference,
    // instead of comparing values individually as strings.
    const difference = playerGuess - computerGuess

    // Increment scores and update GUI accordingly
    if(difference == 0){
        drawRound()
    } else if (difference == 1 || difference == -2) {
        winRound()
    } else {
        loseRound()
    }

    updateScores();
}
