/**
 * HeroScene.jsx
 * Root component for the 3D Hero section.
 *
 * Responsibilities:
 *   - Create and configure the R3F Canvas
 *   - Wire all sub-components in correct render order
 *   - Track mouse position for parallax
 *   - Handle WebGL unavailability (shows CSS fallback)
 *   - Manage auto-rotate idle timeout
 *   - Respect prefers-reduced-motion
 *
 * Architecture:
 *   Canvas
 *   ├── PerformanceManager
 *   ├── HeroCamera
 *   ├── HeroLighting
 *   ├── HeroEnvironment
 *   ├── SceneBackground
 *   ├── Suspense → HeroLoader fallback
 *   │   └── HeroLaptop
 *   └── HeroEffects
 */
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

import { useDeviceCapabilities, detectWebGL } from './DeviceDetector';
import HeroCamera from './HeroCamera';
import HeroLighting from './HeroLighting';
import HeroEnvironment from './HeroEnvironment';
import HeroEffects from './HeroEffects';
import HeroLoader from './HeroLoader';
import HeroLaptop from './HeroLaptop';
import SceneBackground from './SceneBackground';
import PerformanceManager from './PerformanceManager';
import HeroErrorBoundary from './HeroErrorBoundary';
import { MODEL_PATH } from './ModelPreloader';

// Auto-rotate kicks in after this many ms of no interaction
const AUTO_ROTATE_DELAY_MS = 5000;

/** WebGL unavailable fallback — polished CSS card (same as HeroErrorBoundary) */
function NoWebGLFallback() {
  return (
    <div className="hero-3d-fallback" role="img" aria-label="BCA Department laptop preview">
      <div className="fallback-screen">
        <div className="fallback-dots"><span /><span /><span /></div>
        <div className="fallback-content">
          <div className="fallback-bar" style={{ width: '60%' }} />
          <div className="fallback-bar" style={{ width: '80%' }} />
          <div className="fallback-bar" style={{ width: '45%' }} />
          <div className="fallback-bar" style={{ width: '70%', marginTop: 16 }} />
        </div>
      </div>
      <div className="fallback-base" />
      <div className="fallback-foot" />
    </div>
  );
}

/** Inner scene graph — everything rendered inside the Canvas */
function SceneGraph({ mouse, quality, tier, prefersReducedMotion }) {
  return (
    <>
      <PerformanceManager initialDpr={quality.dpr[1]} />
      <HeroCamera tier={tier} prefersReducedMotion={prefersReducedMotion} />
      <HeroLighting enableShadows={quality.enableShadows} />
      <HeroEnvironment enableShadows={quality.enableShadows} tier={tier} />
      <SceneBackground quality={quality} tier={tier} />

      <Suspense fallback={<HeroLoader />}>
        <HeroLaptop
          mouse={mouse}
          prefersReducedMotion={prefersReducedMotion}
          useGLBModel={true}
        />
      </Suspense>

      <HeroEffects quality={quality} />
    </>
  );
}

export default function HeroScene() {
  const { tier, quality, prefersReducedMotion, hasWebGL } = useDeviceCapabilities();
  const mouse = useRef({ x: 0, y: 0 });
  const canvasRef = useRef();
  const idleTimer = useRef(null);
  const [autoRotate, setAutoRotate] = useState(false);

  // Start / reset idle auto-rotate timer
  const resetIdleTimer = useCallback(() => {
    setAutoRotate(false);
    if (idleTimer.current) clearTimeout(idleTimer.current);
    if (!prefersReducedMotion) {
      idleTimer.current = setTimeout(() => setAutoRotate(true), AUTO_ROTATE_DELAY_MS);
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    resetIdleTimer();
    return () => { if (idleTimer.current) clearTimeout(idleTimer.current); };
  }, [resetIdleTimer]);

  // Normalise mouse position to [-1, 1] relative to the canvas
  const handleMouseMove = useCallback((e) => {
    resetIdleTimer();
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouse.current = {
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    };
  }, [resetIdleTimer]);

  const handleTouchMove = useCallback((e) => {
    resetIdleTimer();
    if (!e.touches.length) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const touch = e.touches[0];
    mouse.current = {
      x: ((touch.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((touch.clientY - rect.top) / rect.height - 0.5) * 2,
    };
  }, [resetIdleTimer]);

  // Reset parallax when cursor leaves
  const handleMouseLeave = useCallback(() => {
    mouse.current = { x: 0, y: 0 };
  }, []);

  if (!hasWebGL) return <NoWebGLFallback />;

  const dpr = quality.dpr;

  return (
    <div
      className="hero-3d-canvas-wrapper"
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchStart={resetIdleTimer}
      aria-label="Interactive 3D laptop display"
      role="img"
    >
      <HeroErrorBoundary>
        <Canvas
          dpr={dpr}
          shadows={quality.enableShadows}
          gl={{
            antialias: tier !== 'mobile',
            alpha: true,
            powerPreference: 'high-performance',
            outputColorSpace: 'srgb',
          }}
          camera={{ fov: 42, near: 0.1, far: 50, position: [0, 0.5, 4.5] }}
          style={{ background: 'transparent' }}
        >
          <SceneGraph
            mouse={mouse}
            quality={quality}
            tier={tier}
            prefersReducedMotion={prefersReducedMotion}
          />
        </Canvas>
      </HeroErrorBoundary>
    </div>
  );
}
