import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import app from "./config";

export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence).catch((err) => {
  console.warn("Firebase auth persistence initialization warning:", err.message);
});

export default auth;
