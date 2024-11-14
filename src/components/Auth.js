import React, { useState } from 'react';
import './Auth.css';

// Auth.js
const Auth = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    // Handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      setError('');
  
      // Email validation: must end with @gmail.com
      const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
      if (!emailRegex.test(email)) {
        setError('Please enter a valid Gmail address.');
        return;
      }
  
      // Password validation: must be at least 8 characters
      if (password.length < 8) {
        setError('Password must be at least 8 characters long.');
        return;
      }
  
      // If validations pass, trigger login
      if (onLogin) {
        onLogin(email);
      } else {
        console.error('onLogin is not a function');
      }
    };
  
    return (
      <div className="auth-container">
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="8"
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  };
  

export default Auth;
