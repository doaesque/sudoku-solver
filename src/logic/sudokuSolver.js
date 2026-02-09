import { isValid } from './validator'

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * STRATEGI NAIVE (LINEAR SEARCH):
 * Mencari sel kosong secara berurutan dari kiri atas ke kanan bawah.
 * Ini adalah pendekatan klasik Backtracking yang paling mudah divisualisasikan.
 */
const findEmptyCell = (board) => {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === 0) {
        return { r, c } // Kembalikan koordinat sel kosong pertama yang ketemu
      }
    }
  }
  return null // Tidak ada sel kosong (Solved)
}

// Algoritma Backtracking Murni (Naive)
export const solveSudoku = async (board, updateBoard, speedRef, stats = { iterations: 0 }) => {
  // 1. Cari kotak kosong pertama (Urut baris & kolom)
  const emptyCell = findEmptyCell(board)

  // BASIS REKURSI: Jika tidak ada sel kosong, berarti SELESAI!
  if (!emptyCell) return true

  const { r, c } = emptyCell

  // 2. Coba isi dengan angka 1-9 (Sekuens Keputusan)
  for (let num = 1; num <= 9; num++) {
    // Constraint Checking (Cek apakah angka boleh ditaruh di sini)
    if (isValid(board, r, c, num)) {
      
      stats.iterations++

      // AKSI: Tulis angka (Trial - Warna Biru/Ungu)
      board[r][c] = num
      
      // VISUALISASI (Hanya jika tidak di-skip)
      const isSkip = speedRef.current.skipMode
      if (!isSkip) {
         updateBoard([...board.map(row => [...row])], r, c, 'trial')
         const currentDelay = speedRef.current.delay
         // Jika delay 0 (max speed), kita tidak pakai sleep agar ngebut
         if (currentDelay > 0) await sleep(currentDelay)
      }

      // REKURSI: Panggil diri sendiri untuk mengisi kotak berikutnya
      if (await solveSudoku(board, updateBoard, speedRef, stats)) return true

      // BACKTRACKING: Jalan buntu! Hapus angka & Mundur (Warna Merah)
      board[r][c] = 0
      
      if (!isSkip) {
        updateBoard([...board.map(row => [...row])], r, c, 'backtrack')
        const backtrackDelay = speedRef.current.delay
        if (backtrackDelay > 0) await sleep(backtrackDelay)
      }
    }
  }
  
  // Jika angka 1-9 tidak ada yang cocok, kembalikan false (Memicu backtrack di level atasnya)
  return false
}

// Fungsi Helper untuk mendapatkan Kunci Jawaban (Logic yang sama)
export const getSolvedBoard = (initialBoard) => {
  const board = initialBoard.map(row => [...row])

  const solveHelper = (b) => {
    const emptyCell = findEmptyCell(b)
    if (!emptyCell) return true

    const { r, c } = emptyCell

    for (let num = 1; num <= 9; num++) {
      if (isValid(b, r, c, num)) {
        b[r][c] = num
        if (solveHelper(b)) return true
        b[r][c] = 0
      }
    }
    return false
  }

  if (solveHelper(board)) return board
  return null
}
