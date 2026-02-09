import React from 'react'
import '../App.css'

const Sidebar = ({ 
  onSolve, 
  onSolveCell, 
  onReset, 
  onHint,
  isHintActive, 
  onCheck, 
  onLevel, 
  isSolving,
  isInstant,
  setIsInstant
}) => {
  return (
    <div className="sidebar-card">
      <div>
        <div className="sidebar-content">
          
          <div className="btn-group">
            <div className="instant-group-compact">
              <label 
                className={`custom-checkbox-label ${isSolving ? 'disabled' : ''}`}
                data-tooltip="Hasil langsung tanpa animasi"
              >
                <input 
                  type="checkbox" 
                  checked={isInstant}
                  onChange={(e) => setIsInstant(e.target.checked)}
                  disabled={isSolving}
                />
                <span className="checkmark"></span>
                <span>Instant Mode</span>
              </label>
            </div>

            <button className="btn-blob" onClick={onSolve} disabled={isSolving}>SOLVE</button>
            <button className="btn-blob" onClick={onSolveCell} disabled={isSolving}>SOLVE CELL</button>
            <button className="btn-blob" onClick={onReset} disabled={isSolving}>RESET</button>
          </div>

          <div className="btn-group">
            <button 
              className="btn-blob" 
              onClick={onHint} 
              disabled={isSolving}
              style={isHintActive ? {
                backgroundColor: 'var(--bg-main)', 
                color: 'var(--panel-dark-pink)',
                border: '2px solid var(--panel-dark-pink)'
              } : {}}
            >
              {isHintActive ? 'UNHINT' : 'HINT'}
            </button>
            <button className="btn-blob" onClick={onCheck} disabled={isSolving}>CHECK</button>
          </div>

          <div className="btn-group">
            <button className="btn-blob" onClick={() => onLevel('easy')} disabled={isSolving}>EASY</button>
            <button className="btn-blob" onClick={() => onLevel('medium')} disabled={isSolving}>MEDIUM</button>
            <button className="btn-blob" onClick={() => onLevel('hard')} disabled={isSolving}>HARD</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
