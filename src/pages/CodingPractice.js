import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Play,
  Upload,
  RotateCcw,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Code2,
  MessageSquare,
  FileText,
  Terminal,
  CheckCircle2,
  XCircle,
  Clock,
  Zap,
  BookOpen,
  List,
  LayoutPanelLeft,
  PanelRight,
  Home
} from 'lucide-react';
import '../styles/CodingPractice.css';

// ─── Problem Data ────────────────────────────────────────────────────────────

const PROBLEMS = [
  {
    id: 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    tags: ['Array', 'Hash Map'],
    acceptance: '49.2%',
    description: `Given an array of integers \`nums\` and an integer \`target\`, return **indices** of the two numbers such that they add up to target.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0, 1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1, 2]',
        explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].',
      },
    ],
    constraints: [
      '2 ≤ nums.length ≤ 10⁴',
      '-10⁹ ≤ nums[i] ≤ 10⁹',
      '-10⁹ ≤ target ≤ 10⁹',
      'Only one valid answer exists.',
    ],
    hint: 'Consider using a hash map to store each number and its index as you iterate. For each number, check if the complement (target - num) already exists in the map.',
    solution: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (seen.count(complement)) {
                return {seen[complement], i};
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};`,
    starterCode: `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your solution here
        
    }
};`,
    mockRunOutput: `Running test cases...

✓ Test 1: nums=[2,7,11,15], target=9
  Expected: [0,1]  Got: [0,1]  ✓ PASSED

✓ Test 2: nums=[3,2,4], target=6
  Expected: [1,2]  Got: [1,2]  ✓ PASSED

✓ Test 3: nums=[3,3], target=6
  Expected: [0,1]  Got: [0,1]  ✓ PASSED

─────────────────────────────────
Runtime:  4 ms  (beats 82%)
Memory:   10.2 MB  (beats 71%)
Status:   All 3/3 Tests Passed ✓`,
    mockSubmitOutput: `Submitting solution...

Running 57 test cases...
✓ Test 1–10:  PASSED
✓ Test 11–20: PASSED
✓ Test 21–30: PASSED
✓ Test 31–40: PASSED
✓ Test 41–50: PASSED
✓ Test 51–57: PASSED

─────────────────────────────────
  🎉  Accepted!
  Runtime:   4 ms   (beats 82.4% of C++ submissions)
  Memory:    10.2 MB  (beats 71.1% of C++ submissions)
  Language:  C++17
  Status:    ACCEPTED ✅`,
    discussions: [
      { user: 'alex_dev', time: '2 days ago', text: 'Great problem for practicing hash maps! The O(n) solution is much cleaner than the O(n²) brute force.' },
      { user: 'priya_codes', time: '5 hours ago', text: 'Remember to handle edge cases where the complement equals the current element (same index problem).' },
      { user: 'coder42', time: '1 day ago', text: 'C++ unordered_map gives O(1) average lookup which makes this very efficient.' },
    ],
  },
  {
    id: 2,
    title: 'Reverse Linked List',
    difficulty: 'Medium',
    tags: ['Linked List', 'Recursion'],
    acceptance: '73.8%',
    description: `Given the \`head\` of a singly linked list, reverse the list, and return *the reversed list*.`,
    examples: [
      { input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]', explanation: 'Reverse the given linked list.' },
      { input: 'head = [1,2]', output: '[2,1]', explanation: 'Two-node list reversed.' },
    ],
    constraints: [
      'The number of nodes in the list is in the range [0, 5000].',
      '-5000 ≤ Node.val ≤ 5000',
    ],
    hint: 'Use three pointers: prev, current, and next. Iterate through the list, reversing the direction of each pointer as you go.',
    solution: `struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* curr = head;
        while (curr) {
            ListNode* next = curr->next;
            curr->next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
};`,
    starterCode: `struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        // Write your solution here
        
    }
};`,
    mockRunOutput: `Running test cases...

✓ Test 1: head=[1,2,3,4,5]
  Expected: [5,4,3,2,1]  Got: [5,4,3,2,1]  ✓ PASSED

✓ Test 2: head=[1,2]
  Expected: [2,1]  Got: [2,1]  ✓ PASSED

✓ Test 3: head=[]
  Expected: []  Got: []  ✓ PASSED

─────────────────────────────────
Runtime:  0 ms  (beats 100%)
Memory:   8.4 MB  (beats 85%)
Status:   All 3/3 Tests Passed ✓`,
    mockSubmitOutput: `Submitting solution...

Running 28 test cases...
✓ Test 1–10:  PASSED
✓ Test 11–20: PASSED
✓ Test 21–28: PASSED

─────────────────────────────────
  🎉  Accepted!
  Runtime:   0 ms   (beats 100% of C++ submissions)
  Memory:    8.4 MB  (beats 85.6% of C++ submissions)
  Language:  C++17
  Status:    ACCEPTED ✅`,
    discussions: [
      { user: 'linkedlist_pro', time: '3 days ago', text: 'The iterative approach with 3 pointers is the most intuitive. Recursive works too but uses O(n) stack space.' },
      { user: 'algo_ninja', time: '1 day ago', text: 'Classic problem. Make sure to set curr->next = prev before moving forward!' },
    ],
  },
  {
    id: 3,
    title: 'Longest Common Subsequence',
    difficulty: 'Hard',
    tags: ['Dynamic Programming', 'String'],
    acceptance: '56.4%',
    description: `Given two strings \`text1\` and \`text2\`, return *the length of their **longest common subsequence***. If there is no common subsequence, return \`0\`.

A **subsequence** of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.`,
    examples: [
      { input: 'text1 = "abcde", text2 = "ace"', output: '3', explanation: 'The longest common subsequence is "ace" and its length is 3.' },
      { input: 'text1 = "abc", text2 = "abc"', output: '3', explanation: 'The longest common subsequence is "abc" and its length is 3.' },
    ],
    constraints: [
      '1 ≤ text1.length, text2.length ≤ 1000',
      'text1 and text2 consist of only lowercase English characters.',
    ],
    hint: 'Use a 2D DP table where dp[i][j] represents the LCS length of text1[0..i-1] and text2[0..j-1]. If characters match, dp[i][j] = dp[i-1][j-1] + 1; otherwise dp[i][j] = max(dp[i-1][j], dp[i][j-1]).',
    solution: `#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        int m = text1.size(), n = text2.size();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1[i-1] == text2[j-1]) {
                    dp[i][j] = dp[i-1][j-1] + 1;
                } else {
                    dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
                }
            }
        }
        return dp[m][n];
    }
};`,
    starterCode: `#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        // Write your solution here
        
    }
};`,
    mockRunOutput: `Running test cases...

✓ Test 1: text1="abcde", text2="ace"
  Expected: 3  Got: 3  ✓ PASSED

✓ Test 2: text1="abc", text2="abc"
  Expected: 3  Got: 3  ✓ PASSED

✓ Test 3: text1="abc", text2="def"
  Expected: 0  Got: 0  ✓ PASSED

─────────────────────────────────
Runtime:  12 ms  (beats 68%)
Memory:   11.8 MB  (beats 49%)
Status:   All 3/3 Tests Passed ✓`,
    mockSubmitOutput: `Submitting solution...

Running 44 test cases...
✓ Test 1–15:  PASSED
✓ Test 16–30: PASSED
✓ Test 31–44: PASSED

─────────────────────────────────
  🎉  Accepted!
  Runtime:   12 ms   (beats 68.2% of C++ submissions)
  Memory:    11.8 MB  (beats 49.3% of C++ submissions)
  Language:  C++17
  Status:    ACCEPTED ✅`,
    discussions: [
      { user: 'dp_master', time: '1 week ago', text: 'Classic DP problem. The state transition is the key: if chars match extend the diagonal, otherwise take the max of above/left.' },
      { user: 'algo_grind', time: '2 days ago', text: 'Space can be optimized to O(n) using a 1D rolling array trick!' },
    ],
  },
];

