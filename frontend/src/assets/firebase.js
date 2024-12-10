import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpPJQOJ9xNOrhi_1_m5AuaGEoWrqVHKlo",
  authDomain: "hoodbaar-c6d3b.firebaseapp.com",
  projectId: "hoodbaar-c6d3b",
  storageBucket: "hoodbaar-c6d3b.firebasestorage.app",
  messagingSenderId: "621237104338",
  appId: "1:621237104338:web:8eaa208e6fb434c50e870b",
  measurementId: "G-GBNM6ZK47Q",
};


const app = initializeApp(firebaseConfig);


const analytics = getAnalytics(app);

const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);


const db = getFirestore(app);

export { auth, analytics, db };
