import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import SudokuGrid from './components/SudokuGrid';
import TeamModal from './components/TeamModal';
import InfoPanel from './components/InfoPanel'; // Import komponen baru
import { useSudokuGame } from './hooks/useSudokuGame'; // Import hook baru

function App() {
  const [showTeam, setShowTeam] = useState(false);
  
  // Panggil semua logic dari hook
  const {
    board, cellStatus, candidates, panelMsg, isSolving, speed, isHintActive,
    handleLevel, handleSolve, handleSolveCell, handleHint, handleCheck, handleReset,
    handleInputChange, handleSkip, setSpeed, setActiveCell
  } = useSudokuGame();

  return (
    <div className="sudoku-container">
      <div className="header">
        <img src="/Furuhonya.svg" className="character-reading" />
        <img src="/Chiikawa.svg" className="character-left" />
        <h1 className="title">SUDOKAWA</h1>
        <button className="team-icon-btn" onClick={() => setShowTeam(true)}><img src="/chiikawaa.svg" className="character-button" /></button>
        <img src="/Hachikaware.svg" className="character-right" />
      </div>

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
          onCellFocus={(r, c) => setActiveCell({r, c})}
          isSolving={isSolving}
          speed={speed}
          setSpeed={setSpeed}
          onSkip={handleSkip}
        />

        {/* Pakai komponen InfoPanel yang baru dipisah */}
        <div className="info-column-wrapper">
          <InfoPanel message={panelMsg} />
          <img src="/Usagi.svg" className="character-footer1" />
          <img src="/Momonga.svg" className="character-footer2" />
        </div>
        
      </div>

      {showTeam && <TeamModal onClose={() => setShowTeam(false)} />}
    </div>
    
  );
}

export default App;
