import React, { useState } from "react";
import "./broneeri.css";
import MyCalendar from "../components/Calendar";
import { db } from "../assets/firebase";
import { collection, addDoc } from "firebase/firestore";

function Broneeri() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        drinks: "",
        people: "",
        dj: false,
        date: "", // Lisatud kuupäeva väli
        time: "", // Lisatud kellaaja väli
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleDateTimeSelect = (selectedDate, selectedTime) => {
        setFormData({
            ...formData,
            date: selectedDate.toDateString(), // Kuupäev stringina
            time: selectedTime, // Kellaaeg
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await addDoc(collection(db, "broneeringud"), formData);
            alert("Broneering lisatud!");
        } catch (error) {
            console.error("Viga broneeringu lisamisel:", error.message);
            alert("Midagi läks valesti. Proovi uuesti.");
        }
    };

    return (
        <div className="broneeri-container">
            <div className="broneeri-flex">
                <div className="broneeri-body">
                    <h2 className="broneeri-text">Telli rändbaar</h2>
                    <form className="broneeri-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Ees- ja perekonnanimi"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="drinks"
                            placeholder="Põhijoogid, mida soovite"
                            value={formData.drinks}
                            onChange={handleChange}
                        />
                        <div className="alcohol-people">
                            <label htmlFor="alcohol-people-input">Mitu inimest?:</label>
                            <input
                                type="number"
                                name="people"
                                id="alcohol-people-input"
                                placeholder="Sisesta inimeste arv"
                                value={formData.people}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="dj-option">
                            <label className="styled-checkbox">
                                <input
                                    type="checkbox"
                                    name="dj"
                                    id="dj-request"
                                    checked={formData.dj}
                                    onChange={handleChange}
                                />
                                <span>Kas DJ soovi on?</span>
                            </label>
                        </div>
                        <button type="submit">Broneeri</button>
                    </form>
                </div>
                <div className="broneeri-calendar">
                    <MyCalendar onDateTimeSelect={handleDateTimeSelect} />
                </div>
            </div>
        </div>
    );
}

export default Broneeri;
