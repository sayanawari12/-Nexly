/**
 * LaptopScreen.jsx
 * Renders a live React component tree onto the laptop screen mesh
 * using drei's <RenderTexture> — this is a real WebGL render target,
 * not a screenshot or static image.
 *
 * The ScreenUI component inside renders the BCA Department mini-dashboard.
 * Any future change to ScreenUI will automatically appear on the 3D screen.
 *
 * Usage: Apply the texture returned by <RenderTexture> to the screen mesh's
 * map property inside HeroLaptop.jsx.
 */
import React, { useRef } from 'react';
import { RenderTexture, PerspectiveCamera, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

/** Mini BCA dashboard rendered inside the laptop screen */
function ScreenUI() {
  const cursorRef = useRef();
  // Blinking cursor animation
  useFrame(({ clock }) => {
    if (cursorRef.current) {
      cursorRef.current.material.opacity =
        Math.sin(clock.getElapsedTime() * 3) > 0 ? 1 : 0;
    }
  });

  return (
    <>
      {/* Dark screen background */}
      <color attach="background" args={['#070712']} />
      <PerspectiveCamera makeDefault manual position={[0, 0, 5]} />

      {/* Top status bar */}
      <mesh position={[0, 1.7, 0]}>
        <planeGeometry args={[5.4, 0.25]} />
        <meshBasicMaterial color="#0d0d20" />
      </mesh>
      <Text position={[-2.3, 1.7, 0.01]} fontSize={0.13} color="#6366f1" anchorX="left">
        PROJECT APEX  ·  BCA Department
      </Text>
      <Text position={[2.3, 1.7, 0.01]} fontSize={0.13} color="#4b5563" anchorX="right">
        v2.0
      </Text>

      {/* Search bar */}
      <mesh position={[0, 1.25, 0]}>
        <planeGeometry args={[4.4, 0.32]} />
        <meshBasicMaterial color="#11112b" />
      </mesh>
      <mesh position={[0, 1.25, 0.01]} scale={[1, 1, 1]}>
        <planeGeometry args={[4.36, 0.28]} />
        <meshBasicMaterial color="#0f0f22" />
      </mesh>
      <Text position={[-1.95, 1.25, 0.02]} fontSize={0.13} color="#4b5280" anchorX="left">
        🔍  Search notes, subjects, papers...
      </Text>

      {/* Section label */}
      <Text position={[-2.2, 0.85, 0]} fontSize={0.12} color="#a855f7" anchorX="left" fontWeight={700}>
        RECENT NOTES
      </Text>

      {/* Note cards */}
      {[
        { title: 'Data Structures — Arrays & Linked Lists', sub: 'Semester 3  ·  CS-301', y: 0.48, accent: '#6366f1' },
        { title: 'DBMS — SQL Normalization Notes',          sub: 'Semester 4  ·  CS-401', y: 0.05, accent: '#a855f7' },
        { title: 'Python Programming — OOP Concepts',       sub: 'Semester 2  ·  CS-201', y: -0.38, accent: '#38bdf8' },
      ].map(({ title, sub, y, accent }) => (
        <group key={title} position={[0, y, 0]}>
          <mesh>
            <planeGeometry args={[4.4, 0.38]} />
            <meshBasicMaterial color="#0e0e24" />
          </mesh>
          <mesh position={[-2.15, 0, 0.01]}>
            <planeGeometry args={[0.04, 0.28]} />
            <meshBasicMaterial color={accent} />
          </mesh>
          <Text position={[-1.95, 0.07, 0.02]} fontSize={0.125} color="#e2e8ff" anchorX="left">
            {title}
          </Text>
          <Text position={[-1.95, -0.09, 0.02]} fontSize={0.1} color="#4b5280" anchorX="left">
            {sub}
          </Text>
        </group>
      ))}

      {/* Bottom status bar */}
      <mesh position={[0, -0.82, 0]}>
        <planeGeometry args={[5.4, 0.22]} />
        <meshBasicMaterial color="#0a0a1e" />
      </mesh>
      <Text position={[-2.3, -0.82, 0.01]} fontSize={0.1} color="#374151" anchorX="left">
        BCA Dept  ·  Semester 1–6  ·  All Subjects
      </Text>

      {/* Blinking cursor at end of search bar */}
      <mesh ref={cursorRef} position={[2.05, 1.25, 0.03]}>
        <planeGeometry args={[0.015, 0.18]} />
        <meshBasicMaterial color="#6366f1" transparent />
      </mesh>
    </>
  );
}

/**
 * LaptopScreen — exports the RenderTexture + screen mesh material.
 * Attach to the screen mesh inside HeroLaptop via a ref/prop.
 */
export default function LaptopScreen() {
  return (
    <RenderTexture attach="map" anisotropy={16} width={1024} height={640}>
      <ScreenUI />
    </RenderTexture>
  );
}
