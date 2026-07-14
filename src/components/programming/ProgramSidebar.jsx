import React from 'react';
import RecentProgramsCard from './RecentProgramsCard';
import RewardsCard from './RewardsCard';

const ProgramSidebar = ({ recentPrograms }) => {
  return (
    <aside className="hub-sidebar-col">
      <RecentProgramsCard recentPrograms={recentPrograms} />
      <RewardsCard />
    </aside>
  );
};

export default ProgramSidebar;
