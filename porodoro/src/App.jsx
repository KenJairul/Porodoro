import React, { useState, useEffect } from 'react';
import './App.css'; // Import global styles
import TodoList from './components/TodoList';
import PomodoroTimer from './components/PomodoroTimer';
import logo from './assets/pngegg.png'; // Use the single logo file

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Add this useEffect to toggle dark mode on the body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <img
            src={logo} // Use the same logo for both modes
            alt="Logo"
            className="logo"
          />
          <h1 className="timer-header">PORODORO!</h1>
        </div>
        <button
          className="dark-mode-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </header>

      {/* Main Content */}
      <div className="main-content">
        {/* To-Do List */}
        <div className="todo-list-container">
          <TodoList />
        </div>

        {/* Pomodoro Timer */}
        <div className="pomodoro-timer-container">
          <PomodoroTimer />
        </div>
      </div>
    </div>
  );
}

export default App;