import React, { useState } from "react";
import { useTodo } from "../context/TodoContext";

const TodoForm = () => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const { addTodo } = useTodo();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate input
    if (!text.trim()) {
      setError("Task cannot be empty");
      return;
    }
    
    if (text.length > 100) {
      setError("Task is too long (maximum 100 characters)");
      return;
    }
    
    // Add the todo and reset form
    addTodo(text);
    setText("");
    setError("");
  };

  const handleChange = (e) => {
    setText(e.target.value);
    if (error) setError("");
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="mb-6"
    >
      <div className="flex flex-col">
        <div className="flex items-center relative">
          <input
            type="text"
            value={text}
            onChange={handleChange}
            placeholder="Add a new task..."
            className="w-full p-3 pr-12 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none shadow-sm"
            maxLength="100"
          />
          <button
            type="submit"
            className="absolute right-2 w-8 h-8 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors"
            aria-label="Add task"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="88" y1="128" x2="168" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="88" x2="128" y2="168" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
          </button>
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-1">{error}</p>
        )}
        <div className="text-right text-xs text-gray-500 mt-1">
          {text.length}/100
        </div>
      </div>
    </form>
  );
};

export default TodoForm;