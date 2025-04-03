import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';

// Для MobX (если используете декораторы)
import { enableStaticRendering } from 'mobx-react';
enableStaticRendering(typeof window === 'undefined');

// Получаем корневой элемент
const container = document.getElementById('root');
const root = createRoot(container);

// Рендерим приложение
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);