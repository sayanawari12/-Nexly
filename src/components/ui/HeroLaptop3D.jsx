import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PresentationControls, Float, Html, ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { BookOpen, Code, Activity, FileText, ChevronRight, Zap } from 'lucide-react';

// ----------------------------------------------------
// 1. LIVE SCREEN UI CONTENT (Rendered inside 3D Laptop)
// ----------------------------------------------------
const ScreenDashboardContent = () => {
  return (
    <div style={{
      width: '1024px',
      height: '670px',
      background: '#050816',
      color: '#ffffff',
      fontFamily: 'Inter, system-ui, sans-serif',
      padding: '24px',
      boxSizing: 'border-box',
      userSelect: 'none',
      overflow: 'hidden',
      borderRadius: '8px',
      boxShadow: 'inset 0 0 100px rgba(147, 51, 234, 0.2)'
    }}>
      {/* Top Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: '16px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #9333ea, #06b6d4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '16px'
          }}>⚡</div>
          <span style={{ fontWeight: '800', fontSize: '18px', letterSpacing: '-0.5px' }}>
            BCA DEPARTMENT PLATFORM
          </span>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(147, 51, 234, 0.15)',
          border: '1px solid rgba(147, 51, 234, 0.4)',
          padding: '6px 14px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: '700',
          color: '#c084fc'
        }}>
          <Zap size={14} color="#a855f7" /> LIVE LEARNING STUDIO
        </div>
      </div>

      {/* Grid Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '16px',
        marginTop: '20px'
      }}>
        {/* Card 1: Semester Curriculum */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '14px',
          padding: '18px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <BookOpen size={18} color="#a855f7" />
            <span style={{ fontWeight: '700', fontSize: '15px' }}>Semesters & Subjects</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { code: 'BCA-101', name: 'Problem Solving in C', tag: 'Sem 1', color: '#a855f7' },
              { code: 'BCA-201', name: 'OOP using C++', tag: 'Sem 2', color: '#06b6d4' },
              { code: 'BCA-202', name: 'Data Structures', tag: 'Sem 2', color: '#10b981' },
              { code: 'BCA-205', name: 'OOP using Java', tag: 'Sem 2', color: '#c084fc' }
            ].map(sub => (
              <div key={sub.code} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 12px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '8px',
                borderLeft: `3px solid ${sub.color}`
              }}>
                <div>
                  <div style={{ fontSize: '11px', color: sub.color, fontWeight: '700' }}>{sub.code}</div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#e2e8f0' }}>{sub.name}</div>
                </div>
                <span style={{
                  fontSize: '10px',
                  background: 'rgba(255,255,255,0.06)',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  color: '#94a3b8'
                }}>{sub.tag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: Live Code IDE */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.9)',
          border: '1px solid rgba(147, 51, 234, 0.3)',
          borderRadius: '14px',
          padding: '18px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Code size={18} color="#06b6d4" />
            <span style={{ fontWeight: '700', fontSize: '15px' }}>Judge0 IDE Studio</span>
          </div>
          <div style={{
            fontFamily: 'Consolas, Monaco, monospace',
            fontSize: '12px',
            lineHeight: '1.6',
            color: '#94a3b8'
          }}>
            <div style={{ color: '#c084fc' }}>#include &lt;iostream&gt;</div>
            <div style={{ color: '#38bdf8' }}>using namespace std;</div>
            <br />
            <div style={{ color: '#f43f5e' }}>int main() &#123;</div>
            <div style={{ paddingLeft: '16px', color: '#34d399' }}>
              cout &lt;&lt; <span style={{ color: '#facc15' }}>"BCA Department 2026"</span>;
            </div>
            <div style={{ paddingLeft: '16px', color: '#60a5fa' }}>return 0;</div>
            <div style={{ color: '#f43f5e' }}>&#125;</div>
          </div>
          <div style={{
            marginTop: '20px',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '11px',
            color: '#34d399',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span>● Output: BCA Department 2026</span>
            <span style={{ fontWeight: 'bold' }}>0ms</span>
          </div>
        </div>

        {/* Card 3: Analytics & PYQ Papers */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '14px',
          padding: '18px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Activity size={18} color="#10b981" />
            <span style={{ fontWeight: '700', fontSize: '15px' }}>Performance & PYQs</span>
          </div>

          {/* SVG Line Chart */}
          <div style={{ height: '80px', width: '100%', marginBottom: '14px' }}>
            <svg width="100%" height="80" viewBox="0 0 260 80">
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#9333ea" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#9333ea" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path d="M0,70 Q40,30 80,50 T160,20 T260,10 L260,80 L0,80 Z" fill="url(#grad)" />
              <path d="M0,70 Q40,30 80,50 T160,20 T260,10" fill="none" stroke="#a855f7" strokeWidth="3" />
            </svg>
          </div>

          <div style={{
            background: 'rgba(147, 51, 234, 0.1)',
            border: '1px solid rgba(147, 51, 234, 0.25)',
            borderRadius: '8px',
            padding: '10px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={16} color="#c084fc" />
              <div style={{ fontSize: '12px', fontWeight: '600' }}>OOP Java Winter 2025</div>
            </div>
            <ChevronRight size={16} color="#a855f7" />
          </div>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// 2. ULTRA REALISTIC LAPTOP 3D MESH MODEL
// ----------------------------------------------------
const LaptopMeshModel = () => {
  const lidRef = useRef();

  // Smooth lid opening effect on load
  useFrame((state, delta) => {
    if (lidRef.current && lidRef.current.rotation.x > -THREE.MathUtils.degToRad(105)) {
      lidRef.current.rotation.x -= delta * 1.5;
    }
  });

  // PBR Materials
  const aluminumBodyMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x12131e,
    metalness: 0.92,
    roughness: 0.15,
    clearcoat: 0.3,
    clearcoatRoughness: 0.1,
    reflectivity: 0.9
  });

  const chamferEdgeMaterial = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    metalness: 0.95,
    roughness: 0.1,
    emissive: 0x06b6d4,
    emissiveIntensity: 0.2
  });

  const darkDeckMaterial = new THREE.MeshStandardMaterial({
    color: 0x080912,
    metalness: 0.8,
    roughness: 0.3
  });

  const keyCapMaterial = new THREE.MeshStandardMaterial({
    color: 0x181926,
    roughness: 0.4,
    metalness: 0.2
  });

  return (
    <group position={[0, -0.6, 0]} scale={1.25}>
      {/* LAPTOP BASE (LOWER BODY) */}
      {/* Base Chassis Box */}
      <mesh material={aluminumBodyMaterial} position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.6, 0.1, 2.4]} />
      </mesh>

      {/* Subtle Metallic Chamfer Edge Border */}
      <mesh material={chamferEdgeMaterial} position={[0, 0.052, 0]}>
        <boxGeometry args={[3.62, 0.005, 2.42]} />
      </mesh>

      {/* Trackpad */}
      <mesh material={darkDeckMaterial} position={[0, 0.055, 0.65]}>
        <boxGeometry args={[1.1, 0.005, 0.75]} />
      </mesh>

      {/* Keyboard Bed Recess */}
      <mesh material={darkDeckMaterial} position={[0, 0.055, -0.35]}>
        <boxGeometry args={[3.1, 0.005, 1.15]} />
      </mesh>

      {/* Keyboard Key Grid (Realistic individual key layout) */}
      {Array.from({ length: 5 }).map((_, rowIndex) => (
        <group key={`row-${rowIndex}`} position={[0, 0.065, -0.75 + rowIndex * 0.2]}>
          {Array.from({ length: 14 }).map((_, colIndex) => (
            <mesh
              key={`key-${rowIndex}-${colIndex}`}
              material={keyCapMaterial}
              position={[-1.38 + colIndex * 0.21, 0, 0]}
            >
              <boxGeometry args={[0.18, 0.015, 0.16]} />
            </mesh>
          ))}
        </group>
      ))}

      {/* LAPTOP DISPLAY LID (HINGED AT REAR) */}
      <group ref={lidRef} position={[0, 0.05, -1.18]} rotation={[0, 0, 0]}>
        {/* Lid Back Aluminum Cover */}
        <mesh material={aluminumBodyMaterial} position={[0, 1.15, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.6, 2.3, 0.04]} />
        </mesh>

        {/* Display Screen Bezel Frame (Ultra Thin) */}
        <mesh material={darkDeckMaterial} position={[0, 1.15, 0.022]}>
          <boxGeometry args={[3.54, 2.24, 0.002]} />
        </mesh>

        {/* DREI HTML EMBEDDED DASHBOARD UI SCREEN */}
        <Html
          transform
          wrapperClass="laptop-html-screen"
          distanceFactor={1.34}
          position={[0, 1.15, 0.025]}
          rotation={[0, 0, 0]}
        >
          <ScreenDashboardContent />
        </Html>
      </group>
    </group>
  );
};

// ----------------------------------------------------
// 3. MAIN HERO 3D LAPTOP CANVAS COMPONENT
// ----------------------------------------------------
const HeroLaptop3D = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    // Lightweight presentation for mobile performance (60 FPS guaranteed)
    return (
      <div style={{
        width: '100%',
        height: '340px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '420px',
          borderRadius: '16px',
          background: 'rgba(11, 11, 18, 0.8)',
          border: '1px solid rgba(147, 51, 234, 0.3)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 40px rgba(147,51,234,0.25)',
          overflow: 'hidden'
        }}>
          <img 
            src="/laptop_hero_3d.jpg" 
            alt="BCA 3D Laptop Hero" 
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '560px', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0.5, 5.5], fov: 45 }}
        shadows
        gl={{ antialias: true, alpha: true }}
      >
        {/* Studio & Environment Lighting */}
        <ambientLight intensity={0.7} />
        
        {/* Soft Purple Rim Light */}
        <pointLight position={[-4, -1, -2]} color="#9333ea" intensity={6} />
        <pointLight position={[0, -1.2, 1]} color="#a855f7" intensity={4} />

        {/* Subtle Cyan Edge Reflections */}
        <directionalLight position={[4, 4, 3]} color="#06b6d4" intensity={2.8} />
        <directionalLight position={[-4, 5, 2]} color="#38bdf8" intensity={1.5} />

        <Environment preset="city" />

        {/* Presentation Controls with Smooth Parallax & Rotational Clamping */}
        <PresentationControls
          global
          config={{ mass: 2, tension: 400 }}
          snap={{ mass: 3, tension: 300 }}
          rotation={[0.18, -0.35, 0]}
          polar={[-0.2, 0.3]}
          azimuth={[-0.45, 0.45]}
        >
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <LaptopMeshModel />
          </Float>
        </PresentationControls>

        {/* Soft Realistic Contact Shadow underneath */}
        <ContactShadows position={[0, -1.6, 0]} opacity={0.75} scale={10} blur={2.5} far={4} color="#9333ea" />
      </Canvas>
    </div>
  );
};

export default HeroLaptop3D;
