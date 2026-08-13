import React, { useState } from 'react';

const projectsList = [
  {
    title: 'CineStream',
    subtitle: 'Movie Discovery Platform',
    tech: ['Next.js', 'React.js', 'Tailwind CSS', 'TMDB API'],
    desc: 'Developed a responsive movie discovery platform using Next.js and React.js. Integrated TMDB REST API for real-time movie search, details, watchlists, and casting details.',
    liveUrl: 'https://cine-stream-next-lac.vercel.app/',
    githubUrl: 'https://github.com/papnai-09/cine-stream-next',
    accentColor: '#ff7f7f'
  },
  {
    title: 'TaskFlow',
    subtitle: 'Kanban Task Board',
    tech: ['React.js', 'JavaScript', 'Tailwind CSS', 'Zustand'],
    desc: 'Developed a Kanban-style task management application using React.js. Implemented CRUD operations, drag-and-drop column workflows, and persistent global state management with Zustand.',
    liveUrl: 'https://kanban-task-board-lake.vercel.app/',
    githubUrl: 'https://github.com/papnai-09/kanban-task-board/tree/main/kanban-board',
    accentColor: '#f47c4a'
  },
  {
    title: 'Medicare AI',
    subtitle: 'Healthcare Platform',
    tech: ['React.js', 'JavaScript', 'Tailwind CSS', 'REST API'],
    desc: 'Frontend dashboard interface for healthcare management. Built responsive UI components, dynamic graph charts for vitals tracking, and appointment booking forms.',
    liveUrl: 'https://medicare-ai-alpha.vercel.app/',
    githubUrl: 'https://github.com/papnai-09/health-care',
    accentColor: '#ff7f7f'
  },
  {
    title: 'ShopHub',
    subtitle: 'E-Commerce Storefront',
    tech: ['React.js', 'Tailwind CSS', 'Web API', 'Local Storage'],
    desc: 'Developed a responsive e-commerce storefront layout featuring real-time product catalogs, instant category filtering, interactive shopping cart, and checkout validations.',
    liveUrl: 'https://mission-10-eight.vercel.app/',
    githubUrl: 'https://github.com/papnai-09/shop-hub',
    accentColor: '#f47c4a'
  },
  {
    title: 'Weather Analytics',
    subtitle: 'NASA-Inspired Weather Dashboard',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'OpenWeatherMap API', 'Leaflet.js'],
    desc: 'NASA-inspired weather forecasting dashboard built with HTML, CSS, and JavaScript, featuring real-time weather data, interactive maps, 5-day forecasts, and weather analytics.',
    liveUrl: 'https://will-it-rain-on-my-parade.netlify.app/',
    githubUrl: 'https://github.com/papnai-09/weather-app',
    accentColor: '#ff7f7f'
  }
];

export default function ProjectsSawad() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="sawad-projects-list">
      {projectsList.map((project, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div 
            key={project.title} 
            className={`sawad-project-card ${isOpen ? 'active-open' : ''}`}
            onClick={() => handleToggle(idx)}
            role="button"
            tabIndex={0}
            aria-expanded={isOpen}
          >
            <div className="project-card-left">
              <div className="project-card-num">0{idx + 1}</div>
              <div className="project-card-details">
                <h3 className="project-card-title">{project.title}</h3>
                <span className="project-card-sub">{project.subtitle}</span>
                <p className="project-card-desc">{project.desc}</p>
                
                <div className="project-card-tech">
                  {project.tech.map((t) => (
                    <span key={t} className="tech-pill-sawad">{t}</span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="project-card-right" onClick={(e) => e.stopPropagation()}>
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="sawad-arrow-link"
                style={{ '--accent': project.accentColor }}
                aria-label={`View live ${project.title}`}
                title={`View live ${project.title}`}
              >
                <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none">
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
                GitHub
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
