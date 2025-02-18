import React, { useState, useEffect } from 'react';
import './PomodoroTimer.css'; // Import component-specific styles

function PomodoroTimer({ darkMode }) {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // Default to Focus mode (25 minutes)
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false); // Track pause/resume state
  const [mode, setMode] = useState('focus'); // Modes: 'focus', 'shortBreak', 'longBreak'

  useEffect(() => {
    let interval = null;

    if (isRunning && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      alert('Time is up!');
    }

    return () => clearInterval(interval);
  }, [isRunning, isPaused, timeLeft]);

  const startTimer = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(true);
  };

  const resumeTimer = () => {
    setIsPaused(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    switch (mode) {
      case 'focus':
        setTimeLeft(25 * 60);
        break;
      case 'shortBreak':
        setTimeLeft(5 * 60);
        break;
      case 'longBreak':
        setTimeLeft(10 * 60);
        break;
      default:
        setTimeLeft(25 * 60);
    }
  };

  const adjustTimeAndStart = (minutes) => {
    setTimeLeft((prevTime) => prevTime + minutes * 60);
    startTimer(); // Start the timer immediately after adjusting time
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className={`timer-container ${darkMode ? 'dark-mode' : ''}`}>
      {/* Mode Selection */}
      <div className="mode-buttons">
        <span
          className={`mode-option ${mode === 'focus' ? 'active' : ''}`}
          onClick={() => {
            setMode('focus');
            setTimeLeft(25 * 60);
            setIsRunning(false);
            setIsPaused(false);
          }}
        >
          Focus
        </span>
        <span
          className={`mode-option ${mode === 'shortBreak' ? 'active' : ''}`}
          onClick={() => {
            setMode('shortBreak');
            setTimeLeft(5 * 60);
            setIsRunning(false);
            setIsPaused(false);
          }}
        >
          Short Break
        </span>
        <span
          className={`mode-option ${mode === 'longBreak' ? 'active' : ''}`}
          onClick={() => {
            setMode('longBreak');
            setTimeLeft(10 * 60);
            setIsRunning(false);
            setIsPaused(false);
          }}
        >
          Long Break
        </span>
      </div>

      {/* Timer Display */}
      <div className="timer-display">
        {minutes}:{seconds < 10 ? '0' : ''}{seconds}
      </div>

      {/* Quick Adjustment Options */}
      <div className="adjust-buttons">
        <span className="adjust-option" onClick={() => adjustTimeAndStart(25)}>
          +25 min
        </span>
        <span className="adjust-option" onClick={() => adjustTimeAndStart(10)}>
          +10 min
        </span>
        <span className="adjust-option" onClick={() => adjustTimeAndStart(5)}>
          +5 min
        </span>
        <span className="adjust-option" onClick={() => adjustTimeAndStart(1)}>
          +1 min
        </span>
      </div>

      {/* Control Buttons */}
      <div className="controls">
        {!isRunning ? (
          <button className="primary" onClick={startTimer}>Start</button>
        ) : (
          <>
            <button className="primary" onClick={isPaused ? resumeTimer : pauseTimer}>
              {isPaused ? 'Resume' : 'Pause'}
            </button>
            <button onClick={resetTimer}>Reset</button>
          </>
        )}
      </div>
    </div>
  );
}

export default PomodoroTimer;