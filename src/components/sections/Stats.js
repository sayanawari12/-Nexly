import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import '../../styles/sections.css';

const Counter = ({ value }) => {
  const [num, setNum] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = parseInt(value.replace(/[^0-9]/g, ''));
    if (start === end) return;
    
    let totalDuration = 1500;
    let incrementTime = Math.abs(Math.floor(totalDuration / end));
    
    let timer = setInterval(() => {
      start += 1;
      setNum(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);
    
    return () => clearInterval(timer);
  }, [value]);

  const suffix = value.replace(/[0-9]/g, '');

  return <span>{num}{suffix}</span>;
};

const Stats = () => {
  const stats = [
    { value: '450+', label: 'Active Students' },
    { value: '14+', label: 'Expert Faculty' },
    { value: '4+', label: 'Specialized Labs' },
    { value: '98%', label: 'Placement Rate' },
    { value: '120+', label: 'Annual Projects' }
  ];

  return (
    <section id="stats" style={{ padding: '80px 8%' }}>
      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            className="glass-card stats-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <div className="stats-number">
              <Counter value={stat.value} />
            </div>
            <div className="stats-label">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
