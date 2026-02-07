export const isValid = (board, row, col, num) => {
  for (let i = 0; i < 9; i++) {
    // Cek Baris
    if (board[row][i] === num) return false;
    
    // Cek Kolom
    if (board[i][col] === num) return false;
    
    // Cek Sub-grid 3x3
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    if (board[boxRow + Math.floor(i / 3)][boxCol + (i % 3)] === num) return false;
  }
  return true;
};
