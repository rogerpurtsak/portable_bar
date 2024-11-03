import "./broneeri.css";
/*import Calendar from "../components/Calendar"*/
import MyCalendar from "../components/Calendar";

function Broneeri() {
    return (
      <div>
        <div className="broneeri-container">
        <div className="broneeri-body">
          <h2 className="broneeri-text">Telli rändbaar</h2>
          <form className="broneeri-form"></form>
          <input type="text" placeholder="Ees- ja perekonnanimi" />
          <input type="email" placeholder="Email" />
          <input type="text" placeholder="Joogivalikust loe rohkem" />
          {/*<textarea placeholder="Sõnum" required></textarea> {/* Siin on tekstikast */}
          <button type="submit">Broneeri</button>
          </div>
        </div>
        <div className="calendar">
        {/* <Calendar />  See rida oli esialgselt, kui Calendar.jsx oli function Calendar()*/}
            <MyCalendar/>
        </div>
      </div>
    );
  }
  
  export default Broneeri;