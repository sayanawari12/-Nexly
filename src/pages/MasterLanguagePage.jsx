import React from 'react';
import { useParams } from 'react-router-dom';
import CLearningHub from './CLearningHub';
import CppLearningHub from './CppLearningHub';
import PythonLearningHub from './PythonLearningHub';
import JavaLearningHub from './JavaLearningHub';
import MasterLanguageTemplate from '../components/language/MasterLanguageTemplate';
import { LANGUAGE_HUB_DATA } from '../data/languageData';

const MasterLanguagePage = ({ defaultLang }) => {
  const { langId } = useParams();
  const targetId = (langId || defaultLang || 'c').toLowerCase();

  switch (targetId) {
    case 'c':
      return <CLearningHub />;
    case 'cpp':
    case 'cplusplus':
      return <CppLearningHub />;
    case 'python':
      return <PythonLearningHub />;
    case 'java':
      return <JavaLearningHub />;
    default:
      const langData = LANGUAGE_HUB_DATA[targetId] || LANGUAGE_HUB_DATA.c;
      return <MasterLanguageTemplate data={langData} />;
  }
};

export default MasterLanguagePage;
