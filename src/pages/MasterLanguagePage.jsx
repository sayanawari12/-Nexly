import React from 'react';
import { useParams } from 'react-router-dom';
import MasterLanguageTemplate from '../components/language/MasterLanguageTemplate';
import { LANGUAGE_HUB_DATA } from '../data/languageData';

const MasterLanguagePage = ({ defaultLang }) => {
  const { langId } = useParams();
  const targetId = (langId || defaultLang || 'c').toLowerCase();
  
  // Fallback to C if unknown language requested
  const langData = LANGUAGE_HUB_DATA[targetId] || LANGUAGE_HUB_DATA.c;

  return <MasterLanguageTemplate data={langData} />;
};

export default MasterLanguagePage;
