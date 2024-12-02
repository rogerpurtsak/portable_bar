import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../assets/firebase.js";
import { setDoc, doc } from "firebase/firestore";
import "./Login.css";

function Login({ setIsAuthenticated }) {
  const [isCreating, setIsCreating] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user.emailVerified) {
        setIsAuthenticated(true);
        toast.success("Sisselogimine õnnestus!");
        navigate("/Kasutaja");
      } else {
        toast.error("Palun kinnitage oma e-mail enne sisselogimist!");
      }
    } catch (error) {
      toast.error("Sisselogimine ebaõnnestus: " + error.message);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !password || !phone || !firstName || !lastName) {
        toast.warning("Palun täitke kõik väljad!");
        return;
      }
      if (!emailRegex.test(email)) {
        toast.error("Palun sisestage kehtiv meiliaadress!");
        return;
      }
  
      // Register user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Send email verification
      await sendEmailVerification(user);
  
      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
        phone,
      });
  
      toast.success("Registreerimine õnnestus! Palun kontrollige oma e-maili kinnitamiseks.");
      setIsCreating(false); // Switch back to login form
    } catch (error) {
      console.error("Registreerimine ebaõnnestus:", error.message);
      toast.error("Registreerimine ebaõnnestus: " + error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        {isCreating ? (
          <>
            <h1>Loo kasutaja</h1>
            <p>Tere tulemast!</p>
            <form onSubmit={handleCreate}>
              <div className="form-group">
                <label>Meiliaadress</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Meiliaadress"
                />
              </div>
              <div className="form-group">
                <label>Telefoninumber</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Telefoninumber"
                />
              </div>
              <div className="form-group">
                <label>Eesnimi</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Eesnimi"
                />
              </div>
              <div className="form-group">
                <label>Perenimi</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Perenimi"
                />
              </div>
              <div className="form-group">
                <label>Parool</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Parool"
                />
              </div>
              <button type="submit" className="submit-btn">
                Loo kasutaja
              </button>
            </form>
            <p onClick={() => setIsCreating(false)} className="toggle-link">
              Kas sul on juba konto? Logi sisse
            </p>
          </>
        ) : (
          <>
            <h1>Sisselogimine</h1>
            <p>Tere tulemast tagasi!</p>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Kasutajatunnus</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Meil või telefoninumber"
                />
              </div>
              <div className="form-group">
                <label>Parool</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Parool"
                />
              </div>
              <button type="submit" className="submit-btn">
                Logi sisse
              </button>
            </form>
            <p onClick={() => setIsCreating(true)} className="toggle-link">
              Kas sul pole veel kontot? Loo kasutaja
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
