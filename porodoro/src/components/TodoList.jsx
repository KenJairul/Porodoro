import React, { useState } from 'react';
import './TodoList.css'; // Import component-specific styles
import { FaTrash } from 'react-icons/fa'; // Trash icon

function TodoList({ darkMode }) {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [selectedTasks, setSelectedTasks] = useState([]); // Track selected tasks (array)

  const addTodo = () => {
    if (newTask.trim() !== '') {
      setTodos([...todos, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedSelectedTasks = [...selectedTasks];
    const taskIndex = updatedSelectedTasks.indexOf(index);

    if (taskIndex === -1) {
      updatedSelectedTasks.push(index);
    } else {
      updatedSelectedTasks.splice(taskIndex, 1);
    }

    setSelectedTasks(updatedSelectedTasks);
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);

    const updatedSelectedTasks = selectedTasks.filter((taskIndex) => taskIndex !== index);
    setSelectedTasks(updatedSelectedTasks);
  };

  return (
    <div className={`todo-container ${darkMode ? 'dark-mode' : ''}`}>
      {/* Input Field and Add Button */}
      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a task..."
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {/* Task List */}
      <div className="task-list">
        {todos.map((todo, index) => (
          <div
            key={index}
            className={`task-item ${selectedTasks.includes(index) ? 'completed' : ''}`}
          >
            <label className="task-label">
              <input
                type="checkbox"
                checked={selectedTasks.includes(index)}
                onChange={() => toggleTaskCompletion(index)}
              />
              <span>{todo.text}</span>
            </label>
            <FaTrash
              className="trash-icon"
              onClick={(e) => {
                e.stopPropagation();
                deleteTodo(index);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoList;