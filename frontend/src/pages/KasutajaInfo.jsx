import React, { useState, useEffect } from "react";
import { auth, db } from "../assets/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { updateUserProfile } from "../assets/firebaseUtils.js";
import { toast } from "sonner";

const KasutajaInfo = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  

  const toggleEdit = () => setEditing(!editing);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            setUser({
              uid: currentUser.uid, // Include UID for updates
              email: currentUser.email, // Include email
              ...userDoc.data(), // Firestore data
            });
          } else {
            console.error("No user data found in Firestore");
          }
        } catch (error) {
          console.error("Error fetching user data:", error.message);
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

  const handleSave = async () => {
    try {
      console.log("User UID:", user?.uid); // Log UID to check if it's valid
    console.log("Updated Data:", {
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
      });
      await updateUserProfile(user.uid, {
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
      });
      toast.success("Andmed uuendatud");
      setEditing(false);
    } catch (error) {
      console.error("Tekkis probleem andmete uuendamisel:", error.message);
    }
  };


  return (
    <div className="kasutaja-info">
      {user ? (
        <>
          {editing ? (
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
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                placeholder="Telefon"
                className="user-input"
              />
              <p><strong>Meil:</strong> {user.email}</p>
              <button onClick={handleSave} className="user-button">
                Salvesta
              </button>
              <button onClick={toggleEdit} className="user-button">
            Tühista
          </button>
            </>
          ) : (
            <>
              <p><strong>Eesnimi:</strong> {user.firstName}</p>
              <p><strong>Perenimi:</strong> {user.lastName}</p>
              <p><strong>Telefon:</strong> {user.phone}</p>
              <p><strong>Meil:</strong> {user.email}</p>
              <button onClick={toggleEdit} className="user-button">
                Muuda
              </button>
            </>
          )}
  </>
      ) : (
        <p>Kasutaja pole sisse logitud</p>
      )}
    </div>

  );
};

export default KasutajaInfo;
