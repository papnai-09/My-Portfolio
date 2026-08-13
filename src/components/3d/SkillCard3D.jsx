import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

export default function SkillCard3D({ skill, index, totalCards }) {
  const cardRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  // Spring physics variables for organic swinging
  const physics = useRef({
    angleX: 0,
    vx: 0,
    angleZ: 0,
    vz: 0,
    targetAngleX: 0,
    targetAngleZ: 0,
    phase: Math.random() * Math.PI * 2 // random start phase so they don't swing in perfect sync
  });

  // Calculate card position along the wire
  // Spaced along the X axis from -3 to 3
  const spacing = 0.95;
  const startX = -((totalCards - 1) * spacing) / 2;
  const cardX = startX + index * spacing;
  
  // Drop card slightly in the center to match wire sag (parabolic sag)
  const sagFactor = 0.08;
  const cardY = 1.3 - Math.pow(cardX / 3.5, 2) * sagFactor;
  const cardZ = -1; // place slightly behind the main paper plane

  useFrame((state, delta) => {
    if (!cardRef.current) return;
    
    // Clamp delta to avoid physics explosion on tab switches
    const dt = Math.min(delta, 0.1);
    
    // 1. Natural wind swinging (subtle harmonic oscillation)
    const time = state.clock.getElapsedTime();
    const windForce = Math.sin(time * 1.5 + physics.current.phase) * 0.04;
    
    // 2. Mouse interactive swing
    const mouse = state.pointer; // mouse.x, mouse.y range [-1, 1]
    
    // Project mouse coordinates to cards space roughly
    const cardPos = new THREE.Vector3(cardX, cardY, cardZ);
    // Find distance in screen space or simple coordinates
    // Approximate distance
    const distToMouseX = (mouse.x * 4.5) - cardX;
    const distToMouseY = (mouse.y * 3.5) - cardY;
    const sqDist = distToMouseX * distToMouseX + distToMouseY * distToMouseY;
    
    let mouseForceX = 0;
    let mouseForceZ = 0;
    
    if (sqDist < 1.8) {
      // Mouse is close, add push force
      const dist = Math.sqrt(sqDist);
      const push = (1.8 - dist) * 0.25;
      mouseForceX = -distToMouseX * push;
      mouseForceZ = -push * 0.8;
    }

    // Set target angles based on hover and external forces
    if (hovered) {
      // Hovered card moves toward camera, tilts up slightly
      physics.current.targetAngleX = -0.3; // tilt forward
      physics.current.targetAngleZ = 0;
    } else {
      // Follow natural wind and mouse forces
      physics.current.targetAngleX = windForce + mouseForceZ;
      physics.current.targetAngleZ = mouseForceX * 0.5;
    }

    // Solve angular spring: accel = -k*(theta - target) - c*vel
    const k = 15; // spring constant
    const c = 3.5; // damping constant
    
    const ax = -k * (physics.current.angleX - physics.current.targetAngleX) - c * physics.current.vx;
    physics.current.vx += ax * dt;
    physics.current.angleX += physics.current.vx * dt;

    const az = -k * (physics.current.angleZ - physics.current.targetAngleZ) - c * physics.current.vz;
    physics.current.vz += az * dt;
    physics.current.angleZ += physics.current.vz * dt;

    // Apply rotation
    cardRef.current.rotation.x = physics.current.angleX;
    cardRef.current.rotation.z = physics.current.angleZ;
    cardRef.current.rotation.y = THREE.MathUtils.lerp(
      cardRef.current.rotation.y, 
      hovered ? 0.15 : 0, 
      8 * dt
    );

    // Apply position changes (move towards camera on hover)
    const targetZ = hovered ? cardZ + 0.6 : cardZ;
    const targetY = hovered ? cardY + 0.2 : cardY;
    cardRef.current.position.z = THREE.MathUtils.lerp(cardRef.current.position.z, targetZ, 8 * dt);
    cardRef.current.position.y = THREE.MathUtils.lerp(cardRef.current.position.y, targetY, 8 * dt);
  });

  return (
    <group 
      ref={cardRef} 
      position={[cardX, cardY, cardZ]}
    >
      {/* Small Pin (Clothespin) holding the card */}
      <mesh position={[0, 0.55, 0]} castShadow>
        <boxGeometry args={[0.08, 0.15, 0.05]} />
        <meshStandardMaterial color="#8b7355" roughness={0.9} />
      </mesh>
      
      {/* Wire connector line (clip wire) */}
      <mesh position={[0, 0.475, 0]}>
        <cylinderGeometry args={[0.005, 0.005, 0.1]} />
        <meshStandardMaterial color="#888" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Main Card Mesh */}
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
      >
        <boxGeometry args={[0.75, 1.0, 0.02]} />
        <meshStandardMaterial 
          color={hovered ? "#fff" : "#eae6dc"} 
          roughness={0.9}
          metalness={0.05}
        />
        
        {/* HTML Content Projected on Card */}
        <Html
          transform
          occlude
          distanceFactor={1.2}
          position={[0, 0, 0.012]}
          pointerEvents="none"
        >
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: '#1a1a1a',
            textAlign: 'center',
            width: '100px',
            height: '133px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '5px',
            border: hovered ? '1px solid #d4af37' : '1px solid transparent',
            borderRadius: '4px',
            backgroundColor: 'transparent',
            transition: 'all 0.3s ease'
          }}>
            {!hovered ? (
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {skill.name}
              </span>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#c99a2e', borderBottom: '1px solid #d4af37', paddingBottom: '2px', marginBottom: '2px' }}>
                  {skill.name}
                </span>
                {skill.details.map((detail, dIdx) => (
                  <span key={dIdx} style={{ fontSize: '7.5px', fontWeight: 500, color: '#333', whiteSpace: 'nowrap' }}>
                    {detail}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Html>
      </mesh>
    </group>
  );
}
