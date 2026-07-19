import api from './api';

export const getContests = async () => {
  const response = await api.get('/contests');
  return response.data?.data || [];
};

export const getContest = async (contestId) => {
  const response = await api.get(`/contests/${contestId}`);
  return response.data?.data || null;
};

export const registerForContest = async (contestId) => {
  const response = await api.post(`/contests/${contestId}/register`, {});
  return response.data?.data || null;
};

export const getContestLeaderboard = async (contestId) => {
  const response = await api.get(`/contests/${contestId}/leaderboard`);
  return response.data?.data || null;
};

export const getContestClarifications = async (contestId) => {
  const response = await api.get(`/contests/${contestId}/clarifications`);
  return response.data?.data || [];
};

export const submitContestClarification = async (contestId, problemId, question) => {
  const response = await api.post(`/contests/${contestId}/clarifications`, {
    problemId,
    question,
  });
  return response.data?.data || null;
};

export const submitContestSubmission = async (contestId, problemId, sourceCode, languageId) => {
  const response = await api.post('/submissions', {
    contestId,
    problemId,
    sourceCode,
    languageId,
  });
  return response.data?.data || null;
};

export const runCode = async (problemId, sourceCode, languageId, stdin = '') => {
  // Let's implement run code through the backend's sandbox compiler executor.
  // Wait, does the backend have a custom compile execution endpoint?
  // In compilerRepository, it was talking to Judge0. But wait! The backend also has a submissions pipeline that can execute code!
  // In the backend, we can run code by creating a standard submission without contestId (which runs it asynchronously in Judge0 and saves it).
  // Wait, let's see if the backend has a direct compile test endpoint or if we can use the submissions route:
  // Yes! The standard submissions POST route executes the code and returns the submission details.
  // We can call api.post('/submissions', { problemId, sourceCode, languageId }) to trigger the sandbox!
  const response = await api.post('/submissions', {
    problemId,
    sourceCode,
    languageId,
  });
  return response.data?.data || null;
};

export const getSubmissionStatus = async (submissionId) => {
  const response = await api.get(`/submissions/${submissionId}/status`);
  return response.data?.data || null;
};

export const getSubmissionHistory = async (contestId, problemId) => {
  // Retrieves the page list of user submissions and filters matching criteria
  const response = await api.get('/submissions', {
    params: { limit: 100, page: 1 },
  });
  const allSubs = response.data?.data || [];
  return allSubs.filter(
    (sub) => sub.problemId === problemId && (!contestId || sub.contestId === contestId)
  );
};

export const getContestResults = async (contestId) => {
  // The results of a contest are summarized in the leaderboard
  const response = await api.get(`/contests/${contestId}/leaderboard`);
  return response.data?.data || null;
};

export const getContestAnnouncements = async (contestId) => {
  const response = await api.get(`/contests/${contestId}/announcements`);
  return response.data?.data || [];
};

export const getLanguages = async () => {
  const response = await api.get('/submissions/languages');
  return response.data?.data || [];
};
