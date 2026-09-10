import React, { useState, useEffect } from 'react';
import { FolderGit2, Sparkles, CheckCircle2, Circle, ArrowRight, ExternalLink, Code2, Layers, Award } from 'lucide-react';
import '../styles/global.css';

const SAMPLE_PROJECTS = [
  {
    id: 'proj-py-01',
    title: 'CLI Task Manager & Vault',
    technology: 'Python',
    difficulty: 'Beginner',
    tagline: 'Build a file-backed command-line task manager with automated data persistence.',
    techStack: ['Python 3', 'JSON File I/O', 'Argparse'],
    repoLink: 'https://github.com',
    milestones: [
      'Parse command-line arguments for add, list, delete tasks',
      'Implement JSON file persistence for tasks state',
      'Add input validation and error handling for missing files',
      'Structure code cleanly with modular functions and docstrings'
    ]
  },
  {
    id: 'proj-js-02',
    title: 'Interactive Weather Analytics App',
    technology: 'JavaScript',
    difficulty: 'Intermediate',
    tagline: 'Build an asynchronous web application fetching live weather APIs with DOM rendering.',
    techStack: ['JavaScript (ES6+)', 'Fetch API', 'DOM Manipulation', 'Async/Await'],
    repoLink: 'https://github.com',
    milestones: [
      'Set up asynchronous API fetch handler with error handling',
      'Render dynamic weather forecast cards in DOM',
      'Implement search input debounce to optimize API calls',
      'Add local storage cache for last searched city'
    ]
  },
  {
    id: 'proj-sql-03',
    title: 'E-Commerce Analytics Engine',
    technology: 'SQL',
    difficulty: 'Intermediate',
    tagline: 'Design complex relational SQL queries for customer retention & revenue metrics.',
    techStack: ['SQL', 'Relational DB', 'Aggregations', 'JOINs'],
    repoLink: 'https://github.com',
    milestones: [
      'Write multi-table JOIN queries connecting customers and orders',
      'Calculate monthly customer lifetime value (LTV) with GROUP BY',
      'Optimize query execution speed with indexed column filters',
      'Build revenue reporting view for top-selling product categories'
    ]
  }
];

const ProjectsPage = () => {
  const [completedMilestones, setCompletedMilestones] = useState({});
  const [completedProjects, setCompletedProjects] = useState({});

  useEffect(() => {
    const savedMilestones = localStorage.getItem('nexly_completed_milestones');
    const savedProjects = localStorage.getItem('nexly_completed_projects');
    if (savedMilestones) {
      try { setCompletedMilestones(JSON.parse(savedMilestones)); } catch (e) {}
    }
    if (savedProjects) {
      try { setCompletedProjects(JSON.parse(savedProjects)); } catch (e) {}
    }
  }, []);

  const toggleMilestone = (projId, mIdx) => {
    const key = `${projId}-${mIdx}`;
    const nextState = { ...completedMilestones, [key]: !completedMilestones[key] };
    setCompletedMilestones(nextState);
    localStorage.setItem('nexly_completed_milestones', JSON.stringify(nextState));
  };

  const toggleProjectComplete = (projId) => {
    const nextState = { ...completedProjects, [projId]: !completedProjects[projId] };
    setCompletedProjects(nextState);
    localStorage.setItem('nexly_completed_projects', JSON.stringify(nextState));
  };

  return (
    <div style={{ paddingTop: '90px', minHeight: '90vh', paddingLeft: '24px', paddingRight: '24px', maxWidth: '1200px', margin: '0 auto', paddingBottom: '60px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span className="premium-badge flex-center" style={{ width: 'fit-content', margin: '0 auto 12px' }}>
          <Sparkles size={14} style={{ marginRight: '6px' }} /> PORTFOLIO BUILDS
        </span>
        <h1 className="section-title text-gradient" style={{ fontSize: '2.5rem', marginBottom: '12px' }}>
          NEXLY Guided Projects
        </h1>
        <p className="section-subtitle" style={{ maxWidth: '600px', margin: '0 auto' }}>
          Apply what you learned in lessons to real-world applications with milestone checklists and self-reported completion tracking.
        </p>
      </div>

      {/* Projects Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        {SAMPLE_PROJECTS.map((proj) => {
          const isFinished = completedProjects[proj.id];
          const diffColor = proj.difficulty === 'Beginner' ? '#22c55e' : '#eab308';
          const completedCount = proj.milestones.filter((_, idx) => completedMilestones[`${proj.id}-${idx}`]).length;

          return (
            <div
              key={proj.id}
              style={{
                background: '#0B0B0B',
                border: isFinished ? '1px solid rgba(34, 197, 94, 0.4)' : '1px solid rgba(139, 92, 246, 0.2)',
                borderRadius: '16px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: isFinished ? '0 10px 30px rgba(34, 197, 94, 0.1)' : '0 10px 30px rgba(0, 0, 0, 0.4)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '600', color: diffColor, background: `${diffColor}15`, padding: '4px 10px', borderRadius: '6px' }}>
                    {proj.technology} · {proj.difficulty}
                  </span>
                  {isFinished && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#4ade80', fontSize: '0.78rem', fontWeight: '600' }}>
                      <Award size={16} /> Completed
                    </span>
                  )}
                </div>

                <h3 style={{ color: '#ffffff', fontSize: '1.25rem', marginBottom: '8px' }}>{proj.title}</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '0.9rem', marginBottom: '16px', lineHeight: '1.4' }}>
                  {proj.tagline}
                </p>

                {/* Tech Badges */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
                  {proj.techStack.map((tech, idx) => (
                    <span key={idx} style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.75rem', padding: '3px 8px', borderRadius: '4px' }}>
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Milestone Checklist */}
                <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '10px', padding: '14px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ color: '#ffffff', fontSize: '0.82rem', fontWeight: '600' }}>Milestone Checklist</span>
                    <span style={{ color: '#a855f7', fontSize: '0.78rem', fontWeight: '600' }}>{completedCount}/{proj.milestones.length} Done</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {proj.milestones.map((mText, mIdx) => {
                      const mDone = completedMilestones[`${proj.id}-${mIdx}`];
                      return (
                        <div
                          key={mIdx}
                          onClick={() => toggleMilestone(proj.id, mIdx)}
                          style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer', fontSize: '0.82rem', color: mDone ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.85)', textDecoration: mDone ? 'line-through' : 'none' }}
                        >
                          {mDone ? <CheckCircle2 size={16} style={{ color: '#4ade80', flexShrink: 0, marginTop: '2px' }} /> : <Circle size={16} style={{ color: 'rgba(255, 255, 255, 0.3)', flexShrink: 0, marginTop: '2px' }} />}
                          <span>{mText}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => toggleProjectComplete(proj.id)}
                  style={{
                    flex: 1,
                    background: isFinished ? 'rgba(34, 197, 94, 0.15)' : 'rgba(168, 85, 247, 0.15)',
                    border: isFinished ? '1px solid rgba(34, 197, 94, 0.4)' : '1px solid rgba(168, 85, 247, 0.4)',
                    color: isFinished ? '#4ade80' : '#c084fc',
                    borderRadius: '8px',
                    padding: '10px',
                    fontSize: '0.82rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  {isFinished ? 'Marked Complete' : 'Mark Complete'}
                </button>
                <a
                  href={proj.repoLink}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    fontSize: '0.82rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textDecoration: 'none'
                  }}
                  title="Starter Repo"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsPage;
