/**
 * SceneBackground.jsx
 * Premium 3D background: animated particle field + subtle grid plane.
 *
 * Particles are rendered as a single BufferGeometry Points mesh for
 * maximum performance (one draw call regardless of particle count).
 * Count is driven by the quality preset to adapt to device tier.
 *
 * The grid is a simple transparent plane with a grid material —
 * it only appears on desktop/tablet.
 */
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/** Generates static random positions for the particle field */
function generateParticlePositions(count, spread) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * spread;
    positions[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.6;
    positions[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.5 - 4;
  }
  return positions;
}

function ParticleField({ count, size }) {
  const meshRef = useRef();

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      'position',
      new THREE.BufferAttribute(generateParticlePositions(count, 14), 3)
    );
    return geo;
  }, [count]);

  // Very slow drift — almost imperceptible, adds a sense of depth
  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.008;
  });

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        size={size}
        color="#a78bfa"
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function SceneBackground({ quality, tier }) {
  const { particles, particleSize } = quality;
  const showGrid = tier !== 'mobile';

  return (
    <>
      <ParticleField count={particles} size={particleSize} />

      {/* Faint grid on the floor — desktop/tablet only */}
      {showGrid && (
        <gridHelper
          args={[20, 20, '#1e1030', '#1e1030']}
          position={[0, -1.55, 0]}
        />
      )}
    </>
  );
}
