import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import backgroundImage from '../assets/backgroundbarimage.jpg';

function Login() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

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

  const handleCreate = (e) => {
    e.preventDefault();
    console.log('Registreerimas:', { email, password, phone, firstName, lastName });
    if (email && password && phone && firstName && lastName) {
      alert('Registreerimine õnnestus!');
      setIsCreating(false);
      navigate('/Kasutaja');
    } else {
      alert('Palun täitke kõik väljad!');
    }
  };

  return (
    <div 
      className='auth-container'
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className='auth-form'>
        {isCreating ? (
          <>
            <h1>Loo kasutaja</h1>
            <p>Tere tulemast!</p>
            <form onSubmit={handleCreate}>
              <div className='form-group'>
                <label>Meiliaadress</label>
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Meiliaadress'
                  required
                />
              </div>
              <div className='form-group'>
                <label>Telefoninumber</label>
                <input
                  type='tel'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder='Telefoninumber'
                  required
                />
              </div>
              <div className='form-group'>
                <label>Eesnimi</label>
                <input
                  type='text'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder='Eesnimi'
                  required
                />
              </div>
              <div className='form-group'>
                <label>Perenimi</label>
                <input
                  type='text'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder='Perenimi'
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
              <button type='submit' className='submit-btn'>Loo kasutaja</button>
            </form>
            <p onClick={() => setIsCreating(false)} className='toggle-link'>
              Kas sul on juba konto? Logi sisse
            </p>
          </>
        ) : (
          <>
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
            <p onClick={() => setIsCreating(true)} className='toggle-link'>
              Kas sul pole veel kontot? Loo kasutaja
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
