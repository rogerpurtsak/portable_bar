import React, { useState } from 'react';
import './Login.css';
import backgroundImage from '../assets/backgroundbarimage.jpg';


function Login() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Sisselogimas:', { email, password });
    if (email && password) {
      setIsAuthenticated(true);
      navigate('/Kasutaja');
    } else {
      alert('Kasutajaandmed on valed');
    }
  };

  return (
    <div 
      className='auth-container'
      style={{ backgroundImage: `url(${backgroundImage})` }}
      >
      <div className='auth-form'>
        <h1>Sisselogimine</h1>
        <p>Tere tulemast tagasi!</p>
        <form onSubmit={handleLogin}>
          <div className='form-group'>
            <label>Kasutajatunnus</label>
            <input
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Meil või telefoninumber'
              required
            />
          </div>
          <div className='form-group'>
            <label>Parool</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Parool'
              required
            />
          </div>
          <button type='submit' className='submit-btn'>Logi sisse</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
