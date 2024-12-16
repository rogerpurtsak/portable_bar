import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./assets/firebase.js";
import Header from "./pages/Header";
import Home from "./pages/Home";
import Meist from "./pages/Meist";
import Galerii from "./pages/Galerii";
import Broneeri from "./pages/Broneeri";
import Login from "./pages/Login";
import Kasutaja from "./pages/Kasutaja";
import Footer from "./components/Footer";
import FloatingIcon from "./components/FloatingIcon";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        localStorage.setItem("authToken", user.uid);
      } else {
        setIsAuthenticated(false);
        localStorage.removeItem("authToken");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div style={{ minHeight: "100vh" }}>
        <Toaster richColors />
        <Header isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/meist" element={<Meist />} />
          <Route path="/galerii" element={<Galerii />} />
          <Route
  path="/broneeri"
  element={
    <ProtectedRoute isAuthenticated={isAuthenticated}>
      <Broneeri />
    </ProtectedRoute>
  }
/>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route
            path="/Kasutaja"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Kasutaja />
              </ProtectedRoute>
            }
          />
        </Routes>
        <FloatingIcon src="floatingicon.png" alt="Contact Us" link="mailto:hood@baar.ee" />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
