import React from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { TodoProvider } from "./context/TodoContext";

const App = () => {
  return (
    <TodoProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Todo App</h1>
            <p className="text-gray-600">Stay organized and get things done</p>
          </header>

          {/* Main Content */}
          <main className="bg-white rounded-xl shadow-lg p-6">
            {/* Todo Form Section */}
            <section className="mb-6">
              <TodoForm />
            </section>

            {/* Todo List Section */}
            <section>
              <TodoList />
            </section>
          </main>

          {/* Footer */}
          <footer className="mt-8 text-center text-sm text-gray-500">
            <p>Double-click a todo to edit • Press Esc to cancel</p>
          </footer>
        </div>
      </div>
    </TodoProvider>
  );
};

export default App;