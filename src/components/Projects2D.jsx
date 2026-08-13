import React from 'react';
import { Github, ExternalLink } from 'lucide-react';

const projectsList = [
  {
    title: 'CineStream',
    subtitle: 'Movie Discovery Platform',
    tech: ['Next.js', 'React.js', 'Tailwind CSS', 'TMDB API'],
    desc: 'Developed a responsive movie discovery platform with Next.js. Integrated TMDB REST API for real-time movie search, trailers, reviews, and watchlists.',
    liveUrl: 'https://github.com/papnai-09/CineStream',
    githubUrl: 'https://github.com/papnai-09/CineStream'
  },
  {
    title: 'TaskFlow',
    subtitle: 'Kanban Task Board',
    tech: ['React.js', 'JavaScript', 'Tailwind CSS', 'Zustand'],
    desc: 'A Kanban-style task management board featuring drag-and-drop column workflows, custom categories, and persistent state management with Zustand.',
    liveUrl: 'https://github.com/papnai-09/TaskFlow',
    githubUrl: 'https://github.com/papnai-09/TaskFlow'
  },
  {
    title: 'Health Companion',
    subtitle: 'Healthcare Management Interface',
    tech: ['React.js', 'JavaScript', 'Tailwind CSS', 'REST API'],
    desc: 'Frontend interface for a healthcare monitoring system. Integrates patient vitals visualization, charts, appointment rosters, and secure dashboards.',
    liveUrl: 'https://github.com/papnai-09',
    githubUrl: 'https://github.com/papnai-09'
  },
  {
    title: 'ShopEase',
    subtitle: 'E-Commerce Frontend',
    tech: ['React.js', 'Tailwind CSS', 'Web API', 'State Management'],
    desc: 'A complete e-commerce store layout. Implements item catalogues, product filtering, shopping carts, checkout forms, and optimized page speeds.',
    liveUrl: 'https://github.com/papnai-09',
    githubUrl: 'https://github.com/papnai-09'
  }
];

export default function Projects2D() {
  return (
    <div className="projects-grid-2d">
      {projectsList.map((project) => (
        <div key={project.title} className="browser-card-2d">
          {/* Browser header bar */}
          <div className="browser-header">
            <div className="browser-dots">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
            </div>
            <div className="browser-address-bar">
              https://gaurav.dev/projects/{project.title.toLowerCase()}
            </div>
          </div>
          
          {/* Browser viewport area */}
          <div className="browser-body">
            <div className="browser-content">
              <div className="project-header">
                <h3 className="project-title-text">{project.title}</h3>
                <span className="project-sub-text">{project.subtitle}</span>
              </div>
              
              <div className="project-tech-tags">
                {project.tech.map((t) => (
                  <span key={t} className="tech-badge-2d">{t}</span>
                ))}
              </div>
              
              <p className="project-description-text">{project.desc}</p>
              
              <div className="project-actions-2d">
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="project-btn-primary"
                >
                  <ExternalLink size={14} />
                  Live Demo
                </a>
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="project-btn-secondary"
                >
                  <Github size={14} />
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
