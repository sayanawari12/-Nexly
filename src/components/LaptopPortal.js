import React, { useState, useEffect } from 'react';
import { motion as motion3d } from 'framer-motion-3d';
import { motion as motionHtml } from 'framer-motion';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import laptopMockupImg from '../assets/images/laptop_mockup.jpg';

const LaptopPortal = ({ scale, positionX, positionY, positionZ, rotationX, rotationY, screenGlow }) => {
  const [texture, setTexture] = useState(null);

  useEffect(() => {
    new THREE.TextureLoader().load(laptopMockupImg, (tex) => {
      // Crop the texture vertically to isolate the laptop chassis (remove top/bottom black margins)
      tex.repeat.set(1, 0.58);
      tex.offset.set(0, 0.22);
      setTexture(tex);
    });
  }, []);

  return (
    <motion3d.group
      scale={scale}
      position-x={positionX}
      position-y={positionY}
      position-z={positionZ}
      rotation-x={rotationX}
      rotation-y={rotationY}
    >
      {/* Rectangular Laptop Mockup Plane (Width: 4.8, Height: 2.8, Aspect Ratio: 1.71) */}
      {texture && (
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[4.8, 2.8]} />
          <meshBasicMaterial map={texture} transparent={true} />
        </mesh>
      )}

      {/* Screen Area Overlay (Projecting Interactive HTML Dashboard on Top of Image) */}
      <Html
        transform
        distanceFactor={1.72}
        position={[0, 0.16, 0.02]} // Positioned exactly over the screen bezel on the cropped rectangular plane
        style={{
          width: '780px',
          height: '490px',
          background: '#050505',
          borderRadius: '4px',
          overflow: 'hidden',
          userSelect: 'none',
          fontFamily: 'Inter, sans-serif',
          border: '1px solid rgba(139, 92, 246, 0.15)',
        }}
      >
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', color: '#fff' }}>
          {/* Screen Top Bar */}
          <div style={{ height: '32px', background: '#0b0616', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#eab308' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} />
            </div>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontFamily: 'Space Grotesk', letterSpacing: '1px' }}>BCA_DEPT_SERVER_SHELL</div>
            <div style={{ fontSize: '10px', color: '#a855f7' }}>● ACTIVE</div>
          </div>
          
          {/* Screen Content */}
          <div style={{ flex: 1, display: 'flex' }}>
            {/* Left Mini Sidebar */}
            <div style={{ width: '50px', background: '#07040d', borderRight: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '16px', gap: '18px' }}>
              {['⚡', '💻', '📊', '📂', '⚙️'].map((ico, idx) => (
                <div key={idx} style={{ fontSize: '14px', cursor: 'pointer', opacity: idx === 1 ? 1 : 0.4 }}>{ico}</div>
              ))}
            </div>

            {/* Right dashboard area */}
            <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', overflow: 'hidden', background: 'radial-gradient(circle at top right, rgba(139, 92, 246, 0.05), transparent 70%)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontSize: '18px', fontFamily: 'Space Grotesk', fontWeight: 600 }}>Bachelor of Computer Applications</h2>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>Core Analytics & Terminal Interface</p>
                </div>
                <div style={{ background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.2)', padding: '4px 10px', borderRadius: '4px', fontSize: '10px', color: '#c084fc', fontWeight: 'bold' }}>
                  v2.0.4-LATEST
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', flex: 1 }}>
                {/* Live Console */}
                <div style={{ background: 'rgba(255, 255, 255, 0.01)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '6px', padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontFamily: 'monospace' }}>
                  <div style={{ fontSize: '10px', color: '#c084fc', marginBottom: '6px' }}>CMD INTERACTION</div>
                  <div style={{ flex: 1, fontSize: '9px', color: '#a855f7', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div>&gt; system.init_protocols()</div>
                    <div style={{ color: 'rgba(255,255,255,0.7)' }}>[OK] Database nodes linked.</div>
                    <div>&gt; compile.bca_curriculum()</div>
                    <div style={{ color: '#4ade80' }}>[SUCCESS] Syllabus updated.</div>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '8px' }}>- React, Python, Three.js, SQL nodes ready.</div>
                  </div>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.03)', paddingTop: '8px', display: 'flex', gap: '8px', fontSize: '9px', color: 'rgba(255,255,255,0.4)' }}>
                    <span>CPU: 42%</span>
                    <span>MEM: 2.1GB</span>
                  </div>
                </div>

                {/* Developer Info / Stats */}
                <div style={{ background: 'rgba(255, 255, 255, 0.01)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '6px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ fontSize: '10px', color: '#c084fc', fontFamily: 'monospace' }}>METRICS OVERVIEW</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.02)', paddingBottom: '6px' }}>
                    <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)' }}>Placement Ratio</span>
                    <span style={{ fontSize: '12px', fontFamily: 'Space Grotesk', fontWeight: 'bold', color: '#4ade80' }}>98.2%</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.02)', paddingBottom: '6px' }}>
                    <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)' }}>Project Submissions</span>
                    <span style={{ fontSize: '12px', fontFamily: 'Space Grotesk', fontWeight: 'bold' }}>1,240+</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)' }}>Industry Partners</span>
                    <span style={{ fontSize: '12px', fontFamily: 'Space Grotesk', fontWeight: 'bold', color: '#c084fc' }}>45+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Html>
    </motion3d.group>
  );
};

export default LaptopPortal;
