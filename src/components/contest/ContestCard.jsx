import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Calendar, Clock, Users, BookOpen } from 'lucide-react';
import ContestStatusChip from './ContestStatusChip';
import '../../styles/ContestComponents.css';

const ContestCard = ({ contest, registered }) => {
  const navigate = useNavigate();
  const { id, title, description, startTime, endTime, status, problems, participants } = contest;

  const durationHrs = Math.round((new Date(endTime) - new Date(startTime)) / (1000 * 60 * 60));
  const participantsCount = participants?.length || 0;
  const problemsCount = problems?.length || 0;

  const handleCardClick = () => {
    navigate(`/contests/${id}`);
  };

  return (
    <div className="contest-card glass-card animate-scale-in" onClick={handleCardClick}>
      <div className="contest-card-header">
        <div className="contest-card-title-row">
          <Trophy size={18} className="trophy-icon" />
          <h4 className="contest-title">{title}</h4>
        </div>
        <ContestStatusChip status={status} />
      </div>

      <p className="contest-desc">{description || 'No description provided.'}</p>

      <div className="contest-details-grid">
        <div className="detail-item">
          <Calendar size={14} className="detail-icon" />
          <span>{new Date(startTime).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' })}</span>
        </div>
        <div className="detail-item">
          <Clock size={14} className="detail-icon" />
          <span>{durationHrs} Hours</span>
        </div>
        <div className="detail-item">
          <Users size={14} className="detail-icon" />
          <span>{participantsCount} Participants</span>
        </div>
        <div className="detail-item">
          <BookOpen size={14} className="detail-icon" />
          <span>{problemsCount} Problems</span>
        </div>
      </div>

      <div className="contest-card-footer">
        {registered ? (
          <span className="registered-badge">✓ Registered</span>
        ) : (
          <span className="unregistered-badge">Not Registered</span>
        )}
        <button className="btn-enter-contest" onClick={(e) => { e.stopPropagation(); handleCardClick(); }}>
          {status === 'UPCOMING' ? 'Register / View Info' : 'Enter Arena'}
        </button>
      </div>
    </div>
  );
};

export default ContestCard;
