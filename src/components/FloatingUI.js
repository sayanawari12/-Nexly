import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { Code, Bell, BarChart2, BookOpen } from 'lucide-react';

const FloatingUI = ({ scrollYProgress }) => {
  // Emergence phase: cards emerge from center display (0.35 to 0.75)
  // They slide out laterally from the center of the screen
  
  // Card 1: Course Card (Left, slides out left-up)
  const card1X = useTransform(scrollYProgress, [0.3, 0.65], [0, -250]);
  const card1Y = useTransform(scrollYProgress, [0.3, 0.65], [0, -120]);
  const card1Opacity = useTransform(scrollYProgress, [0.3, 0.45, 0.8, 0.9], [0, 1, 1, 0]);

  // Card 2: Code Snippet Card (Right, slides out right-up)
  const card2X = useTransform(scrollYProgress, [0.35, 0.7], [0, 260]);
  const card2Y = useTransform(scrollYProgress, [0.35, 0.7], [0, -80]);
  const card2Opacity = useTransform(scrollYProgress, [0.35, 0.5, 0.8, 0.9], [0, 1, 1, 0]);

  // Card 3: Performance Chart Card (Left, slides out left-down)
  const card3X = useTransform(scrollYProgress, [0.4, 0.75], [0, -280]);
  const card3Y = useTransform(scrollYProgress, [0.4, 0.75], [0, 140]);
  const card3Opacity = useTransform(scrollYProgress, [0.4, 0.55, 0.8, 0.9], [0, 1, 1, 0]);

  // Card 4: Notification Card (Right, slides out right-down)
  const card4X = useTransform(scrollYProgress, [0.42, 0.78], [0, 270]);
  const card4Y = useTransform(scrollYProgress, [0.42, 0.78], [0, 150]);
  const card4Opacity = useTransform(scrollYProgress, [0.42, 0.58, 0.8, 0.9], [0, 1, 1, 0]);

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20 overflow-hidden">
      
      {/* Card 1: Course Card */}
      <motion.div 
        className="glass-card absolute p-5 flex flex-col gap-3"
        style={{ 
          x: card1X, 
          y: card1Y, 
          opacity: card1Opacity,
          width: '240px',
          borderLeft: '3px solid var(--accent-glow)'
        }}
      >
        <div className="flex items-center gap-2">
          <BookOpen color="#c084fc" size={18} />
          <span style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', color: '#c084fc' }}>Curriculum Core</span>
        </div>
        <h4 style={{ fontSize: '15px', fontWeight: 650, margin: '2px 0 6px' }}>Web Tech Stack</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {['React.js', 'Node.js', 'Three.js'].map(tag => (
            <span key={tag} style={{ fontSize: '9px', background: 'rgba(255,255,255,0.03)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>{tag}</span>
          ))}
        </div>
      </motion.div>

      {/* Card 2: Code Snippet Card */}
      <motion.div 
        className="glass-card absolute p-5 flex flex-col gap-3"
        style={{ 
          x: card2X, 
          y: card2Y, 
          opacity: card2Opacity,
          width: '280px',
          fontFamily: 'monospace'
        }}
      >
        <div className="flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '6px' }}>
          <div className="flex items-center gap-2">
            <Code color="#8b5cf6" size={16} />
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>bca_dev.py</span>
          </div>
          <span style={{ fontSize: '9px', color: '#4ade80' }}>● compiled</span>
        </div>
        <pre style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.8)', margin: 0, lineHeight: 1.4 }}>
{`def get_metrics():
  return {
    "students": 450,
    "labs": 4,
    "placements": "98%"
  }`}
        </pre>
      </motion.div>

      {/* Card 3: Performance Chart Card */}
      <motion.div 
        className="glass-card absolute p-5 flex flex-col gap-3"
        style={{ 
          x: card3X, 
          y: card3Y, 
          opacity: card3Opacity,
          width: '250px'
        }}
      >
        <div className="flex items-center gap-2">
          <BarChart2 color="#a855f7" size={18} />
          <span style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', color: '#a855f7' }}>Placement Peak</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
          <div>
            <div className="flex justify-between" style={{ fontSize: '10px', marginBottom: '2px', color: 'rgba(255,255,255,0.6)' }}>
              <span>Highest Package</span>
              <span style={{ color: '#fff', fontWeight: 'bold' }}>18 LPA</span>
            </div>
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.03)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '85%', height: '100%', background: 'var(--primary-purple)' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between" style={{ fontSize: '10px', marginBottom: '2px', color: 'rgba(255,255,255,0.6)' }}>
              <span>Average Package</span>
              <span style={{ color: '#fff', fontWeight: 'bold' }}>6.5 LPA</span>
            </div>
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.03)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '55%', height: '100%', background: 'var(--accent-glow)' }} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Card 4: Notification Card */}
      <motion.div 
        className="glass-card absolute p-5 flex flex-col gap-3"
        style={{ 
          x: card4X, 
          y: card4Y, 
          opacity: card4Opacity,
          width: '240px'
        }}
      >
        <div className="flex items-center gap-2">
          <Bell color="#4ade80" size={16} />
          <span style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase', color: '#4ade80' }}>System Updates</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>
          <div style={{ borderLeft: '2px solid rgba(74, 222, 128, 0.4)', paddingLeft: '8px' }}>
            <div style={{ fontWeight: 'bold', color: '#fff' }}>Hachathon 2026 Register</div>
            <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)' }}>Due in 2 days</span>
          </div>
          <div style={{ borderLeft: '2px solid rgba(255,255,255,0.1)', paddingLeft: '8px' }}>
            <div style={{ fontWeight: 'bold' }}>IBM Campus Placement</div>
            <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)' }}>Drive Starts July 15</span>
          </div>
        </div>
      </motion.div>

    </div>
  );
};

export default FloatingUI;
