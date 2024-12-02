import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import Header from "./pages/Header";
import Home from "./pages/Home";
import Meist from "./pages/Meist";
import Galerii from "./pages/Galerii";
import Broneeri from "./pages/Broneeri";
import Login from "./pages/Login";
import Kasutaja from "./pages/Kasutaja";
import Footer from "./components/Footer";
import FloatingIcon from "./components/FloatingIcon";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div style={{ minHeight: "100vh" }}>
        <Toaster richColors />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/meist" element={<Meist />} />
          <Route path="/galerii" element={<Galerii />} />
          <Route path="/broneeri" element={<Broneeri />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route
            path="/Kasutaja"
            element={isAuthenticated ? <Kasutaja /> : <Navigate to="/login" />}
          />
        </Routes>
        <FloatingIcon src="floatingicon.png" alt="Contact Us" link="mailto:hood@baar.ee" />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
