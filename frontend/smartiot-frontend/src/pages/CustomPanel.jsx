// src/pages/CustomPanel.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ServoPanel from '../components/ServoPanel';
import RfidPanel from '../components/RfidPanel';
import LedPanel from '../components/LedPanel';
import BuzzerPanel from '../components/BuzzerPanel';
import SensorPanel from '../components/SensorPanel';

import './Devices.css';
import '../components/Buttons.css'; // ✅ Yeni stil dosyasını ekledik

const CustomPanel = () => {
  const [devices, setDevices] = useState([]);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      setMessage("⚠️ You must be logged in to view your custom panel.");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    fetchDevices(parsedUser.id);
  }, []);

  const fetchDevices = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/user-devices/user/${userId}`);
      const activeDevices = response.data.filter(device =>
        device.active && device.device && device.device.active
      );
      setDevices(activeDevices);
    } catch (error) {
      console.error('Cihazlar alınırken hata oluştu:', error);
      setMessage("❌ Device loading failed.");
    }
  };

  const handleRemove = async (deviceId) => {
    try {
      await axios.put(`http://localhost:8080/api/user-devices/${deviceId}/status?active=false`);
      setDevices(prev => prev.filter(d => d.id !== deviceId));
      setMessage("🗑️ Device removed from your panel.");
    } catch (err) {
      console.error("Kaldırma hatası:", err);
      setMessage("❌ Failed to remove device.");
    }
  };

  const renderDevicePanel = (device) => {
    const model = device.device.deviceModel.toLowerCase();
    if (model.includes('servo')) return <ServoPanel key={`panel-${device.id}`} />;
    if (model.includes('rfid')) return <RfidPanel key={`panel-${device.id}`} />;
    if (model.includes('led')) return <LedPanel key={`panel-${device.id}`} />;
    if (model.includes('buzzer')) return <BuzzerPanel key={`panel-${device.id}`} />;
    if (model.includes('dht') || model.includes('sensor')) return <SensorPanel key={`panel-${device.id}`} />;
    return <div key={`panel-${device.id}`}>❓ Unknown device type: {model}</div>;
  };

  if (!user) {
    return (
      <div className="panel-container">
        <h2>🔧 My Custom Device Panel</h2>
        <p>{message}</p>
      </div>
    );
  }

  return (
    <div className="panel-container">
      <h2>🔧 My Custom Device Panel</h2>
      {message && <p>{message}</p>}
      {devices.length === 0 ? (
        <p>No active devices assigned to your account.</p>
      ) : (
        <div className="device-grid">
          {devices.map(device => (
            <div className="device-card" key={device.id}>
              <h3>
                {device.assignedName
                  ? `🔧 ${device.assignedName}`
                  : device.device?.deviceName
                    ? `🔧 ${device.device.deviceName}`
                    : '🔧 Unknown Device'}
              </h3>

              {renderDevicePanel(device)}

              {/* ❌ Remove button */}
              <button
                className="device-button remove"  // ✅ Sadece className verdik
                onClick={() => handleRemove(device.id)}
              >
                ❌ Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomPanel;
