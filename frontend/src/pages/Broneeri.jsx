import "./broneeri.css";

function Broneeri() {
    return (
      <div className="broneeri-body">
        <h2 className="broneeri-text">Broneeri</h2>
        <p>Muu kirjeldav tekst!</p>
        <form className="broneeri-form"></form>
        <input type="text" placeholder="Ees- ja perekonnanimi" />
        <input type="email" placeholder="Email" />
        <input type="text" placeholder="Joogivalikust loe rohkem" />
        <button type="submit">Broneeri</button>

      </div>
    );
  }
  
  export default Broneeri;