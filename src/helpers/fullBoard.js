export const boardIsFull = (board) => {
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) return false;
  }
  return true;
};
