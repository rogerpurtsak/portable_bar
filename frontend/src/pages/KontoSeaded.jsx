import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { signOut, updatePassword } from "firebase/auth";
import { auth } from "../assets/firebase.js";


const KontoSeaded = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const togglePasswordChange = () => {
    setIsChangingPassword(!isChangingPassword);
    setNewPassword(""); // Clear password input when toggling
  };
  const handlePasswordChange = async () => {
    try {
      if (newPassword.trim() === "") {
        toast.error("Palun sisesta uus parool!");
        return;
      }

      await updatePassword(auth.currentUser, newPassword); // Update password in Firebase
      toast.success("Parool uuendatud!");
      setIsChangingPassword(false); // Exit password change mode
    } catch (error) {
      console.error("Tekkis probleem parooli uuendamisel:", error.message);
      toast.error("Parooli uuendamine ebaõnnestus: " + error.message);
    }
  };

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
      <div className="password-change">
        {!isChangingPassword ? (
          // Show "Change Password" button if not in password change mode
          <button onClick={togglePasswordChange} className="settings-button">
            Muuda parooli
          </button>
        ) : (
          // Show password input and buttons if in password change mode
          <>
            <input
              type="password"
              placeholder="Uus parool"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="user-input"
            />
            <button onClick={handlePasswordChange} className="settings-button">
              Salvesta parool
            </button>
            <button onClick={togglePasswordChange} className="settings-button">
              Tühista
            </button>
          </>
        )}
      </div>

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
