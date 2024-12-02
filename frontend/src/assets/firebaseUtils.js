import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase"; // Adjust path to your firebase config

export const updateUserProfile = async (uid, updatedData) => {
  try {
    const userDocRef = doc(db, "users", uid); // Reference to the user's document
    await updateDoc(userDocRef, updatedData);
    console.log("User profile updated successfully!");
  } catch (error) {
    console.error("Error updating user profile:", error.message);
  }
};
