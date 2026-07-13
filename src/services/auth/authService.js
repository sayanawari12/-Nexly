import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail, 
  signInWithPopup, 
  GoogleAuthProvider 
} from 'firebase/auth';
import auth from '../../firebase/auth';

const googleProvider = new GoogleAuthProvider();

/**
 * Log in a user using email and password.
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<import('firebase/auth').UserCredential>}
 */
export const loginWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

/**
 * Sign up a user using email and password.
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<import('firebase/auth').UserCredential>}
 */
export const signupWithEmail = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

/**
 * Log out the currently authenticated user.
 * @returns {Promise<void>}
 */
export const logoutUser = () => {
  return signOut(auth);
};

/**
 * Send a password reset link to the user's email.
 * @param {string} email 
 * @returns {Promise<void>}
 */
export const resetPasswordEmail = (email) => {
  return sendPasswordResetEmail(auth, email);
};

/**
 * Sign in using Google Provider popup.
 * @returns {Promise<import('firebase/auth').UserCredential>}
 */
export const loginWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};
