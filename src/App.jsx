import React, { useState, useEffect } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import SudokuGrid from './components/SudokuGrid'
import TeamModal from './components/TeamModal'
import InfoPanel from './components/InfoPanel'
import Header from './components/Header'
import ChiikawaCharacters from './components/ChiikawaCharacters'
import ThemeSelector from './components/ThemeSelector'
import { useSudokuGame } from './hooks/useSudokuGame'

function App() {
  const [showTeam, setShowTeam] = useState(false)
  const [theme, setTheme] = useState('chiikawa')

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  const {
    board, cellStatus, candidates, panelMsg, isSolving, speed, isHintActive,
    handleLevel, handleSolve, handleSolveCell, handleHint, handleCheck, handleReset,
    handleInputChange, handleSkip, setSpeed, setActiveCell,
    isInstant, setIsInstant 
  } = useSudokuGame()

  return (
    <div className="sudoku-container">
      <ThemeSelector currentTheme={theme} setTheme={setTheme} />

      <Header onShowTeam={() => setShowTeam(true)} />

      <div className="main-layout">
        <div className="sidebar-wrapper">
          <Sidebar
            onSolve={handleSolve}
            onSolveCell={handleSolveCell}
            onHint={handleHint}
            isHintActive={isHintActive}
            onReset={handleReset}
            onCheck={handleCheck}
            onLevel={handleLevel}
            isSolving={isSolving}
            isInstant={isInstant}
            setIsInstant={setIsInstant}
          />
        </div>

        <SudokuGrid
          board={board}
          cellStatus={cellStatus}
          candidates={candidates}
          onInputChange={handleInputChange}
          onCellFocus={(r, c) => setActiveCell({ r, c })}
          isSolving={isSolving}
          speed={speed}
          setSpeed={setSpeed}
          onSkip={handleSkip}
        />

        <div className="info-column-wrapper">
          <InfoPanel message={panelMsg} />
          <ChiikawaCharacters />
        </div>
      </div>

      {showTeam && <TeamModal onClose={() => setShowTeam(false)} />}
    </div>
  )
}

export default App
