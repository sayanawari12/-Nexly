import React from 'react';
import { Award, Zap, ShieldAlert } from 'lucide-react';
import '../../styles/ContestComponents.css';

const LeaderboardTable = ({ leaderboard, problems }) => {
  if (!leaderboard || leaderboard.length === 0) {
    return (
      <div className="empty-leaderboard-state">
        <Award size={32} style={{ color: 'rgba(255,255,255,0.15)', marginBottom: '8px' }} />
        <p>No participant scores recorded yet.</p>
      </div>
    );
  }

  return (
    <div className="leaderboard-table-container">
      <table className="contest-table leaderboard-table">
        <thead>
          <tr>
            <th style={{ width: '60px' }}>Rank</th>
            <th>Competitor</th>
            <th style={{ width: '80px', textAlign: 'center' }}>Solved</th>
            <th style={{ width: '100px', textAlign: 'center' }}>Penalty</th>
            {problems.map((p, idx) => (
              <th key={p.id} className="problem-header-col" title={p.title}>
                {String.fromCharCode(65 + idx)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((row, index) => {
            const displayRank = row.rank || (index + 1);
            
            return (
              <tr key={row.userId} className={`leaderboard-row ${index < 3 ? `top-rank-${displayRank}` : ''}`}>
                <td className="rank-col">
                  {displayRank === 1 && <span className="rank-gold">🥇</span>}
                  {displayRank === 2 && <span className="rank-silver">🥈</span>}
                  {displayRank === 3 && <span className="rank-bronze">🥉</span>}
                  {displayRank > 3 && displayRank}
                </td>
                <td className="username-col">
                  <div className="user-info">
                    <span className="user-name">{row.username}</span>
                  </div>
                </td>
                <td className="solved-col">{row.solvedCount}</td>
                <td className="penalty-col">{row.totalPenalty}</td>
                {problems.map((p) => {
                  const cell = row.problems?.[p.id];
                  if (!cell) {
                    return <td key={p.id} className="board-cell cell-empty">-</td>;
                  }

                  if (cell.solved) {
                    return (
                      <td key={p.id} className="board-cell cell-solved">
                        <div className="cell-val">+{cell.attempts}</div>
                        {cell.solveTime !== undefined && (
                          <div className="cell-time">{Math.round(cell.solveTime)}</div>
                        )}
                      </td>
                    );
                  }

                  if (cell.attempts > 0) {
                    return (
                      <td key={p.id} className="board-cell cell-failed">
                        <div className="cell-val">-{cell.attempts}</div>
                      </td>
                    );
                  }

                  return <td key={p.id} className="board-cell cell-empty">-</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardTable;
