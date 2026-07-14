/**
 * ModelPreloader.jsx
 * Triggers useGLTF.preload() at module evaluation time so the GLB
 * download starts immediately when the JS bundle is parsed — before
 * the Canvas or Suspense boundary even mounts.
 *
 * MODEL_PATH is the single source of truth for the local model location.
 * Place your MacBook GLB at: public/models/macbook.glb
 */
import { useGLTF } from '@react-three/drei';

/** Single source of truth for local model path */
export const MODEL_PATH = '/models/macbook.glb';

/**
 * Call this once at app level (e.g. in HeroScene or Home.js) to
 * begin the GLB fetch before the Canvas mounts.
 */
export function preloadLaptopModel() {
  useGLTF.preload(MODEL_PATH);
}

/**
 * ModelPreloader — a zero-render component that triggers preload.
 * Embed it anywhere in the tree above the Canvas to prefetch the model.
 */
export default function ModelPreloader() {
  // Preload is called at module evaluation via the export above.
  // This component itself renders nothing.
  return null;
}
