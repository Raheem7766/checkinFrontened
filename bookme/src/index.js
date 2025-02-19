import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BusSearchProvider, UseProvider } from './components/context/context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BusSearchProvider>
      <App />
    </BusSearchProvider>
  </React.StrictMode>
);


