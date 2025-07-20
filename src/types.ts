export interface Todo {
  id: string | number;
  text: string;
  completed: boolean;
}

export interface TodoHandlers {
  addTodo: (text: string) => void;
  deleteTodo: (id: string | number) => void;
  toggleTodo: (id: string | number) => void;
  editTodo: (id: string | number, newText: string) => void;
}

export interface ThemeToggleProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}
