# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Modern React 18 todo application with Vite, TypeScript-ready, featuring dark mode, responsive design, and modern UI patterns.

## 🚀 Current Stack

- **Frontend**: React 18.3.1 with functional components and hooks
- **Build Tool**: Vite 5.4.9 (migrated from Create React App)
- **Styling**: Tailwind CSS 3.4.14 with custom design tokens and dark mode
- **Testing**: Vitest 2.1.3 with React Testing Library
- **Backend**: JSON-server 1.0.0-beta.3 for mock REST API
- **TypeScript**: Configured and ready for migration
- **Linting**: ESLint 9.x with modern React rules

## 📁 Project Structure

```
src/
├── components/          # React components (TSX format)
│   ├── TodoApp.tsx     # Main container with dark mode state
│   ├── TodoList.tsx    # Renders todo list with empty state
│   ├── TodoItem.tsx    # Individual todo with edit/delete/toggle
│   ├── TodoAddForm.tsx # Input form for adding new todos
│   ├── FilterButton.tsx # Filter buttons (All/Active/Completed)
│   └── ThemeToggle.tsx # Dark mode toggle component
├── __tests__/          # Test files
│   └── TodoAPI.test.tsx
├── test/               # Test configuration
│   └── setup.js
├── TodoAPI.ts          # REST API client (TypeScript)
├── types.ts            # TypeScript interfaces
├── main.tsx            # React 18 root rendering (Vite entry)
└── tailwind.css        # Tailwind CSS with all utilities
```

## 🛠️ Development Commands

### Setup & Development

```bash
npm install          # Install dependencies
npm run dev          # Start Vite dev server (port 3000)
npm run jsonserver   # Start mock backend (port 3001)
```

### Build & Testing

```bash
npm run build        # Build for production to /dist
npm run test         # Run tests with Vitest
npm run preview      # Preview production build
npm run lint         # Run ESLint (required before commit)
npm run type-check   # Run TypeScript compiler
npm run prettier     # Format code with Prettier
```

### Development Workflow

1. Start backend: `npm run jsonserver`
2. Start frontend: `npm run dev`
3. Run linting: `npm run lint` (required before commit)
4. Run type checking: `npm run type-check`
5. Open: http://localhost:3000

### Pre-commit Checklist

```bash
npm run lint         # ✅ ESLint check
npm run type-check   # ✅ TypeScript check
npm run test:ci      # ✅ Test suite
npm run build        # ✅ Production build
```

## 🎯 Key Features

### ✅ Completed Features

- **React 18** with new root API
- **Vite** build system (replaced CRA)
- **Dark Mode** with system preference detection
- **Modern UI** with animations and responsive design
- **Accessibility** with ARIA labels and keyboard navigation
- **Empty State** messaging when no todos exist
- **TypeScript** configuration ready
- **Modern testing** setup with Vitest

### 🎨 UI/UX Features

- **Gradient backgrounds** with dark/light mode
- **Smooth animations** (fade-in, slide-up, scale-in)
- **Responsive design** for all screen sizes
- **Modern form styling** with focus states
- **Hover effects** and micro-interactions
- **Card-based layout** with soft shadows

## 📊 API Endpoints

- **Base**: `http://localhost:3001/todos`
- **CRUD**: GET, POST, PUT, DELETE
- **Data Format**: `{ id: string|number, text: string, completed: boolean }`

## 🌙 Dark Mode

- **Automatic detection** via `prefers-color-scheme`
- **Manual toggle** with localStorage persistence
- **Smooth transitions** between themes
- **Proper contrast ratios** throughout

## 🏗️ Build Configuration

- **Vite** for fast development and building
- **Tailwind CSS** with custom color palette and animations
- **ESLint** with React hooks and accessibility rules
- **Prettier** for consistent code formatting
- **TypeScript** ready for gradual migration

## 🧪 Testing Setup

- **Vitest** for fast unit testing
- **React Testing Library** for component testing
- **Test setup** configured for Vite/React

## 🔄 Migration Summary

- **React**: 17.0.1 → 18.3.1
- **Build**: CRA → Vite (10x faster builds)
- **Styling**: Basic Tailwind → Modern design system
- **Testing**: Jest → Vitest
- **TypeScript**: Added configuration
- **UI**: Basic → Modern with dark mode

## 🚀 Next Steps (Optional)

1. **TypeScript migration**: Rename .jsx → .tsx files
2. **State management**: Add Zustand for complex state
3. **API**: Replace JSON-server with real backend
4. **Testing**: Add component tests
5. **Performance**: Add React.memo optimizations
