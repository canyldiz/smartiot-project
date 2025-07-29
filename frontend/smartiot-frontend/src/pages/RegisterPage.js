import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Form.css';
import circuitBackground from './circuit-bg.png';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState('');

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isStrongPassword = (password, email) => {
    if (password.length < 8) return 'Password must be at least 8 characters long';
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);
    if (!(hasUpper && hasLower && hasNumber && hasSymbol)) {
      return 'Password must include uppercase, lowercase, number, and symbol';
    }
    if (/\d{3,}/.test(password)) {
      const nums = password.match(/\d+/g);
      if (nums && nums.some(seq => isSequential(seq))) {
        return 'Password must not contain sequential numbers like 1234';
      }
    }
    const emailParts = email.split(/[@._]/).filter(Boolean);
    for (let part of emailParts) {
      if (part && password.toLowerCase().includes(part.toLowerCase())) {
        return 'Password must not contain parts of your email';
      }
    }
    return '';
  };

  const isSequential = (str) => {
    for (let i = 0; i < str.length - 2; i++) {
      const a = str.charCodeAt(i);
      const b = str.charCodeAt(i + 1);
      const c = str.charCodeAt(i + 2);
      if ((b === a + 1) && (c === b + 1)) return true;
    }
    return false;
  };

  const handleRegister = async () => {
    if (!isValidEmail(email)) {
      setMessage('Please enter a valid email address');
      setTimeout(() => setMessage(''), 5000);
      return;
    }

    const passwordError = isStrongPassword(password, email);
    if (passwordError) {
      setMessage(passwordError);
      setTimeout(() => setMessage(''), 5000);
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      setTimeout(() => setMessage(''), 5000);
      return;
    }

    try {
      await axios.post('http://localhost:8080/api/register', {
        email,
        password,
        firstName,
        lastName,
      });
      setMessage('Registration successful');
      setTimeout(() => setMessage(''), 5000);
    } catch (error) {
      setMessage('Registration failed');
      setTimeout(() => setMessage(''), 5000);
    }
  };

  return (
    <div
      className="background-wrapper page-fade"
      style={{ backgroundImage: `url(${circuitBackground})` }}
    >
      <div className="form-container">
        <h2>Register</h2>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <ul className="password-rules">
          <li>At least 8 characters long</li>
          <li>Include uppercase and lowercase letters</li>
          <li>Include at least one number</li>
          <li>Include at least one symbol (e.g. @, #, $)</li>
          <li>Must not contain parts of your email</li>
          <li>Must not contain sequential numbers (e.g. 1234)</li>
        </ul>

        <button onClick={handleRegister}>Register</button>

        {message && <div className="error-box">{message}</div>}

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
