import { isValid } from './validator';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const solveSudoku = async (board, updateBoard, speedRef) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;

            updateBoard([...board.map(r => [...r])], row, col, 'trial');

            const currentDelay = speedRef.current.skipMode ? 0 : speedRef.current.delay;
            if (currentDelay > 0) await sleep(currentDelay);

            if (await solveSudoku(board, updateBoard, speedRef)) return true;

            board[row][col] = 0;
            updateBoard([...board.map(r => [...r])], row, col, 'backtrack');

            const backtrackDelay = speedRef.current.skipMode ? 0 : speedRef.current.delay;
            if (backtrackDelay > 0) await sleep(backtrackDelay);
          }
        }
        return false;
      }
    }
  }
  return true;
};

export const getSolvedBoard = (initialBoard) => {
  const board = initialBoard.map(row => [...row]);

  const solve = (b) => {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (b[r][c] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValid(b, r, c, num)) {
              b[r][c] = num;
              if (solve(b)) return true;
              b[r][c] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  if (solve(board)) return board;
  return null;
};
