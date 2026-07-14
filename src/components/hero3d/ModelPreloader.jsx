/**
 * ModelPreloader.jsx
 *
 * Single source of truth for the local GLB model path.
 * Preloading is now handled conditionally inside HeroLaptop.jsx
 * after a HEAD request confirms the file actually exists — this
 * prevents the "Unexpected token '<'" crash that occurs when
 * React's dev server returns the HTML index page for a missing asset.
 *
 * To use a real MacBook GLB:
 *   1. Place the file at:  public/models/macbook.glb
 *   2. That's it — no code changes required anywhere.
 */

/** Single source of truth for the local model path */
export const MODEL_PATH = '/models/macbook.glb';
