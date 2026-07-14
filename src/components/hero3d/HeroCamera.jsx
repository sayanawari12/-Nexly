/**
 * HeroCamera.jsx
 * Manages the perspective camera with responsive presets and a smooth
 * cinematic intro animation. Camera lerps from a wide entry position
 * to the final resting position on mount.
 *
 * Presets:
 *   desktop → fov 42, position [0, 0.5, 4.5]
 *   tablet  → fov 48, position [0, 0.5, 5.5]
 *   mobile  → fov 56, position [0, 0.7, 6.5]
 */
import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const CAMERA_PRESETS = {
  desktop: { fov: 42, position: new THREE.Vector3(0, 0.5, 4.5) },
  tablet:  { fov: 48, position: new THREE.Vector3(0, 0.5, 5.5) },
  mobile:  { fov: 56, position: new THREE.Vector3(0, 0.7, 6.5) },
};

// Entry position — slightly above and further back for cinematic pull-in
const ENTRY_OFFSET = new THREE.Vector3(0, 1.5, 7.5);

export default function HeroCamera({ tier, prefersReducedMotion }) {
  const cameraRef = useRef();
  const { camera } = useThree();
  const preset = CAMERA_PRESETS[tier] || CAMERA_PRESETS.desktop;
  const targetPos = useRef(preset.position.clone());
  const introComplete = useRef(false);
  const t = useRef(0);

  // Place camera at entry position on mount
  useEffect(() => {
    if (!cameraRef.current) return;
    if (prefersReducedMotion) {
      // Skip animation — jump directly to final position
      cameraRef.current.position.copy(targetPos.current);
      introComplete.current = true;
    } else {
      cameraRef.current.position.copy(
        targetPos.current.clone().add(ENTRY_OFFSET)
      );
    }
    cameraRef.current.fov = preset.fov;
    cameraRef.current.updateProjectionMatrix();
  }, [preset, prefersReducedMotion]);

  useFrame((_, delta) => {
    if (!cameraRef.current || introComplete.current) return;

    t.current = Math.min(t.current + delta * 0.55, 1);
    const eased = 1 - Math.pow(1 - t.current, 3); // cubic ease-out

    cameraRef.current.position.lerp(targetPos.current, eased * 0.08);

    // Declare intro complete when very close to target
    if (t.current >= 0.99) {
      cameraRef.current.position.copy(targetPos.current);
      introComplete.current = true;
    }
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      fov={preset.fov}
      near={0.1}
      far={50}
    />
  );
}
