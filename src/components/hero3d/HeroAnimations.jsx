/**
 * HeroAnimations.jsx
 * Centralised animation logic for the laptop model.
 * Exports a custom hook: useLaptopAnimations()
 *
 * Animations:
 *   1. Entry rise — laptop rises from below on mount (spring)
 *   2. Float      — slow sinusoidal Y oscillation (breathing)
 *   3. Mouse parallax — subtle tilt tracking cursor position
 *   4. Screen power-on — emissive intensity fades in
 *
 * All animations are disabled if prefersReducedMotion is true.
 */
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FLOAT_SPEED = 0.6;       // oscillation frequency
const FLOAT_AMPLITUDE = 0.055; // Y travel in world units
const PARALLAX_FACTOR = 0.08;  // how much the laptop tilts on mouse move
const ENTRY_DURATION = 1.8;    // seconds for rise animation

export function useLaptopAnimations({ groupRef, screenMeshRef, mouse, prefersReducedMotion }) {
  const elapsed = useRef(0);
  const entryDone = useRef(false);
  // Entry spring state
  const yOffset = useRef(-2.5);
  // Screen power-on
  const screenAlpha = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    elapsed.current += delta;
    const t = elapsed.current;

    // ─── 1. Entry Rise ───────────────────────────────────────────
    if (!entryDone.current) {
      const progress = Math.min(t / ENTRY_DURATION, 1);
      // Smooth cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      yOffset.current = THREE.MathUtils.lerp(-2.5, 0, eased);

      if (progress >= 1) entryDone.current = true;
    }

    // ─── 2. Float (breathing) ────────────────────────────────────
    const floatY = prefersReducedMotion
      ? 0
      : Math.sin(t * FLOAT_SPEED) * FLOAT_AMPLITUDE;

    groupRef.current.position.y = yOffset.current + floatY;

    // ─── 3. Mouse Parallax ───────────────────────────────────────
    if (!prefersReducedMotion) {
      const targetRotX = -mouse.current.y * PARALLAX_FACTOR;
      const targetRotY = mouse.current.x * PARALLAX_FACTOR;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x, targetRotX, 0.06
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y, targetRotY, 0.06
      );
    }

    // ─── 4. Screen power-on (emissive fade) ──────────────────────
    if (screenMeshRef.current?.material) {
      screenAlpha.current = Math.min(screenAlpha.current + delta * 0.6, 1);
      const mat = screenMeshRef.current.material;
      // Fade emissive intensity from 0 → 1
      if (mat.emissiveIntensity !== undefined) {
        mat.emissiveIntensity = THREE.MathUtils.lerp(
          mat.emissiveIntensity,
          screenAlpha.current,
          0.05
        );
      }
    }
  });
}
