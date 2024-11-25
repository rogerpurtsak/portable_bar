import "./Calendar.css";
import React, { useState } from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { toast } from 'sonner';

function MyCalendar() {
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(""); /* Uus rida kellaja jaoks */
    const [bookedSlots, setBookedSlots] = useState([]); /* Muuda bookedDates -> bookedSlots */

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    const handleTimeChange = (event) => {
        setTime(event.target.value); // Uus rida -> uuendab kellaaja väärtust
    };

    const handleBookSlot = () => {
        const dateString = date.toDateString();
        const slot = `${dateString} ${time}`; // Kuupäeva ja kellaaja kombinatsioon

        if (!time) { // Kontrollime, kas kellaaeg on valitud
            toast.error("Palun vali kellaaeg! ⏰");
            return;
        }

        if (!bookedSlots.includes(slot)) { // Kontrollime, kas kuupäeva ja kellaaja kombinatsioon on juba broneeritud
            setBookedSlots([...bookedSlots, slot]);
            toast.success(`Kuupäev ${dateString}, kell ${time} on broneeritud!`);
        } else {
            toast.error(`Kuupäev ${dateString}, kell ${time} on juba broneeritud! ❌`);
        }
    };

    return (
        <div style={{ padding: "10px" }}>
            <ReactCalendar
                onChange={handleDateChange}
                value={date}
                tileClassName={({ date }) => {
                    const dateString = date.toDateString();
                    if (bookedSlots.some(slot => slot.startsWith(dateString))) {
                        return "booked"; // Broneeritud päevade klass
                    }
                    if (dateString === new Date().toDateString()) {
                        return "active-day"; // Tänase päeva klass
                    }
                    return null;
                }}
            />
            <p className="selected-date">Valitud kuupäev: {date.toDateString()}</p>
            <label className="time-label">
                Vali kellaaeg:
                <input
                    type="time"
                    value={time}
                    onChange={handleTimeChange} // Lisa kellaaja muutmise funktsioon
                    className="time-input"
                />
            </label>
            <button className="book-button" onClick={handleBookSlot}>
                Broneeri aeg
            </button>
        </div>
    );
}

export default MyCalendar;