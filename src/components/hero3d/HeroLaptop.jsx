/**
 * HeroLaptop.jsx
 * Loads the MacBook GLB model from public/models/macbook.glb.
 *
 * ══════════════════════════════════════════════════════════════
 * MODEL SETUP REQUIRED
 * ══════════════════════════════════════════════════════════════
 * Place your MacBook GLB file at:
 *   public/models/macbook.glb
 *
 * Recommended free source (Sketchfab, CC0 license):
 *   https://sketchfab.com/3d-models/apple-macbook-pro-free
 * Or use the pmndrs community model used in drei examples:
 *   https://market.pmnd.rs/model/macbook
 *
 * The model is expected to have these mesh names (standard in most
 * MacBook GLBs — adjust SCREEN_MESH_NAME if yours differs):
 *   - Screen/display mesh: "screen" | "Screen" | "display" | "lid"
 *   - Body meshes: anything else
 * ══════════════════════════════════════════════════════════════
 *
 * If the GLB is not present, PrimitiveFallbackLaptop is shown instead.
 * Replace it with the real model at any time by dropping the file in
 * public/models/macbook.glb — no code changes required.
 */
import React, { useRef, useEffect, Suspense } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import LaptopScreen from './LaptopScreen';
import { useLaptopAnimations } from './HeroAnimations';
import { MODEL_PATH } from './ModelPreloader';

// Mesh name heuristics — the first match is used as the screen mesh
const SCREEN_MESH_CANDIDATES = ['screen', 'Screen', 'display', 'Display', 'lid', 'Lid', 'glass', 'Glass'];

/** Finds the screen mesh in the GLTF scene by common name patterns */
function findScreenMesh(scene) {
  let found = null;
  scene.traverse((node) => {
    if (found || !(node instanceof THREE.Mesh)) return;
    const name = node.name.toLowerCase();
    if (SCREEN_MESH_CANDIDATES.some((c) => name.includes(c.toLowerCase()))) {
      found = node;
    }
  });
  return found;
}

/** Enhances all mesh materials for premium PBR appearance */
function enhanceMaterials(scene, screenMesh) {
  scene.traverse((node) => {
    if (!(node instanceof THREE.Mesh)) return;

    const mat = node.material;
    if (!mat) return;

    if (node === screenMesh) {
      // Screen: dark glass-like material that shows the render texture
      node.material = new THREE.MeshStandardMaterial({
        color: '#050510',
        roughness: 0.05,
        metalness: 0.1,
        emissive: new THREE.Color('#1a0a4a'),
        emissiveIntensity: 0,
      });
    } else if (mat.name?.toLowerCase().includes('key') || node.name?.toLowerCase().includes('key')) {
      // Keyboard — subtle anodised look
      mat.roughness = 0.85;
      mat.metalness = 0.6;
    } else {
      // Aluminum body — high specular, low roughness
      mat.roughness = mat.roughness !== undefined ? Math.min(mat.roughness, 0.25) : 0.2;
      mat.metalness = mat.metalness !== undefined ? Math.max(mat.metalness, 0.85) : 0.9;
      mat.envMapIntensity = 1.4;
    }

    mat.needsUpdate = true;
  });
}

