import React from 'react';

const KontoSeaded = () => {
  const handleLogout = () => {
    alert('Välja logitud!');
  };

  return (
    <div className="konto-seaded">
      <h2>Seaded</h2>
      <button className="settings-button">Muuda parooli</button>
      <button onClick={handleLogout} className="settings-button logout">
        Logi välja
      </button>
    </div>
  );
};

export default KontoSeaded;
