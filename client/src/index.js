import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ModalContextProvider from './context/ModalContext.js';
import UserContextProvider from './context/UserContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <ModalContextProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </ModalContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
