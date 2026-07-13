// Re-exports from the new isolated firebase layer to ensure absolute backward compatibility
import app from "./firebase/config";
import auth from "./firebase/auth";
import db from "./firebase/firestore";

export { auth, db };
export default app;