/**
 * HeroLaptop.jsx
 *
 * Loading strategy:
 *   1. On mount, HEAD-probe /models/macbook.glb.
 *   2. If 2xx + not text/html → load GLB via useGLTF.
 *   3. Otherwise → render PrimitiveFallbackLaptop (fully featured, no GLB needed).
 *
 * Laptop scale is 1.0 in model space; the group is scaled at the scene level.
 * The overall visual size increase is driven by:
 *   - Increased group scale (1.6 vs old 1.0 for primitive, 1.2 for GLB)
 *   - Camera pushed slightly closer in HeroControls presets
 *
 * ══════════════════════════════════════════════════════════════
 * MODEL SETUP
 * Place macbook.glb at:  public/models/macbook.glb
 * No code changes required — auto-detected on next page load.
 * ══════════════════════════════════════════════════════════════
 */
import React, { useRef, useEffect, useState, Suspense } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import LaptopScreen from './LaptopScreen';
import { useLaptopAnimations } from './HeroAnimations';
import { MODEL_PATH } from './ModelPreloader';

/* ─── Utilities ─────────────────────────────────────────────────────────── */

const SCREEN_KEYWORDS = ['screen', 'display', 'lid', 'glass', 'monitor'];

function findScreenMesh(scene) {
  let found = null;
  scene.traverse((node) => {
    if (found || !(node instanceof THREE.Mesh)) return;
    if (SCREEN_KEYWORDS.some((k) => node.name.toLowerCase().includes(k))) found = node;
  });
  return found;
}

function enhanceMaterials(scene, screenMesh) {
  scene.traverse((node) => {
    if (!(node instanceof THREE.Mesh) || !node.material) return;
    const mat = node.material;
    if (node === screenMesh) {
      node.material = new THREE.MeshStandardMaterial({
        color: '#050510', roughness: 0.05, metalness: 0.1,
        emissive: new THREE.Color('#1a0a4a'), emissiveIntensity: 0,
      });
    } else if (mat.name?.toLowerCase().includes('key') || node.name?.toLowerCase().includes('key')) {
      mat.roughness = 0.85; mat.metalness = 0.6;
    } else {
      mat.roughness = Math.min(mat.roughness ?? 0.2, 0.22);
      mat.metalness = Math.max(mat.metalness ?? 0.9, 0.88);
      mat.envMapIntensity = 1.5;
    }
    mat.needsUpdate = true;
  });
}

async function probeModelAvailability(url) {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    if (!res.ok) return false;
    const ct = res.headers.get('content-type') || '';
    return !ct.startsWith('text/html');
  } catch { return false; }
}

/* ─── GLB Laptop ─────────────────────────────────────────────────────────── */

function GLBLaptop({ prefersReducedMotion }) {
  const groupRef     = useRef();
  const screenMeshRef = useRef();
  const [clonedScene, setClonedScene] = useState(null);
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
        (Array.isArray(node.material) ? node.material : [node.material])
          .filter(Boolean).forEach((m) => m.dispose());
      });
      setClonedScene(null);
    };
  }, [scene]);

  useLaptopAnimations({ groupRef, screenMeshRef, prefersReducedMotion });

  return (
    <group ref={groupRef} scale={1.55}>
      {clonedScene && (
        <>
          <primitive object={clonedScene} />
          {screenMeshRef.current && (
            <mesh
              geometry={screenMeshRef.current.geometry}
              matrixAutoUpdate={false}
              matrix={screenMeshRef.current.matrixWorld}
            >
              <meshStandardMaterial color="#050510" roughness={0.05} metalness={0.05}
                emissive="#0a0525" emissiveIntensity={0.8}>
                <LaptopScreen />
              </meshStandardMaterial>
            </mesh>
          )}
        </>
      )}
    </group>
  );
}

/* ─── GLB error boundary ─────────────────────────────────────────────────── */

