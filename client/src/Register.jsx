import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';
import axios from 'axios';

const Register = () => {
  const [isRegistering, setIsRegistering] = useState(true);
  const [popupVisible, setPopupVisible] = useState(false);
  const [name, setName] = useState(''); // Add name state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === '' || password === '' || name === '') {
      alert('Please fill in all fields.');
    } else if (password.length < 6)  {
      alert('Password must be at least 6 characters long.');
    } else if (isRegistering && password !== confirmPassword) {
      alert('Passwords do not match.');
    } else {
      axios.post('http://localhost:3001/register', { name, email, password }) // Send name
        .then((result) => {
          console.log(result);
          setPopupVisible(true);
        })
        .catch((err) => console.log(err));
    }
  };

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
    setName(''); // Reset name
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
    navigate('/login');
  };

  const togglePassword = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPassword = () => setConfirmPasswordVisible(!confirmPasswordVisible);

  return (
    <div className="App login-register-background">
      <div className="wrapper">
        {isRegistering ? (
          <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)} // Update name state
                required
              />
            </div>
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
            <div className="input-box">
              <input
                type={confirmPasswordVisible ? 'text' : 'password'}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <i
                className={`bx ${confirmPasswordVisible ? 'bx-hide' : 'bx-show'}`}
                onClick={toggleConfirmPassword}
                style={{ cursor: 'pointer', marginLeft: '10px' }}
              ></i>
            </div>
            <button type="submit" className="btn">
              Register
            </button>
            <div className="register-link">
              <p>
                Already have an account?{' '}
                <Link to="/login">Login</Link>
              </p>
              <p>
                <Link to="http://localhost:3001/" className="back-to-home">Back to Home</Link>
              </p>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            {/* Login form implementation */}
          </form>
        )}
      </div>

      <div className={`popup ${popupVisible ? 'open-popup' : ''}`}>
        <img src="icons/tick.png" alt="Success" />
        <h2>Thank you!</h2>
        <p>Your details have been successfully submitted. Thanks!</p>
        <button onClick={handleClosePopup}>Ok</button>
      </div>
    </div>
  );
};

export default Register;
