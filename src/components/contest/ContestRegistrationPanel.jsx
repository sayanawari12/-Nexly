import React, { useState } from 'react';
import { ShieldCheck, Calendar, Lock } from 'lucide-react';
import '../../styles/ContestComponents.css';

const ContestRegistrationPanel = ({ contest, onRegister }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    setLoading(true);
    setError(null);
    try {
      const success = await onRegister();
      if (!success) {
        setError('Failed to register. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-panel-card glass-card animate-scale-in">
      <div className="card-header">
        <Lock size={32} className="lock-icon" />
        <h3>Contest Registration Required</h3>
        <p>You must register to participate in this contest and view problems.</p>
      </div>

      <div className="registration-rules-list">
        <div className="rule-item">
          <ShieldCheck size={18} className="rule-icon" />
          <div>
            <h5>Honor Code Agreement</h5>
            <p>You agree not to copy code, share solutions, or communicate with other participants during the contest window.</p>
          </div>
        </div>

        <div className="rule-item">
          <Calendar size={18} className="rule-icon" />
          <div>
            <h5>Timing constraints</h5>
            <p>Once the contest starts, your penalty clock begins tracking when you solve problems. Only submissions within the timeframe are evaluated.</p>
          </div>
        </div>
      </div>

      {error && <div className="registration-error-msg">{error}</div>}

      <button className="btn-register-action" onClick={handleRegister} disabled={loading}>
        {loading ? 'Registering...' : 'Register For Contest'}
      </button>
    </div>
  );
};

export default ContestRegistrationPanel;
