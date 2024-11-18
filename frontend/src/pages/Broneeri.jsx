import "./broneeri.css";
import MyCalendar from "../components/Calendar";

function Broneeri() {
    return (
        <div className="broneeri-container">

            <div className="broneeri-flex">
              
                <div className="broneeri-body">
                    <h2 className="broneeri-text">Telli rändbaar</h2>
                    <form className="broneeri-form">
                        <input type="text" placeholder="Ees- ja perekonnanimi" />
                        <input type="email" placeholder="Email" />
                        <input type="text" placeholder="Põhijoogid, mida soovite" />
                        <button type="submit">Broneeri</button>
                    </form>
                </div>


                <div className="broneeri-calendar">
                    <MyCalendar />
                </div>
            </div>
        </div>
    );
}

export default Broneeri;