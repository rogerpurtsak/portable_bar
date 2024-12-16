import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { signOut, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { auth, db } from "../assets/firebase.js";
import { doc, deleteDoc } from "firebase/firestore";


const KontoSeaded = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [password, setPassword] = useState("");

const toggleDeleteModal = () => setShowDeleteModal(!showDeleteModal);

  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const togglePasswordChange = () => {
    setIsChangingPassword(!isChangingPassword);
    setNewPassword("");
  };
  const handlePasswordChange = async () => {
    try {
      if (newPassword.trim() === "") {
        toast.error("Palun sisesta uus parool!");
        return;
      }

      await updatePassword(auth.currentUser, newPassword);
      toast.success("Parool uuendatud!");
      setIsChangingPassword(false);
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

  const confirmDeleteAccount = async () => {
    try {
      const user = auth.currentUser;
      if (!user || !password) {
        toast.error("Sisestage parool!");
        return;
      }
  
      // Parooli kinnitamine
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
  
      // Kustuta kasutaja Firestore'ist
      const userDocRef = doc(db, "users", user.uid);
      await deleteDoc(userDocRef);
  
      // Kustuta kasutaja Firebase Authenticationist
      await user.delete();
  
      toast.success("Konto on kustutatud!");
      navigate("/login");
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        toast.error("Sisestatud parool on vale.");
      } else if (error.code === "auth/requires-recent-login") {
        toast.error("Palun logi uuesti sisse, et oma konto kustutada.");
      } else {
        console.error("Konto kustutamisel ilmnes viga:", error.message);
        toast.error("Konto kustutamine ebaõnnestus: " + error.message);
      }
    }
  };
  

  return (
    <div className="konto-seaded">
      <h2>Seaded</h2>
      <div className="password-change">
        {!isChangingPassword ? (
          <button onClick={togglePasswordChange} className="settings-button">
            Muuda parooli
          </button>
        ) : (
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
      <button onClick={toggleDeleteModal} className="settings-button delete">
  Kustuta konto
</button>
        <button onClick={handleLogout} className="settings-button logout">
          Logi välja
        </button>
      </div>
      {showDeleteModal && (
  <div className="modal">
    <div className="modal-content">
      <h3>Kinnita konto kustutamine</h3>
      <input
        type="password"
        placeholder="Sisesta parool"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="user-input"
      />
      <div className="modal-buttons">
        <button onClick={confirmDeleteAccount} className="settings-button delete">
          Kinnita
        </button>
        <button onClick={toggleDeleteModal} className="settings-button">
          Tühista
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default KontoSeaded;
