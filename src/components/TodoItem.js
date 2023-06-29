import React, {useEffect, useRef, useState} from 'react';

const TodoItem = (props) => {
    // define a edit mode state to switch between edit and view mode
    const [isEditing, setEditing] = useState(false);
    // define a todo text content state for inline edit
    const [newText, setNewText] = useState('');
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
    }

    // catch esc key to exit editing mode without saving
    // ! NOTE: for some reason onKeyPress does not capture escape key (code 27)
    const handleKeyDown = (e) => {
        if (e.keyCode === 27) {
            if (isEditing) {
                setEditing(false);
            }
        }
    }

    const handleEditSubmit = (e) => {
        // always good practice to prevent default event from form submission
        e.preventDefault();
        props.editTask(todo.id, newText);
        // reset new text value
        setNewText('');
        // exit editing mode
        setEditing(false);
    }

    // Set current state to given value but return its previous state.
    // ! useEffect() takes a function (callback) as an argument and invokes
    // it after main flow, aka the 'return' statement below
    const usePrevious = (value) => {
        const ref = useRef();
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
            editFieldRef.current.focus();
        }
        if (wasEditing && !isEditing) {
            editButtonRef.current.focus();
        }
    }, [isEditing, wasEditing]);


    const editingTemplate = (
        <form className="stack-small" onSubmit={handleEditSubmit}>
            <div className="form-group">
                <label className="todo-label" htmlFor={todo.id}>
                    New content for: {todo.text}
                </label>
                <input id={props.id} className="todo-text" type="text"
                       value={newText}
                       onChange={handleChange}
                       onKeyDown={handleKeyDown}
                       ref={editFieldRef}
                />
            </div>
            <div className="btn-group">
                <button type="button" className="btn todo-cancel"
                        onClick={() => setEditing(false)}>
                    Cancel
                    <span className="visually-hidden">editing {todo.text}</span>
                </button>
                <button type="submit" className="btn btn__primary todo-edit">
                    Save
                    <span
                        className="visually-hidden">new content for: {todo.text}</span>
                </button>
            </div>
        </form>
    );

    const viewTemplate = (
        <div className="stack-small">
            <div className="c-cb">
                <input id={todo.id} type="checkbox"
                       defaultChecked={todo.completed}
                       onChange={() => handleToggle(todo.id)}
                />
                <label className="todo-label" htmlFor={todo.id}>
                    {todo.text}
                </label>
            </div>
            <div className="btn-group">
                <button type="button" className="btn"
                        onClick={() => setEditing(true)}
                        ref={editButtonRef}
                >
                    Edit <span className="visually-hidden">{todo.text}</span>
                </button>
                <button type="button" className="btn btn__danger"
                        onClick={handleDelete}
                >
                    Delete <span className="visually-hidden">{todo.text}</span>
                </button>
            </div>
        </div>);

    return (
        <li className="todo stack-small">
            {isEditing ? editingTemplate : viewTemplate}
        </li>
    );
};

export default TodoItem;
