/**
 * DeviceDetector.jsx
 * Single source of truth for device capabilities and quality settings.
 * Determines: device tier (desktop/tablet/mobile), WebGL support,
 * reduced-motion preference, and per-tier render quality settings.
 */
import { useMemo } from 'react';

// Quality preset configuration per device tier
export const QUALITY_PRESETS = {
  desktop: {
    dpr: [1, 2],
    particles: 800,
    bloomIntensity: 0.6,
    bloomThreshold: 0.7,
    shadowMapSize: 1024,
    enableBloom: true,
    enableShadows: true,
    particleSize: 0.015,
  },
  tablet: {
    dpr: [1, 1.5],
    particles: 400,
    bloomIntensity: 0.4,
    bloomThreshold: 0.75,
    shadowMapSize: 512,
    enableBloom: true,
    enableShadows: false,
    particleSize: 0.018,
  },
  mobile: {
    dpr: [1, 1],
    particles: 150,
    bloomIntensity: 0,
    bloomThreshold: 1,
    shadowMapSize: 256,
    enableBloom: false,
    enableShadows: false,
    particleSize: 0.022,
  },
};

/** Detect if WebGL is available in the current browser */
export function detectWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    );
  } catch {
    return false;
  }
}

/** Returns current device tier based on viewport width */
export function getDeviceTier() {
  const width = window.innerWidth;
  if (width >= 1024) return 'desktop';
  if (width >= 640) return 'tablet';
  return 'mobile';
}

/**
 * Hook: returns device capabilities and quality preset.
 * Memoized — safe to call in any child component.
 */
export function useDeviceCapabilities() {
  return useMemo(() => {
    const tier = getDeviceTier();
    const quality = QUALITY_PRESETS[tier];
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const hasWebGL = detectWebGL();

    return {
      tier,
      quality,
      prefersReducedMotion,
      hasWebGL,
      isMobile: tier === 'mobile',
      isTablet: tier === 'tablet',
      isDesktop: tier === 'desktop',
    };
  }, []);
}
