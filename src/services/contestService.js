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
