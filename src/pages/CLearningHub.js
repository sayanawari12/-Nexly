import React from 'react';
import TechnologyLearningHub from '../components/learning/TechnologyLearningHub';
import { C_CONFIG } from '../data/cData';
import '../styles/CLearningHub.css';

const CLearningHub = () => {
  return <TechnologyLearningHub techConfig={C_CONFIG} />;
};

export { C_LESSONS } from '../data/cData';
export default CLearningHub;
