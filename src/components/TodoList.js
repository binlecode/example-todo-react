import React from "react";
import TodoItem from "./TodoItem";

const TodoList = (props) => {
  const todos = props.todos;
  // const todoList = props.todos.filter((FILTER_MAP[props.filter]));

  return (
    <ul
      className="todo-list stack-large stack-exception"
      aria-labelledby="list-heading"
    >
      {todos.map((todo) => (
        <TodoItem
          id={todo.id}
          key={todo.id}
          todo={todo}
          deleteTodo={props.deleteTodo}
          toggleTodo={props.toggleTodo}
          editTodo={props.editTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
