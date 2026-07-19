import React, { useState, useEffect } from 'react';
import '../../styles/ContestComponents.css';

const ContestTimer = ({ startTime, endTime, status, onEnd }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    if (status === 'ENDED') {
      setTimeLeft('CONTEST ENDED');
      return;
    }

    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();

      if (now < start) {
        setTimeLeft('NOT STARTED');
        return;
      }

      if (now >= end) {
        setTimeLeft('ENDED');
        if (onEnd) onEnd();
        return;
      }

      const diff = end - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const pad = (num) => String(num).padStart(2, '0');
      setTimeLeft(`${pad(hours)}:${pad(minutes)}:${pad(seconds)}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [startTime, endTime, status, onEnd]);

  return (
    <div className="contest-timer-card">
      <span className="timer-label">Time Remaining</span>
      <span className="timer-clock">{timeLeft}</span>
    </div>
  );
};

export default ContestTimer;
