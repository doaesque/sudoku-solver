import React from 'react'
import '../App.css'

const SpeedControl = ({ speed, setSpeed, onSkip, isSolving }) => {
  const SLOWEST_DELAY = 800
  const FASTEST_DELAY = 10

  const handleSliderChange = (e) => {
    const sliderValue = parseInt(e.target.value)
    const percentage = sliderValue / 100
    const newDelay = SLOWEST_DELAY - (percentage * (SLOWEST_DELAY - FASTEST_DELAY))
    setSpeed(newDelay)
  }

  const getSliderValue = () => {
    if (speed === 0) return 100
    return ((SLOWEST_DELAY - speed) / (SLOWEST_DELAY - FASTEST_DELAY)) * 100
  }

  return (
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
  )
}

export default SpeedControl
