// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Pages/loginPage/Login';
import RegisterForm from './components/RegisterForm/RegisterForm';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/components/RegisterForm/RegisterForm.tsx" element={<RegisterForm />} />
      </Routes>
    </Router>
  );
};

export default App;
