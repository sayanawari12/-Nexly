import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ContestContext } from '../context/ContestContext';
import ContestTimer from '../components/contest/ContestTimer';
import ContestCountdown from '../components/contest/ContestCountdown';
import ContestRegistrationPanel from '../components/contest/ContestRegistrationPanel';
import ProblemCard from '../components/contest/ProblemCard';
import ContestAnnouncementList from '../components/contest/ContestAnnouncementList';
import ClarificationPanel from '../components/contest/ClarificationPanel';
import LeaderboardTable from '../components/contest/LeaderboardTable';
import FreezeBanner from '../components/contest/FreezeBanner';
import { ArrowLeft, BookOpen, Bell, HelpCircle, Trophy } from 'lucide-react';
import '../styles/ContestComponents.css';

const ContestDetails = () => {
  const { contestId } = useParams();
  const navigate = useNavigate();

  const {
    activeContest,
    selectContest,
    registered,
    registerContest,
    contestProblems,
    announcements,
    clarifications,
    leaderboard,
    loading,
    askClarification,
  } = useContext(ContestContext);

  const [activeTab, setActiveTab] = useState('problems');

  useEffect(() => {
    selectContest(contestId);
    return () => selectContest(null);
  }, [contestId, selectContest]);

  if (loading && !activeContest) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', color: 'var(--accent-glow)', fontFamily: 'Space Grotesk' }}>
        Loading Contest Details...
      </div>
    );
  }

  if (!activeContest) {
    return (
      <div style={{ padding: '40px 5%', textAlign: 'center' }}>
        <h3>Contest not found</h3>
        <button onClick={() => navigate('/contests')} className="btn-enter-contest" style={{ marginTop: '20px' }}>
          Back to Lobby
        </button>
      </div>
    );
  }

  const { title, description, startTime, endTime, status } = activeContest;

  const handleBack = () => {
    navigate('/contests');
  };

  const handleRegister = async () => {
    return await registerContest(activeContest.id);
  };

  // If not registered and contest has not ended, force registration panel
  if (!registered && status !== 'ENDED') {
    return (
      <div className="contest-details-container" style={{ padding: '40px 5%', background: 'var(--bg-primary)', minHeight: '90vh' }}>
        <button onClick={handleBack} className="btn-solve-problem" style={{ marginBottom: '24px' }}>
          <ArrowLeft size={14} style={{ marginRight: '6px' }} /> Back to Contests
        </button>
        <ContestRegistrationPanel contest={activeContest} onRegister={handleRegister} />
      </div>
    );
  }

  return (
    <div className="contest-details-container" style={{ padding: '40px 5%', background: 'var(--bg-primary)', minHeight: '90vh' }}>
      {/* Header bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '32px' }}>
        <div>
          <button onClick={handleBack} className="btn-solve-problem" style={{ marginBottom: '16px' }}>
            <ArrowLeft size={14} style={{ marginRight: '6px' }} /> Lobby List
          </button>
          <h2 className="text-gradient" style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '32px', fontWeight: '700' }}>
            {title}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', maxWidth: '600px', marginTop: '6px' }}>
            {description}
          </p>
        </div>

        {status !== 'UPCOMING' && status !== 'ENDED' && (
          <ContestTimer startTime={startTime} endTime={endTime} status={status} />
        )}
      </div>

      {status === 'UPCOMING' && (
        <div className="glass-card" style={{ padding: '40px', textAlign: 'center', marginBottom: '40px' }}>
          <h4 style={{ fontFamily: 'Space Grotesk, sans-serif', marginBottom: '12px' }}>Contest Starts In</h4>
          <ContestCountdown targetTime={startTime} onComplete={() => selectContest(contestId)} />
        </div>
      )}

      {/* Tabs navigation */}
      <div className="contest-tabs-bar" style={{ display: 'flex', borderBottom: '1px solid var(--border-primary)', gap: '24px', marginBottom: '32px' }}>
        <button
          onClick={() => setActiveTab('problems')}
          className={`tab-btn ${activeTab === 'problems' ? 'tab-active' : ''}`}
          style={{
            background: 'none', border: 'none', color: activeTab === 'problems' ? 'var(--accent-glow)' : 'var(--text-secondary)',
            paddingBottom: '12px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', borderBottom: activeTab === 'problems' ? '2px solid var(--accent-glow)' : 'none'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={16} />
            <span>Problems</span>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('announcements')}
          className={`tab-btn ${activeTab === 'announcements' ? 'tab-active' : ''}`}
          style={{
            background: 'none', border: 'none', color: activeTab === 'announcements' ? 'var(--accent-glow)' : 'var(--text-secondary)',
            paddingBottom: '12px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', borderBottom: activeTab === 'announcements' ? '2px solid var(--accent-glow)' : 'none'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bell size={16} />
            <span>Announcements</span>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('clarifications')}
          className={`tab-btn ${activeTab === 'clarifications' ? 'tab-active' : ''}`}
          style={{
            background: 'none', border: 'none', color: activeTab === 'clarifications' ? 'var(--accent-glow)' : 'var(--text-secondary)',
            paddingBottom: '12px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', borderBottom: activeTab === 'clarifications' ? '2px solid var(--accent-glow)' : 'none'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HelpCircle size={16} />
            <span>Clarifications</span>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('standings')}
          className={`tab-btn ${activeTab === 'standings' ? 'tab-active' : ''}`}
          style={{
            background: 'none', border: 'none', color: activeTab === 'standings' ? 'var(--accent-glow)' : 'var(--text-secondary)',
            paddingBottom: '12px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', borderBottom: activeTab === 'standings' ? '2px solid var(--accent-glow)' : 'none'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Trophy size={16} />
            <span>Standings</span>
          </div>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="tab-contents-wrapper">
        {activeTab === 'problems' && (
          <div>
            {status === 'UPCOMING' ? (
              <div style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '40px' }}>
                Problems are locked until the contest starts.
              </div>
            ) : contestProblems.length === 0 ? (
              <div style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '40px' }}>
                No problems mapped to this contest yet.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {contestProblems.map((p, idx) => (
                  <ProblemCard key={p.id} problem={p} index={idx} contestId={activeContest.id} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'announcements' && (
          <ContestAnnouncementList announcements={announcements} />
        )}

        {activeTab === 'clarifications' && (
          <ClarificationPanel
            clarifications={clarifications}
            problems={contestProblems}
            onAskQuestion={askClarification}
          />
        )}

        {activeTab === 'standings' && (
          <div>
            <FreezeBanner status={status} />
            <LeaderboardTable leaderboard={leaderboard || []} problems={contestProblems} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ContestDetails;
