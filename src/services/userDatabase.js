import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Fetch a user's Firestore profile.
 * @param {string} uid 
 * @returns {Promise<any | null>}
 */
export const getUserProfile = async (uid) => {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (error) {
    console.error("Error reading user profile:", error);
    throw error;
  }
};

/**
 * Check if a username is available.
 * @param {string} username 
 * @returns {Promise<boolean>}
 */
export const checkUsernameAvailability = async (username) => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('username', '==', username));
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty;
  } catch (error) {
    console.error("Error checking username availability:", error);
    return false;
  }
};

/**
 * Automatically create or update a user document in Firestore on authentication.
 * @param {string} uid 
 * @param {object} details 
 */
export const createUserDocument = async (uid, details = {}) => {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      // 1. User doesn't exist, create a new document with complete structure
      // Generate a temporary unique username
      const randomId = Math.floor(1000 + Math.random() * 9000);
      const emailPrefix = details.email ? details.email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '') : 'student';
      let tempUsername = `${emailPrefix}${randomId}`;

      // Guarantee uniqueness
      let isAvailable = await checkUsernameAvailability(tempUsername);
      while (!isAvailable) {
        const fallbackRandom = Math.floor(10000 + Math.random() * 90000);
        tempUsername = `${emailPrefix}${fallbackRandom}`;
        isAvailable = await checkUsernameAvailability(tempUsername);
      }

      const newProfile = {
        uid: uid,
        email: details.email || '',
        displayName: details.displayName || details.email?.split('@')[0] || 'Student',
        username: tempUsername,
        photoURL: details.photoURL || '',
        role: 'student', // default student role
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        profileCompleted: false,
        streak: 0,
        progress: 0,
        bio: '',
        college: '',
        course: '',
        semester: '',
        githubURL: '',
        linkedinURL: '',
        resumeURL: '',
        bookmarks: [],
        certificates: [],
        achievements: [],
        learningStats: {
          programsSolved: 0,
          roadmapsCompleted: 0,
          lessonsCompleted: 0,
          quizAccuracy: 0,
          learningHours: 0,
          currentStreak: 0,
          xp: 0,
          level: 1,
          certificates: 0,
          bookmarks: 0
        }
      };

      await setDoc(docRef, newProfile);
      console.log("Firestore: Created new user profile document for UID:", uid);
      return newProfile;
    } else {
      // 2. User document already exists, simply update lastLogin and updatedAt
      const updates = {
        lastLogin: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      await updateDoc(docRef, updates);
      console.log("Firestore: Updated login timestamps for UID:", uid);
      return docSnap.data();
    }
  } catch (error) {
    console.error("Error creating or updating user document in Firestore:", error);
    throw error;
  }
};

// Kept for backward compatibility
export const createUserProfile = createUserDocument;
export const updateUserLastLogin = async (uid) => {
  try {
    const docRef = doc(db, 'users', uid);
    await updateDoc(docRef, {
      lastLogin: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  } catch (err) {
    console.error("Error updating user last login timestamp:", err);
  }
};

/**
 * Update user learning statistics increment.
 * @param {string} uid 
 * @param {object} statsUpdates 
 */
export const updateUserLearningStats = async (uid, statsUpdates) => {
  try {
    const docRef = doc(db, 'users', uid);
    await updateDoc(docRef, statsUpdates);
  } catch (error) {
    console.error("Error updating learning stats:", error);
  }
};

/**
 * Save user learning progress.
 * @param {string} uid 
 * @param {string} roadmapId 
 * @param {string} lessonId 
 * @param {number} percentage 
 * @param {boolean} completed 
 */
export const saveUserProgress = async (uid, roadmapId, lessonId, percentage, completed) => {
  try {
    const progressId = `${uid}_${roadmapId}_${lessonId}`;
    const docRef = doc(db, 'progress', progressId);
    await setDoc(docRef, {
      uid,
      roadmapId,
      lessonId,
      completed,
      percentage,
      lastOpened: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    console.error("Error saving user progress document:", error);
    throw error;
  }
};

/**
 * Add a learning resource bookmark.
 * @param {string} uid 
 * @param {string} lessonId 
 * @param {string} programId 
 * @param {string} roadmapId 
 */
export const addUserBookmark = async (uid, lessonId = '', programId = '', roadmapId = '') => {
  try {
    const bookmarkId = `${uid}_${lessonId || 'null'}_${programId || 'null'}`;
    const docRef = doc(db, 'bookmarks', bookmarkId);
    await setDoc(docRef, {
      uid,
      lessonId,
      programId,
      roadmapId,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error saving user bookmark document:", error);
    throw error;
  }
};

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
 * Save student quiz history.
 * @param {string} uid 
 * @param {string} quizId 
 * @param {number} score 
 * @param {number} accuracy 
 */
export const saveQuizHistory = async (uid, quizId, score, accuracy) => {
  try {
    const historyId = `${uid}_${quizId}_${Date.now()}`;
    const docRef = doc(db, 'quizHistory', historyId);
    await setDoc(docRef, {
      uid,
      quizId,
      score,
      accuracy,
      completedAt: new Date().toISOString()
    });
    } catch (error) {
      console.error("Error saving quiz history document:", error);
      throw error;
    }
  };

/**
 * Update user profile details in Firestore.
 * @param {string} uid
 * @param {object} data
 */
export const updateUserProfile = async (uid, data) => {
  try {
    const docRef = doc(db, 'users', uid);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error("Error updating user profile document:", error);
    throw error;
  }
};

/**
 * Save user private note for a lesson.
 * @param {string} uid
 * @param {string} lessonId
 * @param {string} content
 */
export const saveUserNote = async (uid, lessonId, content) => {
  try {
    const docRef = doc(db, 'notes', `${uid}_${lessonId}`);
    await setDoc(docRef, {
      uid,
      lessonId,
      content,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error saving user note:", error);
    throw error;
  }
};

/**
 * Read user private note for a lesson.
 * @param {string} uid
 * @param {string} lessonId
 */
export const getUserNote = async (uid, lessonId) => {
  try {
    const docRef = doc(db, 'notes', `${uid}_${lessonId}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().content;
    }
    return '';
  } catch (error) {
    console.error("Error reading user note:", error);
    return '';
  }
};
