import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

export default function ResumeBox3D({ isModalOpen, setIsModalOpen }) {
  const boxRef = useRef();
  const hingeRef = useRef();
  const paperRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [boxOpened, setBoxOpened] = useState(false);

  // Sync 3D box state with the modal state controlled by the parent UI
  useEffect(() => {
    if (!boxOpened && isModalOpen) {
      // Trigger box open animation
      openBox();
    } else if (boxOpened && !isModalOpen) {
      // Trigger box close animation
      closeBox();
    }
  }, [isModalOpen]);

  const openBox = () => {
    setBoxOpened(true);
    const tl = gsap.timeline({
      onComplete: () => {
        // After 3D animation finishes, open the detailed 2D modal
        setIsModalOpen(true);
      }
    });

    // 1. Rotate Lid Hinge open
    tl.to(hingeRef.current.rotation, {
      x: -Math.PI * 0.75,
      duration: 0.8,
      ease: 'power2.out'
    }, 0);

    // 2. Slide paper out of box and rotate flat
    tl.to(paperRef.current.position, {
      y: 0.8,
      z: 0.2,
      duration: 1.0,
      ease: 'back.out(1.2)'
    }, 0.2);

    tl.to(paperRef.current.rotation, {
      x: 0,
      y: 0,
      z: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, 0.3);

    tl.to(paperRef.current.scale, {
      x: 1.1,
      y: 1.1,
      z: 1.1,
      duration: 0.8,
      ease: 'power2.out'
    }, 0.3);
  };

  const closeBox = () => {
    setBoxOpened(false);
    const tl = gsap.timeline();

    // 1. Return paper inside box
    tl.to(paperRef.current.position, {
      y: 0.05,
      z: 0.0,
      duration: 0.8,
      ease: 'power2.inOut'
    }, 0);

    tl.to(paperRef.current.rotation, {
      x: -Math.PI / 2,
      y: 0,
      z: 0,
      duration: 0.8,
      ease: 'power2.inOut'
    }, 0);

    tl.to(paperRef.current.scale, {
      x: 0.9,
      y: 0.9,
      z: 0.9,
      duration: 0.8,
      ease: 'power2.inOut'
    }, 0);

    // 2. Close Lid Hinge
    tl.to(hingeRef.current.rotation, {
      x: 0,
      duration: 0.6,
      ease: 'power2.in'
    }, 0.4);
  };

  // Add subtle hovering float effect when closed
  useFrame((state, delta) => {
    if (boxRef.current && !boxOpened) {
      const time = state.clock.getElapsedTime();
      const dt = Math.min(delta, 0.1);
      
      // Floating motion
      boxRef.current.position.y = THREE.MathUtils.lerp(
        boxRef.current.position.y,
        -0.45 + Math.sin(time * 1.5) * 0.04,
        6 * dt
      );

      // Light hover scale response
      const targetScale = hovered ? 1.05 : 1.0;
      boxRef.current.scale.setScalar(
        THREE.MathUtils.lerp(boxRef.current.scale.x, targetScale, 8 * dt)
      );

      // Mouse interactive tilt
      const mouse = state.pointer;
      boxRef.current.rotation.y = THREE.MathUtils.lerp(
        boxRef.current.rotation.y,
        mouse.x * 0.2,
        6 * dt
      );
      boxRef.current.rotation.x = THREE.MathUtils.lerp(
        boxRef.current.rotation.x,
        0.1 - mouse.y * 0.1,
        6 * dt
      );
    } else if (boxRef.current && boxOpened) {
      // Keep box stable when open
      const dt = Math.min(delta, 0.1);
      boxRef.current.position.y = THREE.MathUtils.lerp(boxRef.current.position.y, -0.45, 6 * dt);
      boxRef.current.scale.setScalar(THREE.MathUtils.lerp(boxRef.current.scale.x, 1.0, 6 * dt));
      boxRef.current.rotation.y = THREE.MathUtils.lerp(boxRef.current.rotation.y, 0, 6 * dt);
      boxRef.current.rotation.x = THREE.MathUtils.lerp(boxRef.current.rotation.x, 0.1, 6 * dt);
    }
  });

  return (
    <group 
      ref={boxRef} 
      position={[0, -0.45, -0.2]} 
      rotation={[0.1, 0, 0]}
    >
      {/* 
        3D Base Container 
      */}
      <mesh
        castShadow
        receiveShadow
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          if (!boxOpened) document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          setHovered(false);
          document.body.style.cursor = 'default';
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (!boxOpened) {
            openBox();
          }
        }}
      >
        <boxGeometry args={[1.2, 0.5, 0.8]} />
        <meshStandardMaterial 
          color="#201f1d" 
          roughness={0.7} 
          metalness={0.2}
        />
        
        {/* Label on the box front: "MY RESUME" */}
        <Html
          transform
          distanceFactor={1.2}
          position={[0, 0, 0.405]} // place exactly on front surface
        >
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            color: '#eae6dc',
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '0.15em',
            padding: '3px 12px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            background: '#131211',
            borderRadius: '2px',
            whiteSpace: 'nowrap',
            textTransform: 'uppercase'
          }}>
            My Resume
          </div>
        </Html>
      </mesh>

      {/* 
        Lid Hinge Group (positioned at the back edge of the box [0, 0.25, -0.4])
      */}
      <group ref={hingeRef} position={[0, 0.25, -0.4]}>
        <mesh position={[0, 0.04, 0.4]} castShadow>
          <boxGeometry args={[1.25, 0.08, 0.85]} />
          <meshStandardMaterial color="#2d2b27" roughness={0.8} />
        </mesh>
      </group>

      {/* 
        Resume Paper Mesh (lies flat inside the box, pulls up on open)
      */}
      <mesh 
        ref={paperRef} 
        position={[0, 0.05, 0.0]} 
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.9, 0.9, 0.9]}
        castShadow
      >
        <planeGeometry args={[0.7, 0.95]} />
        <meshStandardMaterial 
          color="#f5f2eb" 
          roughness={0.9} 
          side={THREE.DoubleSide} 
        />
        
        {/* HTML Print on Paper representing the CV */}
        <Html
          transform
          distanceFactor={0.8}
          position={[0, 0, 0.005]}
          pointerEvents="none"
        >
          <div style={{
            width: '100px',
            height: '140px',
            padding: '6px',
            color: '#1a1a1a',
            fontFamily: "'Inter', sans-serif",
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            background: 'transparent',
            opacity: 0.85
          }}>
            <h4 style={{ fontSize: '7px', fontWeight: 800, margin: 0, textTransform: 'uppercase', fontFamily: "'Space Grotesk', sans-serif" }}>
              Gaurav Papnai
            </h4>
            <div style={{ fontSize: '4.5px', color: '#c99a2e', fontWeight: 600, borderBottom: '0.5px solid #ccc', paddingBottom: '1px' }}>
              FRONTEND DEVELOPER
            </div>
            
            <div style={{ fontSize: '3.8px', color: '#555', marginTop: '2px' }}>
              <strong>SUMMARY:</strong> Frontend Developer with hands-on experience building responsive web applications using React.js, JavaScript, Tailwind CSS...
            </div>
            
            <div style={{ fontSize: '3.8px', color: '#555', marginTop: '2px' }}>
              <strong>SKILLS:</strong> JavaScript, HTML5, CSS3, TypeScript, React.js, Next.js, Tailwind CSS, Bootstrap, Git, GitHub...
            </div>

            <div style={{ fontSize: '3.8px', color: '#555', marginTop: '2px' }}>
              <strong>PROJECTS:</strong> CineStream, TaskFlow, Health Companion, ShopEase...
            </div>
          </div>
        </Html>
      </mesh>
    </group>
  );
}
