import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    // Kasutaja andmed (võid need edasi saata Firestore'i)
    const user = result.user;
    console.log("Kasutaja sisselogitud:", user);
    return user;
  } catch (error) {
    console.error("Google'i sisselogimine ebaõnnestus:", error.message);
    throw error;
  }
};