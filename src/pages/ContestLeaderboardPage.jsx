import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ContestContext } from '../context/ContestContext';
import LeaderboardTable from '../components/contest/LeaderboardTable';
import FreezeBanner from '../components/contest/FreezeBanner';
import { ArrowLeft, Trophy, Users } from 'lucide-react';
import '../styles/ContestComponents.css';

const ContestLeaderboardPage = () => {
  const { contestId } = useParams();
  const navigate = useNavigate();

  const {
    activeContest,
    selectContest,
    leaderboard,
    contestProblems,
    loading,
  } = useContext(ContestContext);

  useEffect(() => {
    selectContest(contestId);
    return () => selectContest(null);
  }, [contestId, selectContest]);

  const handleBack = () => {
    navigate(`/contests/${contestId}`);
  };

  if (loading && !activeContest) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', color: 'var(--accent-glow)' }}>
        Loading Standings Board...
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

  return (
    <div className="leaderboard-page-container" style={{ padding: '40px 5%', background: 'var(--bg-primary)', minHeight: '90vh' }}>
      <button onClick={handleBack} className="btn-solve-problem" style={{ marginBottom: '24px' }}>
        <ArrowLeft size={14} style={{ marginRight: '6px' }} /> Contest Dashboard
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '32px' }}>
        <div>
          <span className="text-gradient-purple" style={{ textTransform: 'uppercase', fontSize: '11px', fontWeight: '700', letterSpacing: '0.15em' }}>Standings</span>
          <h2 className="text-gradient" style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '32px', fontWeight: '700', marginTop: '4px' }}>
            {activeContest.title} — Leaderboard
          </h2>
          <div style={{ display: 'flex', gap: '16px', marginTop: '8px', color: 'var(--text-secondary)', fontSize: '13px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Trophy size={14} /> Type: {activeContest.type || 'ICPC'}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Users size={14} /> Competitors: {activeContest.participants?.length || 0}</span>
          </div>
        </div>
      </div>

      <FreezeBanner status={activeContest.status} />

      <LeaderboardTable leaderboard={leaderboard || []} problems={contestProblems} />
    </div>
  );
};

export default ContestLeaderboardPage;
