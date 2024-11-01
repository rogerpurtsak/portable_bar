import { Link } from "react-router-dom"; // Et kasutada eri failides <Link> tööriista, peate selle iga kord importima

function Header() {
  return (
    <div className="navbar">
      <Link to="/">
        <img className="logo-img" src="hood_logo.png" alt="HOOD logo" />
      </Link>
      {/* Linki sees to="" väärtus peab klappima App.jsx failis oleva Route path="" sisuga. */}
      <div className="links">
      <Link to="/" className="nav-link">Avaleht</Link>
      <Link to="/meist" className="nav-link">Meist</Link>
      <Link to="/galerii" className="nav-link">Galerii</Link>
      <Link to="/broneeri" className="nav-link">Broneeri</Link>
      <Link to="/login" className="nav-link">Profiil</Link>
      </div>
    </div>
  );
}

export default Header;