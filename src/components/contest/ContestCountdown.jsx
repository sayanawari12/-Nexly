import React, { useState, useEffect } from 'react';
import '../../styles/ContestComponents.css';

const ContestCountdown = ({ targetTime, onComplete }) => {
  const [timerText, setTimerText] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });

  useEffect(() => {
    const target = new Date(targetTime).getTime();

    const calculate = () => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimerText({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        if (onComplete) onComplete();
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const pad = (num) => String(num).padStart(2, '0');

      setTimerText({
        days: pad(days),
        hours: pad(hours),
        minutes: pad(minutes),
        seconds: pad(seconds),
      });
    };

    calculate();
    const interval = setInterval(calculate, 1000);

    return () => clearInterval(interval);
  }, [targetTime, onComplete]);

  return (
    <div className="contest-countdown-wrapper">
      <div className="countdown-digit-box">
        <span className="digit">{timerText.days}</span>
        <span className="label">Days</span>
      </div>
      <div className="countdown-colon">:</div>
      <div className="countdown-digit-box">
        <span className="digit">{timerText.hours}</span>
        <span className="label">Hours</span>
      </div>
      <div className="countdown-colon">:</div>
      <div className="countdown-digit-box">
        <span className="digit">{timerText.minutes}</span>
        <span className="label">Mins</span>
      </div>
      <div className="countdown-colon">:</div>
      <div className="countdown-digit-box">
        <span className="digit">{timerText.seconds}</span>
        <span className="label">Secs</span>
      </div>
    </div>
  );
};

export default ContestCountdown;
