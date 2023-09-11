export const calculateWinner = (board) => {
  // Define the winning combinations
  const vencedores = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // linhas
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Colunas
    [0, 4, 8],
    [2, 4, 6], // Diagonais
  ];

  for (let i = 0; i < vencedores.length; i++) {
    const [a, b, c] = vencedores[i];
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return board[a];
    }
  }

  return null; // N
};

export const winnerFullBoard = (bigBoard) => {
  let winnerX = 0,
    winnerO = 0;
  for (let i = 0; i < bigBoard.length; i++) {
    if (bigBoard[i] === "X") winnerX++;
    else if (bigBoard[i] === "O") winnerO++;
  }
  if (winnerX > winnerO) return "X";
  else if (winnerO > winnerX) return "O";
  else return null;
};
