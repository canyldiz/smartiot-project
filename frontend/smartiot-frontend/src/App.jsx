import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import About from './pages/About';
import Devices from './pages/Devices';
import DevicePanel from './components/DevicePanel';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute'; // ✅ Koruma bileşeni eklendi

function AppContent() {
  const location = useLocation();
  const hideLayoutRoutes = []; // Tüm sayfalarda Navbar ve Footer gösteriliyor

  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/devices" element={<Devices />} />

        {/* ✅ Sadece giriş yapılmışsa erişilebilen panel */}
        <Route
          path="/panel"
          element={
            <PrivateRoute>
              <DevicePanel />
            </PrivateRoute>
          }
        />
      </Routes>
      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
