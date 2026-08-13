import React, { useMemo } from 'react';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import SkillCard3D from './SkillCard3D';

const skillsList = [
  { name: 'HTML', details: ['Semantic HTML5', 'SEO Best Practices', 'Accessibility (a11y)', 'Forms & Media'] },
  { name: 'CSS', details: ['Flexbox / CSS Grid', 'Custom Properties', 'Keyframe Animations', 'Responsive Layouts'] },
  { name: 'JavaScript', details: ['ES6+ Syntax', 'Async / Promises', 'DOM Manipulation', 'Event Handling'] },
  { name: 'React', details: ['Components / Hooks', 'State Management', 'Context & Portals', 'Performance Tuning'] },
  { name: 'Vite', details: ['Project Scaffolding', 'Build Optimization', 'HMR Setup', 'Plugins Config'] },
  { name: 'Git', details: ['Version Control', 'Branching Strategy', 'Merge & Rebase', 'Conflict Resolution'] },
  { name: 'GitHub', details: ['Pull Requests', 'GitHub Actions CI', 'Pages Deployments', 'Collaborative Flows'] },
  { name: 'Tailwind CSS', details: ['Utility Architecture', 'JIT Engine', 'Custom Theme Setup', 'Responsive Design'] }
];

export default function Clothesline() {
  // Generate curve points for the sagged wire cable
  const wirePoints = useMemo(() => {
    const points = [];
    const segments = 30;
    const width = 8;
    const sag = 0.12;
    const yCenter = 1.3;
    const zPos = -1.0;
    
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const x = -width / 2 + t * width;
      // Parabolic equation: sag in the middle
      const y = yCenter - sag * (1.0 - Math.pow(x / (width / 2), 2));
      points.push(new THREE.Vector3(x, y, zPos));
    }
    return points;
  }, []);

  return (
    <group position={[0, -0.2, 0]}>
      {/* 3D Wire (Cable) */}
      <Line
        points={wirePoints}
        color="#3a3a3c"
        lineWidth={2}
        dashed={false}
      />
      
      {/* Wire attachments at both ends */}
      <mesh position={[-4, 1.3, -1.0]}>
        <boxGeometry args={[0.1, 0.2, 0.1]} />
        <meshStandardMaterial color="#444" metalness={0.8} />
      </mesh>
      <mesh position={[4, 1.3, -1.0]}>
        <boxGeometry args={[0.1, 0.2, 0.1]} />
        <meshStandardMaterial color="#444" metalness={0.8} />
      </mesh>

      {/* Hanging Skill Cards */}
      {skillsList.map((skill, idx) => (
        <SkillCard3D
          key={skill.name}
          skill={skill}
          index={idx}
          totalCards={skillsList.length}
        />
      ))}
    </group>
  );
}
