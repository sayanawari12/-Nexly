import React from 'react';
import { useParams } from 'react-router-dom';
import TechnologyTemplate from '../templates/TechnologyTemplate';
import CLearningHub from './CLearningHub';
import CppLearningHub from './CppLearningHub';
import PythonLearningHub from './PythonLearningHub';
import JavaLearningHub from './JavaLearningHub';
import { LANGUAGE_HUB_DATA } from '../data/languageData';

const MasterLanguagePage = ({ defaultLang }) => {
  const { langId } = useParams();
  const targetId = (langId || defaultLang || 'c').toLowerCase();

  // Primary handcrafted hub delegates
  if (targetId === 'c') return <CLearningHub />;
  if (targetId === 'cpp' || targetId === 'cplusplus') return <CppLearningHub />;
  if (targetId === 'python') return <PythonLearningHub />;
  if (targetId === 'java') return <JavaLearningHub />;

  // Master TechnologyTemplate for all other languages (JavaScript, TypeScript, Go, Rust, PHP, Kotlin, C#, Swift)
  const langData = LANGUAGE_HUB_DATA[targetId] || LANGUAGE_HUB_DATA.c;

  return (
    <TechnologyTemplate
      languageId={langData.id}
      languageName={langData.name}
      title={langData.title}
      subtitle={langData.difficulty}
      description={langData.tagline}
      badgeText={`${langData.name.toUpperCase()} LANGUAGE`}
      logoSvg={langData.svg}
      stats={[
        { val: `${langData.totalLessons || 25}+`, label: 'Lessons' },
        { val: `${langData.totalPrograms || 45}+`, label: 'Programs' },
        { val: `${langData.miniProjects?.length || 5}+`, label: 'Projects' },
        { val: '30+', label: 'Quizzes' },
        { val: '50+', label: 'Interview Qs' }
      ]}
      aboutData={{
        title: `About ${langData.name} Programming`,
        description: langData.about?.what || langData.tagline,
        subDescription: langData.about?.where || '',
        topics: [
          { id: 1, name: 'Core Syntax & Control Structures' },
          { id: 2, name: 'Data Structures & Algorithms' },
          { id: 3, name: 'Modular Functions & Classes' },
          { id: 4, name: 'Async Execution & I/O Streams' }
        ]
      }}
      lessonsData={langData.roadmapNodes || []}
      programsData={langData.practice || []}
      resourcesData={langData.resources || []}
    />
  );
};

export default MasterLanguagePage;
