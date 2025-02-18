import React, { useState } from 'react';
import './App.css'; // Import global styles
import TodoList from './components/TodoList';
import PomodoroTimer from './components/PomodoroTimer';
import logo from './assets/pngegg.png'; // Use the single logo file

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <img
            src={logo} // Use the same logo for both modes
            alt="Logo"
            className="logo"
          />
          <h1 className="timer-header">Pomodoro App</h1>
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
          <TodoList darkMode={darkMode} />
        </div>

        {/* Pomodoro Timer */}
        <div className="pomodoro-timer-container">
          <PomodoroTimer darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}

export default App;