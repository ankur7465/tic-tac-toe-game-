document.addEventListener('DOMContentLoaded', function() {
    const cells = document.querySelectorAll('.cell');
    const message = document.getElementById('message');
    const resetButton = document.getElementById('reset');
    const resultContainer = document.getElementById('result-container');
    const resultMessage = document.getElementById('result');
    const newGameButton = document.getElementById('new-game-btn');

    let currentPlayer = 'X';
    let isGameActive = true;
    let board = ['', '', '', '', '', '', '', '', ''];

    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    const checkWinner = () => {
        for (let combo of winningCombos) {
            const [a, b, c] = combo;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        if (board.every(cell => cell !== '')) {
            return 'draw';
        }
        return null;
    };

    const handleCellClick = (index) => {
        if (!isGameActive || board[index] !== '') return;

        board[index] = currentPlayer;
        cells[index].innerText = currentPlayer;
        cells[index].classList.add(currentPlayer);

        const winner = checkWinner();
        if (winner) {
            isGameActive = false;
            if (winner === 'draw') {
                showResult('It\'s a draw!');
            } else {
                showResult(`Player ${winner} wins!`);
            }
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message.innerText = `Player ${currentPlayer}'s turn`;
        }
    };

    const handleReset = () => {
        currentPlayer = 'X';
        isGameActive = true;
        board = ['', '', '', '', '', '', '', '', ''];
        message.innerText = `Player ${currentPlayer}'s turn`;
        cells.forEach(cell => {
            cell.innerText = '';
            cell.classList.remove('X', 'O');
        });
        resultContainer.style.display = 'none';
    };

    const showResult = (text) => {
        resultMessage.innerText = text;
        resultContainer.style.display = 'flex';
    };

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleCellClick(index));
    });

    resetButton.addEventListener('click', handleReset);
    newGameButton.addEventListener('click', handleReset);
});
