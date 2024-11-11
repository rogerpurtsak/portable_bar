import { Link } from "react-router-dom";
import "./home.css";

function Home() {
    return (
      <div className="home-body">
        <h1 className="home-text">Oled korraldamas pidu? Las me aitame sind!</h1>
        <h2 className="home-text click" style={{ justifyContent: "center", alignItems: "center", backgroundColor: "#483C32", transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out" }}>
          <Link to={"/broneeri"} className="telli-link">Telli RÄNDBAAR!</Link>
        </h2>
        <h2></h2>
      </div>
    );
  }
  
  export default Home;