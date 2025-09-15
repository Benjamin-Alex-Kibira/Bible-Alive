/**
 * ---------------------------------------------------------
 *   Project: Bible Stories Alive
 *   Visionary & Creator: Benjamin Alex K
 *   © 2025 - All rights reserved
 *   Unique Signature: BSA-25-UniqueMark-BenjaminAlexK
 * ---------------------------------------------------------
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);