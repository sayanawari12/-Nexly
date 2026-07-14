/**
 * HeroEffects.jsx
 * Post-processing pipeline.
 *
 * Uses @react-three/postprocessing (which wraps postprocessing.js).
 * Bloom is subtle and calibrated for a premium feel — not flashy.
 *
 * Effects are conditionally applied based on device quality tier:
 *   - Desktop: Bloom + ToneMapping
 *   - Tablet:  Bloom (reduced) + ToneMapping
 *   - Mobile:  ToneMapping only (Bloom disabled to save GPU)
 */
import React from 'react';
import { EffectComposer, Bloom, ToneMapping } from '@react-three/postprocessing';
import { BlendFunction, ToneMappingMode } from 'postprocessing';

export default function HeroEffects({ quality }) {
  const { enableBloom, bloomIntensity, bloomThreshold } = quality;

  return (
    <EffectComposer multisampling={0} disableNormalPass>
      {enableBloom && (
        <Bloom
          intensity={bloomIntensity}
          luminanceThreshold={bloomThreshold}
          luminanceSmoothing={0.3}
          blendFunction={BlendFunction.ADD}
          mipmapBlur
          radius={0.6}
        />
      )}
      <ToneMapping
        mode={ToneMappingMode.ACES_FILMIC}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}
