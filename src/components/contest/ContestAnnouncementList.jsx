import React from 'react';
import { Bell, Info } from 'lucide-react';
import '../../styles/ContestComponents.css';

const ContestAnnouncementList = ({ announcements }) => {
  if (!announcements || announcements.length === 0) {
    return (
      <div className="empty-announcements-card glass-card">
        <div className="panel-header">
          <Bell size={18} />
          <h4>Announcements</h4>
        </div>
        <p className="empty-text">No active announcements for this contest.</p>
      </div>
    );
  }

  return (
    <div className="announcements-panel glass-card">
      <div className="panel-header">
        <Bell size={18} className="bell-icon" />
        <h4>Announcements ({announcements.length})</h4>
      </div>
      <div className="announcements-list">
        {announcements.map((a) => (
          <div key={a.id} className="announcement-item">
            <Info size={14} className="announcement-info-icon" />
            <div className="announcement-body">
              <p className="announcement-content">{a.message}</p>
              <span className="announcement-time">
                {new Date(a.createdAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContestAnnouncementList;
