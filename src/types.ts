export interface Todo {
  id: string | number;
  text: string;
  completed: boolean;
}

export interface TodoItemProps {
  todo: Todo;
  deleteTodo: (id: string | number) => void;
  toggleTodo: (id: string | number) => void;
  editTodo: (id: string | number, newText: string) => void;
}

export interface TodoListProps {
  todos: Todo[];
  deleteTodo: (id: string | number) => void;
  toggleTodo: (id: string | number) => void;
  editTodo: (id: string | number, newText: string) => void;
}

export interface TodoAddFormProps {
  addTodo: (text: string) => void;
}

export interface FilterButtonProps {
  name: string;
  currentFilter: string;
  setFilter: (filter: string) => void;
}

export interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}
