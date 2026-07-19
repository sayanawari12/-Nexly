import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, HelpCircle } from 'lucide-react';
import { QUICK_TOOLS } from '../../constants/quickTools';

// Development-only sanity validation
if (process.env.NODE_ENV === 'development') {
  const ids = new Set();
  const paths = new Set();
  QUICK_TOOLS.forEach(tool => {
    if (!tool.id) {
      console.warn(`[QuickTools Validation] Tool has no ID defined.`);
    } else if (ids.has(tool.id)) {
      console.warn(`[QuickTools Validation] Duplicate tool ID detected: "${tool.id}".`);
    } else {
      ids.add(tool.id);
    }

    if (!tool.path) {
      console.warn(`[QuickTools Validation] Tool "${tool.id || 'unknown'}" has no path defined.`);
    } else if (paths.has(tool.path)) {
      console.warn(`[QuickTools Validation] Duplicate path detected: "${tool.path}" on tool "${tool.id}".`);
    } else {
      paths.add(tool.path);
    }

    if (tool.path && !tool.path.startsWith('/')) {
      console.warn(`[QuickTools Validation] Tool "${tool.id}" has an invalid path format: "${tool.path}". Paths must start with "/".`);
    }
  });
}

const QuickToolsCard = () => {
  const navigate = useNavigate();
  const enabledTools = QUICK_TOOLS.filter(tool => tool.enabled);

  return (
    <div className="sidebar-card info-card">
      <div className="info-header" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <Terminal size={16} style={{ color: 'var(--accent-glow)' }} />
        <h3 className="sidebar-title">Quick Tools</h3>
      </div>
      
      {enabledTools.length === 0 ? (
        <p className="info-desc" style={{ fontStyle: 'italic', color: 'var(--text-secondary)' }}>
          No developer tools are currently available.
        </p>
      ) : (
        <>
          <p className="info-desc">
            Launch sandbox tools to accelerate your learning and testing workflow.
          </p>
          <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {enabledTools.map(tool => {
              const Icon = tool.icon || HelpCircle;
              return (
                <button 
                  key={tool.id}
                  onClick={() => navigate(tool.path)} 
                  className="btn-premium-purple"
                  style={{ width: '100%', justifyContent: 'center', fontSize: '0.82rem', padding: '10px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                  title={tool.description}
                >
                  <Icon size={14} /> {tool.name}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default QuickToolsCard;
