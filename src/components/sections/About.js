import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Eye, 
  Target, 
  Zap, 
  Shield, 
  Users, 
  GraduationCap, 
  BookOpen, 
  Trophy, 
  ArrowRight, 
  Code, 
  Database, 
  Laptop, 
  CheckCircle 
} from 'lucide-react';
import '../../styles/sections.css';



const About = () => {
  const navigate = useNavigate();
  const timelineRef = useRef(null);
  
  // Scroll-linked progress line for timeline
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });
  
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const values = [
    { icon: <Zap size={20} />, title: 'Innovation', desc: 'Pioneering next-gen technologies.' },
    { icon: <Shield size={20} />, title: 'Integrity', desc: 'Honesty in work and collaboration.' },
    { icon: <Users size={20} />, title: 'Teamwork', desc: 'Solving complex problems together.' },
    { icon: <GraduationCap size={20} />, title: 'Continuous Learning', desc: 'Staying ahead of the industry curve.' }
  ];

  const timelineSteps = [
    {
      year: 'Year 1',
      title: 'Programming Foundation',
      desc: 'Master the basics of computation, coding logic, and algorithms with C, C++, Python, and web fundamentals.',
      icon: <Code size={20} />,
      color: '#a855f7'
    },
    {
      year: 'Year 2',
      title: 'Core Systems',
      desc: 'Build scalable architectures with Data Structures, Operating Systems, Relational DBMS, and Javascript.',
      icon: <Database size={20} />,
      color: '#8b5cf6'
    },
    {
      year: 'Year 3',
      title: 'Advanced Applications',
      desc: 'Engage in internships, placement drills, cloud environments (AWS/Docker), and build full-stack React projects.',
      icon: <Laptop size={20} />,
      color: '#6366f1'
    },
    {
      year: 'Career',
      title: 'Industry Ready Launch',
      desc: 'Graduate as a skilled Software Engineer, Full Stack Developer, Cloud Architect, or Data Analyst.',
      icon: <Trophy size={20} />,
      color: '#ec4899'
    }
  ];

  const journeySteps = [
    { label: 'Learn Fundamentals', desc: 'Grasp the core syntax and paradigms.', icon: <BookOpen size={20} /> },
    { label: 'Practice Coding', desc: 'Solve real-world algorithm challenges.', icon: <Code size={20} /> },
    { label: 'Build Projects', desc: 'Develop full-scale apps and services.', icon: <Laptop size={20} /> },
    { label: 'Get Placed', desc: 'Secure high-impact roles in tech.', icon: <CheckCircle size={20} /> }
  ];

  const handleScrollToRoadmap = () => {
    navigate('/roadmap');
  };

  return (
    <section id="about" className="premium-about-section">
      <div className="section-header">
        <span className="premium-badge">ABOUT NEXLY</span>
        <h2 className="section-title text-gradient">Building Tomorrow's Software Engineers</h2>
        <p className="section-subtitle">
          NEXLY equips developers and learners with strong programming fundamentals, real-world development experience, open-source collaboration, and industry-ready technical skills.
        </p>
      </div>

      {/* Main Grid: Storytelling + Timeline */}
      <div className="about-grid-premium">
        
        {/* Left Side: Storytelling */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="story-left-col"
        >
          <div className="story-intro">
            <h3>A Modern Academy Designed For Builders</h3>
            <p>
              We believe that computer science is best learned by building. Our BCA department prioritizes hands-on production code over rote memorization of syntax. From writing clean logic patterns to deploying serverless architectures and database engines, we train our students to think like software engineers.
            </p>
            <p>
              Under the guidance of expert mentors, students collaborate on real products, organize internal hackathons, and contribute to open-source systems. We focus on active industry tradecraft so you graduate ready to deliver value from day one.
            </p>
          </div>

          {/* Vision & Mission Cards */}
          <div className="vision-mission-grid">
            <div className="glass-card vision-mission-card">
              <div className="vm-icon-box"><Eye size={24} /></div>
              <h4>Our Vision</h4>
              <p>To cultivate a premier, innovation-first breeding ground for computer application architects who lead the next wave of digital transformations.</p>
            </div>
            <div className="glass-card vision-mission-card">
              <div className="vm-icon-box"><Target size={24} /></div>
              <h4>Our Mission</h4>
              <p>To deliver modern curriculum, real-world team mechanics, and continuous lab-driven practice to launch students into high-impact careers.</p>
            </div>
          </div>

          {/* Value Cards */}
          <div className="core-values-section">
            <h4 className="values-header">Our Core Values</h4>
            <div className="core-values-grid">
              {values.map((v, i) => (
                <div key={i} className="value-mini-card glass-card">
                  <div className="value-icon">{v.icon}</div>
                  <div>
                    <h5>{v.title}</h5>
                    <p>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Side: Timeline */}
        <div ref={timelineRef} className="timeline-right-col">
          <h3 className="timeline-heading">The Academic Pathway</h3>
          
          <div className="vertical-timeline-container">
            {/* The scroll-linked line */}
            <div className="timeline-line">
              <motion.div 
                className="timeline-line-filled" 
                style={{ scaleY }} 
              />
            </div>

            {timelineSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="timeline-item"
              >
                <div className="timeline-node" style={{ borderColor: step.color }}>
                  {step.icon}
                </div>
                <div className="timeline-content glass-card">
                  <span className="timeline-year-tag" style={{ color: step.color }}>{step.year}</span>
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>



      {/* Learning Journey Section */}
      <div className="learning-journey-wrapper">
        <div className="section-header">
          <span className="premium-badge">STEPS</span>
          <h2 className="section-title text-gradient">Your Learning Journey</h2>
          <p className="section-subtitle">A straightforward four-step roadmap to progress from basics to standard engineering placements.</p>
        </div>

        <div className="journey-track-container">
          <div className="journey-connector-line" />
          
          <div className="journey-steps-grid">
            {journeySteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="journey-step-card glass-card"
              >
                <div className="journey-step-badge">{idx + 1}</div>
                <div className="journey-step-icon">{step.icon}</div>
                <h4>{step.label}</h4>
                <p>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bottom-cta-container"
      >
        <div className="bottom-cta-card glass-card">
          <div className="cta-glow-bg" />
          <div className="cta-content">
            <h3>Start Your Journey Today</h3>
            <p>
              Explore our semester-wise curriculum, programming tutorials, coding quizzes, previous year papers, interview preparation, and real-world projects.
            </p>
            <div className="cta-actions">
              <button onClick={handleScrollToRoadmap} className="btn-premium-purple flex-center">
                Explore Curriculum <ArrowRight size={16} />
              </button>
              <button onClick={() => navigate('/technologies/cpp')} className="btn-premium flex-center">
                Start Learning
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;