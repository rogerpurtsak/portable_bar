import React from "react";
import Galerii from "../components/Galerii";
import "./Galerii.css";

/*function Galerii() {
    return (
      <div>

        <h2>Galerii yap</h2>
        <p>Muu kirjeldav tekst!</p>
      </div>
    );
  }
  
  
  export default Galerii;*/

  function GaleriiPiltidega() {
    const pildid = [
      { id: 1, src: "/hood_galerii.jpg", alt: "Pilt 1" },
      { id: 2, src: "pilt2.jpg", alt: "Pilt 2" },
      { id: 3, src: "/hood_galerii.jpg", alt: "Pilt 3" },
      { id: 4, src: "pilt2.jpg", alt: "Pilt 4" },
    ];
  
    return (
      <div className="galerii-container">
        <h2>Pilte korraldatud üritustest</h2>
        <div className="piltide-galerii">
          {pildid.map((pilt) => (
            <Galerii key={pilt.id} src={pilt.src} alt={pilt.alt} />
          ))}
        </div>
      </div>
    );
  }
  
  export default GaleriiPiltidega;