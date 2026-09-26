import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Base styles first so component styles can override them.
import './styles/tokens.css';
import './styles/global.css';
import './styles/sections.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
