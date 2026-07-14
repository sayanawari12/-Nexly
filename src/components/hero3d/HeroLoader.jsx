/**
 * HeroLoader.jsx
 * Suspense fallback displayed while the GLB model is loading.
 * Shows an animated loading ring + minimal skeleton that hints at
 * the laptop shape, so there is never a blank canvas during load.
 */
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';

/** Spinning ring progress indicator rendered in 3D */
function LoadingRing() {
  const ringRef = useRef();

  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 1.8;
    }
  });

  return (
    <mesh ref={ringRef} position={[0, 0.5, 0]}>
      <torusGeometry args={[0.35, 0.03, 12, 48]} />
      <meshBasicMaterial color="#a855f7" />
    </mesh>
  );
}

/** Rough laptop silhouette as a primitive placeholder during GLB load */
function LaptopSkeleton() {
  return (
    <group>
      {/* Screen lid */}
      <RoundedBox args={[2.6, 1.7, 0.06]} radius={0.04} position={[0, 0.85, 0]} rotation={[-0.12, 0, 0]}>
        <meshStandardMaterial color="#1a1a2e" roughness={0.8} metalness={0.3} />
      </RoundedBox>
      {/* Screen content placeholder */}
      <mesh position={[0, 0.85, 0.04]} rotation={[-0.12, 0, 0]}>
        <planeGeometry args={[2.35, 1.45]} />
        <meshBasicMaterial color="#0f0f1a" />
      </mesh>
      {/* Base */}
      <RoundedBox args={[2.6, 0.08, 1.8]} radius={0.04} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1a1a2e" roughness={0.8} metalness={0.3} />
      </RoundedBox>
    </group>
  );
}

/**
 * HeroLoader — exported as the Suspense fallback for HeroScene.
 * Renders inside the same Canvas context.
 */
export default function HeroLoader() {
  return (
    <group>
      <LaptopSkeleton />
      <LoadingRing />
      <ambientLight intensity={0.4} />
    </group>
  );
}
