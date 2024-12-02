import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../assets/firebase.js";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import "./Kasutaja.css";

const Kasutaja = () => {
  const [user, setUser] = useState(null); // Authenticated user
  const [userData, setUserData] = useState(null); // User's Firestore data
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        try {
          // Fetch user details from Firestore
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.error("No Firestore data found for user.");
          }
        } catch (error) {
          console.error("Error fetching Firestore data:", error.message);
        }
      } else {
        navigate("/login"); // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (!user) {
    return null; // Prevent rendering if user is not authenticated
  }

  return (
    <div className="kasutaja">
      <div className="sisu">
        <h1>Minu profiil</h1>
        {userData ? (
          <>
            <p>
              <strong>Eesnimi:</strong> {userData.firstName}
            </p>
            <p>
              <strong>Perenimi:</strong> {userData.lastName}
            </p>
            <p>
              <strong>E-mail:</strong> {user.email}
            </p>
            <p>
              <strong>Telefon:</strong> {userData.phone}
            </p>
          </>
        ) : (
          <p>Laadin kasutaja andmeid...</p>
        )}
      </div>
    </div>
  );
};

export default Kasutaja;
