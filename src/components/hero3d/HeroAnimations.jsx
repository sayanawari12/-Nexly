/**
 * HeroAnimations.jsx
 * Animation hook for the laptop model.
 *
 * With OrbitControls now owning camera/rotation, this hook handles
 * only the model-space animations:
 *   1. Entry rise  — laptop rises from below on mount (cubic ease-out)
 *   2. Float       — slow sinusoidal Y oscillation (breathing motion)
 *   3. Screen glow — emissive intensity fades in after model rises
 *
 * Mouse parallax is intentionally removed — OrbitControls provides
 * a far better drag-to-rotate experience.
 *
 * All animations are disabled if prefersReducedMotion is true.
 */
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FLOAT_SPEED     = 0.55;   // oscillation cycles per second
const FLOAT_AMPLITUDE = 0.06;   // Y travel in world units
const ENTRY_DURATION  = 2.0;    // seconds for rise animation
const ENTRY_START_Y   = -3.2;   // world Y where laptop starts (below camera)

export function useLaptopAnimations({ groupRef, screenMeshRef, prefersReducedMotion }) {
  const elapsed      = useRef(0);
  const entryDone    = useRef(false);
  const yBase        = useRef(ENTRY_START_Y);
  const screenAlpha  = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    elapsed.current += delta;
    const t = elapsed.current;

    // ── 1. Entry Rise ──────────────────────────────────────────────
    if (!entryDone.current) {
      const progress = Math.min(t / ENTRY_DURATION, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // cubic ease-out
      yBase.current  = THREE.MathUtils.lerp(ENTRY_START_Y, 0, eased);
      if (progress >= 1) entryDone.current = true;
    }

    // ── 2. Float (breathing) ──────────────────────────────────────
    const floatY = prefersReducedMotion
      ? 0
      : Math.sin(t * FLOAT_SPEED) * FLOAT_AMPLITUDE;

    groupRef.current.position.y = yBase.current + floatY;

    // ── 3. Screen power-on glow ────────────────────────────────────
    if (screenMeshRef?.current?.material) {
      const targetAlpha = entryDone.current ? 1 : 0;
      screenAlpha.current = THREE.MathUtils.lerp(
        screenAlpha.current, targetAlpha, delta * 0.8
      );
      const mat = screenMeshRef.current.material;
      if (mat.emissiveIntensity !== undefined) {
        mat.emissiveIntensity = THREE.MathUtils.lerp(
          mat.emissiveIntensity,
          0.6 + screenAlpha.current * 0.4,
          delta * 0.5
        );
      }
    }
  });
}
