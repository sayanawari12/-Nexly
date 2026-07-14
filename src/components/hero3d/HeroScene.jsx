/**
 * HeroScene.jsx
 * Root 3D scene component.
 *
 * Architecture:
 *   Canvas
 *   ├── PerformanceManager       adaptive DPR
 *   ├── HeroControls             PerspectiveCamera + OrbitControls
 *   ├── HeroLighting             studio lighting rig
 *   ├── HeroEnvironment          HDRI + ContactShadows + fog
 *   ├── SceneBackground          particles + grid
 *   ├── HeroLaptop               3D laptop (GLB or primitive fallback)
 *   └── HeroEffects              Bloom + ToneMapping
 *
 * OrbitControls features wired here:
 *   - auto-rotate activates after AUTO_ROTATE_DELAY_MS of no interaction
 *   - any interaction (drag, scroll, touch) resets the idle timer
 *   - double-click reset is handled inside HeroControls
 */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Canvas } from '@react-three/fiber';

import { useDeviceCapabilities, detectWebGL } from './DeviceDetector';
import HeroControls from './HeroControls';
import HeroLighting from './HeroLighting';
import HeroEnvironment from './HeroEnvironment';
import HeroEffects from './HeroEffects';
import HeroLaptop from './HeroLaptop';
import SceneBackground from './SceneBackground';
import PerformanceManager from './PerformanceManager';
import HeroErrorBoundary from './HeroErrorBoundary';

const AUTO_ROTATE_DELAY_MS = 5000;

/* ─── CSS fallback when WebGL is unavailable ─────────────────────────────── */
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

/* ─── Scene graph (everything inside Canvas) ─────────────────────────────── */
function SceneGraph({ quality, tier, prefersReducedMotion, autoRotate, onInteract }) {
  return (
    <>
      <PerformanceManager initialDpr={quality.dpr[1]} />

      <HeroControls
        tier={tier}
        autoRotate={autoRotate}
        onInteract={onInteract}
        prefersReducedMotion={prefersReducedMotion}
      />

      <HeroLighting enableShadows={quality.enableShadows} />
      <HeroEnvironment enableShadows={quality.enableShadows} tier={tier} />
      <SceneBackground quality={quality} tier={tier} />

      <HeroLaptop prefersReducedMotion={prefersReducedMotion} />

      <HeroEffects quality={quality} />
    </>
  );
}

/* ─── Public component ───────────────────────────────────────────────────── */
export default function HeroScene() {
  const { tier, quality, prefersReducedMotion, hasWebGL } = useDeviceCapabilities();
  const [autoRotate, setAutoRotate] = useState(false);
  const idleTimer = useRef(null);

  // Reset idle timer — called on any user interaction with the canvas
  const handleInteract = useCallback(() => {
    setAutoRotate(false);
    if (idleTimer.current) clearTimeout(idleTimer.current);
    if (!prefersReducedMotion) {
      idleTimer.current = setTimeout(() => setAutoRotate(true), AUTO_ROTATE_DELAY_MS);
    }
  }, [prefersReducedMotion]);

  // Start idle timer on mount
  useEffect(() => {
    handleInteract();
    return () => { if (idleTimer.current) clearTimeout(idleTimer.current); };
  }, [handleInteract]);

  if (!hasWebGL) return <NoWebGLFallback />;

  return (
    <div
      className="hero-3d-canvas-wrapper"
      aria-label="Interactive 3D laptop — drag to rotate, scroll to zoom"
      role="img"
      onPointerDown={handleInteract}
      onWheel={handleInteract}
      onTouchStart={handleInteract}
    >
      <HeroErrorBoundary>
        <Canvas
          dpr={quality.dpr}
          shadows={quality.enableShadows}
          gl={{
            antialias: tier !== 'mobile',
            alpha: true,
            powerPreference: 'high-performance',
            outputColorSpace: 'srgb',
          }}
          style={{ background: 'transparent' }}
        >
          <SceneGraph
            quality={quality}
            tier={tier}
            prefersReducedMotion={prefersReducedMotion}
            autoRotate={autoRotate}
            onInteract={handleInteract}
          />
        </Canvas>
      </HeroErrorBoundary>
    </div>
  );
}
