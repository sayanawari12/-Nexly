import React from 'react';
import TechnologyLearningHub from '../components/learning/TechnologyLearningHub';
import { PYTHON_CONFIG } from '../data/pythonData';
import '../styles/PythonLearningHub.css';

const PythonLearningHub = () => {
  return <TechnologyLearningHub techConfig={PYTHON_CONFIG} />;
};

export { PYTHON_LESSONS } from '../data/pythonData';
export default PythonLearningHub;