/** Real GLB laptop, loaded from public/models/macbook.glb */
function GLBLaptop({ mouse, prefersReducedMotion }) {
  const groupRef = useRef();
  const screenMeshRef = useRef();
  const [clonedScene, setClonedScene] = React.useState(null);
  const { scene } = useGLTF(MODEL_PATH);

  useEffect(() => {
    if (!scene) return;

    const clone = scene.clone(true);
    const screenMesh = findScreenMesh(clone);
    screenMeshRef.current = screenMesh;

    enhanceMaterials(clone, screenMesh);
    setClonedScene(clone);

    return () => {
      // Dispose geometries and materials on unmount
      clone.traverse((node) => {
        if (node.geometry) node.geometry.dispose();
        if (node.material) {
          if (Array.isArray(node.material)) {
            node.material.forEach((m) => m.dispose());
          } else {
            node.material.dispose();
          }
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
          {/* The full GLB scene */}
          <primitive object={clonedScene} />
          {/* Overlay screen mesh with RenderTexture, matching screen position */}
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


/**
 * PrimitiveFallbackLaptop
 * Shown when public/models/macbook.glb is not present.
 * Built entirely from Three.js primitives — no GLB required.
 * Visually represents the laptop shape with correct proportions.
 */
function PrimitiveFallbackLaptop({ mouse, prefersReducedMotion }) {
  const groupRef = useRef();
  const screenMeshRef = useRef();

  useLaptopAnimations({ groupRef, screenMeshRef, mouse, prefersReducedMotion });

  return (
    <group ref={groupRef} position={[0, -2.5, 0]}>
      {/* ── Base ── */}
      <mesh position={[0, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[2.8, 0.07, 1.9]} />
        <meshStandardMaterial color="#1c1c1e" roughness={0.18} metalness={0.92} envMapIntensity={1.2} />
      </mesh>

      {/* Trackpad */}
      <mesh position={[0, 0.04, 0.45]}>
        <boxGeometry args={[0.75, 0.005, 0.48]} />
        <meshStandardMaterial color="#2a2a2e" roughness={0.22} metalness={0.8} />
      </mesh>

      {/* Keyboard area (simplified) */}
      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 11 }).map((_, col) => (
          <mesh
            key={`key-${row}-${col}`}
            position={[
              -1.1 + col * 0.22,
              0.04,
              -0.45 + row * 0.17,
            ]}
          >
            <boxGeometry args={[0.18, 0.008, 0.14]} />
            <meshStandardMaterial color="#222228" roughness={0.85} metalness={0.5} />
          </mesh>
        ))
      )}

      {/* ── Screen Lid ── */}
      <group rotation={[-0.18, 0, 0]} position={[0, 0.035, -0.93]}>
        {/* Lid shell */}
        <mesh castShadow>
          <boxGeometry args={[2.8, 1.82, 0.06]} />
          <meshStandardMaterial color="#1c1c1e" roughness={0.16} metalness={0.94} envMapIntensity={1.3} />
        </mesh>

        {/* Apple logo indent (subtle) */}
        <mesh position={[0, 0, -0.032]}>
          <circleGeometry args={[0.15, 24]} />
          <meshStandardMaterial color="#161618" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Screen bezel */}
        <mesh position={[0, 0, 0.032]}>
          <boxGeometry args={[2.62, 1.65, 0.004]} />
          <meshStandardMaterial color="#080810" roughness={0.9} metalness={0.05} />
        </mesh>

        {/* Screen display — RenderTexture mapped here */}
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

      {/* Hinge bar */}
      <mesh position={[0, 0.04, -0.96]}>
        <cylinderGeometry args={[0.04, 0.04, 2.8, 12]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#2a2a2e" roughness={0.3} metalness={0.9} />
      </mesh>
    </group>
  );
}

/**
 * HeroLaptop — entry point.
 * Attempts to load the GLB; falls back to PrimitiveFallbackLaptop on error.
 */
export default function HeroLaptop({ mouse, prefersReducedMotion, useGLBModel = true }) {
  if (!useGLBModel) {
    return <PrimitiveFallbackLaptop mouse={mouse} prefersReducedMotion={prefersReducedMotion} />;
  }

  return (
    <Suspense fallback={<PrimitiveFallbackLaptop mouse={mouse} prefersReducedMotion={prefersReducedMotion} />}>
      <GLBLaptopErrorShield mouse={mouse} prefersReducedMotion={prefersReducedMotion} />
    </Suspense>
  );
}

/**
 * GLBLaptopErrorShield — catches GLB 404/parse errors and falls back
 * to the primitive model without crashing the entire error boundary.
 */
class GLBLaptopErrorShield extends React.Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
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
    return (
      <GLBLaptop
        mouse={this.props.mouse}
        prefersReducedMotion={this.props.prefersReducedMotion}
      />
    );
  }
}

// Preload at module evaluation — starts fetching before Canvas mounts
// This is a no-op if the file doesn't exist (error caught by Suspense)
try { useGLTF.preload(MODEL_PATH); } catch {}
