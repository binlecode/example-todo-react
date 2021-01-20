// import logo from './logo.svg';
// import './App.css';
import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import {useState} from 'react';
import {nanoid} from 'nanoid';

// * filter functions and names
// ! NOTE that these are defined outside of App function to avoid recalculation
//   every time <App /> component re-renders
const FILTER_MAP = {
    All: () => true,
    Active: task => !task.completed,
    Completed: task => task.completed
};
const FILTER_NAMES = Object.keys(FILTER_MAP);


function App(props) {
    const [tasks, setTasks] = useState(props.tasks);
    const [filter, setFilter] = useState('All');

    const filterList = FILTER_NAMES.map(filterName => (
        <FilterButton key={filterName} name={filterName}
                      setFilter={setFilter}
        />
    ));

    // NOTE taskList is a task list view after filtering
    const taskList = tasks
        .filter((FILTER_MAP[filter]))
        .map(task => (
            <Todo id={task.id}
                  name={task.name}
                  completed={task.completed}
                  key={task.id}
                  toggleTaskCompleted={toggleTaskCompleted}
                  deleteTask={deleteTask}
                  editTask={editTask}
            />
        ));

    function addTask(name) {
        console.log('add task ' + name);
        const newTask = {id: 'todo-' + nanoid(), name: name, completed: false};
        setTasks([...tasks, newTask]);
    }

    function toggleTaskCompleted(id) {
        console.log('toggleTaskCompleted ' + id);
        const updatedTasks = tasks.map(task => {
            if (id === task.id) {
                // * use object spread to update one key value pair
                return {...task, completed: !task.completed}
            }
            return task;
        });
        setTasks(updatedTasks);
    }

    function editTask(id, newName) {
        const editedTasks = tasks.map(task => {
            if (id === task.id) {
                return {...task, name: newName};
            }
            return task
        })
        setTasks(editedTasks);
    }

    function deleteTask(id) {
        console.log('deleteTask ' + id);
        const remainingTasks = tasks.filter(task => task.id !== id);
        setTasks(remainingTasks);
    }

    return (
        <div className="todoapp stack-large">
            <h1>TodoMatic</h1>
            {/* pass callback function to component */}
            <Form addTask={addTask}/>

            <div className="filters btn-group stack-exception">
                {filterList}
            </div>
            <h2 id="list-heading">
                {taskList.length} {taskList.length !== 1 ? 'tasks' : 'task'} remaining
            </h2>
            <ul
                className="todo-list stack-large stack-exception"
                aria-labelledby="list-heading"
            >
                {taskList}
            </ul>
        </div>
    );
}


export default App;
