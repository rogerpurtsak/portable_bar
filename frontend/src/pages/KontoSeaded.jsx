import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { signOut } from "firebase/auth";
import { auth } from "../assets/firebase.js";


const KontoSeaded = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.info("Välja logitud!", {
        style: {
          background: "#C0A897",
          color: "#483C32",
          border: "none",
        },
      });
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error.message);
      toast.error("Väljalogimine ebaõnnestus: " + error.message);
    }
  };

  const handleDeleteAccount = () => {
    const confirmation = window.confirm("Oled kindel, et soovid oma konto kustutada?");
    if (confirmation) {
      toast.error("Konto kustutatud!");
      navigate("/login");
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
