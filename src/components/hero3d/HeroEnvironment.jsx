/**
 * HeroEnvironment.jsx
 * HDRI environment map and contact shadows.
 *
 * - Environment preset: "studio" — neutral, professional, high-quality reflections
 * - ContactShadows: soft ground shadow beneath the laptop
 * - Fog: subtle depth fog that fades the background
 */
import React from 'react';
import { Environment, ContactShadows } from '@react-three/drei';

export default function HeroEnvironment({ enableShadows, tier }) {
  const shadowOpacity = tier === 'desktop' ? 0.55 : 0.35;
  const shadowBlur = tier === 'desktop' ? 2.5 : 1.5;
  const shadowFar = tier === 'desktop' ? 8 : 5;

  return (
    <>
      {/* HDRI provides realistic PBR reflections on metallic laptop surfaces */}
      <Environment preset="studio" environmentIntensity={0.6} />

      {/* Subtle depth fog — matches the hero background dark colour */}
      <fog attach="fog" args={['#07070f', 8, 20]} />

      {/* Contact shadow: soft ground plane shadow, replaces expensive real-time shadow maps */}
      {enableShadows && (
        <ContactShadows
          position={[0, -1.52, 0]}
          opacity={shadowOpacity}
          scale={6}
          blur={shadowBlur}
          far={shadowFar}
          color="#1a0a2e"
          frames={1}
        />
      )}
    </>
  );
}
