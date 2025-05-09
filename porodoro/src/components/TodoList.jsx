import React, { useState } from 'react';
import './TodoList.css';
import { FaTrash } from 'react-icons/fa';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [selectedTasks, setSelectedTasks] = useState([]);

  const addTodo = () => {
    if (newTask.trim() !== '') {
      setTodos([...todos, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
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
    <div className="todo-container">
      {/* Input Field and Add Button */}
      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleKeyPress}
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