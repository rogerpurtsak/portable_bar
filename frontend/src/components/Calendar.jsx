import "./Calendar.css";
import React, { useState } from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { toast } from "sonner";

function MyCalendar({ onDateTimeSelect }) {
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(""); // Kellaaeg
    const [bookedSlots, setBookedSlots] = useState([]); // Broneeritud ajad

    const handleDateChange = (newDate) => {
        setDate(newDate);
        if (time) {
            onDateTimeSelect(newDate, time); // Edasta kuupäev ja kellaaeg vanemkomponendile
        }
    };

    const handleTimeChange = (event) => {
        const selectedTime = event.target.value;
        setTime(selectedTime);
        onDateTimeSelect(date, selectedTime); // Edasta kuupäev ja kellaaeg vanemkomponendile
    };

    const handleBookSlot = () => {
        const dateString = date.toDateString();
        const slot = `${dateString} ${time}`; // Kuupäeva ja kellaaja kombinatsioon

        if (!time) {
            toast.error("Palun vali kellaaeg! ⏰");
            return;
        }

        if (!bookedSlots.includes(slot)) {
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
                    if (bookedSlots.some((slot) => slot.startsWith(dateString))) {
                        return "booked"; // Broneeritud päevade klass
                    }
                    if (dateString === new Date().toDateString()) {
                        return "active-day"; // Tänase päeva klass
                    }
                    return null;
                }}
            />
            <p className="selected-date">Valitud kuupäev: {date.toDateString()}</p>
            <div className="time-and-button-container">
                <label className="time-label">
                    Vali kellaaeg:
                    <input
                        type="time"
                        value={time}
                        onChange={handleTimeChange}
                        className="time-input"
                    />
                </label>
                <button className="book-button" onClick={handleBookSlot}>
                    Broneeri aeg
                </button>
            </div>
        </div>
    );
}

export default MyCalendar;
