import React from 'react';

const About = () => {
  const containerStyle = {
    minHeight: '100vh',
    padding: '150px 50px 50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'linear-gradient(180deg, rgba(5,5,16,1) 0%, rgba(10,10,35,1) 100%)',
  };

  const contentWrapper = {
    maxWidth: '800px',
    width: '100%',
  };

  const titleStyle = {
    fontSize: '3rem',
    color: '#00ffff',
    marginBottom: '30px',
    borderBottom: '2px solid rgba(0, 255, 255, 0.3)',
    paddingBottom: '10px',
    display: 'inline-block',
  };

  const contentStyle = {
    fontSize: '1.2rem',
    lineHeight: '1.8',
    color: '#e0e0ff',
    background: 'rgba(255, 255, 255, 0.03)',
    padding: '40px',
    borderRadius: '15px',
    border: '1px solid rgba(0, 255, 255, 0.1)',
    boxShadow: '0 0 30px rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(5px)',
  };

  return (
    <div style={containerStyle}>
      <div style={contentWrapper}>
        <h1 style={titleStyle} className="futuristic-text">About the Department</h1>
        <div style={contentStyle}>
          <p style={{ marginBottom: '20px' }}>
            The Bachelor of Computer Applications (BCA) program is designed to provide students with a strong foundation in computer science, software development, and modern technologies.
          </p>
          <p>
            Our curriculum is dynamically updated to meet the demands of the fast-paced IT industry, focusing on areas like artificial intelligence, web technologies, 3D graphics, and database management systems.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
