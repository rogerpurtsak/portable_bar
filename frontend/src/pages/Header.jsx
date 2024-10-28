import { Link } from "react-router-dom"; // Et kasutada eri failides <Link> tööriista, peate selle iga kord importima

function Header() {
  return (
    <div className="navbar">
      {/* Linki sees to="" väärtus peab klappima App.jsx failis oleva Route path="" sisuga. */}
      <Link to="/">Avaleht</Link>
      <Link to="/meist">Meist</Link>
    </div>
  );
}

export default Header;