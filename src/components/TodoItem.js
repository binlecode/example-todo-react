import React, { useEffect, useRef, useState } from "react";

const TodoItem = (props) => {
  // define a edit mode state to switch between edit and view mode
  const [isEditing, setEditing] = useState(false);
  // define a todo text content state for inline edit
  const [newText, setNewText] = useState(props.todo.text);
  // create ref for elements for cursor current.focus call
  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);

  const todo = props.todo;
  const handleDelete = () => {
    props.deleteTodo(todo.id);
  };

  const handleToggle = () => {
    props.toggleTodo(todo.id);
  };

  const handleChange = (e) => {
    setNewText(e.target.value);
  };

  // catch esc key to exit editing mode without saving
  // ! NOTE: for some reason onKeyPress does not capture escape key (code 27)
  const handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      if (isEditing) {
        setEditing(false);
      }
    }
  };

  const handleEditSubmit = (e) => {
    // always good practice to prevent default event from form submission
    e.preventDefault();
    props.editTodo(todo.id, newText);
    // reset new text value
    // setNewText('');
    // exit editing mode
    setEditing(false);
  };

  // Set current state to given value but return its previous state.
  // ! useEffect() takes a function (callback) as an argument and invokes
  // it after main flow, aka the 'return' statement below
  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const wasEditing = usePrevious(isEditing);

  // * this function is executed **after** the component renders
  // ! NOTE the second argument is a list of values useEffect() depends on
  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [isEditing, wasEditing]);

  const editingTemplate = (
    <div className="mb-4">
      <form onSubmit={handleEditSubmit}>
        <div className="flex mt-4">
          <input
            id={props.id}
            className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-500"
            type="text"
            value={newText}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            ref={editFieldRef}
          />
          <button
            type="button"
            className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-teal-500 border-teal-500 hover:bg-teal-500"
            onClick={() => setEditing(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-teal-500 border-teal-500 hover:bg-teal-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );

  const viewTemplate = (
    <div className="flex mb-4 items-center">
      <p
        className={
          todo.completed
            ? "w-full text-gray-500 line-through"
            : "w-full text-gray-500"
        }
      >
        {todo.text}
      </p>
      <input
        id={todo.id}
        type="checkbox"
        className="flex-no-shrink h-8 w-8 rounded-full hover:cursor-pointer checked:shadow-xl"
        defaultChecked={todo.completed}
        onChange={() => handleToggle(todo.id)}
      />
      <button
        type="button"
        className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-teal-500 border-teal-500 hover:bg-teal-500"
        onClick={() => setEditing(true)}
        ref={editButtonRef}
      >
        Edit
      </button>
      <button
        type="button"
        className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-red-500 border-red-500 hover:bg-red-500"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );

  return (
    <li className="todo stack-small">
      {isEditing ? editingTemplate : viewTemplate}
    </li>
  );
};

export default TodoItem;
