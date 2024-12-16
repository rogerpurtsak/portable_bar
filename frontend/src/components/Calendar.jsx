import { collection, getDocs } from "firebase/firestore";
import { db } from "../assets/firebase";
import "./Calendar.css";
import React, { useState, useEffect } from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { toast } from "sonner";

function MyCalendar({ onDateTimeSelect }) {
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState("");
    const [bookedSlots, setBookedSlots] = useState([]);

    // Fetch booked slots from Firestore
    useEffect(() => {
        const fetchBookedSlots = async () => {
            const querySnapshot = await getDocs(collection(db, "broneeringud"));
            const slots = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return `${data.date} ${data.time}`;
            });
            setBookedSlots(slots);
        };

        fetchBookedSlots();
    }, []);

    const handleDateChange = (newDate) => {
        setDate(newDate);
        if (time) {
            onDateTimeSelect(newDate, time);
        }
    };

    const handleTimeChange = (event) => {
        const selectedTime = event.target.value;
        const dateString = date.toDateString();
        const slot = `${dateString} ${selectedTime}`;

        if (bookedSlots.includes(slot)) {
            toast.error(`Aeg ${selectedTime} on juba broneeritud! ❌`);
        } else {
            setTime(selectedTime);
            onDateTimeSelect(date, selectedTime);
        }
    };

    return (
        <div style={{ padding: "10px" }}>
            <ReactCalendar
                onChange={handleDateChange}
                value={date}
                tileClassName={({ date }) => {
                    const dateString = date.toDateString();
                    const isBooked = bookedSlots.some((slot) => {
                        // Kontrollime ainult kuupäeva osa, mitte aega
                        const slotDate = slot.split(" ")[0]; // Võtame ainult esimese osa (kuupäev)
                        return slotDate === dateString; // Võrdleme kuupäeva täpselt
                    });
                
                    if (isBooked) {
                        return "booked"; // Rakenda "booked" klass ainult täpsetele päevadele
                    }
                
                    if (dateString === new Date().toDateString()) {
                        return "active-day"; // Rakenda aktiivse päeva klass
                    }
                
                    return null; // Kui tingimused ei vasta, klassi ei rakendata
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
            </div>
        </div>
    );
}

export default MyCalendar;
