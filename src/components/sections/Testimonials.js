import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import '../../styles/sections.css';

const Testimonials = () => {
  const reviews = [
    {
      avatar: 'RD',
      text: "The curriculum is super modern. In our fourth semester, we constructed responsive React SPA portals instead of writing dry theories on paper. The coding labs are genuinely industry-aligned.",
      author: "Rohan Das",
      role: "Software Developer, Accenture // Batch of 2024"
    },
    {
      avatar: 'NS',
      text: "Faculty mentors are incredible here. When my incubation team was stuck debugging pointer overrides inside custom assembly drivers, Dr. Kumar sat down with us for hours tracing register logs.",
      author: "Neha Sen",
      role: "System Engineer, Infosys // Batch of 2025"
    },
    {
      avatar: 'SN',
      text: "Placement operations are highly direct. I secured a summer cloud developer internship at Amazon during my fifth semester, which successfully converted to a full-time software engineering offer.",
      author: "Siddharth Nair",
      role: "SWE Platform Dev, Amazon // Batch of 2024"
    }
  ];

  return (
    <section id="testimonials">
      <div className="section-header">
        <span className="section-tag">TESTIMONIALS</span>
        <h2 className="section-title">What Our Alumni Say</h2>
        <p className="section-subtitle">
          Read genuine reviews from our graduates currently writing code and scaling systems at top tier companies.
        </p>
      </div>

      <div className="testimonials-grid">
        {reviews.map((rev, idx) => (
          <motion.div
            key={idx}
            className="glass-card testimonial-card"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
          >
            <div style={{ color: 'rgba(139, 92, 246, 0.2)', marginBottom: '20px' }}>
              <Quote size={32} fill="currentColor" />
            </div>
            
            <p className="testimonial-quote">"{rev.text}"</p>

            <div className="testimonial-user">
              <div className="testimonial-avatar">{rev.avatar}</div>
              <div className="testimonial-user-info">
                <h4>{rev.author}</h4>
                <p>{rev.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
