import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import './Login.css';

function Login({ setIsAuthenticated }) {
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
    if (!email || !password) {
      toast.error('Kasutajaandmed on valed');
      return;
    } 
    setIsAuthenticated(true);
    toast.success('Sisselogimine õnnestus');
    navigate('/Kasutaja');
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log('Registreerimas:', { email, password, phone, firstName, lastName });
    if (!email || !password || !phone || !firstName || !lastName) {
      toast.warning('Palun täitke kõik väljad');
      return;
    }
    if (!emailRegex.test(email)) {
      toast.error('Palun sisestage kehtiv meiliaadress');
      return;
    } 
    toast.success('Kasutaja loomine õnnestus');
    setIsCreating(false);
      setIsAuthenticated(true); // Update authentication state in App.js
      navigate('/Kasutaja'); // Navigate to account page
  };

  return (
    <div className="auth-container"
    >
      <div className="auth-form">
        {isCreating ? (
          <>
            <h1>Loo kasutaja</h1>
            <p>Tere tulemast!</p>
            <form onSubmit={handleCreate}>
              <div className="form-group">
                <label>Meiliaadress</label>
                <input
                //hetkel type on text, mitte email, muidu tuleb broswerist pls use '@'
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Meiliaadress"
                />
              </div>
              <div className="form-group">
                <label>Telefoninumber</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Telefoninumber"
                />
              </div>
              <div className="form-group">
                <label>Eesnimi</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Eesnimi"
                />
              </div>
              <div className="form-group">
                <label>Perenimi</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Perenimi"
                />
              </div>
              <div className="form-group">
                <label>Parool</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Parool"
                />
              </div>
              <button type="submit" className="submit-btn">Loo kasutaja</button>
            </form>
            <p onClick={() => setIsCreating(false)} className="toggle-link">
              Kas sul on juba konto? Logi sisse
            </p>
          </>
        ) : (
          <>
            <h1>Sisselogimine</h1>
            <p>Tere tulemast tagasi!</p>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Kasutajatunnus</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Meil või telefoninumber"
                />
              </div>
              <div className="form-group">
                <label>Parool</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Parool"
                />
              </div>
              <button type="submit" className="submit-btn">Logi sisse</button>
            </form>
            <p onClick={() => setIsCreating(true)} className="toggle-link">
              Kas sul pole veel kontot? Loo kasutaja
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
