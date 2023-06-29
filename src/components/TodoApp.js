import React, {useState} from 'react';
import TodoList from './TodoList';
import TodoAddForm from './TodoAddForm';
import FilterButton from "./FilterButton";

// In React, the TodoApp.js is considered as a component.
// The App component serves as the entry point and the main container for other
// components.
// It can contain the overall structure, layout, and logic of Todo domain.

// * filter functions and names
// ! NOTE that these are defined outside of App function to avoid recalculation
//   every time <App /> component re-renders
const FILTER_MAP = {
    All: () => true,
    Active: task => !task.completed,
    Completed: task => task.completed
};
const FILTER_NAMES = Object.keys(FILTER_MAP);


const TodoApp = (props) => {
    const [todos, setTodos] = useState(props.todos);

    // configure todos list filter
    const [filter, setFilter] = useState('All');


    // For component methods, it is recommended to implement them as
    // arrow functions over regular named functions.
    // - arrow functions holds `this` value from surrounding context
    // - since arrow function doesn't have its own `this`, it avoids function
    //   rebinding when it is passed as callback

    const addTodo = (text) => {
        console.log('add todo: ' + text);
        const newTodo = {
            id: Date.now(),
            text,
            completed: false,
        };
        setTodos([...todos, newTodo]);
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const toggleTodo = (id) => {
        console.log('toggleTaskCompleted ' + id);
        setTodos(
            todos.map((todo) =>
                // use object spread to update one key value pair
                todo.id === id ? {...todo, completed: !todo.completed} : todo
            )
        );
    };

    const editTodo = (id, newText) => {
        const editedTodos = todos.map(todo => {
            if (id === todo.id) {
                return {...todo, name: newText};
            }
            return todo
        })
        setTodos(editedTodos);
    }

    const filterButtonList = FILTER_NAMES.map(filterName => (
        <FilterButton key={filterName} name={filterName}
                      setFilter={setFilter}
        />
    ));

    const filteredTodos = todos.filter(FILTER_MAP[filter]);

    return (
        <div className="todoapp stack-large">
            <h1>My Todos</h1>
            <h2 id="list-heading">
                {todos.length} {todos.length !== 1 ? 'tasks' : 'task'}
                ,&nbsp;
                {todos.filter(todo => !todo.completed).length} remaining
            </h2>

            <div className="filters btn-group stack-exception">
                {filterButtonList}
            </div>

            <TodoList todos={filteredTodos}
                      deleteTodo={deleteTodo}
                      toggleTodo={toggleTodo}
                      editTodo={editTodo}
            />
            <TodoAddForm addTodo={addTodo} todos={todos}/>
        </div>
    );
};

export default TodoApp;