// ─── Difficulty badge helper ────────────────────────────────────────────────

function DiffBadge({ level }) {
  const cls =
    level === 'Easy'
      ? 'cp-diff-easy'
      : level === 'Medium'
      ? 'cp-diff-medium'
      : 'cp-diff-hard';
  return <span className={`cp-diff-badge ${cls}`}>{level}</span>;
}

// ─── Main Component ──────────────────────────────────────────────────────────

const CodingPractice = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/technologies/cpp');
    }
  };

  // Problem navigation
  const [problemIdx, setProblemIdx] = useState(0);
  const problem = PROBLEMS[problemIdx];

  // Editor state
  const [code, setCode] = useState(problem.starterCode);
  const [language, setLanguage] = useState('C++');

  // Output panel state
  const [outputContent, setOutputContent] = useState('// Output will appear here after running or submitting your code.');
  const [outputStatus, setOutputStatus] = useState('idle'); // 'idle' | 'running' | 'success' | 'error'

  // Tab state
  const [activeTab, setActiveTab] = useState('hint'); // 'hint' | 'solution' | 'discussion' | 'notes'
  const [notes, setNotes] = useState('');

  // Toolbar state
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sidebar collapse (mobile)
  const [problemCollapsed, setProblemCollapsed] = useState(false);

  const editorRef = useRef(null);

  // Switch problem – reset code & output
  const switchProblem = useCallback((idx) => {
    setProblemIdx(idx);
    setCode(PROBLEMS[idx].starterCode);
    setOutputContent('// Output will appear here after running or submitting your code.');
    setOutputStatus('idle');
    setActiveTab('hint');
  }, []);

  const handlePrev = () => { if (problemIdx > 0) switchProblem(problemIdx - 1); };
  const handleNext = () => { if (problemIdx < PROBLEMS.length - 1) switchProblem(problemIdx + 1); };

  // Mock Run
  const handleRun = () => {
    setIsRunning(true);
    setOutputStatus('running');
    setOutputContent('Compiling and running...\n\nPlease wait...');
    setTimeout(() => {
      setIsRunning(false);
      setOutputStatus('success');
      setOutputContent(problem.mockRunOutput);
    }, 1800);
  };

  // Mock Submit
  const handleSubmit = () => {
    setIsSubmitting(true);
    setOutputStatus('running');
    setOutputContent('Submitting solution...\n\nJudging against all test cases...');
    setTimeout(() => {
      setIsSubmitting(false);
      setOutputStatus('success');
      setOutputContent(problem.mockSubmitOutput);
    }, 2600);
  };

  // Reset code
  const handleReset = () => {
    setCode(problem.starterCode);
    setOutputContent('// Output will appear here after running or submitting your code.');
    setOutputStatus('idle');
  };

  // Copy code
  const handleCopy = () => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Tab labels
  const tabs = [
    { id: 'hint', label: 'Hint', icon: <Lightbulb size={14} /> },
    { id: 'solution', label: 'Solution', icon: <Code2 size={14} /> },
    { id: 'discussion', label: 'Discussion', icon: <MessageSquare size={14} /> },
    { id: 'notes', label: 'Notes', icon: <FileText size={14} /> },
  ];

  return (
    <div className="cp-wrapper">
      {/* Ambient glow blobs */}
      <div className="cp-glow-blob cp-glow-blob--1" aria-hidden="true" />
      <div className="cp-glow-blob cp-glow-blob--2" aria-hidden="true" />

      {/* ── Top Toolbar ── */}
      <header className="cp-top-bar">
        <div className="cp-top-bar__left" style={{ gap: '12px' }}>
          <button
            id="cp-back-btn"
            className="cp-icon-btn cp-back-btn"
            onClick={handleBack}
            title="Back"
            style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '500', padding: '0' }}
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
          <span style={{ opacity: 0.3, color: 'var(--text-secondary)' }}>|</span>
          <div className="cp-breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginRight: '10px', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '500', padding: '0' }}>Home</button>
            <span className="sep" style={{ color: 'var(--text-secondary)', opacity: 0.3 }}>›</span>
            <button onClick={() => navigate('/', { state: { scrollToSection: 'technologies' } })} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '500', padding: '0' }}>Tech Stack</button>
            <span className="sep" style={{ color: 'var(--text-secondary)', opacity: 0.3 }}>›</span>
            <button onClick={() => navigate('/technologies/cpp')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '500', padding: '0' }}>C++ Language</button>
            <span className="sep" style={{ color: 'var(--text-secondary)', opacity: 0.3 }}>›</span>
            <span className="current" style={{ color: 'var(--accent-glow)', fontSize: '0.8rem', fontWeight: '600' }}>Coding Practice</span>
          </div>

          <div className="cp-problem-nav">
            <button
              id="cp-prev-problem"
              className="cp-icon-btn"
              onClick={handlePrev}
              disabled={problemIdx === 0}
              title="Previous Problem"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="cp-problem-counter">
              {problemIdx + 1} / {PROBLEMS.length}
            </span>
            <button
              id="cp-next-problem"
              className="cp-icon-btn"
              onClick={handleNext}
              disabled={problemIdx === PROBLEMS.length - 1}
              title="Next Problem"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="cp-top-bar__center">
          <span className="cp-top-title">
            <Zap size={14} className="cp-zap-icon" /> Coding Practice
          </span>
        </div>

        <div className="cp-top-bar__right">
          <select
            id="cp-language-select"
            className="cp-lang-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option>C++</option>
            <option>Python</option>
            <option>Java</option>
            <option>JavaScript</option>
          </select>

          <button
            id="cp-reset-btn"
            className="cp-icon-btn"
            onClick={handleReset}
            title="Reset Code"
          >
            <RotateCcw size={15} />
            <span className="cp-btn-label">Reset</span>
          </button>

          <button
            id="cp-copy-btn"
            className="cp-icon-btn"
            onClick={handleCopy}
            title="Copy Code"
          >
            {copied ? <Check size={15} className="cp-copied-icon" /> : <Copy size={15} />}
            <span className="cp-btn-label">{copied ? 'Copied!' : 'Copy'}</span>
          </button>

          <button
            id="cp-run-btn"
            className="cp-run-btn"
            onClick={handleRun}
            disabled={isRunning || isSubmitting}
          >
            <Play size={14} fill="currentColor" />
            {isRunning ? 'Running…' : 'Run'}
          </button>

          <button
            id="cp-submit-btn"
            className="cp-submit-btn"
            onClick={handleSubmit}
            disabled={isRunning || isSubmitting}
          >
            <Upload size={14} />
            {isSubmitting ? 'Submitting…' : 'Submit'}
          </button>
        </div>
      </header>

      {/* ── Three-panel Layout ── */}
      <main className="cp-main">
        {/* LEFT: Problem Panel */}
        <aside className={`cp-panel cp-panel--problem ${problemCollapsed ? 'cp-panel--collapsed' : ''}`}>
          <div className="cp-panel__header">
            <div className="cp-panel__header-left">
              <List size={15} />
              <span>Problem</span>
            </div>
            <button
              className="cp-icon-btn cp-panel__collapse-btn"
              onClick={() => setProblemCollapsed((v) => !v)}
              title={problemCollapsed ? 'Expand' : 'Collapse'}
            >
              <LayoutPanelLeft size={14} />
            </button>
          </div>

          <div className="cp-panel__body cp-problem-body">
            {/* Problem header */}
            <div className="cp-problem-header">
              <div className="cp-problem-meta">
                <span className="cp-problem-num">#{problem.id}</span>
                <DiffBadge level={problem.difficulty} />
              </div>
              <h2 className="cp-problem-title">{problem.title}</h2>
              <div className="cp-problem-tags">
                {problem.tags.map((t) => (
                  <span key={t} className="cp-tag">{t}</span>
                ))}
                <span className="cp-acceptance">
                  <CheckCircle2 size={12} /> {problem.acceptance}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="cp-problem-desc">
              {problem.description.split('\n').map((line, i) => {
                // Bold **text** and inline `code`
                const formatted = line
                  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                  .replace(/`(.+?)`/g, '<code class="cp-inline-code">$1</code>');
                return (
                  <p key={i} dangerouslySetInnerHTML={{ __html: formatted }} />
                );
              })}
            </div>

            {/* Examples */}
            <div className="cp-examples">
              {problem.examples.map((ex, i) => (
                <div key={i} className="cp-example">
                  <span className="cp-example-label">Example {i + 1}</span>
                  <div className="cp-example-io">
                    <div className="cp-io-row">
                      <span className="cp-io-key">Input:</span>
                      <code>{ex.input}</code>
                    </div>
                    <div className="cp-io-row">
                      <span className="cp-io-key">Output:</span>
                      <code>{ex.output}</code>
                    </div>
                    {ex.explanation && (
                      <div className="cp-io-row">
                        <span className="cp-io-key">Explanation:</span>
                        <span className="cp-io-explanation">{ex.explanation}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Constraints */}
            <div className="cp-constraints">
              <h4 className="cp-constraints-title">Constraints</h4>
              <ul className="cp-constraints-list">
                {problem.constraints.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>

            {/* Tabs */}
            <div className="cp-tabs">
              <div className="cp-tabs__bar">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    id={`cp-tab-${tab.id}`}
                    className={`cp-tab-btn ${activeTab === tab.id ? 'cp-tab-btn--active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>

              <div className="cp-tabs__content">
                {activeTab === 'hint' && (
                  <div className="cp-tab-pane cp-tab-hint">
                    <div className="cp-hint-icon-row">
                      <Lightbulb size={18} className="cp-hint-bulb" />
                      <span>Hint</span>
                    </div>
                    <p>{problem.hint}</p>
                  </div>
                )}

                {activeTab === 'solution' && (
                  <div className="cp-tab-pane">
                    <div className="cp-solution-header">
                      <BookOpen size={16} />
                      <span>Reference Solution</span>
                    </div>
                    <pre className="cp-solution-code">
                      <code>{problem.solution}</code>
                    </pre>
                  </div>
                )}

                {activeTab === 'discussion' && (
                  <div className="cp-tab-pane">
                    <div className="cp-discussion-header">
                      <MessageSquare size={16} />
                      <span>Community Discussion</span>
                    </div>
                    <div className="cp-discussions">
                      {problem.discussions.map((d, i) => (
                        <div key={i} className="cp-discussion-item">
                          <div className="cp-disc-meta">
                            <span className="cp-disc-avatar">{d.user[0].toUpperCase()}</span>
                            <span className="cp-disc-user">{d.user}</span>
                            <span className="cp-disc-time">
                              <Clock size={11} /> {d.time}
                            </span>
                          </div>
                          <p className="cp-disc-text">{d.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'notes' && (
                  <div className="cp-tab-pane cp-notes-pane">
                    <div className="cp-notes-header">
                      <FileText size={16} />
                      <span>My Notes</span>
                    </div>
                    <textarea
                      id="cp-notes-textarea"
                      className="cp-notes-textarea"
                      placeholder="Write your notes, observations, or approach here…"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                    <div className="cp-notes-meta">{notes.length} characters</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* CENTER: Code Editor Panel */}
        <div className="cp-panel cp-panel--editor">
          <div className="cp-panel__header">
            <div className="cp-panel__header-left">
              <Code2 size={15} />
              <span>Code Editor</span>
              <span className="cp-lang-badge">{language}</span>
            </div>
            <div className="cp-editor-toolbar">
              <span className="cp-line-count">
                {code.split('\n').length} lines
              </span>
            </div>
          </div>

          <div className="cp-panel__body cp-editor-body">
            {/* Line numbers */}
            <div className="cp-editor-wrap">
              <div className="cp-line-numbers" aria-hidden="true">
                {code.split('\n').map((_, i) => (
                  <span key={i}>{i + 1}</span>
                ))}
              </div>
              <textarea
                id="cp-code-editor"
                ref={editorRef}
                className="cp-code-textarea"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                onKeyDown={(e) => {
                  // Tab key inserts spaces
                  if (e.key === 'Tab') {
                    e.preventDefault();
                    const start = e.target.selectionStart;
                    const end = e.target.selectionEnd;
                    const newCode = code.substring(0, start) + '    ' + code.substring(end);
                    setCode(newCode);
                    // Restore cursor after setState
                    requestAnimationFrame(() => {
                      e.target.selectionStart = start + 4;
                      e.target.selectionEnd = start + 4;
                    });
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* RIGHT: Output Console Panel */}
        <div className="cp-panel cp-panel--output">
          <div className="cp-panel__header">
            <div className="cp-panel__header-left">
              <Terminal size={15} />
              <span>Output Console</span>
            </div>
            <div className="cp-output-status">
              {outputStatus === 'running' && (
                <span className="cp-status cp-status--running">
                  <span className="cp-spinner" /> Running…
                </span>
              )}
              {outputStatus === 'success' && (
                <span className="cp-status cp-status--success">
                  <CheckCircle2 size={13} /> Accepted
                </span>
              )}
              {outputStatus === 'error' && (
                <span className="cp-status cp-status--error">
                  <XCircle size={13} /> Error
                </span>
              )}
            </div>
          </div>

          <div className="cp-panel__body cp-output-body">
            <pre className={`cp-output-pre cp-output--${outputStatus}`}>
              {outputContent}
            </pre>
          </div>

          {/* Problem switcher in output panel footer */}
          <div className="cp-output-footer">
            <span className="cp-output-footer-label">Other Problems</span>
            <div className="cp-problem-pills">
              {PROBLEMS.map((p, i) => (
                <button
                  key={p.id}
                  id={`cp-problem-pill-${p.id}`}
                  className={`cp-problem-pill ${i === problemIdx ? 'cp-problem-pill--active' : ''}`}
                  onClick={() => switchProblem(i)}
                >
                  <span className={`cp-pill-dot cp-pill-dot--${p.difficulty.toLowerCase()}`} />
                  {p.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CodingPractice;
