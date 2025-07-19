import { Todo } from './types';

const API_URL = "http://localhost:3001/todos";

// Create a new todo
async function createTodo(todo: Omit<Todo, 'id'>): Promise<Todo> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  return response.json();
}

// Read all todos
async function readTodos(): Promise<Todo[]> {
  const response = await fetch(API_URL);
  return response.json();
}

// Update a todo
async function updateTodo(id: string | number, updatedTodo: Todo): Promise<Todo> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTodo),
  });
  return response.json();
}

// Delete a todo
async function deleteTodo(id: string | number): Promise<Todo> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return response.json();
}

// Package all the functions into a TodoAPI object
const TodoAPI = {
  create: createTodo,
  read: readTodos,
  update: updateTodo,
  delete: deleteTodo,
};

export default TodoAPI;
