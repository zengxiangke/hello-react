import { createRoot } from 'react-dom/client';
import App from './App';
import { StrictMode } from 'react';

renderApp();

function renderApp() {
  const container = document.getElementById('app')!;
  debugger;
  createRoot(container).render(<App />);
}
