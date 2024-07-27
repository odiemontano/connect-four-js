function Gameboard() {
  const rows = 6;
  const columns = 7;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }
  const getBoard = () => board;

  const dropToken = (column, player) => {
    const availableCells = board
      .filter((row) => row[column].getValue() === 0)
      .map((row) => row[column]);

    // 0, 1
    //    1  2  3  4  5  6  7
    // 1 [0, 0, 0, 0, 0, 0, 0],
    // 2 [0, 0, 0, 0, 0, 0, 0],
    // 3 [1, 0, 0, 0, 0, 0, 0],
    // 4 [2, 0, 0, 0, 0, 0, 0],
    // 5 [1, 0, 0, 0, 0, 0, 0],
    // 6 [1, 0, 0, 0, 0, 0, 0]

    if (!availableCells.length) return;
    const lowestRow = availableCells.length - 1;
    board[lowestRow][column].addToken(player);
  };

  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    );
    console.log(boardWithCellValues);
  };

  return { getBoard, dropToken, printBoard };
}

function Cell() {
  let value = 0;

  const addToken = (player) => {
    value = player;
  };

  const getValue = () => value;

  return { addToken, getValue };
}

function GameController(
  playerOneName = 'Player One',
  playerTwoName = 'Player Two'
) {
  const board = Gameboard();

  const players = [
    { name: playerOneName, token: 1 },
    { name: playerTwoName, token: 2 },
  ];

  let activePlayer = players[0];

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const playRound = (column) => {
    console.log(
      `Dropping ${getActivePlayer().name}'s token into column ${column}...`
    );
    board.dropToken(column, getActivePlayer().token);

    switchPlayerTurn();
    printNewRound();
  };

  printNewRound();

  return {
    playRound,
    getActivePlayer,
  };
}

const game = GameController();
game.playRound(0);
