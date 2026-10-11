// motion.js is the design system's vanilla motion runtime. It must run before
// the first render so .motion-ready arms reveals without a flash.
import '../../design-system/assets/motion.js';
import './styles.css';
import './site.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <App />
  </BrowserRouter>
);
