import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import '../../styles/sections.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', msg: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.msg) {
      setSubmitted(true);
      setFormData({ name: '', email: '', msg: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <section id="contact">
      <div className="section-header">
        <span className="section-tag">Reach Out</span>
        <h2 className="section-title">Get in Touch</h2>
        <p className="section-subtitle">
          Have feedback, queries, or admission requests? Drop us a message or visit the department block.
        </p>
      </div>

      <div className="contact-grid">
        {/* Contact Form Wrapper */}
        <motion.div 
          className="glass-card contact-form-wrapper"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3>Send a Command</h3>
          <p>We typically review and respond within 24 operational hours.</p>

          {submitted ? (
            <div className="submit-success">
              ✓ Transmission Successful. We will reach back soon.
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Developer Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="e.g. Alan Turing"
                  className="form-input"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Return Mail Socket</label>
                <input
                  id="email"
                  type="email"
                  placeholder="e.g. alan@turing.org"
                  className="form-input"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">Message Buffer</label>
                <textarea
                  id="message"
                  placeholder="Type your queries here..."
                  className="form-textarea"
                  required
                  value={formData.msg}
                  onChange={(e) => setFormData({ ...formData, msg: e.target.value })}
                />
              </div>

              <button type="submit" className="btn-premium-purple" style={{ alignSelf: 'flex-start' }}>
                Submit Query <Send size={14} />
              </button>
            </form>
          )}
        </motion.div>

        {/* Contact Info Panel */}
        <motion.div 
          className="contact-info-panel"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="glass-card contact-info-card">
            <div className="contact-info-list">
              <div className="contact-info-item">
                <div className="contact-info-icon"><Mail size={18} /></div>
                <div className="contact-info-text">
                  <h4>Admin Mailbox</h4>
                  <p>bca.admission@university.edu</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon"><Phone size={18} /></div>
                <div className="contact-info-text">
                  <h4>Support Hotline</h4>
                  <p>+91 (011) 2460-8800 // Ext. 402</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon"><MapPin size={18} /></div>
                <div className="contact-info-text">
                  <h4>Physical Coordinate</h4>
                  <p>Block-IV, Computing Science Block, Main Campus Academic Wing</p>
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Mock Map Card */}
          <div className="glass-card contact-map-card">
            <div className="contact-map-placeholder">
              <MapPin size={32} />
              <div style={{ fontWeight: 'bold', marginTop: '12px' }}>UNIVERSITY MAP DECK</div>
              <p>GPS: 28.6139° N, 77.2090° E // BLOCK-IV</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
