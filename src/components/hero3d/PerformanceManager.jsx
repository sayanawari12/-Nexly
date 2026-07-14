/**
 * PerformanceManager.jsx
 * Adaptive performance control using R3F's usePerformanceMonitor.
 * If the frame rate drops below the threshold, the DPR is reduced
 * automatically to maintain smoothness.
 *
 * This is a "headless" component — renders nothing, only adjusts
 * the renderer's pixel ratio at runtime.
 */
import { useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';

// Frame-time threshold for downgrade (ms) — ~45 FPS
const SLOW_FRAME_MS = 22;
// Frame-time threshold for upgrade (ms) — ~58 FPS
const FAST_FRAME_MS = 17;
const SAMPLE_WINDOW = 60; // frames to sample before acting
const DPR_STEP = 0.25;
const DPR_MIN = 0.75;
const DPR_MAX = 2.0;

export default function PerformanceManager({ initialDpr }) {
  const { gl, setDpr } = useThree();
  const frameTimes = [];

  useFrame((_, delta) => {
    const ms = delta * 1000;
    frameTimes.push(ms);

    if (frameTimes.length >= SAMPLE_WINDOW) {
      const avg = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
      const currentDpr = gl.getPixelRatio();

      if (avg > SLOW_FRAME_MS && currentDpr > DPR_MIN) {
        setDpr(Math.max(DPR_MIN, currentDpr - DPR_STEP));
      } else if (avg < FAST_FRAME_MS && currentDpr < Math.min(initialDpr, DPR_MAX)) {
        setDpr(Math.min(Math.min(initialDpr, DPR_MAX), currentDpr + DPR_STEP));
      }

      // Clear sample window
      frameTimes.length = 0;
    }
  });

  return null;
}
