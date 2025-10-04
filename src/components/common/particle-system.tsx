'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ParticleSystem = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // Particles
    const particlesCount = 1000
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 'hsl(var(--primary))',
      transparent: true,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Particle trails - store previous positions
    const trailLength = 5;
    const trails: Float32Array[] = [];
    for (let i = 0; i < trailLength; i++) {
      trails.push(new Float32Array(positions));
    }

    // Create trail geometries and materials
    const trailMeshes: THREE.Points[] = [];
    for (let i = 0; i < trailLength; i++) {
      const trailGeometry = new THREE.BufferGeometry();
      trailGeometry.setAttribute('position', new THREE.BufferAttribute(trails[i], 3));
      const opacity = 1 - (i / trailLength);
      const trailMaterial = new THREE.PointsMaterial({
        size: 0.015,
        color: 'hsl(var(--primary))',
        transparent: true,
        opacity: opacity * 0.3,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });
      const trailMesh = new THREE.Points(trailGeometry, trailMaterial);
      trailMeshes.push(trailMesh);
      scene.add(trailMesh);
    }

    // Connection lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 'hsl(var(--primary))',
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
    });
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions: number[] = [];
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Mouse tracking
    const mouse = new THREE.Vector2();
    const mouseWorld = new THREE.Vector3();
    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      // Convert mouse position to world coordinates
      mouseWorld.set(mouse.x, mouse.y, 0).unproject(camera);
    };
    window.addEventListener('mousemove', onMouseMove);

    // Animation
    const clock = new THREE.Clock();
    let frameCount = 0;
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      frameCount++;

      // Update particles
      particles.rotation.y = elapsedTime * 0.1;
      particles.rotation.x = -mouse.y * 0.2;
      particles.rotation.y += mouse.x * 0.2;

      // Update trails every few frames to reduce performance impact
      if (frameCount % 2 === 0) {
        // Shift trail positions
        for (let i = trailLength - 1; i > 0; i--) {
          trails[i].set(trails[i - 1]);
          trailMeshes[i].geometry.attributes.position.needsUpdate = true;
        }
        // Copy current positions to first trail
        trails[0].set(particlesGeometry.attributes.position.array as Float32Array);
        trailMeshes[0].geometry.attributes.position.needsUpdate = true;

        // Update trail rotations to match particles
        trailMeshes.forEach((trailMesh) => {
          trailMesh.rotation.copy(particles.rotation);
        });
      }

      // Update connection lines - connect nearby particles and mouse interaction
      linePositions.length = 0;
      const posArray = particlesGeometry.attributes.position.array;
      const maxDistance = 0.5;
      const mouseInteractionDistance = 2.0;

      // Get world positions of particles
      const particleWorldPositions: THREE.Vector3[] = [];
      const tempVector = new THREE.Vector3();
      for (let i = 0; i < particlesCount; i++) {
        tempVector.set(
          posArray[i * 3],
          posArray[i * 3 + 1],
          posArray[i * 3 + 2]
        );
        tempVector.applyMatrix4(particles.matrixWorld);
        particleWorldPositions.push(tempVector.clone());
      }

      // Connect particles to each other
      for (let i = 0; i < particlesCount; i += 5) { // Sample every 5th particle for performance
        const pos1 = particleWorldPositions[i];
        
        // Check nearby particles
        for (let j = i + 1; j < particlesCount; j += 5) {
          const pos2 = particleWorldPositions[j];
          const distance = pos1.distanceTo(pos2);
          
          if (distance < maxDistance) {
            linePositions.push(pos1.x, pos1.y, pos1.z);
            linePositions.push(pos2.x, pos2.y, pos2.z);
          }
        }

        // Interactive connection to mouse
        const mouseDistance = pos1.distanceTo(mouseWorld);
        if (mouseDistance < mouseInteractionDistance) {
          linePositions.push(pos1.x, pos1.y, pos1.z);
          linePositions.push(mouseWorld.x, mouseWorld.y, mouseWorld.z);
        }
      }

      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      lineGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      if(renderer.domElement.parentElement === currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute top-0 left-0 w-full h-full" />;
};

export default ParticleSystem;
