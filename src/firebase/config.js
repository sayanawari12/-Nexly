import { initializeApp, getApps, getApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyDqlGvaw9t0nXO2azDbAZxHNrJa79-SckU",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "bca-department-website.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "bca-department-website",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "bca-department-website.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "12993320879",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:12993320879:web:117551da99c0ca9135c15a",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export default app;
