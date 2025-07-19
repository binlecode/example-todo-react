import React, { useState } from "react";
import { TodoAddFormProps } from "../types";

const TodoAddForm: React.FC<TodoAddFormProps> = ({ addTodo }) => {
  const [todoText, setTodoText] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todoText.trim() === "") {
      return;
    }
    addTodo(todoText.trim());
    setTodoText("");
  };

  return (
    <div className="mb-6 animate-slide-up">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            id="new-todo-input"
            type="text"
            className="w-full px-4 py-3 pr-24 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500"
            placeholder="What needs to be done?"
            autoComplete="off"
            value={todoText}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!todoText.trim()}
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoAddForm;
