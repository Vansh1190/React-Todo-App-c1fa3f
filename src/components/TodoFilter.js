import React from "react";
import { useTodo } from "../context/TodoContext";

const TodoFilter = () => {
  const { filter, setFilter } = useTodo();

  const filterButtons = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Completed", value: "completed" }
  ];

  return (
    <div className="flex justify-center items-center space-x-2">
      {filterButtons.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => setFilter(value)}
          className={`px-3 py-1 rounded-full text-sm transition-colors ${
            filter === value
              ? "bg-blue-500 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          aria-pressed={filter === value}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default TodoFilter;