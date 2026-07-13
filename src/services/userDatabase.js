import {
  getUserProfile,
  checkUsernameAvailability,
  createUserDocument,
  updateUserLastLogin,
  updateUserProfile,
  updateUserLearningStats
} from "./user/userService";

export {
  getUserProfile,
  checkUsernameAvailability,
  createUserDocument,
  updateUserLastLogin,
  updateUserProfile,
  updateUserLearningStats
};

export const createUserProfile = createUserDocument;

export {
  saveUserProgress
} from "./progress/progressService";

export {
  saveUserNote,
  getUserNote,
  addUserBookmark
} from "./lesson/lessonService";

export {
  saveQuizHistory
} from "./quiz/quizService";

export {
  saveUserCertificate
} from "./storage/storageService";
