import React from 'react';
import { Terminal, Clock, ShieldCheck, Database } from 'lucide-react';
import '../../styles/ContestComponents.css';

const SubmissionTable = ({ submissions }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'ACCEPTED':
        return 'sub-accepted';
      case 'WRONG_ANSWER':
        return 'sub-wrong';
      case 'TIME_LIMIT_EXCEEDED':
      case 'MEMORY_LIMIT_EXCEEDED':
        return 'sub-limits';
      case 'COMPILATION_ERROR':
      case 'RUNTIME_ERROR':
        return 'sub-errors';
      case 'PENDING':
      case 'PROCESSING':
        return 'sub-processing';
      default:
        return '';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'ACCEPTED':
        return 'Accepted (AC) ✅';
      case 'WRONG_ANSWER':
        return 'Wrong Answer (WA) ❌';
      case 'TIME_LIMIT_EXCEEDED':
        return 'Time Limit Exceeded (TLE) ⏱️';
      case 'MEMORY_LIMIT_EXCEEDED':
        return 'Memory Limit Exceeded (MLE) 💾';
      case 'COMPILATION_ERROR':
        return 'Compilation Error (CE) ⚠️';
      case 'RUNTIME_ERROR':
        return 'Runtime Error (RE) 💥';
      case 'PENDING':
        return 'Pending... ⏳';
      case 'PROCESSING':
        return 'Running... 🚀';
      default:
        return status;
    }
  };

  if (!submissions || submissions.length === 0) {
    return (
      <div className="empty-submissions-state">
        <Terminal size={32} style={{ color: 'rgba(255,255,255,0.15)', marginBottom: '8px' }} />
        <p>No submissions recorded yet for this problem.</p>
      </div>
    );
  }

  return (
    <div className="submission-table-container">
      <table className="contest-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Problem</th>
            <th>Language</th>
            <th>Verdict</th>
            <th>Time (ms)</th>
            <th>Memory (KB)</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((sub) => (
            <tr key={sub.id} className="submission-row">
              <td>{new Date(sub.createdAt).toLocaleTimeString()}</td>
              <td className="problem-col">{sub.problem?.title || 'Problem'}</td>
              <td>{sub.language?.displayName || 'Unknown'}</td>
              <td className="verdict-col">
                <span className={`verdict-badge ${getStatusClass(sub.status)}`}>
                  {getStatusLabel(sub.status)}
                </span>
              </td>
              <td>{sub.executionTime !== null && sub.executionTime !== undefined ? `${sub.executionTime} ms` : '-'}</td>
              <td>{sub.memoryUsage !== null && sub.memoryUsage !== undefined ? `${sub.memoryUsage} KB` : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubmissionTable;
