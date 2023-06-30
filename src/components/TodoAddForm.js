import React, {useState} from 'react';

const TodoAddForm = ({addTodo}) => {
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
        <div className="mb-4">
            <form onSubmit={handleSubmit}>
                <div className="flex mt-4">
                    <input id="new-todo-input"
                           type="text"
                           className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-500"
                           placeholder="What needs to be done?"
                           autoComplete="off"
                           value={todoText}
                           onChange={handleInputChange}
                    />
                    <button type="submit"
                            className="flex-no-shrink p-1 border-1 rounded text-teal-500 border-teal-500 hover:text-white hover:bg-teal-500">
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TodoAddForm;
