import { Todo } from "./types";

const API_URL = "http://localhost:3001/todos";

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

// Create a new todo
async function createTodo(todo: Omit<Todo, "id">): Promise<Todo> {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    if (!response.ok) {
      throw new ApiError(response.status, `Failed to create todo: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new Error("Failed to connect to server. Please ensure JSON server is running on port 3001.");
  }
}

// Read all todos
async function readTodos(): Promise<Todo[]> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new ApiError(response.status, `Failed to fetch todos: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new Error("Failed to connect to server. Please ensure JSON server is running on port 3001.");
  }
}

// Update a todo
async function updateTodo(
  id: string | number,
  updatedTodo: Todo,
): Promise<Todo> {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    });
    if (!response.ok) {
      throw new ApiError(response.status, `Failed to update todo: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new Error("Failed to connect to server. Please ensure JSON server is running on port 3001.");
  }
}

// Delete a todo
async function deleteTodo(id: string | number): Promise<Todo> {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new ApiError(response.status, `Failed to delete todo: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new Error("Failed to connect to server. Please ensure JSON server is running on port 3001.");
  }
}

// Package all the functions into a TodoAPI object
const TodoAPI = {
  create: createTodo,
  read: readTodos,
  update: updateTodo,
  delete: deleteTodo,
};

export default TodoAPI;
