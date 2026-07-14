/**
 * HeroControls.jsx
 * Combines OrbitControls with:
 *   - Full 360° horizontal rotation
 *   - Vertical clamp (prevents camera going underground)
 *   - Smooth damping + inertia
 *   - Zoom (mouse wheel / pinch)
 *   - Pan
 *   - Auto-rotate after 5 s of inactivity (managed by HeroScene)
 *   - Double-click to reset camera to default position
 *
 * Replaces the old HeroCamera.jsx which used a manual lerp intro.
 * PerspectiveCamera is created here so OrbitControls can own it.
 */
import { useRef, useEffect, useCallback } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Per-tier camera presets ────────────────────────────────────────────── */
const PRESETS = {
  desktop: { fov: 38, position: [0, 0.6, 4.2], target: [0, 0.1, 0] },
  tablet:  { fov: 44, position: [0, 0.6, 5.2], target: [0, 0.1, 0] },
  mobile:  { fov: 52, position: [0, 0.8, 6.2], target: [0, 0.1, 0] },
};

export default function HeroControls({ tier, autoRotate, onInteract, prefersReducedMotion }) {
  const controlsRef = useRef();
  const cameraRef = useRef();
  const preset = PRESETS[tier] || PRESETS.desktop;

  // Cinematic intro: lerp camera from far entry to preset position
  const introProgress = useRef(0);
  const introComplete = useRef(prefersReducedMotion);
  const entryPos = useRef(new THREE.Vector3(
    preset.position[0],
    preset.position[1] + 2,
    preset.position[2] + 4
  ));

  // Reset camera to preset position + target
  const resetCamera = useCallback(() => {
    if (!cameraRef.current || !controlsRef.current) return;
    const [x, y, z] = preset.position;
    const [tx, ty, tz] = preset.target;
    cameraRef.current.position.set(x, y, z);
    controlsRef.current.target.set(tx, ty, tz);
    controlsRef.current.update();
    introComplete.current = true;
  }, [preset]);

  // Double-click resets camera
  useEffect(() => {
    const canvas = document.querySelector('.hero-3d-canvas-wrapper');
    if (!canvas) return;
    const handler = (e) => {
      if (e.detail === 2) {
        resetCamera();
        if (onInteract) onInteract();
      }
    };
    canvas.addEventListener('click', handler);
    return () => canvas.removeEventListener('click', handler);
  }, [resetCamera, onInteract]);

  // Cinematic intro lerp
  useFrame((_, delta) => {
    if (!cameraRef.current || introComplete.current) return;

    introProgress.current = Math.min(introProgress.current + delta * 0.5, 1);
    const ease = 1 - Math.pow(1 - introProgress.current, 3);

    const target = new THREE.Vector3(...preset.position);
    cameraRef.current.position.lerp(
      new THREE.Vector3().lerpVectors(entryPos.current, target, ease),
      0.05
    );

    if (introProgress.current >= 0.99) {
      cameraRef.current.position.set(...preset.position);
      introComplete.current = true;
      if (controlsRef.current) controlsRef.current.update();
    }
  });

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        fov={preset.fov}
        near={0.1}
        far={80}
        position={prefersReducedMotion ? preset.position : entryPos.current.toArray()}
      />
      <OrbitControls
        ref={controlsRef}
        makeDefault
        enableDamping
        dampingFactor={0.06}
        // Full 360° horizontal
        minAzimuthAngle={-Infinity}
        maxAzimuthAngle={Infinity}
        // Vertical clamp: slightly above equator to 75° elevation
        minPolarAngle={Math.PI * 0.1}
        maxPolarAngle={Math.PI * 0.78}
        // Zoom limits
        minDistance={2.5}
        maxDistance={9}
        // Pan enabled (Shift+drag or two-finger)
        enablePan
        panSpeed={0.6}
        // Rotation speed
        rotateSpeed={0.7}
        // Auto-rotate when idle
        autoRotate={autoRotate && !prefersReducedMotion}
        autoRotateSpeed={1.2}
        // Notify parent on user interaction to reset idle timer
        onChange={onInteract}
        // Initial target
        target={preset.target}
      />
    </>
  );
}
