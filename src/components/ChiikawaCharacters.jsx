import React, { useState, memo, useCallback } from 'react'
import '../App.css'

const quotes = {
  usagi: ["Urra!", "Haa?", "Yaha!", "Waaa!", "Puleya!", "Eeeh?"],
  momonga: ["Cute!", "Puji Aku!", "Momon...", "Sini!", "Lari!", "Lihat!"]
}

// Menggunakan memo agar tidak terpengaruh re-render App.jsx (akibat slider speed)
const ChiikawaCharacters = memo(() => {
  const [activeBubble, setActiveBubble] = useState(null)
  const [currentQuote, setCurrentQuote] = useState("")

  const handleCharClick = (id) => {
    // Ambil quote acak
    const charQuotes = quotes[id]
    const randomQuote = charQuotes[Math.floor(Math.random() * charQuotes.length)]
    
    setCurrentQuote(randomQuote)
    setActiveBubble(id)

    // Bubble hilang setelah 2 detik
    setTimeout(() => {
      setActiveBubble(null)
    }, 2000)
  }

  return (
    <div className="footer-mascot-container">
      {/* Karakter 1: Usagi */}
      <div 
        className="char-wrapper" 
        onClick={() => handleCharClick('usagi')}
      >
        <img src="/Usagi.svg" alt="Usagi" className="character-img" />
        {activeBubble === 'usagi' && (
          <div className="speech-bubble bubble-char">
            {currentQuote}
          </div>
        )}
      </div>

      {/* Karakter 2: Momonga */}
      <div
        className="char-wrapper" 
        onClick={() => handleCharClick('momonga')}
      >
        <img src="/Momonga.svg" alt="Momonga" className="character-img" />
        {activeBubble === 'momonga' && (
          <div className="speech-bubble bubble-char">
            {currentQuote}
          </div>
        )}
      </div>
    </div>
  )
})

export default ChiikawaCharacters