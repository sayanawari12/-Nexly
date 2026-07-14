/**
 * HeroEnvironment.jsx
 * HDRI environment + contact shadows + depth fog.
 * ContactShadows are always rendered (using low-res on mobile).
 * Floor reflection plane adds depth beneath the laptop.
 */
import React from 'react';
import { Environment, ContactShadows } from '@react-three/drei';

export default function HeroEnvironment({ enableShadows, tier }) {
  const isMobile = tier === 'mobile';
  const opacity  = isMobile ? 0.3 : tier === 'tablet' ? 0.45 : 0.6;
  const blur     = isMobile ? 1.2 : 2.8;
  const scale    = isMobile ? 5   : 8;

  return (
    <>
      {/* HDRI — realistic metallic reflections on the aluminium body */}
      <Environment preset="studio" environmentIntensity={0.65} />

      {/* Depth fog — matches dark hero background */}
      <fog attach="fog" args={['#06060f', 10, 28]} />

      {/* Contact shadow — soft, always-on (low res on mobile) */}
      <ContactShadows
        position={[0, -1.62, 0]}
        opacity={opacity}
        scale={scale}
        blur={blur}
        far={isMobile ? 4 : 7}
        color="#180828"
        frames={1}
        resolution={isMobile ? 128 : 256}
      />

      {/* Reflective floor plane — very subtle mirror beneath laptop */}
      <mesh position={[0, -1.63, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="#06060e"
          roughness={0.85}
          metalness={0.05}
          transparent
          opacity={0.6}
        />
      </mesh>
    </>
  );
}
