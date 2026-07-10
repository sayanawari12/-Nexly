import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

const RotatingShape = () => {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.3;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2.5, 0]} />
      <meshStandardMaterial color="#00ffff" wireframe />
    </mesh>
  );
};

const ThreeScene = () => {
  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <RotatingShape />
      </Canvas>
    </div>
  );
};

export default ThreeScene;
