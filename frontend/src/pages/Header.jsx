import { Link } from "react-router-dom";
import { useState } from "react";

function Header({ isAuthenticated }) {
  const [isLinksVisible, setIsLinksVisible] = useState(false);

  const toggleLinks = () => {
    setIsLinksVisible(!isLinksVisible);
  };

  return (
    <div className={`navbar ${isLinksVisible ? "expanded" : ""}`}>
      <Link to="/">
        <img className="logo-img" src="hood_logo.png" alt="HOOD logo" />
      </Link>
      <button className="menu-button" onClick={toggleLinks}>
        Menüü
      </button>
      <div className={`links ${isLinksVisible ? "show" : ""}`}>
        <Link to="/" className="nav-link">Avaleht</Link>
        <Link to="/meist" className="nav-link">Meist</Link>
        <Link to="/galerii" className="nav-link">Galerii</Link>
        <Link to="/broneeri" className="nav-link">Broneeri</Link>
        {isAuthenticated ? (
          <Link to="/Kasutaja" className="nav-link">Profiil</Link>
        ) : (
          <Link to="/login" className="nav-link">Profiil</Link>
        )}
      </div>
    </div>
  );
}

export default Header;
