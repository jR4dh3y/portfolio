'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera, Float } from '@react-three/drei';
import * as THREE from 'three';

interface ComputerModelProps {
  scale?: number;
  position?: [number, number, number];
}

export default function ComputerModel({ scale = 1, position = [0, 0, 0] }: ComputerModelProps) {
  const computerRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/computers_1-transformed.glb');
  
  // Clone the scene to avoid issues with multiple instances
  const clonedScene = scene.clone();

  useEffect(() => {
    // Traverse and set up materials
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        
        // Enhance materials with better lighting
        if (child.material) {
          child.material.needsUpdate = true;
        }
      }
    });
  }, [clonedScene]);

  // Smooth rotation animation
  useFrame((state) => {
    if (computerRef.current) {
      // Gentle floating rotation
      computerRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      
      // Mouse interaction
      const { mouse } = state;
      computerRef.current.rotation.x = THREE.MathUtils.lerp(
        computerRef.current.rotation.x,
        mouse.y * 0.1,
        0.05
      );
      computerRef.current.rotation.y += THREE.MathUtils.lerp(
        0,
        mouse.x * 0.1,
        0.05
      );
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.3}
      floatIntensity={0.5}
      floatingRange={[-0.1, 0.1]}
    >
      <primitive
        ref={computerRef}
        object={clonedScene}
        scale={scale}
        position={position}
      />
    </Float>
  );
}

// Preload the model
useGLTF.preload('/computers_1-transformed.glb');
