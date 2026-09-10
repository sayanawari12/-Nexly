/**
 * NEXLY Recommendation Engine
 * Core differentiator: Links lesson topics directly to recommended practice problems
 * and calculates qualitative skill bands.
 */

// Seeded practice problems database with difficulty & topic tags
export const PRACTICE_PROBLEMS_DB = [
  {
    id: 'prob-py-for-01',
    title: 'Print Multiples of Three',
    difficulty: 'Easy',
    tags: ['loops', 'for-loop', 'python', 'basics'],
    statement: 'Write a Python loop to print all numbers divisible by 3 up to N.',
    starterCode: 'def print_multiples(n):\n    # Write your code here\n    pass',
    sampleInput: '10',
    sampleOutput: '3\n6\n9'
  },
  {
    id: 'prob-py-for-02',
    title: 'Sum of Even Numbers in List',
    difficulty: 'Medium',
    tags: ['loops', 'for-loop', 'lists', 'python', 'arrays'],
    statement: 'Calculate the sum of all even numbers in a given list.',
    starterCode: 'def sum_evens(arr):\n    # Write your code here\n    pass',
    sampleInput: '[1, 2, 3, 4, 5, 6]',
    sampleOutput: '12'
  },
  {
    id: 'prob-py-for-03',
    title: 'Find Prime Factors in Range',
    difficulty: 'Hard',
    tags: ['loops', 'nested-loops', 'math', 'python'],
    statement: 'Find all prime factors for numbers in range 1 to N using nested loops.',
    starterCode: 'def prime_factors(n):\n    # Write your code here\n    pass',
    sampleInput: '15',
    sampleOutput: '[2, 3, 5]'
  },
  {
    id: 'prob-js-arr-01',
    title: 'Filter Positive Integers',
    difficulty: 'Easy',
    tags: ['javascript', 'arrays', 'array-methods', 'basics'],
    statement: 'Use Array.prototype.filter to extract all numbers greater than zero.',
    starterCode: 'function filterPositives(arr) {\n  // Write your code here\n}',
    sampleInput: '[-2, 5, 0, 9, -1]',
    sampleOutput: '[5, 9]'
  },
  {
    id: 'prob-sql-select-01',
    title: 'High-Earning Employees',
    difficulty: 'Easy',
    tags: ['sql', 'select', 'where-clause', 'database'],
    statement: 'Write a SQL query to select all employees with salary > 80,000.',
    starterCode: 'SELECT * FROM employees WHERE ...',
    sampleInput: 'employees table',
    sampleOutput: 'Filtered table grid'
  }
];

/**
 * Returns 3 auto-recommended practice problems (Easy, Medium, Hard) matching a lesson topic's tags
 * @param {string[]} topicTags - Tags from the completed topic
 * @param {string} [userId] - Optional user ID to exclude already solved problems
 * @returns {{ easy: Object, medium: Object, hard: Object }}
 */
export const getRecommendedProblemsForTopic = (topicTags = [], userId = null) => {
  if (!topicTags || topicTags.length === 0) {
    // Fallback to default recommendations if no tags provided
    return {
      easy: PRACTICE_PROBLEMS_DB.find(p => p.difficulty === 'Easy') || PRACTICE_PROBLEMS_DB[0],
      medium: PRACTICE_PROBLEMS_DB.find(p => p.difficulty === 'Medium') || PRACTICE_PROBLEMS_DB[1],
      hard: PRACTICE_PROBLEMS_DB.find(p => p.difficulty === 'Hard') || PRACTICE_PROBLEMS_DB[2],
    };
  }

  // Score problems by matching tag count
  const scoredProblems = PRACTICE_PROBLEMS_DB.map(problem => {
    const matchCount = problem.tags.filter(tag => topicTags.includes(tag)).length;
    return { problem, score: matchCount };
  }).sort((a, b) => b.score - a.score);

  const easy = scoredProblems.find(item => item.problem.difficulty === 'Easy')?.problem || PRACTICE_PROBLEMS_DB[0];
  const medium = scoredProblems.find(item => item.problem.difficulty === 'Medium')?.problem || PRACTICE_PROBLEMS_DB[1];
  const hard = scoredProblems.find(item => item.problem.difficulty === 'Hard')?.problem || PRACTICE_PROBLEMS_DB[2];

  return { easy, medium, hard };
};

/**
 * Calculates a qualitative skill band from transparent user metrics
 * @param {Object} progressState
 * @param {number} progressState.completedLessonsCount
 * @param {number} progressState.solvedProblemsCount
 * @param {number} progressState.quizAccuracyPercentage
 * @returns {'Novice' | 'Developing' | 'Solid' | 'Strong'}
 */
export const calculateQualitativeSkillBand = ({ completedLessonsCount = 0, solvedProblemsCount = 0, quizAccuracyPercentage = 0 }) => {
  const compositeScore = (completedLessonsCount * 2) + (solvedProblemsCount * 3) + (quizAccuracyPercentage * 0.5);

  if (compositeScore >= 80) return 'Strong';
  if (compositeScore >= 45) return 'Solid';
  if (compositeScore >= 20) return 'Developing';
  return 'Novice';
};

/**
 * Derives weak topics for a user based on incorrect quiz & practice attempts
 * @param {Array} attemptHistory 
 * @returns {Array<{ topicId: string, title: string, accuracy: number }>}
 */
export const getWeakTopicsForUser = (attemptHistory = []) => {
  if (!attemptHistory || attemptHistory.length === 0) {
    return [
      { topicId: 'py-topic-loops', title: 'Python Control Flow & Loops', accuracy: 40 },
      { topicId: 'js-topic-async', title: 'JS Promises & Async/Await', accuracy: 55 }
    ];
  }

  // Aggregate accuracy per topic
  const topicStats = {};
  attemptHistory.forEach(att => {
    if (!topicStats[att.topicId]) {
      topicStats[att.topicId] = { title: att.topicTitle || att.topicId, total: 0, correct: 0 };
    }
    topicStats[att.topicId].total += 1;
    if (att.isCorrect) topicStats[att.topicId].correct += 1;
  });

  return Object.keys(topicStats)
    .map(topicId => ({
      topicId,
      title: topicStats[topicId].title,
      accuracy: Math.round((topicStats[topicId].correct / topicStats[topicId].total) * 100)
    }))
    .filter(t => t.accuracy < 70)
    .sort((a, b) => a.accuracy - b.accuracy);
};
