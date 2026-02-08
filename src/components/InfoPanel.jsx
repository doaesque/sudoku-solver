import React from 'react'
import '../App.css'

const InfoPanel = ({ message }) => {
  return (
    <div className="info-card">
      <div className="features-title info-title">Info & Analisis</div>
      <div className="info-content">
        <p>{message}</p>
      </div>

      <div className="legend-box">
        <div className="legend-item">
          <span className="legend-dot" style={{background:'#444'}}></span> Fixed (Soal)
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{background:'var(--panel-dark-pink)'}}></span> User Input
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{background:'#3498db'}}></span> Trial (AI)
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{background:'#d8000c'}}></span> Error
        </div>
      </div>
    </div>
  )
}

export default InfoPanel
