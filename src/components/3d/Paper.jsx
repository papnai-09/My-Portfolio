import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Procedural paper texture generator to give realistic organic look
const createPaperTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  
  // Fill warm off-white / beige base
  ctx.fillStyle = '#f6f3eb';
  ctx.fillRect(0, 0, 1024, 1024);
  
  // Subtle paper fibers/noise
  const imgData = ctx.getImageData(0, 0, 1024, 1024);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 6;
    data[i] = Math.min(255, Math.max(0, data[i] + noise));
    data[i+1] = Math.min(255, Math.max(0, data[i+1] + noise - 1)); // slightly warmer
    data[i+2] = Math.min(255, Math.max(0, data[i+2] + noise - 3)); // slightly warmer yellow
  }
  ctx.putImageData(imgData, 0, 0);
  
  // Draw random paper pulp fibers
  ctx.strokeStyle = 'rgba(180, 170, 150, 0.08)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 400; i++) {
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    const len = Math.random() * 15 + 5;
    const angle = Math.random() * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(angle) * len, y + Math.sin(angle) * len);
    ctx.stroke();
  }
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
};

export default function Paper({ progress = 0, width = 4.5, height = 7 }) {
  const meshRef = useRef();
  const materialRef = useRef();
  
  // Create static texture and normal map for paper texture
  const paperTexture = useMemo(() => createPaperTexture(), []);
  
  // Define custom uniforms for shader deformation
  const uniforms = useMemo(() => ({
    uUnrollProgress: { value: 0.0 },
    uPaperHeight: { value: height },
    uRollRadius: { value: 0.28 }
  }), [height]);

  // Smooth progress updates using lerp in the frame loop
  useFrame((state, delta) => {
    if (materialRef.current && materialRef.current.userData.shader) {
      const shader = materialRef.current.userData.shader;
      // Smoothly interpolate the progress
      shader.uniforms.uUnrollProgress.value = THREE.MathUtils.lerp(
        shader.uniforms.uUnrollProgress.value,
        progress,
        5 * delta
      );
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      castShadow 
      receiveShadow
      position={[0, 0, 0]}
    >
      {/* 
        High Y segment count (200) allows smooth rolling curves, 
        X segment count (10) is sufficient for a flat horizontal plane.
      */}
      <planeGeometry args={[width, height, 10, 200]} />
      
      <meshStandardMaterial
        ref={materialRef}
        map={paperTexture}
        roughness={0.95}
        metalness={0.02}
        side={THREE.DoubleSide}
        onBeforeCompile={(shader) => {
          // Inject custom uniforms
          shader.uniforms.uUnrollProgress = uniforms.uUnrollProgress;
          shader.uniforms.uPaperHeight = uniforms.uPaperHeight;
          shader.uniforms.uRollRadius = uniforms.uRollRadius;
          
          materialRef.current.userData.shader = shader;
          
          // Inject uniform declarations in Vertex Shader
          shader.vertexShader = `
            uniform float uUnrollProgress;
            uniform float uPaperHeight;
            uniform float uRollRadius;
          ` + shader.vertexShader;
          
          // Deform Normals first to match the curve
          shader.vertexShader = shader.vertexShader.replace(
            '#include <beginnormal_vertex>',
            `
            #include <beginnormal_vertex>
            
            float H_norm = uPaperHeight;
            float L_norm = H_norm * uUnrollProgress;
            float R_norm = uRollRadius;
            float y_norm = position.y;
            
            if (y_norm > L_norm/2.0) {
              float dy = y_norm - L_norm/2.0;
              float theta = dy / R_norm;
              objectNormal = vec3(0.0, sin(theta), cos(theta));
            } else if (y_norm < -L_norm/2.0) {
              float dy = -L_norm/2.0 - y_norm;
              float theta = dy / R_norm;
              objectNormal = vec3(0.0, -sin(theta), cos(theta));
            } else {
              objectNormal = vec3(0.0, 0.0, 1.0);
            }
            `
          );
          
          // Deform Vertices to roll top and bottom edges backwards
          shader.vertexShader = shader.vertexShader.replace(
            '#include <begin_vertex>',
            `
            #include <begin_vertex>
            
            float H_trans = uPaperHeight;
            float L_trans = H_trans * uUnrollProgress;
            float R_trans = uRollRadius;
            float y_trans = position.y;
            
            if (y_trans > L_trans/2.0) {
              float dy = y_trans - L_trans/2.0;
              float theta = dy / R_trans;
              transformed.y = L_trans/2.0 + R_trans * sin(theta);
              transformed.z = -R_trans + R_trans * cos(theta);
            } else if (y_trans < -L_trans/2.0) {
              float dy = -L_trans/2.0 - y_trans;
              float theta = dy / R_trans;
              transformed.y = -L_trans/2.0 - R_trans * sin(theta);
              transformed.z = -R_trans + R_trans * cos(theta);
            } else {
              transformed.z = 0.0;
            }
            `
          );
        }}
      />
    </mesh>
  );
}
