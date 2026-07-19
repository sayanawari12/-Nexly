import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ContestContext } from '../context/ContestContext';
import { AuthContext } from '../context/AuthContext';
import ContestResultSummary from '../components/contest/ContestResultSummary';
import LeaderboardTable from '../components/contest/LeaderboardTable';
import { ArrowLeft, RefreshCw, BarChart2 } from 'lucide-react';
import '../styles/ContestComponents.css';

const ContestResultsPage = () => {
  const { contestId } = useParams();
  const navigate = useNavigate();
  const { profile } = useContext(AuthContext);

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
    navigate('/contests');
  };

  if (loading && !activeContest) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', color: 'var(--accent-glow)' }}>
        Loading Contest Results Summary...
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
    <div className="results-page-container" style={{ padding: '40px 5%', background: 'var(--bg-primary)', minHeight: '90vh' }}>
      <button onClick={handleBack} className="btn-solve-problem" style={{ marginBottom: '24px' }}>
        <ArrowLeft size={14} style={{ marginRight: '6px' }} /> Return to Lobby
      </button>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '36px' }}>
        <div>
          <span className="text-gradient-purple" style={{ textTransform: 'uppercase', fontSize: '11px', fontWeight: '700', letterSpacing: '0.15em' }}>Finished Contest Report</span>
          <h2 className="text-gradient" style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '32px', fontWeight: '700', marginTop: '4px' }}>
            {activeContest.title} — Analysis
          </h2>
        </div>
      </div>

      {/* Summary Performance Review Card */}
      <ContestResultSummary 
        result={{ rankings: leaderboard }} 
        currentUserId={profile?.email || profile?.displayName} 
      />

      {/* Complete Rankings list section */}
      <div style={{ borderTop: '1px solid var(--border-primary)', paddingTop: '32px', marginTop: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <BarChart2 size={20} style={{ color: 'var(--accent-glow)' }} />
          <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '18px', fontWeight: '600' }}>Complete Rankings Standings</h3>
        </div>
        <LeaderboardTable leaderboard={leaderboard || []} problems={contestProblems} />
      </div>
    </div>
  );
};

export default ContestResultsPage;
