/**
 * HeroLaptop.jsx
 *
 * Strategy:
 *   1. On mount, probe /models/macbook.glb with a HEAD request.
 *   2. If the file exists AND is a valid binary (content-type not text/html),
 *      render <GLBLaptop> wrapped in Suspense + error boundary.
 *   3. Otherwise render <PrimitiveFallbackLaptop> immediately — no crash,
 *      no "Unexpected token '<'" parser error.
 *
 * Replacing the fallback with a real GLB later:
 *   Drop macbook.glb into  public/models/macbook.glb  — zero code changes needed.
 *   MODEL_PATH in ModelPreloader.jsx is the single source of truth.
 *
 * Screen mesh name heuristics (covers most MacBook GLBs from Sketchfab / pmndrs):
 *   "screen" | "Screen" | "display" | "Display" | "lid" | "Lid" | "glass" | "Glass"
 */
import React, { useRef, useEffect, useState, Suspense } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import LaptopScreen from './LaptopScreen';
import { useLaptopAnimations } from './HeroAnimations';
import { MODEL_PATH } from './ModelPreloader';

/* ─── Constants ─────────────────────────────────────────────────────────── */

const SCREEN_CANDIDATES = ['screen', 'display', 'lid', 'glass'];

/* ─── Utilities ─────────────────────────────────────────────────────────── */

/** Returns the first mesh whose name contains a screen-related keyword */
function findScreenMesh(scene) {
  let found = null;
  scene.traverse((node) => {
    if (found || !(node instanceof THREE.Mesh)) return;
    const n = node.name.toLowerCase();
    if (SCREEN_CANDIDATES.some((k) => n.includes(k))) found = node;
  });
  return found;
}

/** Tightens PBR values on every mesh for a premium aluminium finish */
function enhanceMaterials(scene, screenMesh) {
  scene.traverse((node) => {
    if (!(node instanceof THREE.Mesh) || !node.material) return;
    const mat = node.material;

    if (node === screenMesh) {
      node.material = new THREE.MeshStandardMaterial({
        color: '#050510',
        roughness: 0.05,
        metalness: 0.1,
        emissive: new THREE.Color('#1a0a4a'),
        emissiveIntensity: 0,
      });
    } else if (
      mat.name?.toLowerCase().includes('key') ||
      node.name?.toLowerCase().includes('key')
    ) {
      mat.roughness = 0.85;
      mat.metalness = 0.6;
    } else {
      mat.roughness = Math.min(mat.roughness ?? 0.2, 0.25);
      mat.metalness = Math.max(mat.metalness ?? 0.9, 0.85);
      mat.envMapIntensity = 1.4;
    }

    mat.needsUpdate = true;
  });
}

/**
 * Probes the model URL with a HEAD request.
 * Returns true only if the server responds 2xx AND the content-type
 * is NOT text/html (which is what React's dev server returns for missing files).
 */
async function probeModelAvailability(url) {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    if (!res.ok) return false;
    const ct = res.headers.get('content-type') || '';
    // If the server returned HTML (the SPA fallback), the model is absent
    if (ct.startsWith('text/html')) return false;
    return true;
  } catch {
    return false;
  }
}

/* ─── GLB Laptop (only mounted when model is confirmed present) ──────────── */

function GLBLaptop({ mouse, prefersReducedMotion }) {
  const groupRef = useRef();
  const screenMeshRef = useRef();
  const [clonedScene, setClonedScene] = useState(null);

  // useGLTF suspends until loaded — safe here because parent gated availability
  const { scene } = useGLTF(MODEL_PATH);

  useEffect(() => {
    if (!scene) return;
    const clone = scene.clone(true);
    const screenMesh = findScreenMesh(clone);
    screenMeshRef.current = screenMesh;
    enhanceMaterials(clone, screenMesh);
    setClonedScene(clone);

    return () => {
      clone.traverse((node) => {
        node.geometry?.dispose();
        if (node.material) {
          (Array.isArray(node.material) ? node.material : [node.material])
            .forEach((m) => m.dispose());
        }
      });
      setClonedScene(null);
    };
  }, [scene]);

  useLaptopAnimations({ groupRef, screenMeshRef, mouse, prefersReducedMotion });

  return (
    <group ref={groupRef} position={[0, -2.5, 0]} scale={1.2}>
      {clonedScene && (
        <>
          <primitive object={clonedScene} />
          {screenMeshRef.current && (
            <mesh
              geometry={screenMeshRef.current.geometry}
              matrixAutoUpdate={false}
              matrix={screenMeshRef.current.matrixWorld}
            >
              <meshStandardMaterial
                color="#050510"
                roughness={0.05}
                metalness={0.05}
                emissive="#0a0525"
                emissiveIntensity={0.8}
              >
                <LaptopScreen />
              </meshStandardMaterial>
            </mesh>
          )}
        </>
      )}
    </group>
  );
}

/* ─── Inner error boundary (last-resort catch for GLB parse errors) ──────── */

class GLBErrorBoundary extends React.Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(err) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[HeroLaptop] GLB load error — using primitive fallback:', err.message);
    }
  }

  render() {
    if (this.state.failed) {
      return (
        <PrimitiveFallbackLaptop
          mouse={this.props.mouse}
          prefersReducedMotion={this.props.prefersReducedMotion}
        />
      );
    }
    return this.props.children;
  }
}

