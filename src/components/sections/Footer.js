import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/sections.css';

/* ─── Official Brand SVG Icons ─────────────────────────────────────────────── */

const GitHubIcon = () => (
  /* Official GitHub Mark - White for Dark Backgrounds */
  <svg
    width="20" height="20"
    viewBox="0 0 98 96"
    fill="#FFFFFF"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
    />
  </svg>
);

const LinkedInIcon = () => (
  /* Official LinkedIn Blue (#0A66C2) Logo */
  <svg
    width="20" height="20"
    viewBox="0 0 24 24"
    fill="#0A66C2"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const InstagramIcon = () => (
  /* Official Instagram Gradient Logo */
  <svg
    width="20" height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="ig-official-grad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f09433" />
        <stop offset="25%" stopColor="#e6683c" />
        <stop offset="50%" stopColor="#dc2743" />
        <stop offset="75%" stopColor="#cc2366" />
        <stop offset="100%" stopColor="#bc1888" />
      </linearGradient>
    </defs>
    <path
      fill="url(#ig-official-grad)"
      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"
    />
  </svg>
);

/* ─── Social Link Data ──────────────────────────────────────────────────────── */
const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    icon: <GitHubIcon />,
    url: 'https://github.com/sayanawari12',
    ariaLabel: 'Visit GitHub Profile',
  },
  {
    name: 'LinkedIn',
    icon: <LinkedInIcon />,
    url: 'https://linkedin.com/in/sayan-awari-081a37392',
    ariaLabel: 'Visit LinkedIn Profile',
  },
  {
    name: 'Instagram',
    icon: <InstagramIcon />,
    url: 'https://www.instagram.com/sayan_08i/?utm_source=ig_web_button_share_sheet',
    ariaLabel: 'Visit Instagram Profile',
  },
];

/* ─── Footer Component ──────────────────────────────────────────────────────── */
const Footer = () => {
  return (
    <footer className="footer-branding-section" id="footer">
      <div className="footer-container">

        {/* Ambient soft purple glow — decorative */}
        <div className="footer-glow-effect" aria-hidden="true" />

        {/* ── 1. Logo + Brand Name ── */}
        <div className="footer-logo-brand">
          <span className="footer-brand-mark">✦</span>
          <span className="footer-brand-name">NEXLY</span>
        </div>

        {/* ── 2. Tagline ── */}
        <p className="footer-tagline">
          Turn Curiosity Into Skills.
        </p>

        {/* ── 3. Developer Credit ── */}
        <div className="footer-developer-credit">
          <span className="credit-label">DESIGNED &amp; DEVELOPED BY</span>
          <span className="developer-name">Sayan Awari</span>
        </div>

        {/* ── 4. Social Buttons ── */}
        <nav className="footer-social-links-wrapper" aria-label="Developer social links">
          {SOCIAL_LINKS.map((social) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              aria-label={social.ariaLabel}
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <span className="social-btn-icon" aria-hidden="true">
                {social.icon}
              </span>
              <span className="social-btn-text">{social.name}</span>
            </motion.a>
          ))}
        </nav>

        {/* ── 5. Connecting Message ── */}
        <p className="footer-community-message">
          Build your skills. Create your future.
        </p>

        {/* ── 6. Gradient Divider ── */}
        <div className="footer-divider-line" aria-hidden="true" />

        {/* ── 7. Copyright ── */}
        <p className="footer-copyright-text">
          &copy; 2026 NEXLY. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;
