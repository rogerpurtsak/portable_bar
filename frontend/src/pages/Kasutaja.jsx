import React from 'react';
import KasutajaInfo from './KasutajaInfo';
import KontoSeaded from './KontoSeaded';
import './kasutaja.css';
//kasutaja vaade kaob ära, kui ühtegi muud lehte külastada ja tagasi tulla,
//ilmselgelt backendi vaja
const Kasutaja = () => {
  return (
    <div className="kasutaja">
      <div className="sisu">
        <h1>Minu profiil</h1>
        <KasutajaInfo />
        <KontoSeaded />
      </div>
    </div>
  );
};

export default Kasutaja;