import React, { useState } from 'react';

const KasutajaInfo = () => {
  const [user, setUser] = useState({
    name: 'Anna Andmebaas',
    email: 'anna.andmebaas@baar.ee',
    phone: '+372 51234567'
  });
  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const toggleEdit = () => setEditing(!editing);

  return (
    <div className="kasutaja-info">
      {editing ? (
        <>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder='Nimi'
            className="user-input"
          />
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder='Meil'
            className="user-input"
          />
           <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            placeholder="Telefon"
            className="user-input"
          />
          <button onClick={toggleEdit} className="user-button">
            Salvesta
          </button>
        </>
      ) : (
        <>
          <p><strong>Nimi:</strong> {user.name}</p>
          <p><strong>Meil:</strong> {user.email}</p>
          <p><strong>Telefon:</strong> {user.phone}</p>
          <button onClick={toggleEdit} className="user-button">
            Muuda
          </button>
        </>
      )}
    </div>
  );
};

export default KasutajaInfo;