"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeFirebaseAdmin = initializeFirebaseAdmin;
exports.getFirebaseAdmin = getFirebaseAdmin;
exports.getFirebaseAuth = getFirebaseAuth;
const admin = __importStar(require("firebase-admin"));
const auth_1 = require("firebase-admin/auth");
const logger_1 = require("../../../utils/logger");
function getAdminSdk() {
    if (admin.initializeApp) {
        return admin;
    }
    if (admin.default && admin.default.initializeApp) {
        return admin.default;
    }
    return admin;
}
let isInitialized = false;
function initializeFirebaseAdmin() {
    if (isInitialized)
        return;
    const firebaseAdmin = getAdminSdk();
    const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON || process.env.FIREBASE_SERVICE_ACCOUNT;
    const projectId = process.env.FIREBASE_PROJECT_ID || 'bca-department-website';
    if (firebaseAdmin.apps && firebaseAdmin.apps.length > 0) {
        isInitialized = true;
        return;
    }
    try {
        if (serviceAccountJson) {
            let serviceAccount;
            try {
                let rawStr = serviceAccountJson.trim();
                if ((rawStr.startsWith('"') && rawStr.endsWith('"')) || (rawStr.startsWith("'") && rawStr.endsWith("'"))) {
                    rawStr = rawStr.slice(1, -1);
                }
                if (rawStr.startsWith('{')) {
                    serviceAccount = JSON.parse(rawStr);
                }
                else {
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
                    logger_1.logger.info({ message: 'Firebase Admin SDK initialized with Service Account Credentials.', projectId: serviceAccount.project_id });
                    isInitialized = true;
                    return;
                }
            }
            catch (jsonErr) {
                logger_1.logger.warn({ message: 'Failed to parse FIREBASE_SERVICE_ACCOUNT_JSON, falling back to Project ID initialization', error: jsonErr.message });
            }
        }
        if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
            firebaseAdmin.initializeApp({
                credential: firebaseAdmin.credential.applicationDefault(),
                projectId,
            });
            logger_1.logger.info({ message: 'Firebase Admin SDK initialized with Application Default Credentials.', projectId });
            isInitialized = true;
            return;
        }
        // Default Fallback: Initialize with Project ID for cryptographic ID token verification
        firebaseAdmin.initializeApp({
            projectId,
        });
        logger_1.logger.info({ message: 'Firebase Admin SDK initialized with Project ID for token verification.', projectId });
        isInitialized = true;
    }
    catch (error) {
        if (error.code === 'app/duplicate-app' || error.message?.includes('already exists')) {
            isInitialized = true;
        }
        else {
            logger_1.logger.error({ message: 'Firebase Admin SDK initialization error', error: error.message, stack: error.stack });
        }
    }
}
function getFirebaseAdmin() {
    initializeFirebaseAdmin();
    const sdk = getAdminSdk();
    if (sdk.apps && sdk.apps.length > 0) {
        return sdk;
    }
    return isInitialized ? sdk : null;
}
function getFirebaseAuth() {
    initializeFirebaseAdmin();
    try {
        return (0, auth_1.getAuth)();
    }
    catch (err) {
        logger_1.logger.error({ message: 'Failed to retrieve FirebaseAuth instance', error: err.message });
        return null;
    }
}
