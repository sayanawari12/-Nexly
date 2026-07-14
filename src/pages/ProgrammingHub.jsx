import React, { useState, useMemo } from 'react';
import { useProgram } from '../context/ProgramContext';
import StudentLayout from '../layouts/StudentLayout';
import ProgramHeader from '../components/programming/ProgramHeader';
import SearchBar from '../components/programming/SearchBar';
import SubjectTabs from '../components/programming/SubjectTabs';
import FilterBar from '../components/programming/FilterBar';
import ProgramList from '../components/programming/ProgramList';
import ProgramSidebar from '../components/programming/ProgramSidebar';
import LoadingSkeleton from '../components/programming/LoadingSkeleton';
import '../styles/ProgrammingHub.css';

const ProgrammingHub = () => {
  const { 
    filteredPrograms, 
    programs, 
    bookmarkedIds, 
    completedIds, 
    loading, 
    filters, 
    setFilters, 
    toggleBookmark, 
    toggleCompletion,
    recentPrograms
  } = useProgram();

  const [activeSubject, setActiveSubject] = useState('all');

  // Handle subject tab change
  const handleSubjectChange = (subjectId) => {
    setActiveSubject(subjectId);
    setFilters(prev => ({
      ...prev,
      subject: subjectId,
      category: 'all'
    }));
  };

  // Derive unique categories for the active subject
  const categories = useMemo(() => {
    const subset = activeSubject === 'all' 
      ? programs 
      : programs.filter(p => p.subject === activeSubject);
    const unique = new Set(subset.map(p => p.category).filter(Boolean));
    return ['all', ...Array.from(unique)];
  }, [programs, activeSubject]);

  // Update filters in context
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Reset all filters
  const handleResetFilters = () => {
    setFilters({
      subject: 'all',
      difficulty: 'all',
      category: 'all',
      completed: 'all',
      bookmarked: 'all',
      searchQuery: '',
      sortBy: 'Alphabetical'
    });
    setActiveSubject('all');
  };

  // Calculate stats
  const totalCount = programs.length;
  const completedCount = completedIds.size;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  if (loading) {
    return (
      <StudentLayout>
        <div className="hub-wrapper">
          <div className="hub-container">
            <LoadingSkeleton />
          </div>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="hub-wrapper">
        <div className="hub-container">
          <ProgramHeader 
            completedCount={completedCount}
            totalCount={totalCount}
            completionPercentage={completionPercentage}
          />

          <SearchBar 
            searchQuery={filters.searchQuery}
            onSearchChange={(value) => handleFilterChange('searchQuery', value)}
          />

          <SubjectTabs 
            activeSubject={activeSubject}
            onSubjectChange={handleSubjectChange}
          />

          <div className="hub-layout-grid">
            <main className="hub-main-col">
              <FilterBar 
                filters={filters}
                onFilterChange={handleFilterChange}
                categories={categories}
              />

              <ProgramList 
                programs={filteredPrograms}
                bookmarkedIds={bookmarkedIds}
                completedIds={completedIds}
                onToggleBookmark={toggleBookmark}
                onToggleCompletion={toggleCompletion}
                onResetFilters={handleResetFilters}
              />
            </main>

            <ProgramSidebar recentPrograms={recentPrograms} />
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default ProgrammingHub;
