import React from 'react'
import '../App.css'

const Header = ({ onShowTeam }) => {
  return (
    <div className="header">
      <img src="/Furuhonya.svg" className="character-reading" alt="Furuhonya" />
      <img src="/Chiikawa.svg" className="character-left" alt="Chiikawa" />
      <h1 className="title">SUDOKAWA</h1>
      <button className="team-icon-btn" onClick={onShowTeam}>
        <img src="/chiikawaa.svg" className="character-button" alt="Chiikawa Team" />
      </button>
      <img src="/Hachikaware.svg" className="character-right" alt="Hachikaware" />
    </div>
  )
}

export default Header
