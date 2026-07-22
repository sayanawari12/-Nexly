import * as admin from 'firebase-admin';
import { logger } from '../../../utils/logger';

function getAdminSdk() {
  if ((admin as any).initializeApp) {
    return admin;
  }
  if ((admin as any).default && (admin as any).default.initializeApp) {
    return (admin as any).default;
  }
  return admin;
}

let isInitialized = false;

export function initializeFirebaseAdmin() {
  if (isInitialized) return;

  const firebaseAdmin = getAdminSdk();
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON || process.env.FIREBASE_SERVICE_ACCOUNT;
  const projectId = process.env.FIREBASE_PROJECT_ID || 'bca-department-website';

  try {
    if (serviceAccountJson) {
      let serviceAccount: any;
      try {
        if (serviceAccountJson.trim().startsWith('{')) {
          serviceAccount = JSON.parse(serviceAccountJson);
        } else {
          const decoded = Buffer.from(serviceAccountJson, 'base64').toString('utf8');
          serviceAccount = JSON.parse(decoded);
        }

        firebaseAdmin.initializeApp({
          credential: firebaseAdmin.credential.cert(serviceAccount),
          projectId: serviceAccount.project_id || projectId,
        });
        logger.info({ message: 'Firebase Admin SDK initialized with Service Account Credentials.', projectId: serviceAccount.project_id || projectId });
        isInitialized = true;
        return;
      } catch (jsonErr: any) {
        logger.warn({ message: 'Failed to parse FIREBASE_SERVICE_ACCOUNT_JSON, falling back to Project ID initialization', error: jsonErr.message });
      }
    }

    if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.applicationDefault(),
        projectId,
      });
      logger.info({ message: 'Firebase Admin SDK initialized with Application Default Credentials.', projectId });
      isInitialized = true;
      return;
    }

    // Default Fallback: Initialize with Project ID for ID token cryptographic verification via Google public keys
    firebaseAdmin.initializeApp({
      projectId,
    });
    logger.info({ message: 'Firebase Admin SDK initialized with Project ID for token verification.', projectId });
    isInitialized = true;
  } catch (error: any) {
    if (error.code === 'app/duplicate-app' || error.message?.includes('already exists')) {
      isInitialized = true;
    } else {
      logger.error({ message: 'Firebase Admin SDK initialization error', error: error.message, stack: error.stack });
    }
  }
}

export function getFirebaseAdmin() {
  initializeFirebaseAdmin();
  return isInitialized ? getAdminSdk() : null;
}
