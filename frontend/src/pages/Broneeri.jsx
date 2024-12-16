import React, { useState } from "react";
import "./broneeri.css";
import MyCalendar from "../components/Calendar";
import { db } from "../assets/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { toast } from "sonner";

function Broneeri() {
    // Vormide algolek
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        drinks: "",
        people: "",
        dj: false,
        date: "", // Kuupäeva väli
        time: "", // Kellaaja väli
    });

    // Vormiväljade muutmine
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // Kuupäeva ja kellaaja muutmine
    const handleDateTimeSelect = (selectedDate, selectedTime) => {
        setFormData((prevData) => ({
            ...prevData,
            date: selectedDate.toDateString(),
            time: selectedTime,
        }));
        console.log("Uuendatud kuupäev ja kellaaeg:", selectedDate.toDateString(), selectedTime);
    };

    // Vormide esitamine ja Firestore'i salvestamine
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kontrollime, kas kõik väljad on täidetud
        if (!formData.date || !formData.time) {
            alert("Palun vali kuupäev ja kellaaeg!");
            return;
        }

        try {
            // Kontrollime, kas sama kuupäev ja kellaaeg on juba broneeritud
            const broneeringudRef = collection(db, "broneeringud");
            const q = query(
                broneeringudRef,
                where("date", "==", formData.date),
                where("time", "==", formData.time)
            );

            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                alert("See aeg on juba broneeritud! Palun vali teine aeg.");
                return; // Lõpetame funktsiooni töö
            }

            // Kui aega pole broneeritud, salvestame uue broneeringu
            await addDoc(broneeringudRef, formData);
            alert("Broneering on edukalt lisatud!");

            // Vormiväljade tühjendamine
            setFormData({
                name: "",
                email: "",
                drinks: "",
                people: "",
                dj: false,
                date: "",
                time: "",
            });
        } catch (error) {
            console.error("Viga broneeringu lisamisel:", error.message);
            alert("Midagi läks valesti. Kontrolli ühendust või proovige uuesti.");
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
