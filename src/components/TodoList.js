import React from "react";
import TodoItem from "./TodoItem";
import { useTodo } from "../context/TodoContext";
import TodoFilter from "./TodoFilter";

const TodoList = () => {
  const { todos, clearCompleted, activeTodoCount, completedTodoCount } = useTodo();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Todo Items */}
      <div className="max-h-[50vh] overflow-y-auto">
        {todos.length > 0 ? (
          todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-gray-500">
            <span className="text-5xl mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="50" height="50"><rect width="256" height="256" fill="none"/><path d="M160,40h40a8,8,0,0,1,8,8V216a8,8,0,0,1-8,8H56a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8H96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M88,72V64a40,40,0,0,1,80,0v8Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
            </span>
            <p className="text-center">No tasks yet. Add a new task above!</p>
          </div>
        )}
      </div>

      {/* Todo Footer */}
      {todos.length > 0 && (
        <div className="border-t border-gray-200">
          <div className="flex justify-between items-center p-4 text-sm text-gray-600">
            <div>
              <span className="font-medium">{activeTodoCount}</span> items left
            </div>
            
            {/* Filter controls - Desktop */}
            <div className="hidden md:block">
              <TodoFilter />
            </div>
            
            {/* Clear completed button */}
            {completedTodoCount > 0 && (
              <button
                onClick={clearCompleted}
                className="text-gray-500 hover:text-gray-700"
              >
                Clear completed
              </button>
            )}
          </div>
          
          {/* Filter controls - Mobile */}
          <div className="md:hidden border-t border-gray-200 p-3">
            <TodoFilter />
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;