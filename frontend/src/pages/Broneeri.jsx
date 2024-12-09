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
                        <div className="alcohol-people">
                            <label htmlFor="alcohol-people-input">
                            Mitu inimest?:
                                </label>
                                <input 
                                    type="number" 
                                    id="alcohol-people-input" 
                                    placeholder="Sisesta inimeste arv" 
                                    />
                                    </div>
                        <div className="dj-option">
                            <label className="styled-checkbox">
                                <input type="checkbox" id="dj-request" />
                                <span>Kas DJ soovi on?</span>
                                </label>
                        </div>
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