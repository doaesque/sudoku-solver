import React from 'react';
import '../App.css';

const SudokuGrid = ({ board, cellStatus, onInputChange, onCellFocus, isSolving, speed, setSpeed, onSkip, candidates }) => {

  const SLOWEST_DELAY = 800;
  const FASTEST_DELAY = 10;

  const handleSliderChange = (e) => {
    const sliderValue = parseInt(e.target.value);
    const percentage = sliderValue / 100;
    const newDelay = SLOWEST_DELAY - (percentage * (SLOWEST_DELAY - FASTEST_DELAY));
    setSpeed(newDelay);
  };

  const getSliderValue = () => {
    if (speed === 0) return 100;
    return ((SLOWEST_DELAY - speed) / (SLOWEST_DELAY - FASTEST_DELAY)) * 100;
  };

  return (
    <div className="grid-card">
      <div className="board-area">
        {isSolving && <div className="grid-overlay" title="Tunggu proses selesai..." />}

        <div className="grid-labels-top">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => <span key={n}>{n}</span>)}
        </div>

        <div className="grid-body">
          <div className="grid-labels-left">
            {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].map((l) => <span key={l}>{l}</span>)}
          </div>

          <div className="grid-board">
            {board.map((row, r) =>
              row.map((cell, c) => (
                <div key={`${r}-${c}`} className="cell-wrapper">
                  {cell === 0 && candidates && candidates[r][c] && candidates[r][c].length > 0 && (
                    <div className="candidate-grid">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                        <span key={num} className="candidate-num">
                          {candidates[r][c].includes(num) ? num : ''}
                        </span>
                      ))}
                    </div>
                  )}
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

      <div className="playlist-container">
        <div className="speed-control">
          <span className="speed-label">🐢</span>
          <input
            type="range" min="0" max="100" className="speed-slider"
            value={getSliderValue()} onChange={handleSliderChange}
            title="Atur Kecepatan Animasi"
          />
          <span className="speed-label">🐇</span>
        </div>
        <button
          className="btn-skip" onClick={onSkip}
          disabled={!isSolving || speed === 0}
          title="Skip ke Selesai (Instan)"
        >
          ⏩
        </button>
      </div>
    </div>
  );
};

export default SudokuGrid;
