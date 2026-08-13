import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

export default function ProjectScreen({ project, position, rotation }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  // Inertial movement states
  const targetScale = hovered ? 1.08 : 0.95;
  const targetZ = hovered ? position[2] + 0.6 : position[2];
  
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    const dt = Math.min(delta, 0.1);
    const time = state.clock.getElapsedTime();
    
    // Smooth lerps for hover transformations
    meshRef.current.scale.setScalar(
      THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 6 * dt)
    );
    meshRef.current.position.z = THREE.MathUtils.lerp(
      meshRef.current.position.z, 
      targetZ, 
      6 * dt
    );
    
    // Add a gentle floating wave movement
    const wave = Math.sin(time * 1.2 + project.id) * 0.08;
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      position[1] + wave,
      6 * dt
    );
    
    // Subtle mouse response (parallax tilt)
    const mouse = state.pointer; // [-1, 1]
    const targetRotX = rotation[0] + (hovered ? -0.05 : 0) + mouse.y * 0.08;
    const targetRotY = rotation[1] + (hovered ? 0.05 : 0) - mouse.x * 0.08;
    
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, 6 * dt);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 6 * dt);
  });

  return (
    <group 
      ref={meshRef}
      position={[position[0], position[1], position[2]]}
      rotation={[rotation[0], rotation[1], rotation[2]]}
    >
      {/* 3D Browser Window Frame */}
      <mesh 
        castShadow 
        receiveShadow
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          setHovered(false);
          document.body.style.cursor = 'default';
        }}
        onClick={(e) => {
          e.stopPropagation();
          setActive(!active);
        }}
      >
        <boxGeometry args={[2.5, 1.6, 0.04]} />
        <meshStandardMaterial 
          color="#1e1e24" 
          roughness={0.4} 
          metalness={0.8}
        />
        
        {/* Browser Top Bar Decoration (Grey band at the top of the browser window) */}
        <mesh position={[0, 0.725, 0.011]}>
          <planeGeometry args={[2.48, 0.12]} />
          <meshStandardMaterial color="#2d2d34" roughness={0.5} />
        </mesh>
        
        {/* Browser Window Control Buttons (Red, Yellow, Green dots) */}
        {/* Red Dot */}
        <mesh position={[-1.15, 0.725, 0.013]}>
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshBasicMaterial color="#ff5f56" />
        </mesh>
        {/* Yellow Dot */}
        <mesh position={[-1.09, 0.725, 0.013]}>
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshBasicMaterial color="#ffbd2e" />
        </mesh>
        {/* Green Dot */}
        <mesh position={[-1.03, 0.725, 0.013]}>
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshBasicMaterial color="#27c93f" />
        </mesh>
        
        {/* Browser URL bar representation */}
        <mesh position={[0, 0.725, 0.013]}>
          <planeGeometry args={[1.5, 0.07]} />
          <meshBasicMaterial color="#1a1a1f" />
        </mesh>

        {/* Project Content Projected onto Screen */}
        <Html
          transform
          occlude
          distanceFactor={1.3}
          position={[0, -0.07, 0.022]}
          pointerEvents="auto"
        >
          <div className={`project-card-2d ${hovered ? 'visible' : ''}`} style={{
            width: '280px',
            height: '160px',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'rgba(11, 11, 12, 0.95)',
            border: hovered ? '1px solid #d4af37' : '1px solid rgba(255,255,255,0.1)',
            borderRadius: '6px',
            boxShadow: 'none',
            pointerEvents: 'auto'
          }}>
            <div>
              <h3 className="project-title" style={{ fontSize: '14px', margin: 0, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>
                {project.title}
              </h3>
              
              <div className="project-tech" style={{ margin: '4px 0 6px 0', gap: '3px' }}>
                {project.tech.map((t) => (
                  <span key={t} className="tech-tag" style={{ fontSize: '6px', padding: '1px 4px', borderRadius: '10px' }}>
                    {t}
                  </span>
                ))}
              </div>
              
              <p className="project-desc" style={{ fontSize: '9px', margin: 0, lineHeight: 1.4, fontFamily: "'Manrope', sans-serif" }}>
                {project.desc}
              </p>
            </div>
            
            <div className="project-buttons" style={{ display: 'flex', gap: '8px', pointerEvents: 'auto' }}>
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="btn-primary" 
                style={{ 
                  fontSize: '7.5px', 
                  padding: '4px 8px', 
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  pointerEvents: 'auto'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                Demo
              </a>
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="btn-secondary" 
                style={{ 
                  fontSize: '7.5px', 
                  padding: '4px 8px', 
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  pointerEvents: 'auto'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                GitHub
              </a>
            </div>
          </div>
        </Html>
      </mesh>
    </group>
  );
}
