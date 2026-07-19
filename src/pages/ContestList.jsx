import React, { useContext, useEffect } from 'react';
import { ContestContext } from '../context/ContestContext';
import ContestCard from '../components/contest/ContestCard';
import { Trophy, ShieldAlert } from 'lucide-react';
import '../styles/ContestComponents.css';

const ContestList = () => {
  const { contests, loading, fetchContests, activeContest, selectContest } = useContext(ContestContext);

  useEffect(() => {
    fetchContests();
    // Clear active contest details upon returning to lobby list
    selectContest(null);
  }, [fetchContests, selectContest]);

  const liveContests = contests.filter((c) => c.status === 'LIVE' || c.status === 'FROZEN');
  const upcomingContests = contests.filter((c) => c.status === 'UPCOMING');
  const pastContests = contests.filter((c) => c.status === 'ENDED');

  return (
    <div className="contest-page-container" style={{ padding: '40px 5%', minHeight: '90vh', background: 'var(--bg-primary)' }}>
      <div className="contest-header-section" style={{ marginBottom: '40px' }}>
        <span className="text-gradient-purple" style={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: '700', letterSpacing: '0.15em' }}>BCA Coding League</span>
        <h2 className="text-gradient" style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '36px', fontWeight: '700', marginTop: '4px' }}>
          Competitive Coding Arena
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', maxWidth: '600px', marginTop: '10px' }}>
          Test your programming skills, build speed accuracy under constraint pressures, and raise your global developer Elo standings.
        </p>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '30vh', color: 'var(--accent-glow)', fontFamily: 'Space Grotesk' }}>
          Loading Coding Contests...
        </div>
      ) : contests.length === 0 ? (
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '48px', textAlign: 'center', gap: '16px' }}>
          <ShieldAlert size={44} style={{ color: 'var(--primary-purple)', opacity: 0.7 }} />
          <h4 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '18px' }}>No Contests Scheduled</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Check back later. The BCA Programming League schedule will update soon.</p>
        </div>
      ) : (
        <>
          {/* 1. Live Contests */}
          {liveContests.length > 0 && (
            <div className="contest-section" style={{ marginBottom: '48px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid var(--border-primary)', paddingBottom: '12px', marginBottom: '20px' }}>
                <Trophy size={20} style={{ color: '#ef4444' }} />
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '20px', fontWeight: '600' }}>Active Contests</h3>
              </div>
              <div className="contests-grid">
                {liveContests.map((c) => (
                  <ContestCard key={c.id} contest={c} registered={true} />
                ))}
              </div>
            </div>
          )}

          {/* 2. Upcoming Contests */}
          {upcomingContests.length > 0 && (
            <div className="contest-section" style={{ marginBottom: '48px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid var(--border-primary)', paddingBottom: '12px', marginBottom: '20px' }}>
                <Trophy size={20} style={{ color: 'var(--accent-glow)' }} />
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '20px', fontWeight: '600' }}>Upcoming Contests</h3>
              </div>
              <div className="contests-grid">
                {upcomingContests.map((c) => (
                  <ContestCard key={c.id} contest={c} registered={false} />
                ))}
              </div>
            </div>
          )}

          {/* 3. Completed Contests Archive */}
          {pastContests.length > 0 && (
            <div className="contest-section">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid var(--border-primary)', paddingBottom: '12px', marginBottom: '20px' }}>
                <Trophy size={20} style={{ color: 'rgba(255,255,255,0.4)' }} />
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '20px', fontWeight: '600' }}>Archived Standings</h3>
              </div>
              <div className="contests-grid">
                {pastContests.map((c) => (
                  <ContestCard key={c.id} contest={c} registered={false} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ContestList;
