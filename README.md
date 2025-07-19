# React Todo App

A modern React todo application with TypeScript, Vite, and Docker support.

## Tech Stack

- **Frontend**: React 18.3.1, TypeScript 5.8.3
- **Build**: Vite 5.4.9
- **Styling**: Tailwind CSS 3.4.14 with dark mode
- **Testing**: Vitest 2.1.3
- **Backend**: json-server (mock API)
- **Container**: Docker with nginx:alpine

## Quick Start

```bash
# Install dependencies
npm install

# Start development
npm run dev

# Start mock backend
npm run jsonserver
```

## Scripts

| Command              | Purpose            |
| -------------------- | ------------------ |
| `npm run dev`        | Development server |
| `npm run build`      | Production build   |
| `npm run lint`       | ESLint             |
| `npm run type-check` | TypeScript         |
| `npm test`           | Tests              |
| `npm run jsonserver` | Mock API           |

## Docker

```bash
# Build and run
docker build -t todo-app . && docker run --rm -p 8080:80 todo-app
```

## Project Structure

```
src/
├── components/          # React components
│   ├── TodoApp.tsx      # Main app
│   ├── TodoList.tsx     # List display
│   ├── TodoItem.tsx     # Individual item
│   ├── TodoAddForm.tsx  # Add form
│   ├── FilterButton.tsx # Filters
│   └── ThemeToggle.tsx  # Dark mode
├── types.ts             # TypeScript interfaces
├── TodoAPI.ts           # API client
└── main.tsx            # Entry point
```

## API Endpoints

- **GET** `/todos` - Get all
- **POST** `/todos` - Create
- **PUT** `/todos/:id` - Update
- **DELETE** `/todos/:id` - Delete
