import React from 'react'
import '../App.css'

const Sidebar = ({ onSolve, onSolveCell, onReset, onHint, isHintActive, onCheck, onLevel, isSolving }) => {
  return (
    <div className="sidebar-card">
      <div>
        <div className="sidebar-content">
          <div className="btn-group">
            <button className="btn-blob" onClick={onSolve} disabled={isSolving} data-tooltip="Mulai Auto-Solve">SOLVE</button>
            <button className="btn-blob" onClick={onSolveCell} disabled={isSolving} data-tooltip="Isi kotak terpilih">SOLVE CELL</button>
            <button className="btn-blob" onClick={onReset} disabled={isSolving} data-tooltip="Hapus semua jawaban">RESET</button>
          </div>

          <div className="btn-group">
            <button
              className="btn-blob"
              onClick={onHint}
              disabled={isSolving}
              data-tooltip={isHintActive ? "Sembunyikan angka kecil" : "Tampilkan kandidat angka"}
              style={isHintActive ? { backgroundColor: '#ffe3ea', color: '#ff85a1', border: '2px solid #ff85a1' } : {}}
            >
              {isHintActive ? 'UNHINT' : 'HINT'}
            </button>
            <button className="btn-blob" onClick={onCheck} disabled={isSolving} data-tooltip="Cek validitas">CHECK</button>
          </div>

          <div className="btn-group">
            <button className="btn-blob" onClick={() => onLevel('easy')} disabled={isSolving} data-tooltip="Soal Mudah">EASY</button>
            <button className="btn-blob" onClick={() => onLevel('medium')} disabled={isSolving} data-tooltip="Soal Sedang">MEDIUM</button>
            <button className="btn-blob" onClick={() => onLevel('hard')} disabled={isSolving} data-tooltip="Soal Sulit">HARD</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
