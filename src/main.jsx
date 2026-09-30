import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { GoalProvider } from './context/GoalContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <GoalProvider>
        <App />
      </GoalProvider>
    </ToastProvider>
  </StrictMode>
);
