import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AuthContext } from './AuthContext';
import { getSocket, subscribeToEvent, unsubscribeFromEvent } from '../services/socketService';
import * as contestService from '../services/contestService';

export const ContestContext = createContext(null);

export const ContestProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  
  const [contests, setContests] = useState([]);
  const [activeContest, setActiveContest] = useState(null);
  const [contestProblems, setContestProblems] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [leaderboard, setLeaderboard] = useState(null);
  const [clarifications, setClarifications] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);

  // 1. Fetch all contests
  const fetchContests = useCallback(async () => {
    setLoading(true);
    try {
      const data = await contestService.getContests();
      setContests(data);
    } catch (err) {
      console.error('[ContestContext] Failed to fetch contests:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. Select and load contest details
  const selectContest = useCallback(async (contestId) => {
    if (!contestId) {
      setActiveContest(null);
      setContestProblems([]);
      setSubmissions([]);
      setLeaderboard(null);
      setClarifications([]);
      setAnnouncements([]);
      setRegistered(false);
      return;
    }

    setLoading(true);
    try {
      const contest = await contestService.getContest(contestId);
      setActiveContest(contest);
      
      if (contest) {
        setContestProblems(contest.problems || []);
        
        // Check registration: if user id is inside participants list
        const isRegistered = contest.participants?.some(
          (p) => p.userId === user?.uid || p.user?.email === user?.email
        ) || false;
        setRegistered(isRegistered);

        // Fetch announcements
        const anns = await contestService.getContestAnnouncements(contestId);
        setAnnouncements(anns);

        // Fetch clarifications if registered
        if (isRegistered) {
          const clars = await contestService.getContestClarifications(contestId);
          setClarifications(clars);
        }

        // Fetch leaderboard cache
        const board = await contestService.getContestLeaderboard(contestId);
        setLeaderboard(board);
      }
    } catch (err) {
      console.error('[ContestContext] Failed to load contest details:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // 3. Register for a contest
  const registerContest = useCallback(async (contestId) => {
    try {
      const result = await contestService.registerForContest(contestId);
      if (result) {
        setRegistered(true);
        // Reload details
        await selectContest(contestId);
        return true;
      }
    } catch (err) {
      console.error('[ContestContext] Registration failed:', err);
    }
    return false;
  }, [selectContest]);

  // 4. Fetch submissions history for a specific problem in active contest
  const fetchSubmissionHistory = useCallback(async (problemId) => {
    if (!activeContest) return;
    try {
      const history = await contestService.getSubmissionHistory(activeContest.id, problemId);
      setSubmissions(history);
    } catch (err) {
      console.error('[ContestContext] Failed loading submissions history:', err);
    }
  }, [activeContest]);

  // 5. Submit code
  const submitCode = useCallback(async (problemId, sourceCode, languageId) => {
    if (!activeContest) return null;
    try {
      const submission = await contestService.submitContestSubmission(
        activeContest.id,
        problemId,
        sourceCode,
        languageId
      );
      if (submission) {
        // Optimistically add to local submissions list
        setSubmissions((prev) => [submission, ...prev]);
        return submission;
      }
    } catch (err) {
      console.error('[ContestContext] Submission creation failed:', err);
    }
    return null;
  }, [activeContest]);

  // 6. Submit clarification question
  const askClarification = useCallback(async (problemId, question) => {
    if (!activeContest) return false;
    try {
      const result = await contestService.submitContestClarification(
        activeContest.id,
        problemId,
        question
      );
      if (result) {
        setClarifications((prev) => [result, ...prev]);
        return true;
      }
    } catch (err) {
      console.error('[ContestContext] Clarification query failed:', err);
    }
    return false;
  }, [activeContest]);

  // Real-time synchronization
  useEffect(() => {
    const socket = getSocket();
    if (!socket || !activeContest) return;

    // Join contest room
    socket.emit('join_contest', { contestId: activeContest.id });

    // Handles leaderboard update packets
    const handleLeaderboardUpdate = (envelope) => {
      if (envelope.contestId === activeContest.id && envelope.payload?.rankings) {
        console.log('[ContestContext] Realtime leaderboard update received.');
        setLeaderboard(envelope.payload.rankings);
      }
    };

    // Handles clarification response packets
    const handleClarificationUpdate = (envelope) => {
      if (envelope.contestId === activeContest.id) {
        console.log('[ContestContext] Realtime clarification update received.');
        const updatedClar = envelope.payload;
        setClarifications((prev) => {
          const index = prev.findIndex((c) => c.id === updatedClar.id);
          if (index !== -1) {
            const copy = [...prev];
            copy[index] = updatedClar;
            return copy;
          }
          return [updatedClar, ...prev];
        });
      }
    };

    // Handles announcement broadcast packets
    const handleAnnouncementBroadcast = (envelope) => {
      if (envelope.contestId === activeContest.id) {
        console.log('[ContestContext] Realtime announcement broadcast received.');
        setAnnouncements((prev) => [envelope.payload, ...prev]);
      }
    };

    // Handles contest state modifications (start, end, freeze, unfreeze)
    const handleContestStarted = (envelope) => {
      if (envelope.contestId === activeContest.id) {
        console.log('[ContestContext] Contest started!');
        setActiveContest((prev) => prev ? { ...prev, status: 'LIVE' } : null);
      }
    };

    const handleContestFrozen = (envelope) => {
      if (envelope.contestId === activeContest.id) {
        console.log('[ContestContext] Contest frozen!');
        setActiveContest((prev) => prev ? { ...prev, status: 'FROZEN' } : null);
      }
    };

    const handleContestEnded = (envelope) => {
      if (envelope.contestId === activeContest.id) {
        console.log('[ContestContext] Contest ended.');
        setActiveContest((prev) => prev ? { ...prev, status: 'ENDED' } : null);
      }
    };

    const handleContestUnfrozen = (envelope) => {
      if (envelope.contestId === activeContest.id) {
        console.log('[ContestContext] Contest scoreboard unfrozen.');
        setActiveContest((prev) => prev ? { ...prev, status: 'ENDED' } : null);
      }
    };

    // Subscribe to events
    socket.on('contest:leaderboard', handleLeaderboardUpdate);
    socket.on('contest:clarification', handleClarificationUpdate);
    socket.on('contest:announcement', handleAnnouncementBroadcast);
    socket.on('contest:started', handleContestStarted);
    socket.on('contest:frozen', handleContestFrozen);
    socket.on('contest:ended', handleContestEnded);
    socket.on('contest:unfrozen', handleContestUnfrozen);

    return () => {
      socket.off('contest:leaderboard', handleLeaderboardUpdate);
      socket.off('contest:clarification', handleClarificationUpdate);
      socket.off('contest:announcement', handleAnnouncementBroadcast);
      socket.off('contest:started', handleContestStarted);
      socket.off('contest:frozen', handleContestFrozen);
      socket.off('contest:ended', handleContestEnded);
      socket.off('contest:unfrozen', handleContestUnfrozen);
    };
  }, [activeContest]);

  const value = {
    contests,
    activeContest,
    contestProblems,
    submissions,
    leaderboard,
    clarifications,
    announcements,
    loading,
    registered,
    fetchContests,
    selectContest,
    registerContest,
    fetchSubmissionHistory,
    submitCode,
    askClarification,
  };

  return (
    <ContestContext.Provider value={value}>
      {children}
    </ContestContext.Provider>
  );
};
export default ContestContext;
