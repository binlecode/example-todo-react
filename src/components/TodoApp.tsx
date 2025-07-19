import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import TodoAddForm from "./TodoAddForm";
import FilterButton from "./FilterButton";
import ThemeToggle from "./ThemeToggle";
import TodoAPI from "../TodoAPI";
import { Todo } from "../types";

// * filter functions and names
// ! NOTE that these are defined outside of App function to avoid recalculation
//   every time <App /> component re-renders
const FILTER_MAP: Record<string, (todo: Todo) => boolean> = {
  All: () => true,
  Active: (todo: Todo) => !todo.completed,
  Completed: (todo: Todo) => todo.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Dark mode toggle
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // fetch todos from API for initial render
  useEffect(() => {
    TodoAPI.read().then((data) => setTodos(data));
  }, []);

  // For component methods, it is recommended to implement them as
  // arrow functions over regular named functions.
  // - arrow functions holds `this` value from surrounding context
  // - since arrow function doesn't have its own `this`, it avoids function
  //   rebinding when it is passed as callback

  const addTodo = (text: string): void => {
    console.log("add todo: " + text);
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    // call API to create new todo
    TodoAPI.create(newTodo);
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id: string | number): void => {
    // call API to delete todo
    TodoAPI.delete(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: string | number): void => {
    console.log("toggleTodoCompleted " + id);
    // call API to update todo
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      TodoAPI.update(id, { ...todo, completed: !todo.completed });

      setTodos(
        todos.map((todo) =>
          // use object spread to update one key value pair
          todo.id === id ? { ...todo, completed: !todo.completed } : todo,
        ),
      );
    }
  };

  const editTodo = (id: string | number, newText: string): void => {
    console.log("edit todo: " + id + ", text: " + newText);
    const editedTodos = todos.map((todo) => {
      if (id === todo.id) {
        return { ...todo, text: newText };
      }
      return todo;
    });
    // call API to update todo
    const todo = editedTodos.find((todo) => todo.id === id);
    if (todo) {
      TodoAPI.update(id, todo);
      setTodos(editedTodos);
    }
  };

  const filterButtonList = FILTER_NAMES.map((filterName) => (
    <FilterButton
      key={filterName}
      name={filterName}
      currentFilter={filter}
      setFilter={setFilter}
    />
  ));

  const filteredTodos = todos.filter(FILTER_MAP[filter] || FILTER_MAP.All);

  const completedCount = todos.filter((todo) => todo.completed).length;
  const remainingCount = todos.length - completedCount;

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
