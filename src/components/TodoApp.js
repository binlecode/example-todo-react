import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import TodoAddForm from "./TodoAddForm";
import FilterButton from "./FilterButton";
import TodoAPI from "../TodoAPI";

// In React, the TodoApp.js is considered as a component.
// The App component serves as the entry point and the main container for other
// components.
// It can contain the overall structure, layout, and logic of Todo domain.

// * filter functions and names
// ! NOTE that these are defined outside of App function to avoid recalculation
//   every time <App /> component re-renders
const FILTER_MAP = {
  All: () => true,
  Active: (todo) => !todo.completed,
  Completed: (todo) => todo.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

const TodoApp = () => {
  const [todos, setTodos] = useState([]);

  // fetch todos from API for initial render
  useEffect(() => {
    TodoAPI.read().then((data) => setTodos(data));
  }, []);

  // configure todos list filter
  const [filter, setFilter] = useState("All");

  // For component methods, it is recommended to implement them as
  // arrow functions over regular named functions.
  // - arrow functions holds `this` value from surrounding context
  // - since arrow function doesn't have its own `this`, it avoids function
  //   rebinding when it is passed as callback

  const addTodo = (text) => {
    console.log("add todo: " + text);
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    // call API to create new todo
    TodoAPI.create(newTodo);
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id) => {
    // call API to delete todo
    TodoAPI.delete(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    console.log("toggleTodoCompleted " + id);
    // call API to update todo
    const todo = todos.find((todo) => todo.id === id);
    TodoAPI.update(id, { ...todo, completed: !todo.completed });

    setTodos(
      todos.map((todo) =>
        // use object spread to update one key value pair
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const editTodo = (id, newText) => {
    console.log("edit todo: " + id + ", text: " + newText);
    const editedTodos = todos.map((todo) => {
      if (id === todo.id) {
        return { ...todo, text: newText };
      }
      return todo;
    });
    // call API to update todo
    const todo = editedTodos.find((todo) => todo.id === id);
    TodoAPI.update(id, todo);

    setTodos(editedTodos);
  };

  const filterButtonList = FILTER_NAMES.map((filterName) => (
    <FilterButton
      key={filterName}
      name={filterName}
      currentFilter={filter}
      setFilter={setFilter}
    />
  ));

  const filteredTodos = todos.filter(FILTER_MAP[filter]);

  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-50 font-sans">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-8/11 lg:max-w-lg">
        <h1 className="p-5 text-3xl text-center text-gray-500">My Todos</h1>
        <h2 className="p-1 text-2xl text-gray-500">
          {todos.length} {todos.length !== 1 ? "todos" : "todo"}
          ,&nbsp;
          {todos.filter((todo) => !todo.completed).length} remaining
        </h2>
        <hr className="text-gray-200" />

        <TodoAddForm addTodo={addTodo} />

        <div className="flex mt-4">{filterButtonList}</div>

        <TodoList
          todos={filteredTodos}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
          editTodo={editTodo}
        />
      </div>
    </div>
  );
};

export default TodoApp;
