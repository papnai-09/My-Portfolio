import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sparkles, Preload } from '@react-three/drei';
import * as THREE from 'three';
import Paper from './3d/Paper';
import Clothesline from './3d/Clothesline';
import Projects from './3d/Projects';
import ResumeBox3D from './3d/ResumeBox3D';

// Scene Controller component to handle frame-by-frame camera and interactive updates
function SceneController({ scrollY, isModalOpen, setIsModalOpen, paperProgress }) {
  const { camera, pointer } = useThree();
  const pointLightRef = useRef();

  // Y coordinate coordinates for each section
  // Section 0 (Hero/About): Y = 0
  // Section 1 (Skills): Y = -8
  // Section 2 (Projects): Y = -16
  // Section 3 (Resume): Y = -24
  // Section 4 (Contact): Y = -32
  
  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.1);
    
    // 1. Move camera smoothly to match the current scroll Y
    // scrollY is in Three.js units (0 to -32)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, scrollY.current, 4 * dt);
    
    // Maintain depth and perspective
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 5.0, 4 * dt);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, 0.0, 4 * dt);
    
    // Look straight ahead at the active section center
    const targetLookAt = new THREE.Vector3(0, camera.position.y, 0);
    camera.lookAt(targetLookAt);
    
    // 2. Mouse-reactive lighting (point light follows cursor coordinate)
    if (pointLightRef.current) {
      // Scale pointer [-1, 1] to matches 3D dimensions roughly
      const targetLX = pointer.x * 4;
      const targetLY = camera.position.y + pointer.y * 3;
      pointLightRef.current.position.x = THREE.MathUtils.lerp(pointLightRef.current.position.x, targetLX, 5 * dt);
      pointLightRef.current.position.y = THREE.MathUtils.lerp(pointLightRef.current.position.y, targetLY, 5 * dt);
    }
  });

  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.55} color="#e5e2da" />
      
      {/* Main direction desk light casting sharp realistic shadows */}
      <directionalLight
        position={[6, 8, 5]}
        intensity={1.2}
        color="#ffeedd"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={25}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
      />
      
      {/* Subtle blue rim light */}
      <directionalLight 
        position={[-6, -4, -3]} 
        intensity={0.5} 
        color="#8ab4f8" 
      />

      {/* Interactive mouse-following lamp point light */}
      <pointLight
        ref={pointLightRef}
        position={[0, 0, 1.5]}
        intensity={1.5}
        distance={6}
        decay={2.0}
        color="#e0a96d"
      />

      {/* Floating particles (ambient embers/dust) */}
      <Sparkles
        count={70}
        scale={[10, 40, 6]}
        position={[0, -16, -1]}
        size={2.5}
        speed={0.4}
        color="#d4af37"
        opacity={0.35}
      />

      {/* 3D Scene Components Arranged Vertically */}

      {/* Scene 1: Main Paper Scroll (About Me / Intro) */}
      <group position={[0, 0, 0]}>
        <Paper progress={paperProgress.current} width={4.2} height={6.2} />
      </group>

      {/* Scene 2: 3D Clothesline Skills */}
      <group position={[0, -8, 0]}>
        <Clothesline />
      </group>

      {/* Scene 3: Projects Browser Displays */}
      <group position={[0, -16, 0]}>
        <Projects />
      </group>

      {/* Scene 4: Resume Chest/Box */}
      <group position={[0, -24, 0]}>
        <ResumeBox3D 
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </group>

      {/* Scene 5: End Paper Scroll (Contact Info) */}
      <group position={[0, -32, 0]}>
        {/* Contact paper is fully unrolled */}
        <Paper progress={1.0} width={4.2} height={6.2} />
      </group>
    </>
  );
}

export default function PaperScene({ scrollY, isModalOpen, setIsModalOpen, paperProgress }) {
  return (
    <div className="canvas-container">
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <SceneController
            scrollY={scrollY}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            paperProgress={paperProgress}
          />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
