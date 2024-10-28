import ContactCard from "../components/ContactCard";

function Meist() {
    return (
      <div>
        <h2>Meist</h2>
        <p className="tekstikas">Tekst teie endi kohta!</p>
        <ContactCard name={"HOOD"} />
        <ContactCard name={"RÄNDBAAR"} />
      </div>
    );
  }
  
  export default Meist;