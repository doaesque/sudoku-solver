import React, { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import SudokuGrid from './components/SudokuGrid'
import TeamModal from './components/TeamModal'
import InfoPanel from './components/InfoPanel'
import Header from './components/Header'
import ChiikawaCharacters from './components/ChiikawaCharacters'
import { useSudokuGame } from './hooks/useSudokuGame'

function App() {
  const [showTeam, setShowTeam] = useState(false)

  const {
    board, cellStatus, candidates, panelMsg, isSolving, speed, isHintActive,
    handleLevel, handleSolve, handleSolveCell, handleHint, handleCheck, handleReset,
    handleInputChange, handleSkip, setSpeed, setActiveCell
  } = useSudokuGame()

  return (
    <div className="sudoku-container">
      {/* Header Section */}
      <Header onShowTeam={() => setShowTeam(true)} />

      {/* Main Game Layout */}
      <div className="main-layout">
        <Sidebar
          onSolve={handleSolve}
          onSolveCell={handleSolveCell}
          onHint={handleHint}
          isHintActive={isHintActive}
          onReset={handleReset}
          onCheck={handleCheck}
          onLevel={handleLevel}
          isSolving={isSolving}
        />

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

        {/* Info & Characters Column */}
        <div className="info-column-wrapper">
          <InfoPanel message={panelMsg} />
          <ChiikawaCharacters />
        </div>
      </div>

      {/* Team Modal */}
      {showTeam && <TeamModal onClose={() => setShowTeam(false)} />}
    </div>
  )
}

export default App