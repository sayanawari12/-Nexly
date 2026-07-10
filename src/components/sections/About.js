import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Award } from 'lucide-react';
import '../../styles/sections.css';

const About = () => {
  const cards = [
    {
      icon: <Eye size={24} />,
      title: 'Our Vision',
      desc: 'To build a top-tier breeding ground for developers, setting industry standards for technical education and launching students into high-impact careers.'
    },
    {
      icon: <Target size={24} />,
      title: 'Our Mission',
      desc: 'Nurture technical proficiency, creative coding, and collaborative engineering skills by implementing state-of-the-art curriculum frameworks and modern tools.'
    },
    {
      icon: <Award size={24} />,
      title: 'Our Goals',
      desc: 'Ensure 100% placement alignment, support incubation projects, and cultivate research mindedness to lead the next generation of digital transformations.'
    }
  ];

  return (
    <section id="about">
      <div className="section-header">
        <span className="section-tag">About Us</span>
        <h2 className="section-title">Defining the Future of Computing</h2>
        <p className="section-subtitle">
          Established to bridge academic fundamentals with next-gen technology applications, the BCA department stands as a hub for future software developers.
        </p>
      </div>

      <div className="about-grid">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="about-text-content"
        >
          <h3>A Modern Tech Academy Built For Builders</h3>
          <p className="about-p">
            Unlike traditional academic programs that rely heavily on obsolete frameworks, our BCA department prioritizes modern software engineering concepts. From basic logic structures to dynamic React applications, WebGL, and cloud systems, our curriculum is engineered to create production-ready developers.
          </p>
          <p className="about-p">
            We emphasize continuous hands-on learning, hackathons, open-source participation, and direct collaboration with active tech consultants to keep curriculum vectors sharp.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="about-cards"
        >
          {cards.map((card, idx) => (
            <div key={idx} className="glass-card about-card">
              <div className="about-card-icon">{card.icon}</div>
              <div className="about-card-info">
                <h4>{card.title}</h4>
                <p>{card.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
