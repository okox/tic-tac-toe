import { useState } from "react";

function TicTacToe() {
  // Easier in the format of an array of 9 elements than a 3x3 matrix
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (index: number) => {
    const newBoard = board.slice();
    // Do nothing if there is a winner or the square is already filled
    if (calculateWinner(board) || board[index]) {
      return;
    }
    // Fill cell
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  // Render a square with the value of the board at the given index
  const renderSquare = (index: number) => {
    return (
      <button
        className="w-20 h-20 bg-white text-blue-400 font-bold text-4xl flex items-center justify-center"
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </button>
    );
  };

  // Restart the game by setting the board to an empty array and setting the first player to X to be consistent
  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const winner = calculateWinner(board);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (board.every(square => square !== null)) {
    status = 'Draw!';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className="text-center">
      <div className="mb-4 text-2xl">{status}</div>
      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-2">
          {board.map((_, index) => renderSquare(index))}
        </div>
      </div>
      <button
        onClick={handleRestart}
        className="mt-4 px-4 py-2 bg-blue-500 text-white font-bold rounded"
      >
        Restart
      </button>
    </div>
  );
}

// Outside the component because it is a pure function that does not need state or props
const calculateWinner = (squares: Array<string | null>) => {
  // Possible wining lines - check if there is a line with the same value
  // Could be done recusrively but this is easier for a fixed size board
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default TicTacToe;
