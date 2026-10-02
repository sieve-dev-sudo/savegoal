import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { GoalProvider } from './context/GoalContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <GoalProvider>
          <App />
        </GoalProvider>
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>
);
