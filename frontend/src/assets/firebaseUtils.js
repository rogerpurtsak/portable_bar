import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const updateUserProfile = async (uid, updatedData) => {
  try {
    const userDocRef = doc(db, "users", uid);
    await updateDoc(userDocRef, updatedData);
    console.log("User profile updated successfully!");
  } catch (error) {
    console.error("Error updating user profile:", error.message);
  }
};

export const createAccountWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    const nameParts = user.displayName ? user.displayName.split(" ") : [];
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";


    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {

      await setDoc(userDocRef, {
        firstName,
        lastName,
        email: user.email,
        phone: "",
        createdAt: new Date().toISOString(),
      });
    }

    return { user, firstName, lastName };
  } catch (error) {
    console.error("Error creating account with Google:", error.message);
    throw error;
  }
};
