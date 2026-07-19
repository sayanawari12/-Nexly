import React from 'react';
import RecentProgramsCard from './RecentProgramsCard';
import RewardsCard from './RewardsCard';
import QuickToolsCard from './QuickToolsCard';

const ProgramSidebar = ({ recentPrograms }) => {
  return (
    <aside className="hub-sidebar-col">
      <RecentProgramsCard recentPrograms={recentPrograms} />
      <QuickToolsCard />
      <RewardsCard />
    </aside>
  );
};

export default ProgramSidebar;
