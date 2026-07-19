import admin from 'firebase-admin';
import { logger } from '../../../utils/logger';

const firebaseAdmin: any = admin;
let isInitialized = false;

export function initializeFirebaseAdmin() {
  if (isInitialized) return;

  try {
    if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
      firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(serviceAccount),
      });
      logger.info('Firebase Admin SDK initialized successfully via service account JSON.');
      isInitialized = true;
    } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.applicationDefault(),
      });
      logger.info('Firebase Admin SDK initialized successfully via Application Default Credentials.');
      isInitialized = true;
    } else {
      logger.warn('Firebase Admin SDK was not initialized: missing credentials. Mock fallback authentication will be active in development.');
    }
  } catch (error) {
    logger.error({ message: 'Firebase Admin SDK initialization failed', error });
  }
}

export function getFirebaseAdmin() {
  initializeFirebaseAdmin();
  return isInitialized ? firebaseAdmin : null;
}
