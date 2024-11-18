import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import Header from "./pages/Header";
import Home from "./pages/Home";
import Meist from "./pages/Meist";
import Galerii from "./pages/Galerii";
import Broneeri from "./pages/Broneeri";
import Login from "./pages/Login";
import Kasutaja from "./pages/Kasutaja";
import Footer from "./components/Footer";

function App() {
  //seda hetkel vaja vist
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <Router>
      <div style={{minHeight: 100+"vh"}}>
      <Header />
      <Routes>
        {/* Siia saate lisada uusi alamlehti */}
        <Route path="/" element={<Home />} />
        <Route path="/meist" element={<Meist />} />
        <Route path="/galerii" element={<Galerii />} />
        <Route path="/broneeri" element={<Broneeri />} />

        <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          
        <Route
            path="/Kasutaja"
            element={isAuthenticated ? <Kasutaja /> : <Navigate to="/login" />}
          />  
      </Routes>

      </div>
      <Footer/>
    </Router>

  );
}

export default App;