import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import About from './pages/About';
import Devices from './pages/Devices';
import DevicePanel from './components/DevicePanel';
import CustomPanel from './pages/CustomPanel';
import AddDevicePage from './pages/AddDevicePage';
import DeviceSelectionPage from './pages/DeviceSelectionPage';
import UserSettingsPage from './pages/UserSettingsPage'; // ✅ Yeni Eklendi

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

function AppContent() {
  const location = useLocation();
  const hideLayoutRoutes = [];

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

        {/* 🔓 Herkese Açık Test Panel */}
        <Route path="/panel" element={<DevicePanel />} />

        {/* 🔒 Giriş Gerektiren Sayfalar */}
        <Route path="/custom-panel" element={
          <PrivateRoute>
            <CustomPanel />
          </PrivateRoute>
        } />
        <Route path="/add-device" element={
          <PrivateRoute>
            <AddDevicePage />
          </PrivateRoute>
        } />
        <Route path="/select-device" element={
          <PrivateRoute>
            <DeviceSelectionPage />
          </PrivateRoute>
        } />
        <Route path="/user-settings" element={ // ✅ Yeni Ayar Sayfası Rotası
          <PrivateRoute>
            <UserSettingsPage />
          </PrivateRoute>
        } />
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
