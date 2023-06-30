import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import './tailwind.css';
import reportWebVitals from './reportWebVitals';

import TodoApp from './components/TodoApp';

const DATA = [
    {id: "todo-0", text: "Eat", completed: true},
    {id: "todo-1", text: "Sleep", completed: false},
    {id: "todo-2", text: "Repeat", completed: false}
]

ReactDOM.render(
    <React.StrictMode>
        <TodoApp todos={DATA}/>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
