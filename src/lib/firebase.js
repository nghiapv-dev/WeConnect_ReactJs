import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chat-app-5209e.firebaseapp.com",
  projectId: "chat-app-5209e",
  storageBucket: "chat-app-5209e.firebasestorage.app",
  messagingSenderId: "1070334476440",
  appId: "1:1070334476440:web:95b11a55fcf922939e90ed",
  measurementId: "G-L6G76BM885",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
