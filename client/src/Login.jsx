import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupSuccess, setPopupSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === '' || password === '') {
      setPopupMessage('Please fill in all fields.');
      setPopupSuccess(false);
      setPopupVisible(true);
      return;
    }

    try {
      const result = await axios.post('http://localhost:3001/login', { email, password });

      if (result.data === 'Login Success') {
        setPopupMessage('Login successful! Redirecting...');
        setPopupSuccess(true);
        setPopupVisible(true);

        // Redirect to /home after a short delay
        setTimeout(() => {
          // navigate('/home');
          window.location.href = 'http://localhost:3001/';
        }, 1500);
      } else {
        setPopupMessage(result.data); // Show error message from server
        setPopupSuccess(false);
        setPopupVisible(true);
      }
    } catch (error) {
      setPopupMessage('An error occurred. Please try again.');
      setPopupSuccess(false);
      setPopupVisible(true);
      console.error(error);
    }
  };

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
    if (popupSuccess) {
      navigate('/home'); // Ensure navigation happens when the popup is closed after success
    }
  };

  return (
    <div className="App login-register-background">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i
              className={`bx ${passwordVisible ? 'bx-hide' : 'bx-show'}`}
              onClick={togglePassword}
              style={{ cursor: 'pointer', marginLeft: '10px' }}
            ></i>
          </div>
          <button type="submit" className="btn">
            Login
          </button>
          <div className="register-link">
            <p>
              Don't have an account?{' '}
              <Link to="/register">Register</Link>
            </p>
            <p>
              <Link to="http://localhost:3001/" className="back-to-home">Back to Home</Link>
            </p>
          </div>
        </form>
      </div>

      <div className={`popup ${popupVisible ? 'open-popup' : ''}`}>
        <img
          src={popupSuccess ? 'icons/tick.png' : 'icons/error.png'}
          alt={popupSuccess ? 'Success' : 'Error'}
        />
        <h2>{popupSuccess ? 'Success' : 'Error'}</h2>
        <p>{popupMessage}</p>
        <button onClick={handleClosePopup}>Ok</button>
      </div>
    </div>
  );
};

export default Login;