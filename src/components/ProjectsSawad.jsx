import React from 'react';

const projectsList = [
  {
    title: 'CineStream',
    subtitle: 'Movie Discovery & Streaming Platform',
    tech: ['Next.js', 'React.js', 'Tailwind CSS', 'TMDB API', 'Framer Motion'],
    desc: 'An immersive cinema exploration platform built with Next.js & React. Integrates TMDB API for live trending feeds, real-time search filtering, dynamic trailer modals, bookmarking watchlists, and actor filmography profiles with responsive mobile UX.',
    liveUrl: 'https://github.com/papnai-09/CineStream',
    githubUrl: 'https://github.com/papnai-09/CineStream',
    tag: 'Featured Project',
    accentColor: '#38bdf8'
  },
  {
    title: 'TaskFlow',
    subtitle: 'Interactive Kanban Productivity Board',
    tech: ['React.js', 'JavaScript (ES6+)', 'Tailwind CSS', 'Zustand', 'HTML5 DnD'],
    desc: 'High-performance task management application designed with a Kanban board layout. Features interactive drag-and-drop column workflows, instant task CRUD operations, custom color tagging, priority filters, and persistent state via Zustand.',
    liveUrl: 'https://github.com/papnai-09/TaskFlow',
    githubUrl: 'https://github.com/papnai-09/TaskFlow',
    tag: 'Web Application',
    accentColor: '#818cf8'
  },
  {
    title: 'Health Companion',
    subtitle: 'Healthcare Monitoring & Appointment System',
    tech: ['React.js', 'Tailwind CSS', 'REST API', 'Chart.js', 'Component Architecture'],
    desc: 'Comprehensive patient and doctor health portal frontend. Features dynamic vitals tracking analytics charts, doctor availability calendars, automated appointment booking confirmation flows, and responsive medical records view.',
    liveUrl: 'https://github.com/papnai-09',
    githubUrl: 'https://github.com/papnai-09',
    tag: 'Team Project',
    accentColor: '#34d399'
  },
  {
    title: 'ShopEase',
    subtitle: 'Modern E-Commerce Storefront',
    tech: ['React.js', 'JavaScript', 'Tailwind CSS', 'Context API', 'LocalStorage'],
    desc: 'A responsive e-commerce web application featuring live product catalog search, multi-category price filtering, interactive sliding shopping cart drawer, discount coupon calculation, and responsive checkout simulation.',
    liveUrl: 'https://github.com/papnai-09',
    githubUrl: 'https://github.com/papnai-09',
    tag: 'E-Commerce',
    accentColor: '#f472b6'
  }
];

export default function ProjectsSawad() {
  return (
    <div className="sawad-projects-list">
      {projectsList.map((project, idx) => (
        <div key={project.title} className="sawad-project-card" style={{ '--project-accent': project.accentColor }}>
          <div className="project-card-left">
            <div className="project-num-badge">
              <span className="project-card-num">0{idx + 1}</span>
              <span className="project-type-tag">{project.tag}</span>
            </div>

            <div className="project-card-details">
              <div className="project-title-row">
                <h3 className="project-card-title">{project.title}</h3>
                <span className="project-card-sub">{project.subtitle}</span>
              </div>
              
              <p className="project-card-desc">{project.desc}</p>
              
              <div className="project-card-tech">
                {project.tech.map((t) => (
                  <span key={t} className="tech-pill-sawad">{t}</span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="project-card-right">
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="sawad-arrow-link"
              title="View Live Repository"
              aria-label={`View ${project.title}`}
            >
              <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>
            
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="sawad-github-link"
            >
              <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '5px' }}>
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              Source Code
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
