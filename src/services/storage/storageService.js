import { doc, setDoc } from 'firebase/firestore';
import db from '../../firebase/firestore';

/**
 * Save issued certificates.
 * @param {string} uid 
 * @param {string} certificateId 
 * @param {string} course 
 * @param {string} pdfUrl 
 */
export const saveUserCertificate = async (uid, certificateId, course, pdfUrl = '') => {
  try {
    const docRef = doc(db, 'certificates', certificateId);
    await setDoc(docRef, {
      uid,
      certificateId,
      course,
      issuedAt: new Date().toISOString(),
      pdfUrl
    });
  } catch (error) {
    console.error("Error saving certificate document:", error);
    throw error;
  }
};

/**
 * Mock file upload placeholder for profile resume/avatar uploads.
 * @param {File} file 
 * @param {string} path 
 * @returns {Promise<string>}
 */
export const uploadFilePlaceholder = async (file, path) => {
  console.log(`Mock upload file to ${path}:`, file.name);
  return `https://firebasestorage.googleapis.com/v0/b/bca-department-website.appspot.com/o/${encodeURIComponent(path)}`;
};
