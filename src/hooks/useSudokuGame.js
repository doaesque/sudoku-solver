import { useState, useRef, useEffect } from 'react'
import { solveSudoku, getSolvedBoard } from '../logic/sudokuSolver'
import { isValid } from '../logic/validator'
import { SAMPLES } from '../data/samples'

export const useSudokuGame = () => {
  const [board, setBoard] = useState(Array(9).fill().map(() => Array(9).fill(0)))
  const [cellStatus, setCellStatus] = useState(Array(9).fill().map(() => Array(9).fill('')))
  const [initialBoard, setInitialBoard] = useState(null)
  const [solutionKey, setSolutionKey] = useState(null)
  const [panelMsg, setPanelMsg] = useState("Pilih level untuk memulai permainan!")
  const [activeCell, setActiveCell] = useState(null)

  const [candidates, setCandidates] = useState(Array(9).fill().map(() => Array(9).fill([])))
  const [isHintActive, setIsHintActive] = useState(false)

  const [isSolving, setIsSolving] = useState(false)
  const [speed, setSpeed] = useState(50)

  const speedRef = useRef({ delay: 50, skipMode: false })

  useEffect(() => {
    speedRef.current.delay = speed
  }, [speed])

  const calculateAllCandidates = (currentBoard) => {
    const newCandidates = Array(9).fill().map(() => Array(9).fill([]))
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (currentBoard[r][c] === 0) {
          const possibleNums = []
          for (let num = 1; num <= 9; num++) {
            if (isValid(currentBoard, r, c, num)) possibleNums.push(num)
          }
          newCandidates[r][c] = possibleNums
        }
      }
    }
    return newCandidates
  }

  const handleLevel = (lv) => {
    if (isSolving) return

    const puzzles = SAMPLES[lv]
    const randomIndex = Math.floor(Math.random() * puzzles.length)
    const chosenPuzzle = puzzles[randomIndex]

    const newBoard = chosenPuzzle.map(r => [...r])
    setBoard(newBoard)
    setInitialBoard(newBoard.map(r => [...r]))

    setCandidates(Array(9).fill().map(() => Array(9).fill([])))
    setIsHintActive(false)

    const solved = getSolvedBoard(newBoard)
    setSolutionKey(solved)

    setCellStatus(newBoard.map(r => r.map(c => c !== 0 ? 'fixed' : '')))
    setPanelMsg(`Mode ${lv.toUpperCase()} (Soal #${randomIndex + 1}) siap!`)
    setSpeed(50)
    setActiveCell(null)
  }

  const handleSkip = () => {
    speedRef.current.skipMode = true
    setSpeed(0)
  }

  const handleSolve = async () => {
    if (isSolving) return
    setCandidates(Array(9).fill().map(() => Array(9).fill([])))
    setIsHintActive(false)

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] !== 0 && cellStatus[r][c] !== 'fixed') {
          const val = board[r][c]

          const tempBoard = board.map(row => [...row])
          tempBoard[r][c] = 0

          if (!isValid(tempBoard, r, c, val)) {
            setPanelMsg(`⚠️ Input salah di baris ${r+1} kolom ${c+1}! Perbaiki dulu.`)
            const ns = [...cellStatus]
            ns[r][c] = 'error'
            setCellStatus(ns)
            return
          }
        }
      }
    }

    setIsSolving(true)
    setPanelMsg("🔍 Mencari solusi...")
    speedRef.current.skipMode = false

    const cleanStatus = cellStatus.map(row => row.map(s => s === 'error' ? '' : s))
    setCellStatus(cleanStatus)

    const boardToSolve = board.map(r => [...r])

    const updateVisual = (nb, r, c, status) => {
      setBoard(nb)
      setCellStatus(prev => {
        const ns = [...prev.map(row => [...row])]
        ns[r][c] = status
        return ns
      })
    }

    const solved = await solveSudoku(boardToSolve, updateVisual, speedRef)

    setIsSolving(false)
    setPanelMsg(solved ? "Selesai! 🎉" : "Tidak ada solusi dari posisi ini.")
  }

  const handleSolveCell = () => {
    if (isSolving) return
    if (!solutionKey) {
      setPanelMsg("⚠️ Pilih level dulu!")
      return
    }
    if (!activeCell) {
      setPanelMsg("⚠️ Klik kotak yang mau diisi!")
      return
    }

    const { r, c } = activeCell
    if (cellStatus[r][c] === 'fixed') {
      setPanelMsg("⛔ Ini angka soal!")
      return
    }

    const answer = solutionKey[r][c]
    const newBoard = [...board]
    newBoard[r][c] = answer
    setBoard(newBoard)

    const newStatus = [...cellStatus]
    newStatus[r][c] = 'trial'
    setCellStatus(newStatus)
    setPanelMsg(`✨ Jawabannya: ${answer}`)

    if (isHintActive) {
      setCandidates(calculateAllCandidates(newBoard))
    }
  }

  const handleHint = () => {
    if (isSolving) return
    if (!initialBoard) {
      setPanelMsg("⚠️ Pilih level dulu!")
      return
    }

    if (isHintActive) {
      setIsHintActive(false)
      setCandidates(Array(9).fill().map(() => Array(9).fill([])))
      setPanelMsg("Pencil marks disembunyikan.")
    } else {
      setIsHintActive(true)
      setCandidates(calculateAllCandidates(board))
      setPanelMsg("📝 Pencil marks ditampilkan!")
    }
  }

  const handleCheck = () => {
    if (isSolving) return
    let errorCount = 0
    const newStatus = cellStatus.map(row => [...row])

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] !== 0 && cellStatus[r][c] !== 'fixed') {
          if (solutionKey) {
            if (board[r][c] !== solutionKey[r][c]) {
              newStatus[r][c] = 'error'
              errorCount++
            } else if (newStatus[r][c] === 'error') {
              newStatus[r][c] = 'user-filled'
            }
          } else {
            const val = board[r][c]
            const tempBoard = board.map(row => [...row])
            tempBoard[r][c] = 0

            if (!isValid(tempBoard, r, c, val)) {
              newStatus[r][c] = 'error'
              errorCount++
            } else if (newStatus[r][c] === 'error') {
              newStatus[r][c] = 'user-filled'
            }
          }
        }
      }
    }
    setCellStatus(newStatus)
    setPanelMsg(errorCount > 0 ? `⚠️ Ada ${errorCount} kesalahan!` : "✅ Aman terkendali!")
  }

  const handleReset = () => {
    if (isSolving) return
    setBoard(Array(9).fill().map(() => Array(9).fill(0)))
    setCellStatus(Array(9).fill().map(() => Array(9).fill('')))
    setInitialBoard(null)
    setSolutionKey(null)
    setIsHintActive(false)
    setCandidates(Array(9).fill().map(() => Array(9).fill([])))
    setPanelMsg("Papan dibersihkan total. Silakan pilih level lagi.")
  }

  const handleInputChange = (e, r, c) => {
    if (isSolving) return
    if (cellStatus[r][c] === 'error' || cellStatus[r][c] === 'trial' || cellStatus[r][c] === '') {
      const ns = [...cellStatus]
      ns[r][c] = 'user-filled'
      setCellStatus(ns)
    }

    const val = e.target.value
    if (val === '' || (/^[1-9]$/.test(val) && val.length === 1)) {
      const num = val === '' ? 0 : parseInt(val)
      const newBoard = [...board]
      newBoard[r][c] = num
      setBoard(newBoard)

      if (isHintActive) {
        setCandidates(calculateAllCandidates(newBoard))
      }
    }
  }

  return {
    board, cellStatus, candidates, panelMsg, isSolving, speed, isHintActive,
    handleLevel, handleSolve, handleSolveCell, handleHint, handleCheck, handleReset,
    handleInputChange, handleSkip, setSpeed, setActiveCell
  }
}
