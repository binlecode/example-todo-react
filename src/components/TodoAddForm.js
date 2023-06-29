import React, {useState} from 'react';

const TodoAddForm = ({addTodo, todos}) => {
    const [todoText, setTodoText] = useState('');

    const handleInputChange = (e) => {
        setTodoText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (todoText.trim() === '') {
            return;
        }
        addTodo(todoText.trim());
        setTodoText('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="label-wrapper">
                <label htmlFor="new-todo-input" className="label__lg">
                    What
                    {todos.length > 0 ? " else " : " "}
                    needs to be done?
                </label>
            </h2>
            <input id="new-todo-input"
                   type="text"
                   className="input input__lg"
                   placeholder="Add a new todo"
                   autoComplete="off"
                   value={todoText}
                   onChange={handleInputChange}
            />
            <button type="submit" className="btn btn__primary btn__lg">
                Add
            </button>
        </form>
    );
};

export default TodoAddForm;
