import React from 'react'
import '../App.css'
import SpeedControl from './SpeedControl'

const SudokuGrid = ({ board, cellStatus, onInputChange, onCellFocus, isSolving, speed, setSpeed, onSkip, candidates }) => {
  return (
    <div className="grid-card">
      <div className="board-area">
        {/* Overlay saat solving berjalan */}
        {isSolving && <div className="grid-overlay" title="Tunggu proses selesai..." />}

        {/* Label Angka (Atas) */}
        <div className="grid-labels-top">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => <span key={n}>{n}</span>)}
        </div>

        <div className="grid-body">
          {/* Label Huruf (Kiri) */}
          <div className="grid-labels-left">
            {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].map((l) => <span key={l}>{l}</span>)}
          </div>

          {/* Grid Utama */}
          <div className="grid-board">
            {board.map((row, r) =>
              row.map((cell, c) => (
                <div key={`${r}-${c}`} className="cell-wrapper">
                  {/* Layer Pencil Marks (Hint) */}
                  {cell === 0 && candidates && candidates[r][c] && candidates[r][c].length > 0 && (
                    <div className="candidate-grid">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                        <span key={num} className="candidate-num">
                          {candidates[r][c].includes(num) ? num : ''}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Layer Input User */}
                  <input
                    className={`cell ${cellStatus[r][c]}`}
                    value={cell === 0 ? '' : cell}
                    onChange={(e) => onInputChange(e, r, c)}
                    onFocus={() => onCellFocus(r, c)}
                    maxLength={1}
                    autoComplete="off"
                    disabled={isSolving}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <SpeedControl
        speed={speed}
        setSpeed={setSpeed}
        onSkip={onSkip}
        isSolving={isSolving}
      />
    </div>
  )
}

export default SudokuGrid
