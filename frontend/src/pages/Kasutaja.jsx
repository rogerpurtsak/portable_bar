import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../assets/firebase.js";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import "./Kasutaja.css";
import KasutajaInfo from './KasutajaInfo';
import KontoSeaded from './KontoSeaded';
import { toast } from "sonner";

const Kasutaja = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        try {
          
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
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("authToken");
      toast.success("Oled välja logitud!");
      navigate("/login");
    } catch (error) {
      toast.error("Väljalogimine ebaõnnestus: " + error.message);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="kasutaja">
      <div className="sisu">
        <h1>Minu profiil</h1>
        {userData ? (
          <>
            <KasutajaInfo user={user} userData={userData} />
            <KontoSeaded />
          </>
        ) : (
          <p>Laadin kasutaja andmeid...</p>
        )}
      </div>
    </div>
  );
};

export default Kasutaja;
