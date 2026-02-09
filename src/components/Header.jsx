import React from 'react'

const Header = ({ onShowTeam }) => {
  return (
    <header className="header">
      {/* Mascot Kiri: Chiikawa */}
      <div className="char-wrapper pos-left">
        <img src="/Chiikawa.svg" alt="Chiikawa" className="character-img" />
      </div>

      {/* Judul */}
      <h1 className="title">SUDOKAWA</h1>

      {/* Tombol Team */}
      <button 
        className="team-icon-btn" 
        onClick={onShowTeam}
        data-tooltip="Meet the Team" 
      >
        <img src="/chiikawaa.svg" alt="Team" className="character-button" />
      </button>

      {/* Mascot Kanan: Hachikaware */}
      <div className="char-wrapper pos-right">
        <img src="/Hachikaware.svg" alt="Hachikaware" className="character-img" />
      </div>
    </header>
  )
}

export default Header
