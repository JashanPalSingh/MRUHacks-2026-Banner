function DisplayControls({ clockVisible, darkMode, onToggleClock, onToggleTheme }) {
  return (
    <>
      <button
        className="clock-toggle"
        type="button"
        aria-label={clockVisible ? 'Hide clock' : 'Show clock'}
        aria-pressed={clockVisible}
        onClick={onToggleClock}
      >
        {clockVisible ? '×' : '◷'}
      </button>
      <button
        className="theme-toggle"
        type="button"
        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        aria-pressed={darkMode}
        onClick={onToggleTheme}
      >
        {darkMode ? '☀' : '☾'}
      </button>
    </>
  )
}

export default DisplayControls
