import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import db from '../../firebase/firestore';

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
      const randomId = Math.floor(1000 + Math.random() * 9000);
      const emailPrefix = details.email ? details.email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '') : 'student';
      let tempUsername = `${emailPrefix}${randomId}`;

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
        role: 'student',
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
      console.log("UserService: Created new user profile document for UID:", uid);
      return newProfile;
    } else {
      const updates = {
        lastLogin: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      await updateDoc(docRef, updates);
      console.log("UserService: Updated login timestamps for UID:", uid);
      return docSnap.data();
    }
  } catch (error) {
    console.error("Error creating or updating user document in Firestore:", error);
    throw error;
  }
};

/**
 * Update user's last login timestamp.
 * @param {string} uid 
 */
export const updateUserLastLogin = async (uid) => {
  try {
    const docRef = doc(db, 'users', uid);
    await updateDoc(docRef, {
      lastLogin: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error updating user last login timestamp:", error);
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
    const updates = {
      ...data,
      updatedAt: new Date().toISOString()
    };
    await updateDoc(docRef, updates);
  } catch (error) {
    console.error("Error updating user profile document:", error);
    throw error;
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
    await updateDoc(docRef, {
      ...statsUpdates,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error updating learning stats:", error);
  }
};
