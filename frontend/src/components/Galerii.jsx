import "./Galerii.css";
import React from "react";

function Galerii({ src, alt }) {
    return (
      <div className="pilt-container">
        <img src={src} alt={alt} className="pilt" />
      </div>
    );
  }
  
  export default Galerii;