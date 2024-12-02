import React, { useState, useEffect } from "react";
import { auth, db } from "../assets/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const KasutajaInfo = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);

  const toggleEdit = () => setEditing(!editing);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Fetch additional details from Firestore
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setUser(userDoc.data());
        } else {
          console.error("No user data found in Firestore");
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="kasutaja-info">
      {user ? (
        editing ? (
          <>
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
              placeholder="Eesnimi"
              className="user-input"
            />
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              placeholder="Perenimi"
              className="user-input"
            />
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Meil"
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
            <p><strong>Eesnimi:</strong> {user.firstName}</p>
            <p><strong>Perenimi:</strong> {user.lastName}</p>
            <p><strong>Meil:</strong> {user.email}</p>
            <p><strong>Telefon:</strong> {user.phone}</p>
            <button onClick={toggleEdit} className="user-button">
              Muuda
            </button>
          </>
        )
      ) : (
        <p>Kasutaja pole sisse logitud</p>
      )}
    </div>
  );
};

export default KasutajaInfo;
