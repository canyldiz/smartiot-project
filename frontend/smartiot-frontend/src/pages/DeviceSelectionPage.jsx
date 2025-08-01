import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Devices.css';
import '../components/Buttons.css'; // ✅ Özel buton stilleri eklendi

const DeviceSelectionPage = () => {
  const [devices, setDevices] = useState([]);
  const [userDevices, setUserDevices] = useState([]);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);
  const [assignedNames, setAssignedNames] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      setMessage("⚠️ You must be logged in.");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    const fetchData = async () => {
      try {
        const [deviceRes, userDeviceRes] = await Promise.all([
          axios.get('http://localhost:8080/api/device'),
          axios.get(`http://localhost:8080/api/user-devices/user/${parsedUser.id}`)
        ]);

        setDevices(deviceRes.data.filter(d => d.active));
        setUserDevices(userDeviceRes.data);
      } catch (err) {
        console.error('Veriler alınamadı:', err);
      }
    };

    fetchData();
  }, []);

  const handleAddDevice = async (device) => {
    const name = assignedNames[device.id] || device.deviceName;
    try {
      const res = await axios.post('http://localhost:8080/api/user-devices', {
        user: { id: user.id },
        device: { id: device.id },
        assignedName: name
      });
      setUserDevices(prev => [...prev, res.data]);
      setMessage(`✅ ${name} added.`);
    } catch (err) {
      console.error(err);
      setMessage(`❌ Failed to add ${name}.`);
    }
  };

  const handleDeactivateDevice = async (userDeviceId) => {
    try {
      await axios.put(`http://localhost:8080/api/user-devices/${userDeviceId}/status?active=false`);
      setUserDevices(prev =>
        prev.map(ud => ud.id === userDeviceId ? { ...ud, active: false } : ud)
      );
      setMessage("❌ Device deactivated.");
    } catch (err) {
      console.error("Kaldırma hatası:", err);
      setMessage("❌ Failed to deactivate.");
    }
  };

  const getUserDevicesByDeviceId = (deviceId) =>
    userDevices.filter(ud => ud.device.id === deviceId && ud.active);

  return (
    <div className="panel-container">
      <h2>🧩 Add Devices to Your Account</h2>
      {message && <p>{message}</p>}
      <div className="device-grid">
        {devices.map(device => {
          const matchingDevices = getUserDevicesByDeviceId(device.id);
          return (
            <div className="device-card" key={device.id}>
              <h3>{device.deviceName}</h3>
              <p>Model: {device.deviceModel}</p>

              <input
                type="text"
                placeholder="Assign a name"
                value={assignedNames[device.id] || ''}
                onChange={(e) =>
                  setAssignedNames({ ...assignedNames, [device.id]: e.target.value })
                }
              />

              {/* ➕ Ekle Butonu */}
              <button
                onClick={() => handleAddDevice(device)}
                className="device-button add"
              >
                ➕ Add
              </button>

              {/* ❌ Mevcut Atanmış Cihazlar */}
              {matchingDevices.length > 0 && (
                <div className="assigned-list">
                  <p>🔗 Assigned:</p>
                  <ul>
                    {matchingDevices.map((ud) => (
                      <li key={ud.id}>
                        <span>🧾 {ud.assignedName}</span>
                        <button
                          className="device-button remove"
                          onClick={() => handleDeactivateDevice(ud.id)}
                        >
                          ❌ Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeviceSelectionPage;
