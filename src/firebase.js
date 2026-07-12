import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqlGvaw9t0nXO2azDbAZxHNrJa79-SckU",
  authDomain: "bca-department-website.firebaseapp.com",
  projectId: "bca-department-website",
  storageBucket: "bca-department-website.firebasestorage.app",
  messagingSenderId: "12993320879",
  appId: "1:12993320879:web:117551da99c0ca9135c15a",
};

const app = initializeApp(firebaseConfig);

// Firebase Authentication
export const auth = getAuth(app);

// Firebase Firestore
export const db = getFirestore(app);

// Export Firebase App
export default app;