/* ─── Primitive Fallback Laptop ─────────────────────────────────────────── */

/**
 * PrimitiveFallbackLaptop
 * Rendered when macbook.glb is absent or fails to parse.
 * Fully functional: studio lighting, animations, and live RenderTexture screen.
 * No GLB dependency whatsoever.
 */
export function PrimitiveFallbackLaptop({ mouse, prefersReducedMotion }) {
  const groupRef = useRef();
  const screenMeshRef = useRef();

  useLaptopAnimations({ groupRef, screenMeshRef, mouse, prefersReducedMotion });

  return (
    <group ref={groupRef} position={[0, -2.5, 0]}>

      {/* ── Base ── */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={[2.8, 0.07, 1.9]} />
        <meshStandardMaterial color="#1c1c1e" roughness={0.18} metalness={0.92} envMapIntensity={1.2} />
      </mesh>

      {/* Trackpad */}
      <mesh position={[0, 0.04, 0.45]}>
        <boxGeometry args={[0.75, 0.005, 0.48]} />
        <meshStandardMaterial color="#2a2a2e" roughness={0.22} metalness={0.8} />
      </mesh>

      {/* Keyboard rows */}
      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 11 }).map((_, col) => (
          <mesh
            key={`k${row}-${col}`}
            position={[-1.1 + col * 0.22, 0.04, -0.45 + row * 0.17]}
          >
            <boxGeometry args={[0.18, 0.008, 0.14]} />
            <meshStandardMaterial color="#222228" roughness={0.85} metalness={0.5} />
          </mesh>
        ))
      )}

      {/* ── Screen lid ── */}
      <group rotation={[-0.18, 0, 0]} position={[0, 0.035, -0.93]}>

        {/* Aluminium shell */}
        <mesh castShadow>
          <boxGeometry args={[2.8, 1.82, 0.06]} />
          <meshStandardMaterial color="#1c1c1e" roughness={0.16} metalness={0.94} envMapIntensity={1.3} />
        </mesh>

        {/* Logo indent */}
        <mesh position={[0, 0, -0.032]}>
          <circleGeometry args={[0.15, 24]} />
          <meshStandardMaterial color="#161618" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Bezel */}
        <mesh position={[0, 0, 0.032]}>
          <boxGeometry args={[2.62, 1.65, 0.004]} />
          <meshStandardMaterial color="#080810" roughness={0.9} metalness={0.05} />
        </mesh>

        {/* Screen panel — RenderTexture live BCA UI */}
        <mesh ref={screenMeshRef} position={[0, -0.02, 0.036]} castShadow>
          <planeGeometry args={[2.46, 1.52]} />
          <meshStandardMaterial
            color="#050510"
            roughness={0.05}
            metalness={0.05}
            emissive="#0a0525"
            emissiveIntensity={0.8}
          >
            <LaptopScreen />
          </meshStandardMaterial>
        </mesh>
      </group>

      {/* Hinge */}
      <mesh position={[0, 0.04, -0.96]}>
        <cylinderGeometry args={[0.04, 0.04, 2.8, 12]} />
        <meshStandardMaterial color="#2a2a2e" roughness={0.3} metalness={0.9} />
      </mesh>
    </group>
  );
}

/* ─── Model availability states ─────────────────────────────────────────── */

const MODEL_STATUS = { CHECKING: 'checking', AVAILABLE: 'available', UNAVAILABLE: 'unavailable' };

/* ─── Public entry point ─────────────────────────────────────────────────── */

/**
 * HeroLaptop
 *
 * State machine:
 *   CHECKING     → renders PrimitiveFallbackLaptop while HEAD request is in-flight
 *   AVAILABLE    → mounts GLBLaptop inside Suspense + GLBErrorBoundary
 *   UNAVAILABLE  → renders PrimitiveFallbackLaptop permanently
 *
 * This guarantees useGLTF is NEVER called when the file is absent,
 * which prevents the "Unexpected token '<'" crash from HTML being
 * returned by the dev server for a missing static asset.
 */
export default function HeroLaptop({ mouse, prefersReducedMotion }) {
  const [modelStatus, setModelStatus] = useState(MODEL_STATUS.CHECKING);

  useEffect(() => {
    let cancelled = false;

    probeModelAvailability(MODEL_PATH).then((available) => {
      if (!cancelled) {
        setModelStatus(available ? MODEL_STATUS.AVAILABLE : MODEL_STATUS.UNAVAILABLE);
        // Only preload if the file actually exists to avoid parse errors
        if (available) {
          try { useGLTF.preload(MODEL_PATH); } catch { /* ignore */ }
        }
      }
    });

    return () => { cancelled = true; };
  }, []);

  // While probing (< 200 ms typically), show the primitive — seamless transition
  if (modelStatus !== MODEL_STATUS.AVAILABLE) {
    return <PrimitiveFallbackLaptop mouse={mouse} prefersReducedMotion={prefersReducedMotion} />;
  }

  return (
    <GLBErrorBoundary mouse={mouse} prefersReducedMotion={prefersReducedMotion}>
      <Suspense fallback={<PrimitiveFallbackLaptop mouse={mouse} prefersReducedMotion={prefersReducedMotion} />}>
        <GLBLaptop mouse={mouse} prefersReducedMotion={prefersReducedMotion} />
      </Suspense>
    </GLBErrorBoundary>
  );
}
