import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../assets/firebase.js";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import "./Kasutaja.css";
import KasutajaInfo from "./KasutajaInfo";
import KontoSeaded from "./KontoSeaded";
import { toast } from "sonner";

const Kasutaja = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userBookings, setUserBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);
  const [editValues, setEditValues] = useState({ date: "", location: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
            const bookingsRef = collection(db, "broneeringud");
            const q = query(bookingsRef, where("email", "==", currentUser.email));
            const querySnapshot = await getDocs(q);

            const bookings = [];
            querySnapshot.forEach((doc) => {
              bookings.push({ id: doc.id, ...doc.data() });
            });

            setUserBookings(bookings);
          } else {
            await signOut(auth);
            toast.error("No user found with this Google account.");
          }
        } catch (error) {
          toast.error("Failed to fetch user data.");
          console.error("Error fetching Firestore data:", error.message);
        }
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleEditClick = (booking) => {
    setEditingBooking(booking.id);
    setEditValues({ date: booking.date, location: booking.location });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (bookingId) => {
    try {
      const bookingRef = doc(db, "broneeringud", bookingId);
      await updateDoc(bookingRef, {
        date: editValues.date,
        location: editValues.location,
      });

      toast.success("Broneeringut uuendatud!");
      setUserBookings((prev) =>
        prev.map((booking) =>
          booking.id === bookingId
            ? { ...booking, date: editValues.date, location: editValues.location }
            : booking
        )
      );

      setEditingBooking(null);
    } catch (error) {
      toast.error("Uuendamine ebaõnnestus.");
      console.error("Error updating Firestore:", error.message);
    }
  };

  const handleCancel = () => {
    setEditingBooking(null);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("authToken");
      toast.success("Oled välja logitud!");
      navigate("/login");
    } catch (error) {
      toast.error("Väljalogimine ebaõnnestus: " + error.message);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="kasutaja">
      <div className="sisu">
        <h1>Minu profiil</h1>
        {userData ? (
          <>
            <KasutajaInfo user={user} userData={userData} />
            <KontoSeaded />

            <div className="bookings">
              <h2>Minu Broneeringud</h2>
              {userBookings.length > 0 ? (
                <ul className="booking-list">
                  {userBookings.map((booking) => (
                    <li key={booking.id} className="booking-item">
                      {editingBooking === booking.id ? (
                          <div>
                            <p>
                              <strong>Aeg:</strong>
                              <input
                                type="date"
                                name="date"
                                className="booking-edit-input"
                                value={editValues.date}
                                onChange={handleInputChange}
                              />
                            </p>
                            <p>
                              <strong>Asukoht:</strong>
                              <input
                                type="text"
                                name="location"
                                className="booking-edit-input"
                                value={editValues.location}
                                onChange={handleInputChange}
                              />
                            </p>
                            <button
                              onClick={() => handleSave(booking.id)}
                              className="booking-edit-btn"
                            >
                              Salvesta
                            </button>
                            <button onClick={handleCancel} className="booking-cancel-btn">
                              Tühista
                            </button>
                          </div>

                      ) : (
                        
                        <>
                          <p><strong>Nimi:</strong> {booking.name}</p>
                          <p><strong>Joogid:</strong> {booking.drinks}</p>
                          <p><strong>DJ:</strong> {booking.dj ? "Jah" : "Ei"}</p>
                          <p><strong>Inimesi:</strong> {booking.people}</p>
                          <p><strong>Asukoht:</strong> {booking.location}</p>
                          <p><strong>Aeg:</strong> {booking.date}</p>
                          <button 
                            onClick={() => handleEditClick(booking)} 
                            className="booking-edit-btn">
                            Muuda
                          </button>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-bookings">Ühtegi broneeringut ei leitud.</p>
              )}
            </div>
          </>
        ) : (
          <p>Laadin kasutaja andmeid...</p>
        )}
      </div>
    </div>
  );
};

export default Kasutaja;
