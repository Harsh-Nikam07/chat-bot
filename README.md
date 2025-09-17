# AI Chat Bot

A modern, responsive interface for interacting with various AI models. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

### Core Components

- **Model Selection**: Dynamic dropdown menu for choosing between different AI models (GPT-4, GPT-3.5-turbo, Claude, Gemini Pro, etc.)
- **Prompt Editor**: Rich text area with real-time character count and template support
- **Parameters Panel**: Fine-tune model behavior with adjustable settings:
  - Temperature (creativity vs consistency)
  - Max Tokens (response length)
  - Top P (sampling threshold)
  - Frequency/Presence Penalties (repetition control)
- **Chat Interface**: Clean, responsive design with user/assistant messages and actions

### Advanced Features

- **Theme Support**: System-aware dark/light mode with smooth transitions
- **Template Library**: Pre-built prompts for common use cases (creative writing, code review, etc.)
- **Responsive Design**: Mobile-first approach with collapsible sidebar
- **State Management**: Context-based state management for app-wide data
- **Error Handling**: Graceful error states and loading indicators

## Technical Implementation

### Technology Stack

- **Frontend**: Next.js 15 with React 19
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS with custom theme variables
- **Animations**: Framer Motion for smooth transitions
- **Icons**: Lucide React for consistent iconography

### Key Design Decisions

1. **Theme System**
- CSS variables for dynamic theme switching
- System preference detection with manual override
- Persistent theme storage using localStorage

2. **Component Architecture**
- Functional components with TypeScript interfaces
- Custom hooks for theme and local storage
- Context providers for global state management

3. **API Integration**
- Mock API endpoints for development
- Structured response handling
- Loading states and error boundaries

### Project Structure

```
src/
├── app/              # Next.js app router
├── components/       # Reusable UI components
├── context/         # React context providers
├── data/           # Mock data and constants
├── hooks/          # Custom React hooks
└── types/          # TypeScript interfaces
```

## Development

1. **Prerequisites**
- Node.js 18+
- npm or yarn

2. **Installation**
```bash
npm install
```

3. **Running Development Server**
```bash
npm run dev
```

4. **Building for Production**
```bash
npm run build
```

## Design Principles

- **Accessibility**: ARIA labels and keyboard navigation
- **Responsiveness**: Mobile-first design with breakpoints
- **Performance**: Optimized rendering with React hooks
- **Maintainability**: TypeScript for type safety
- **User Experience**: Smooth animations and transitions
