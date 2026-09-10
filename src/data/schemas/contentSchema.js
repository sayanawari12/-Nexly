/**
 * NEXLY Content Data Model Schema
 * Hierarchy: Technology -> Module -> Topic -> Lesson
 */

/**
 * @typedef {'Beginner' | 'Intermediate' | 'Advanced'} ModuleBadge
 */

/**
 * @typedef {Object} Lesson
 * @property {string} id - Unique identifier (e.g., 'py-loops-for-01')
 * @property {string} topicId - Parent topic ID
 * @property {string} title - Lesson title
 * @property {number} order - Display order within topic
 * @property {string} summary - Brief concept summary
 * @property {string} contentMarkdown - Full lesson text & explanation
 * @property {Object} runnableExample - Runnable code snippet embedded in lesson
 * @property {string} runnableExample.language - Code language ('python' | 'javascript' | 'c' | 'cpp' | 'sql')
 * @property {string} runnableExample.code - Initial runnable code
 * @property {string} runnableExample.expectedOutput - Expected output for validation
 * @property {Object} inlineMicroCheck - Quick 1-2 question check before leaving lesson
 * @property {string} inlineMicroCheck.question - Question text
 * @property {string[]} inlineMicroCheck.options - Multiple choice options
 * @property {number} inlineMicroCheck.correctIndex - Index of correct answer
 * @property {string} inlineMicroCheck.explanation - Solution explanation
 * @property {string[]} practiceTagMatches - Tags linking to practice problem database (e.g., ['loops', 'for-loop', 'iterations'])
 */

/**
 * @typedef {Object} Topic
 * @property {string} id - Unique topic ID (e.g., 'py-topic-loops')
 * @property {string} moduleId - Parent module ID
 * @property {string} title - Topic title
 * @property {number} order - Order within module
 * @property {string} description - Brief description of key concepts
 * @property {string[]} tags - Topic tags used by Recommendation Engine
 * @property {Lesson[]} lessons - Array of lessons
 */

/**
 * @typedef {Object} Module
 * @property {string} id - Unique module ID (e.g., 'py-mod-control-flow')
 * @property {string} technologyId - Parent technology ID
 * @property {string} title - Module title
 * @property {number} order - Order within technology
 * @property {ModuleBadge} badge - Display badge ('Beginner' | 'Intermediate' | 'Advanced')
 * @property {string[]} [prerequisiteModuleIds] - Prerequisites required before this module
 * @property {Topic[]} topics - Array of topics in this module
 */

/**
 * @typedef {Object} Technology
 * @property {string} id - Technology ID ('python' | 'javascript' | 'html-css' | 'sql' | 'c' | 'cpp' | 'java')
 * @property {string} name - Display name ('Python', 'JavaScript', etc.)
 * @property {string} slug - URL slug
 * @property {string} description - Short tagline/description
 * @property {string} icon - Lucide icon or brand identifier
 * @property {Module[]} modules - Ordered array of modules
 */

/**
 * Validates a Technology schema object
 * @param {Technology} tech 
 * @returns {boolean}
 */
export const validateTechnologySchema = (tech) => {
  if (!tech || !tech.id || !tech.name || !Array.isArray(tech.modules)) {
    return false;
  }
  return tech.modules.every(mod => (
    mod.id && mod.title && Array.isArray(mod.topics) &&
    mod.topics.every(top => (
      top.id && top.title && Array.isArray(top.lessons)
    ))
  ));
};
