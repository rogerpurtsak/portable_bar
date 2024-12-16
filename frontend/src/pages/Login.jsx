import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut
} from "firebase/auth";
import { auth, db } from "../assets/firebase.js";
import { getDoc, doc, setDoc } from "firebase/firestore";
import "./Login.css";
import { signInWithGoogle } from "../assets/authUtils";
import GoogleLogo from "../assets/google-logo.svg";
import { createAccountWithGoogle } from "../assets/firebaseUtils";
import Spinner from "../components/Spinner.jsx";

function Login({ setIsAuthenticated }) {
  const [isCreating, setIsCreating] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Palun sisestage oma meiliaadress!");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Parooli lähtestamise link saadeti teie meiliaadressile.");
    } catch (error) {
      console.error("Parooli lähtestamise viga:", error.message);
      toast.error("Parooli lähtestamine ebaõnnestus: " + error.message);
    }
  };

  const handleCreateWithGoogle = async () => {
    try {
      const { user, firstName } = await createAccountWithGoogle();
      console.log("Account created with Google:", user);
      toast.success(`Tere tulemast, ${firstName || user.displayName}!`);
      setIsAuthenticated(true);
      navigate("/Kasutaja");
    } catch (error) {
      console.error("Error creating account with Google:", error.message);
      toast.error("Konto loomine ebaõnnestus: " + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      // User ei eksisteeri Firestore'is
      await signOut(auth); // Logi kasutaja välja
      toast.error("Kasutajat selle Google'i kontoga ei leitud. Palun registreeru!");
      return;
    }
      setIsAuthenticated(true);
      toast.success("Sisselogimine Google'iga õnnestus!");
      navigate("/Kasutaja");
    } catch (error) {
      toast.error("Sisselogimine ebaõnnestus: " + error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user.emailVerified) {
        setIsAuthenticated(true);
        localStorage.setItem("authToken", user.uid);
        toast.success("Sisselogimine õnnestus!");
        navigate("/Kasutaja");
      } else {
        toast.error("Palun kinnitage oma e-mail enne sisselogimist!");
      }
    } catch (error) {
      toast.error("Sisselogimine ebaõnnestus: " + error.message);
    } finally {
      setLoading(false);
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

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await sendEmailVerification(user);

      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
        phone,
      });

      toast.success("Registreerimine õnnestus! Palun kontrollige oma e-maili kinnitamiseks.");
      setIsCreating(false);
    } catch (error) {
      console.error("Registreerimine ebaõnnestus:", error.message);
      toast.error("Registreerimine ebaõnnestus: " + error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        {loading ? (
          <Spinner />
        ) : isCreating ? (
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
              <button
                type="button"
                className="google-btn"
                onClick={handleCreateWithGoogle}
              >
                <img src={GoogleLogo} alt="Google Logo" className="google-logo" />
                Loo konto Google'iga
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
                <div className="password-label-container">
                  <label>Parool</label>
                  <span
                    className="help-icon"
                    onClick={handleForgotPassword}
                    title="Unustasid parooli?"
                  >
                    ?
                  </span>
                </div>
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
              <button
                type="button"
                className="google-btn"
                onClick={handleGoogleLogin}
              >
                <img src={GoogleLogo} alt="Google Logo" className="google-logo" />
                Logi sisse Google'iga
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
