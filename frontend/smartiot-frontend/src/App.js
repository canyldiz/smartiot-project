import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DevicePanel from './components/DevicePanel';
import Home from './pages/Home'; // ✅ yeni eklendi

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/panel" element={<DevicePanel />} />
      </Routes>
    </Router>
  );
}

export default App;
