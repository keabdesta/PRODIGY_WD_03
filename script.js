const board = document.getElementById('game-board');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset-btn');
const playWithFriendButton = document.getElementById('play-with-friend');
const playWithAIButton = document.getElementById('play-with-ai');

let gameActive = true;
let currentPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", "", ""]; // Array to hold the game state
let mode = '';

function createBoard() {
    gameState = ["", "", "", "", "", "", "", "", ""]; // Reset game state
    board.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.setAttribute('data-index', i);
        square.addEventListener('click', handleSquareClick);
        board.appendChild(square);
    }
    statusDisplay.innerText = `Current Player: ${currentPlayer}`;
}

function handleSquareClick(event) {
    const clickedSquare = event.target;
    const clickedSquareIndex = clickedSquare.getAttribute('data-index');

    if (gameState[clickedSquareIndex] !== "" || !gameActive) {
        return;
    }

    gameState[clickedSquareIndex] = currentPlayer;
    clickedSquare.innerText = currentPlayer;

    checkWinner();

    if (mode === 'AI' && gameActive) {
        setTimeout(aiTurn, 500);
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerText = `Current Player: ${currentPlayer}`;
}

function checkWinner() {
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
        [0, 4, 8], [2, 4, 6] // Diagonal
    ];

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] === "" || gameState[b] === "" || gameState[c] === "") {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            const winner = gameState[a];
            const loser = winner === 'X' ? 'O' : 'X';
            statusDisplay.innerText = `Player ${winner} won and Player ${loser} lost!`;
            gameActive = false;
            return;
        }
    }

    if (!gameState.includes("")) {
        statusDisplay.innerText = "It's a Draw!";
        gameActive = false;
    }
}

function aiTurn() {
    let emptyIndices = gameState.map((val, index) => val === "" ? index : null).filter(val => val !== null);
    if (emptyIndices.length > 0) {
        const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        gameState[randomIndex] = currentPlayer;
        document.querySelector(`[data-index="${randomIndex}"]`).innerText = currentPlayer;
        checkWinner();
        currentPlayer = 'X';
        statusDisplay.innerText = `Current Player: ${currentPlayer}`;
    }
}

function resetGame() {
    createBoard();
    gameActive = true;
    currentPlayer = 'X';
    statusDisplay.innerText = `Current Player: ${currentPlayer}`;
}

playWithFriendButton.addEventListener('click', () => {
    mode = 'friend';
    resetGame();
});

playWithAIButton.addEventListener('click', () => {
    mode = 'AI';
    resetGame();
});

resetButton.addEventListener('click', resetGame);

createBoard(); // Initialize the game
