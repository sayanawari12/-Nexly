import React, { useState } from 'react';
import { HelpCircle, Send, MessageSquare } from 'lucide-react';
import '../../styles/ContestComponents.css';

const ClarificationPanel = ({ clarifications, problems, onAskQuestion }) => {
  const [question, setQuestion] = useState('');
  const [problemId, setProblemId] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setSubmitting(true);
    try {
      const success = await onAskQuestion(problemId || null, question);
      if (success) {
        setQuestion('');
        setProblemId('');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="clarification-panel glass-card">
      <div className="panel-header">
        <HelpCircle size={18} />
        <h4>Contest Clarifications</h4>
      </div>

      <div className="panel-content-layout">
        {/* Ask Question Form */}
        <form onSubmit={handleSubmit} className="ask-question-form">
          <h5>Submit a Clarification Request</h5>
          <div className="form-group">
            <label className="form-label">Related Problem (Optional)</label>
            <select
              value={problemId}
              onChange={(e) => setProblemId(e.target.value)}
              className="form-select"
            >
              <option value="">General / All Problems</option>
              {problems.map((p, idx) => (
                <option key={p.id} value={p.id}>
                  Problem {String.fromCharCode(65 + idx)}: {p.title}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Your Question</label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a clear and concise question about the problem specifications or testcases..."
              className="form-textarea"
              rows={3}
              required
            />
          </div>
          <button type="submit" className="btn-submit-question" disabled={submitting}>
            {submitting ? 'Sending...' : 'Send Question'} <Send size={12} style={{ marginLeft: '6px' }} />
          </button>
        </form>

        {/* Existing Q&A List */}
        <div className="clarifications-list-section">
          <h5>Clarifications Log</h5>
          {clarifications.length === 0 ? (
            <div className="empty-clarifications">
              <MessageSquare size={24} style={{ opacity: 0.15, marginBottom: '6px' }} />
              <p>No clarifications asked or announcements published yet.</p>
            </div>
          ) : (
            <div className="clarifications-scroll-area">
              {clarifications.map((c) => (
                <div key={c.id} className={`clarification-card ${c.isPublic ? 'clar-public' : 'clar-private'}`}>
                  <div className="clar-card-header">
                    <span className="clar-badge">{c.isPublic ? '📢 Public Announcement' : '🔒 Private Q&A'}</span>
                    <span className="clar-time">{new Date(c.createdAt).toLocaleTimeString()}</span>
                  </div>
                  <div className="clar-question">
                    <strong>Q: </strong> {c.question}
                  </div>
                  {c.answer ? (
                    <div className="clar-answer">
                      <strong>A: </strong> {c.answer}
                    </div>
                  ) : (
                    <div className="clar-unanswered">
                      <em>Awaiting moderator response...</em>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClarificationPanel;
