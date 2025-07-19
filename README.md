# Modern React Todo App with TypeScript

A fully modernized React todo application featuring TypeScript, Vite, Tailwind CSS, and Docker support.

## 🚀 Features

- **Modern React 18** with TypeScript and functional components
- **Vite** build system for fast development and optimized builds
- **Tailwind CSS 3.4** with dark mode support
- **TypeScript** for type safety and better development experience
- **Docker** containerization with multi-stage builds
- **GitHub Actions** CI/CD pipeline
- **Responsive design** with smooth animations
- **Dark/light mode** with system preference detection

## 📋 Tech Stack

- **Frontend**: React 18.3.1, TypeScript 5.8.3
- **Build Tool**: Vite 5.4.9
- **Styling**: Tailwind CSS 3.4.14
- **Testing**: Vitest 2.1.3
- **Linting**: ESLint 9.13.0
- **Backend**: json-server (mock API)
- **Container**: Docker with nginx:alpine

## 🛠️ Development Setup

### Prerequisites
- Node.js 22+ (LTS)
- npm

### Quick Start
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start mock backend (in another terminal)
npm run jsonserver
```

Access the app at `http://localhost:3000`

## 🧪 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript compiler |
| `npm test` | Run tests |
| `npm run test:ci` | Run tests in CI mode |
| `npm run jsonserver` | Start mock backend |
| `npm run prettier` | Format code |
| `npm run prettier:check` | Check code formatting |

## 🐳 Docker Usage

### Build and run locally:
```bash
# Build the image (supports Linux/AMD64 and ARM64)
docker build -t todo-app:latest .

# Run the container
docker run -d -p 8080:80 todo-app:latest

# Access at http://localhost:8080
```

### Multi-platform support:
```bash
# Build for specific platforms
# Linux/AMD64 (Intel, AMD)
docker build --platform linux/amd64 -t todo-app:amd64 .

# Linux/ARM64 (Apple Silicon M1/M2/M3/M4)
docker build --platform linux/arm64 -t todo-app:arm64 .

# Buildx for multi-platform (experimental)
docker buildx build --platform linux/amd64,linux/arm64 -t todo-app:multi .
```

## 🌙 Dark Mode

The app includes a dark mode toggle that:
- Respects system preferences
- Saves user preference to localStorage
- Provides smooth transitions

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── TodoApp.tsx      # Main app component
│   ├── TodoList.tsx     # Todo list display
│   ├── TodoItem.tsx     # Individual todo item
│   ├── TodoAddForm.tsx  # Add todo form
│   ├── FilterButton.tsx # Filter buttons
│   └── ThemeToggle.tsx  # Dark mode toggle
├── types.ts             # TypeScript interfaces
├── TodoAPI.ts           # API client
└── main.tsx            # Entry point
```

## 🔄 CI/CD

GitHub Actions automatically run on PR:
- ✅ Linting with ESLint
- ✅ Type checking with TypeScript
- ✅ Testing with Vitest
- ✅ Build verification
- ✅ Docker image build

## 🚀 Deployment

### Manual deployment:
```bash
npm run build
# Serve dist/ folder with any static server
```

### Docker deployment:
```bash
docker run -d -p 80:80 todo-app:latest
```

## 📱 Responsive Design

The app is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px+)
- Mobile (320px+)

## 🔧 Development Tips

### Clear npm cache:
```bash
npm cache verify
npm cache clean --force
```

### Environment variables:
Create `.env` file for custom configuration:
```bash
VITE_API_URL=http://localhost:3001/todos
```

## 📝 Backend API

The app uses json-server for CRUD operations:
- **GET** `/todos` - Get all todos
- **POST** `/todos` - Create new todo
- **PUT** `/todos/:id` - Update todo
- **DELETE** `/todos/:id` - Delete todo

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm test`
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for your own learning and development.