import React from "react";
import TodoItem from "./TodoItem";
import { TodoListProps } from "../types";

const TodoList: React.FC<TodoListProps> = ({
  todos,
  deleteTodo,
  toggleTodo,
  editTodo,
}) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400 animate-fade-in">
        <svg
          className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
        <p className="text-lg font-medium">No tasks to show</p>
        <p className="text-sm">Add a new task to get started! </p>
      </div>
    );
  }

  return (
    <ul className="space-y-3" role="list" aria-label="Todo list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
          editTodo={editTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