class GLBErrorBoundary extends React.Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(err) {
    if (process.env.NODE_ENV === 'development')
      console.warn('[HeroLaptop] GLB error → primitive fallback:', err.message);
  }
  render() {
    return this.state.failed
      ? <PrimitiveFallbackLaptop prefersReducedMotion={this.props.prefersReducedMotion} />
      : this.props.children;
  }
}

/* ─── Primitive Fallback Laptop ─────────────────────────────────────────── */

/**
 * PrimitiveFallbackLaptop
 * Scaled 1.6× larger than before, detailed geometry.
 * Fully animated (entry rise + float + screen glow).
 * Screen shows live RenderTexture BCA dashboard.
 */
export function PrimitiveFallbackLaptop({ prefersReducedMotion }) {
  const groupRef      = useRef();
  const screenMeshRef = useRef();

  useLaptopAnimations({ groupRef, screenMeshRef, prefersReducedMotion });

  // Scale up 1.6× from old size (was 2.8 wide → now 2.8 in model, scaled 1.6 at group)
  return (
    <group ref={groupRef} scale={1.6}>

      {/* ── Base / Palmrest ── */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={[2.8, 0.065, 1.9]} />
        <meshStandardMaterial color="#1c1c1e" roughness={0.15} metalness={0.94} envMapIntensity={1.4} />
      </mesh>

      {/* Side chamfers (give it depth) */}
      <mesh position={[0, 0.025, 0]}>
        <boxGeometry args={[2.9, 0.02, 2.0]} />
        <meshStandardMaterial color="#252528" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Speaker grille left */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={`sl${i}`} position={[-1.2, 0.038, -0.55 + i * 0.08]}>
          <boxGeometry args={[0.006, 0.012, 0.04]} />
          <meshStandardMaterial color="#111114" roughness={1} metalness={0} />
        </mesh>
      ))}
      {/* Speaker grille right */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={`sr${i}`} position={[1.2, 0.038, -0.55 + i * 0.08]}>
          <boxGeometry args={[0.006, 0.012, 0.04]} />
          <meshStandardMaterial color="#111114" roughness={1} metalness={0} />
        </mesh>
      ))}

      {/* Trackpad */}
      <mesh position={[0, 0.038, 0.52]}>
        <boxGeometry args={[0.82, 0.003, 0.52]} />
        <meshStandardMaterial color="#28282c" roughness={0.18} metalness={0.85} />
      </mesh>
      {/* Trackpad inset border */}
      <mesh position={[0, 0.039, 0.52]}>
        <boxGeometry args={[0.84, 0.001, 0.54]} />
        <meshStandardMaterial color="#1a1a1e" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Keyboard — function row */}
      {Array.from({ length: 13 }).map((_, col) => (
        <mesh key={`fn${col}`} position={[-1.2 + col * 0.2, 0.038, -0.76]}>
          <boxGeometry args={[0.15, 0.006, 0.1]} />
          <meshStandardMaterial color="#1e1e22" roughness={0.88} metalness={0.45} />
        </mesh>
      ))}

      {/* Keyboard — main rows (4 rows × 13 keys) */}
      {Array.from({ length: 4 }).map((_, row) =>
        Array.from({ length: 13 }).map((_, col) => (
          <mesh key={`k${row}-${col}`}
            position={[-1.2 + col * 0.2, 0.038, -0.58 + row * 0.19]}>
            <boxGeometry args={[0.17, 0.008, 0.16]} />
            <meshStandardMaterial color="#1e1e22" roughness={0.88} metalness={0.45} />
          </mesh>
        ))
      )}

      {/* Space bar */}
      <mesh position={[0.05, 0.038, 0.2]}>
        <boxGeometry args={[1.0, 0.008, 0.16]} />
        <meshStandardMaterial color="#1e1e22" roughness={0.88} metalness={0.45} />
      </mesh>

      {/* ── Screen Lid ── */}
      <group rotation={[-0.16, 0, 0]} position={[0, 0.032, -0.95]}>

        {/* Lid outer shell */}
        <mesh castShadow>
          <boxGeometry args={[2.8, 1.82, 0.055]} />
          <meshStandardMaterial color="#1c1c1e" roughness={0.14} metalness={0.95} envMapIntensity={1.5} />
        </mesh>

        {/* Lid chamfer edge */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.88, 1.9, 0.04]} />
          <meshStandardMaterial color="#232326" roughness={0.2} metalness={0.88} />
        </mesh>

        {/* Logo circle (Apple-style indent) */}
        <mesh position={[0, 0.05, -0.029]}>
          <circleGeometry args={[0.14, 32]} />
          <meshStandardMaterial color="#161618" roughness={0.25} metalness={0.82} />
        </mesh>

        {/* Black bezel frame */}
        <mesh position={[0, 0, 0.029]}>
          <boxGeometry args={[2.65, 1.67, 0.003]} />
          <meshStandardMaterial color="#06060e" roughness={0.95} metalness={0.02} />
        </mesh>

        {/* Webcam */}
        <mesh position={[0, 0.87, 0.031]}>
          <cylinderGeometry args={[0.018, 0.018, 0.003, 16]} />
          <meshStandardMaterial color="#0a0a10" roughness={0.6} metalness={0.4} />
        </mesh>

        {/* Screen panel — RenderTexture */}
        <mesh ref={screenMeshRef} position={[0, -0.015, 0.032]} castShadow>
          <planeGeometry args={[2.48, 1.54]} />
          <meshStandardMaterial
            color="#050510"
            roughness={0.04}
            metalness={0.04}
            emissive="#0a0525"
            emissiveIntensity={0.8}
          >
            <LaptopScreen />
          </meshStandardMaterial>
        </mesh>
      </group>

      {/* Hinge bar */}
      <mesh position={[0, 0.036, -0.97]}>
        <cylinderGeometry args={[0.038, 0.038, 2.78, 16]} />
        <meshStandardMaterial color="#2c2c30" roughness={0.28} metalness={0.92} />
      </mesh>

      {/* Rubber feet */}
      {[[-1.25, -1.25], [-1.25, 1.25], [1.25, -1.25], [1.25, 1.25]].map(([x, z], i) => (
        <mesh key={`foot${i}`} position={[x * 0.86, -0.038, z * 0.76]}>
          <cylinderGeometry args={[0.06, 0.06, 0.01, 12]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.98} metalness={0} />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Model status state machine ─────────────────────────────────────────── */

const STATUS = { CHECKING: 'checking', AVAILABLE: 'available', UNAVAILABLE: 'unavailable' };

/* ─── Public entry point ─────────────────────────────────────────────────── */

/**
 * HeroLaptop
 * CHECKING    → shows PrimitiveFallbackLaptop (HEAD request in-flight)
 * AVAILABLE   → mounts GLBLaptop (Suspense + GLBErrorBoundary)
 * UNAVAILABLE → shows PrimitiveFallbackLaptop permanently
 *
 * useGLTF is NEVER called when the file is absent — prevents
 * "Unexpected token '<'" crash from dev-server HTML fallback.
 */
export default function HeroLaptop({ prefersReducedMotion }) {
  const [status, setStatus] = useState(STATUS.CHECKING);

  useEffect(() => {
    let cancelled = false;
    probeModelAvailability(MODEL_PATH).then((ok) => {
      if (cancelled) return;
      setStatus(ok ? STATUS.AVAILABLE : STATUS.UNAVAILABLE);
      if (ok) { try { useGLTF.preload(MODEL_PATH); } catch { /* ignore */ } }
    });
    return () => { cancelled = true; };
  }, []);

  if (status !== STATUS.AVAILABLE) {
    return <PrimitiveFallbackLaptop prefersReducedMotion={prefersReducedMotion} />;
  }

  return (
    <GLBErrorBoundary prefersReducedMotion={prefersReducedMotion}>
      <Suspense fallback={<PrimitiveFallbackLaptop prefersReducedMotion={prefersReducedMotion} />}>
        <GLBLaptop prefersReducedMotion={prefersReducedMotion} />
      </Suspense>
    </GLBErrorBoundary>
  );
}
