const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const result = document.querySelector('.result');
const reset = document.querySelector('.reset');
const playerOne = document.querySelector('.player-one');
const playerTwo = document.querySelector('.player-two');

let currentPlayer = 'X';

const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const checkWin = () => {
  for (let i = 0; i < winCombos.length; i++) {
    const [a, b, c] = winCombos[i];
    if (cells[a].textContent === currentPlayer &&
        cells[b].textContent === currentPlayer &&
        cells[c].textContent === currentPlayer) {
      result.textContent = `${currentPlayer} a gagné !`;
      board.classList.add('game-over');
      board.removeEventListener('click', handleClick);
      return true;
    }
  }
  if (Array.from(cells).every(cell => cell.textContent !== '')) {
    result.textContent = `Match nul !`;
    board.removeEventListener('click', handleClick);
    return true;
  }
  return false;
};

const switchPlayer = () => {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  board.classList.toggle('player-one');
  board.classList.toggle('player-two');
};

const handleClick = (event) => {
  const cell = event.target;
  if (cell.textContent === '') {
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer === 'X' ? 'x' : 'o');
    if (!checkWin()) {
      switchPlayer();
    }
  }
};

const handleReset = () => {
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = '';
    cells[i].classList.remove('x', 'o');
  }
  result.textContent = '';
  board.classList.remove('game-over');
  board.addEventListener('click', handleClick);
  currentPlayer = 'X';
  board.classList.add('player-one');
  board.classList.remove('player-two');
};

board.addEventListener('click', handleClick);
reset.addEventListener('click', handleReset);
board.classList.add('player-one');
