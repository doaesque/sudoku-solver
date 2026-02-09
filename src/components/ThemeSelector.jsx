import React, { useState } from 'react'

const themes = [
  { id: 'chiikawa', label: '🌸 Chiikawa' },
  { id: 'hachikaware', label: '❄️ Hachikaware' },
  { id: 'usagi', label: '🌻 Usagi' },
  { id: 'momonga', label: '🪻 Momonga' },
]

const ThemeSelector = ({ currentTheme, setTheme }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (id) => {
    setTheme(id)
    setIsOpen(false)
  }

  const activeLabel = themes.find(t => t.id === currentTheme)?.label || 'Tema'

  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      left: 'max(20px)',
      zIndex: 1000
    }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 20px',
          borderRadius: '50px',
          border: `3px solid var(--panel-dark-pink)`,
          background: 'white',
          color: 'var(--panel-dark-pink)',
          fontFamily: 'Fredoka, sans-serif',
          fontWeight: '700',
          fontSize: '0.9rem',
          cursor: 'pointer',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          transition: 'all 0.2s',
          minWidth: '160px',
          justifyContent: 'space-between'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      >
        {activeLabel}
        <span>▼</span>
      </button>

      {isOpen && (
        <ul style={{
          position: 'absolute',
          top: '120%',
          left: 0,
          width: '100%',
          background: 'white',
          borderRadius: '20px',
          border: `3px solid var(--panel-dark-pink)`,
          listStyle: 'none',
          padding: '5px',
          margin: 0,
          boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          animation: 'fadeIn 0.2s ease'
        }}>
          {themes.map((theme) => (
            <li
              key={theme.id}
              onClick={() => handleSelect(theme.id)}
              style={{
                padding: '10px 15px',
                color: currentTheme === theme.id ? 'white' : 'var(--panel-dark-pink)',
                background: currentTheme === theme.id ? 'var(--panel-dark-pink)' : 'transparent',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.85rem',
                transition: 'background 0.2s',
                marginBottom: '2px'
              }}
              onMouseEnter={(e) => {
                if (currentTheme !== theme.id) e.target.style.background = 'var(--bg-main)'
              }}
              onMouseLeave={(e) => {
                if (currentTheme !== theme.id) e.target.style.background = 'transparent'
              }}
            >
              {theme.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ThemeSelector
