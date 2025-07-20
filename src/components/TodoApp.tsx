import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import TodoAddForm from "./TodoAddForm";
import ThemeToggle from "./ThemeToggle";
import TodoAPI from "../TodoAPI";
import { Todo } from "../types";

const FILTER_MAP: Record<string, (todo: Todo) => boolean> = {
  All: () => true,
  Active: (todo: Todo) => !todo.completed,
  Completed: (todo: Todo) => todo.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  useEffect(() => {
    TodoAPI.read()
      .then((data) => {
        setTodos(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const addTodo = (text: string): void => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    TodoAPI.create(newTodo);
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id: string | number): void => {
    TodoAPI.delete(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: string | number): void => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      TodoAPI.update(id, { ...todo, completed: !todo.completed });
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo,
        ),
      );
    }
  };

  const editTodo = (id: string | number, newText: string): void => {
    const editedTodos = todos.map((todo) => {
      if (id === todo.id) {
        return { ...todo, text: newText };
      }
      return todo;
    });
    const todo = editedTodos.find((todo) => todo.id === id);
    if (todo) {
      TodoAPI.update(id, todo);
      setTodos(editedTodos);
    }
  };

  const filterButtonList = FILTER_NAMES.map((filterName) => (
    <button
      key={filterName}
      type="button"
      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
        filterName === filter
          ? "bg-primary-500 text-white shadow-md scale-105"
          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-sm"
      }`}
      aria-pressed={filterName === filter}
      onClick={() => setFilter(filterName)}
    >
      {filterName}
    </button>
  ));

  const filteredTodos = todos.filter(FILTER_MAP[filter] || FILTER_MAP.All);

  const completedCount = todos.filter((todo) => todo.completed).length;
  const remainingCount = todos.length - completedCount;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 font-sans transition-colors duration-300">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft-lg p-8 animate-scale-in">
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
              <span className="ml-3 text-gray-600 dark:text-gray-300">Loading todos...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 font-sans transition-colors duration-300">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft-lg p-8 animate-scale-in">
            <div className="text-center">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.734-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Connection Error
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {error}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 font-sans transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white animate-fade-in">
            My Todos
          </h1>
          <ThemeToggle
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-soft-lg p-6 md:p-8 animate-scale-in">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-2 sm:space-y-0">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-300">
              <span className="text-2xl font-bold text-gray-800 dark:text-white">
                {todos.length}
              </span>{" "}
              <span className="text-gray-500 dark:text-gray-400">
                {todos.length === 1 ? "task" : "tasks"}
              </span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              <span className="text-green-600 dark:text-green-400 font-semibold">
                {completedCount}
              </span>{" "}
              completed,{" "}
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                {remainingCount}
              </span>{" "}
              remaining
            </div>
          </div>

          <div className="space-y-6">
            <TodoAddForm addTodo={addTodo} />

            <div className="flex flex-wrap gap-2 animate-slide-up">
              {filterButtonList}
            </div>

            <TodoList
              todos={filteredTodos}
              deleteTodo={deleteTodo}
              toggleTodo={toggleTodo}
              editTodo={editTodo}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
