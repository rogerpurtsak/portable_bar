import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const KontoSeaded = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    toast.info('Välja logitud!', {
      style: {
        background: '#C0A897',
        color: '#483C32',
        border: 'none'
      },
    });
    navigate('/login');
  };

  const handleDeleteAccount = () => {
    const confirmation = window.confirm('Oled kindel, et soovid oma konto kustutada?');
    if (confirmation) {
      // API call to delete account või muu loogika hiljem lisada vist
      toast.error('Konto kustutatud!');
      navigate('/login');
    }
  };

  return (
    <div className="konto-seaded">
      <h2>Seaded</h2>
      <button className="settings-button">Muuda parooli</button>
  
      <div className="button-row">
        <button className="settings-button delete" onClick={handleDeleteAccount}>
          Kustuta konto
        </button>
        <button onClick={handleLogout} className="settings-button logout">
          Logi välja
        </button>
      </div>
    </div>
  );
};

export default KontoSeaded;