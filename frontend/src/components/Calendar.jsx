import "./Calendar.css";
import React, {useState} from "react";
import ReactCalendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

function MyCalendar(){
    const [date, setDate] = useState(new Date());
    const [bookedDates, setBookedDates] = useState([]);
    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    const handleBookDate = () => {
        if (!bookedDates.includes(date.toDateString())) {
            setBookedDates([...bookedDates, date.toDateString()]);
            alert(`Kuupäev ${date.toDateString()} on broneeritud!`);
        } else {
            alert(`Kuupäev ${date.toDateString()} on juba broneeritud!`);
        }
    };

    return (
        <div style={{padding: "10px" }}>
            <ReactCalendar
                onChange={handleDateChange} 
                value={date} 
                tileClassName={({ date, view }) => {
                    if (bookedDates.includes(date.toDateString())) {
                        return 'booked';
                    }
                }}
            /> 
            <p className="selected-date">Valitud kuupäev: {date.toDateString()}</p>
            <button className="book-button" onClick={handleBookDate}>Broneeri kuupäev</button>
        </div>
    );
}

export default MyCalendar;