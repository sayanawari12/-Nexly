import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import useAuth from '../hooks/useAuth';
import { 
  filterPrograms,
  toggleProgramBookmark, 
  toggleProgramCompletion 
} from '../services/program/programService';
import { 
  listenToProgramBookmarks, 
  listenToProgramProgress 
} from '../repositories/programRepository';

const ProgramContext = createContext(null);

export const ProgramProvider = ({ children }) => {
  const { user } = useAuth();
  
  const [programs, setPrograms] = useState([]);
  const [bookmarkedEntries, setBookmarkedEntries] = useState([]);
  const [completedEntries, setCompletedEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentProgram, setCurrentProgram] = useState(null);
  const [recentProgramIds, setRecentProgramIds] = useState([]);

  // Filter & Search states
  const [filters, setFilters] = useState({
    subject: 'all',
    difficulty: 'all',
    category: 'all',
    completed: 'all',
    bookmarked: 'all',
    searchQuery: '',
    sortBy: 'Alphabetical'
  });

  // Load programs on mount using dynamic import — keeps programs_data.json (69 KB)
  // OUT of the initial bundle and only fetches it when this provider first mounts.
  useEffect(() => {
    const fetchPrograms = async () => {
      setLoading(true);
      try {
        // Dynamic import: programs_data.json is split into its own chunk
        const { default: data } = await import('../pages/programs_data.json');
        setPrograms(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to load programs in context:', err);
        // Fallback: try the service layer
        try {
          const { loadPrograms } = await import('../services/program/programService');
          const fallback = await loadPrograms();
          setPrograms(Array.isArray(fallback) ? fallback : []);
        } catch (fallbackErr) {
          console.error('Fallback program load also failed:', fallbackErr);
          setPrograms([]);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

  // Listen to bookmarks and progress when user is logged in
  useEffect(() => {
    if (!user) {
      setBookmarkedEntries([]);
      setCompletedEntries([]);
      return;
    }

    const unsubBookmarks = listenToProgramBookmarks(user.uid, (data) => {
      setBookmarkedEntries(data);
    });

    const unsubProgress = listenToProgramProgress(user.uid, (data) => {
      setCompletedEntries(data);
    });

    return () => {
      unsubBookmarks();
      unsubProgress();
    };
  }, [user]);

  // Derived sets for constant O(1) lookups
  const bookmarkedIdsSet = useMemo(() => {
    return new Set(bookmarkedEntries.map(e => e.id));
  }, [bookmarkedEntries]);

  const completedIdsSet = useMemo(() => {
    return new Set(completedEntries.map(e => e.id));
  }, [completedEntries]);

  // Filtered Programs calculation
  const filteredPrograms = useMemo(() => {
    return filterPrograms(programs, filters, bookmarkedIdsSet, completedIdsSet);
  }, [programs, filters, bookmarkedIdsSet, completedIdsSet]);

  // Search Results is subset of filtered programs matching search query
  const searchResults = useMemo(() => {
    if (!filters.searchQuery) return filteredPrograms;
    return filteredPrograms.filter(p => 
      p.title?.toLowerCase().includes(filters.searchQuery.toLowerCase())
    );
  }, [filteredPrograms, filters.searchQuery]);

  // Bookmarks program items list
  const bookmarkedPrograms = useMemo(() => {
    return programs.filter(p => bookmarkedIdsSet.has(p.id));
  }, [programs, bookmarkedIdsSet]);

  // Completed program items list
  const completedPrograms = useMemo(() => {
    return programs.filter(p => completedIdsSet.has(p.id));
  }, [programs, completedIdsSet]);

  // Select program helper and update recent queue
  const selectProgram = useCallback((programId) => {
    const prog = programs.find(p => p.id === programId);
    if (prog) {
      setCurrentProgram(prog);
      
      // Update recent queue (max 5 items, unique)
      setRecentProgramIds(prev => {
        const filtered = prev.filter(id => id !== programId);
        return [programId, ...filtered].slice(0, 5);
      });
    }
  }, [programs]);

  // Map recent program IDs back to full program objects
  const recentProgramsList = useMemo(() => {
    return recentProgramIds
      .map(id => programs.find(p => p.id === id))
      .filter(Boolean);
  }, [recentProgramIds, programs]);

  // Action wrappers with stable references
  const toggleBookmark = useCallback(async (programId) => {
    if (!user) return;
    const isCurrentlyBookmarked = bookmarkedIdsSet.has(programId);
    try {
      await toggleProgramBookmark(user.uid, programId, !isCurrentlyBookmarked);
    } catch (err) {
      console.error('Failed to toggle bookmark:', err);
    }
  }, [user, bookmarkedIdsSet]);

  const toggleCompletion = useCallback(async (programId) => {
    if (!user) return;
    const isCurrentlyCompleted = completedIdsSet.has(programId);
    try {
      await toggleProgramCompletion(user.uid, programId, !isCurrentlyCompleted);
    } catch (err) {
      console.error('Failed to toggle completion:', err);
    }
  }, [user, completedIdsSet]);

  const value = useMemo(() => ({
    programs,
    filteredPrograms,
    bookmarks: bookmarkedPrograms,
    completedPrograms,
    searchResults,
    currentProgram,
    recentPrograms: recentProgramsList,
    loading,
    filters,
    setFilters,
    selectProgram,
    toggleBookmark,
    toggleCompletion,
    bookmarkedIds: bookmarkedIdsSet,
    completedIds: completedIdsSet
  }), [
    programs, filteredPrograms, bookmarkedPrograms, completedPrograms,
    searchResults, currentProgram, recentProgramsList, loading,
    filters, selectProgram, toggleBookmark, toggleCompletion,
    bookmarkedIdsSet, completedIdsSet
  ]);

  return (
    <ProgramContext.Provider value={value}>
      {children}
    </ProgramContext.Provider>
  );
};

export const useProgram = () => {
  const context = useContext(ProgramContext);
  if (!context) {
    throw new Error('useProgram must be used inside a ProgramProvider');
  }
  return context;
};
