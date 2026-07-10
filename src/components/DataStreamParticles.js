import React, { useMemo } from 'react';
import { motion } from 'framer-motion-3d';
import { useTransform } from 'framer-motion';

const DataStreamParticles = ({ particleProgress }) => {
  const particles = useMemo(() => {
    return Array.from({ length: 100 }).map((_, i) => {
      const startX = (Math.random() - 0.5) * 3;
      const startY = Math.random() * 2 + 0.25;
      const endX = startX + (Math.random() - 0.5) * 15;
      const endY = startY + (Math.random() - 0.5) * 15;
      
      return {
        id: i,
        startX, startY, endX, endY,
        zStart: -1, 
        zEnd: Math.random() * 10 + 5,
        delay: Math.random() * 0.4,
        scale: Math.random() * 0.05 + 0.01,
        isPurple: Math.random() > 0.8
      };
    });
  }, []);

  return (
    <group>
      {particles.map((p) => {
        const mappedProgress = useTransform(
          particleProgress, 
          [p.delay, p.delay + 0.6], 
          [0, 1]
        );
        
        const xPos = useTransform(mappedProgress, [0, 1], [p.startX, p.endX]);
        const yPos = useTransform(mappedProgress, [0, 1], [p.startY, p.endY]);
        const zPos = useTransform(mappedProgress, [0, 1], [p.zStart, p.zEnd]);
        const opacity = useTransform(mappedProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

        return (
          <motion.mesh 
            key={p.id} 
            position-x={xPos} 
            position-y={yPos} 
            position-z={zPos} 
            scale={p.scale}
          >
            <boxGeometry args={[1, 1, Math.random() * 8 + 2]} />
            <motion.meshStandardMaterial 
              color={p.isPurple ? "#8a2be2" : "#00ffff"} 
              emissive={p.isPurple ? "#8a2be2" : "#00ffff"}
              emissiveIntensity={2}
              transparent
              opacity={opacity}
              toneMapped={false}
            />
          </motion.mesh>
        );
      })}
    </group>
  );
};

export default DataStreamParticles;
