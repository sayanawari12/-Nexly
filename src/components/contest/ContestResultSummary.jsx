import React from 'react';
import { Trophy, Award, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import '../../styles/ContestComponents.css';

const ContestResultSummary = ({ result, currentUserId }) => {
  if (!result) return null;

  // Find user's row
  const myStanding = result.rankings?.find((r) => r.userId === currentUserId || r.username === currentUserId);
  const myRank = myStanding ? myStanding.rank : '-';
  const mySolved = myStanding ? myStanding.solvedCount : '0';
  const myPenalty = myStanding ? myStanding.totalPenalty : '0';
  
  // Predict rating shifts (optional, dummy prediction or mapped from standings)
  const predictedChange = myStanding ? Math.round(50 - (myRank * 5)) : 0;

  return (
    <div className="contest-result-summary glass-card animate-scale-in">
      <h3 className="result-headline text-gradient-purple">Contest Participation Summary</h3>
      
      <div className="results-grid">
        <div className="result-card flex-col">
          <Trophy size={28} className="result-icon-gold" />
          <span className="result-val">{myRank}</span>
          <span className="result-label">Final Rank</span>
        </div>
        
        <div className="result-card flex-col">
          <Award size={28} className="result-icon-purple" />
          <span className="result-val">{mySolved}</span>
          <span className="result-label">Problems Solved</span>
        </div>

        <div className="result-card flex-col">
          <Clock size={28} className="result-icon-blue" />
          <span className="result-val">{myPenalty}</span>
          <span className="result-label">Total Penalty</span>
        </div>

        <div className="result-card flex-col">
          {predictedChange >= 0 ? (
            <ArrowUpRight size={28} className="result-icon-green" />
          ) : (
            <ArrowDownRight size={28} className="result-icon-red" />
          )}
          <span className={`result-val ${predictedChange >= 0 ? 'text-green' : 'text-red'}`}>
            {predictedChange >= 0 ? `+${predictedChange}` : predictedChange}
          </span>
          <span className="result-label">Rating Shift (Est.)</span>
        </div>
      </div>

      <div className="result-report-body">
        <h4>Performance Review</h4>
        <p>
          Based on the final score calculation, you solved {mySolved} problem{mySolved !== 1 ? 's' : ''} with a total penalty of {myPenalty} minutes. 
          {mySolved > 0 
            ? ' Excellent effort! Keep practicing to optimize your solve speed and reduce compile errors.' 
            : ' Use this contest experience to study standard data structures and algorithmic designs. Success comes from consistent practice.'}
        </p>
      </div>
    </div>
  );
};

export default ContestResultSummary;
