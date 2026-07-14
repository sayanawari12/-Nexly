/**
 * HeroLighting.jsx
 * Professional studio lighting rig.
 *
 * Layout:
 *   - Ambient  : soft overall fill, very low intensity
 *   - Key      : warm directional from upper-left (primary)
 *   - Fill     : cool directional from lower-right (prevents harsh shadows)
 *   - Rim      : purple point light behind-right (product accent)
 *   - Blue accent: subtle blue from lower-left (depth)
 *   - Top halo : desaturated white from directly above
 *
 * Resembles Apple's standard MacBook product photography lighting.
 */
import React from 'react';

export default function HeroLighting({ enableShadows }) {
  return (
    <>
      {/* Ambient — barely visible, prevents pure black in shadowed areas */}
      <ambientLight intensity={0.25} color="#e8e4ff" />

      {/* Key light — warm, from upper-left front */}
      <directionalLight
        position={[-4, 6, 5]}
        intensity={1.8}
        color="#fff8f0"
        castShadow={enableShadows}
        shadow-mapSize={[enableShadows ? 1024 : 256, enableShadows ? 1024 : 256]}
        shadow-bias={-0.0005}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
      />

      {/* Fill light — cool, from lower-right, prevents harsh edge shadows */}
      <directionalLight
        position={[4, -2, 4]}
        intensity={0.5}
        color="#c8d8ff"
      />

      {/* Purple rim — behind and right, product-page accent glow */}
      <pointLight
        position={[3, 2, -3]}
        intensity={2.5}
        color="#a855f7"
        distance={8}
        decay={2}
      />

      {/* Blue accent — subtle, from lower-left, adds cool depth */}
      <pointLight
        position={[-3, -1, -2]}
        intensity={1.2}
        color="#38bdf8"
        distance={7}
        decay={2}
      />

      {/* Top halo — neutral white from above, rounds the aluminum lid */}
      <pointLight
        position={[0, 5, 0]}
        intensity={0.8}
        color="#f0f0ff"
        distance={10}
        decay={2}
      />
    </>
  );
}
