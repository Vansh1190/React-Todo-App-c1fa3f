import React, { createContext, useContext, useReducer, useEffect } from "react";

// Create the Todo context
const TodoContext = createContext();

// Initial state
const initialState = {
  todos: [],
  filter: "all" // all, active, completed
};

// Action types
const ADD_TODO = "ADD_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const DELETE_TODO = "DELETE_TODO";
const EDIT_TODO = "EDIT_TODO";
const SET_FILTER = "SET_FILTER";
const CLEAR_COMPLETED = "CLEAR_COMPLETED";

// Reducer function
const todoReducer = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false,
            createdAt: new Date().toISOString()
          }
        ]
      };
      
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
      
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload)
      };
      
    case EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo
        )
      };
      
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload
      };
      
    case CLEAR_COMPLETED:
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.completed)
      };
      
    default:
      return state;
  }
};

// Provider component
export const TodoProvider = ({ children }) => {
  // Load todos from localStorage
  const loadTodos = () => {
    try {
      const storedTodos = localStorage.getItem("todos");
      return storedTodos ? { todos: JSON.parse(storedTodos), filter: "all" } : initialState;
    } catch (error) {
      console.error("Error loading todos from localStorage:", error);
      return initialState;
    }
  };

  const [state, dispatch] = useReducer(todoReducer, initialState, loadTodos);

  // Save todos to localStorage when state changes
  useEffect(() => {
    try {
      localStorage.setItem("todos", JSON.stringify(state.todos));
    } catch (error) {
      console.error("Error saving todos to localStorage:", error);
    }
  }, [state.todos]);

  // Actions
  const addTodo = (text) => {
    if (text.trim() !== "") {
      dispatch({ type: ADD_TODO, payload: text });
    }
  };

  const toggleTodo = (id) => {
    dispatch({ type: TOGGLE_TODO, payload: id });
  };

  const deleteTodo = (id) => {
    dispatch({ type: DELETE_TODO, payload: id });
  };

  const editTodo = (id, text) => {
    if (text.trim() !== "") {
      dispatch({ type: EDIT_TODO, payload: { id, text } });
    }
  };

  const setFilter = (filter) => {
    dispatch({ type: SET_FILTER, payload: filter });
  };

  const clearCompleted = () => {
    dispatch({ type: CLEAR_COMPLETED });
  };

  // Filter todos based on current filter
  const filteredTodos = () => {
    switch (state.filter) {
      case "active":
        return state.todos.filter(todo => !todo.completed);
      case "completed":
        return state.todos.filter(todo => todo.completed);
      default:
        return state.todos;
    }
  };

  // Count active/completed todos
  const activeTodoCount = state.todos.filter(todo => !todo.completed).length;
  const completedTodoCount = state.todos.length - activeTodoCount;

  // Sort todos by creation date (newest first)
  const sortedFilteredTodos = filteredTodos().sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <TodoContext.Provider
      value={{
        todos: sortedFilteredTodos,
        filter: state.filter,
        addTodo,
        toggleTodo,
        deleteTodo,
        editTodo,
        setFilter,
        clearCompleted,
        activeTodoCount,
        completedTodoCount
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

// Custom hook for using the todo context
export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};