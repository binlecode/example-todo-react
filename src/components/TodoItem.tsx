import React, { useEffect, useRef, useState } from "react";
import { TodoItemProps } from "../types";

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  deleteTodo,
  toggleTodo,
  editTodo,
}) => {
  const [isEditing, setEditing] = useState(false);
  // create ref for elements for cursor current.focus call
  const editFieldRef = useRef<HTMLInputElement>(null);
  const editButtonRef = useRef<HTMLButtonElement>(null);

  const [newText, setNewText] = useState(todo.text);

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  const handleToggle = () => {
    toggleTodo(todo.id);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewText(e.target.value);
  };

  // catch esc key to exit editing mode without saving
  // ! NOTE: for some reason onKeyPress does not capture escape key (code 27)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 27) {
      if (isEditing) {
        setEditing(false);
      }
    }
  };

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // always good practice to prevent default event from form submission
    e.preventDefault();
    editTodo(todo.id, newText);
    // reset new text value
    // setNewText('');
    // exit editing mode
    setEditing(false);
  };

  // Set current state to given value but return its previous state.
  // ! useEffect() takes a function (callback) as an argument and invokes
  // it after main flow, aka the 'return' statement below
  function usePrevious<T>(value: T): T | undefined {
    const ref = useRef<T | undefined>();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const wasEditing = usePrevious(isEditing);

  // * this function is executed **after** the component renders
  // ! NOTE the second argument is a list of values useEffect() depends on
  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current?.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current?.focus();
    }
  }, [isEditing, wasEditing]);

  const editingTemplate = (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-3 animate-slide-up">
      <form onSubmit={handleEditSubmit} className="flex gap-3">
        <input
          id={todo.id.toString()}
          className="flex-1 px-3 py-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
          type="text"
          value={newText}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          ref={editFieldRef}
          aria-label="Edit todo text"
        />
        <button
          type="button"
          className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200"
          onClick={() => setEditing(false)}
          aria-label="Cancel editing"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-3 py-2 text-sm font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors duration-200"
          aria-label="Save changes"
        >
          Save
        </button>
      </form>
    </div>
  );

  const viewTemplate = (
    <div className="group bg-white dark:bg-gray-800 rounded-xl p-4 mb-3 shadow-soft hover:shadow-soft-lg transition-all duration-200 animate-slide-up">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <input
            id={String(todo.id)}
            type="checkbox"
            className="w-5 h-5 text-primary-500 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer transition-all duration-200"
            defaultChecked={todo.completed}
            onChange={handleToggle}
            aria-label={`Mark ${todo.text} as ${todo.completed ? "incomplete" : "complete"}`}
          />
        </div>

        <div className="flex-1 min-w-0">
          <p
            className={`text-sm font-medium transition-all duration-200 ${
              todo.completed
                ? "text-gray-400 dark:text-gray-500 line-through"
                : "text-gray-900 dark:text-white"
            }`}
          >
            {todo.text}
          </p>
        </div>

        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            className="p-2 text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
            onClick={() => setEditing(true)}
            ref={editButtonRef}
            aria-label={`Edit ${todo.text}`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>

          <button
            type="button"
            className="p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200"
            onClick={handleDelete}
            aria-label={`Delete ${todo.text}`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <li className="animate-slide-up" role="listitem">
      {isEditing ? editingTemplate : viewTemplate}
    </li>
  );
};

export default TodoItem;
