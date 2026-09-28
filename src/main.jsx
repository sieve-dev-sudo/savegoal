import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { GoalProvider } from './context/GoalContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoalProvider>
      <App />
    </GoalProvider>
  </StrictMode>
);
