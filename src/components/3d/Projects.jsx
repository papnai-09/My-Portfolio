import React from 'react';
import ProjectScreen from './ProjectScreen';

const projectsList = [
  {
    id: 1,
    title: 'TaskFlow',
    tech: ['React.js', 'JavaScript', 'Tailwind CSS', 'Zustand'],
    desc: 'A Kanban-style task management application with drag-and-drop workflow, CRUD operations, state management with Zustand, and responsive design.',
    liveUrl: 'https://github.com/papnai-09/TaskFlow',
    githubUrl: 'https://github.com/papnai-09/TaskFlow'
  },
  {
    id: 2,
    title: 'CineStream',
    tech: ['Next.js', 'React.js', 'JavaScript', 'Tailwind CSS', 'TMDB API'],
    desc: 'A responsive movie discovery platform built on Next.js. Integrates TMDB API for real-time film searches, detailed catalogs, and optimized performance.',
    liveUrl: 'https://github.com/papnai-09/CineStream',
    githubUrl: 'https://github.com/papnai-09/CineStream'
  }
];

export default function Projects() {
  return (
    <group position={[0, -0.2, 0]}>
      {/* Project 1: Kanban Task Board (Left, slightly angled) */}
      <ProjectScreen
        project={projectsList[0]}
        position={[-1.3, 0.4, -0.6]}
        rotation={[0.05, 0.2, -0.02]}
      />
      
      {/* Project 2: Cine Stream (Right, slightly lower and angled) */}
      <ProjectScreen
        project={projectsList[1]}
        position={[1.3, 0.1, -0.4]}
        rotation={[0.02, -0.2, 0.03]}
      />
    </group>
  );
}
