import * as admin from 'firebase-admin';
import { getAuth, Auth } from 'firebase-admin/auth';
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

  if (firebaseAdmin.apps && firebaseAdmin.apps.length > 0) {
    isInitialized = true;
    return;
  }

  try {
    if (serviceAccountJson) {
      let serviceAccount: any;
      try {
        let rawStr = serviceAccountJson.trim();
        if ((rawStr.startsWith('"') && rawStr.endsWith('"')) || (rawStr.startsWith("'") && rawStr.endsWith("'"))) {
          rawStr = rawStr.slice(1, -1);
        }

        if (rawStr.startsWith('{')) {
          serviceAccount = JSON.parse(rawStr);
        } else {
          const decoded = Buffer.from(rawStr, 'base64').toString('utf8');
          serviceAccount = JSON.parse(decoded);
        }

        if (serviceAccount && serviceAccount.private_key) {
          serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
        }

        if (serviceAccount && serviceAccount.project_id) {
          firebaseAdmin.initializeApp({
            credential: firebaseAdmin.credential.cert(serviceAccount),
            projectId: serviceAccount.project_id,
          });
          logger.info({ message: 'Firebase Admin SDK initialized with Service Account Credentials.', projectId: serviceAccount.project_id });
          isInitialized = true;
          return;
        }
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

    // Default Fallback: Initialize with Project ID for cryptographic ID token verification
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
  const sdk = getAdminSdk();
  if (sdk.apps && sdk.apps.length > 0) {
    return sdk;
  }
  return isInitialized ? sdk : null;
}

export function getFirebaseAuth(): Auth | null {
  initializeFirebaseAdmin();
  try {
    return getAuth();
  } catch (err: any) {
    logger.error({ message: 'Failed to retrieve FirebaseAuth instance', error: err.message });
    return null;
  }
}
