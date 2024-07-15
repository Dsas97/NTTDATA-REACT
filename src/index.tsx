import React from 'react';
import ReactDOM from 'react-dom/client';
import { BanckApp } from './BanckApp';
import reportWebVitals from './reportWebVitals';
import './styles/styles.css';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <BanckApp />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
