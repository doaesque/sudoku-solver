import React from 'react'
import '../App.css'

const InfoPanel = ({ message }) => {
  return (
    <div className="info-card">
      <div className="features-title info-title">Notes</div>
      
      {/* Area Pesan/Statistik */}
      <div className="info-content">
        <p>{message}</p>
      </div>

      {/* Legenda Warna */}
      <div className="legend-box">
        <div className="legend-item">
          <span className="legend-dot" style={{background:'#444'}}></span> Fixed (Soal)
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: 'var(--text-pink)' }}></span> User Input
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: 'var(--trial-color)' }}></span> Trial (AI)
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{background:'#d8000c'}}></span> Error
        </div>
      </div>
    </div>
  )
}

export default InfoPanel
