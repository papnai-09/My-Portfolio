import React, { useState } from 'react';

const categoriesList = [
  {
    id: 'languages',
    title: 'Languages',
    subtitle: 'Core Web Fundamentals',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    ),
    skills: [
      { name: 'JavaScript (ES6+)', level: '90%', desc: 'Async/Await, Promises, DOM Manipulation, Closures, Event Loop & Modern ES Modules' },
      { name: 'TypeScript', level: '80%', desc: 'Static Typing, Interfaces, Generic Types, Build-time Type Safety' },
      { name: 'HTML5', level: '95%', desc: 'Semantic Structure, SEO Best Practices, Web Accessibility (ARIA Guidelines)' },
      { name: 'CSS3', level: '90%', desc: 'Modern Flexbox, CSS Grid, Custom Properties, Responsive Media Queries & Keyframe Animations' }
    ]
  },
  {
    id: 'frameworks',
    title: 'Frameworks & Libs',
    subtitle: 'Modern Web Architecture',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"></polygon>
        <line x1="12" y1="22" x2="12" y2="12"></line>
        <line x1="12" y1="12" x2="22" y2="8.5"></line>
        <line x1="12" y1="12" x2="2" y2="8.5"></line>
      </svg>
    ),
    skills: [
      { name: 'React.js', level: '92%', desc: 'Custom Hooks, Context API, Virtual DOM, Component Lifecycle & Performance Profiling' },
      { name: 'Next.js', level: '85%', desc: 'App Router, Server-Side Rendering (SSR), Static Site Generation (SSG), SEO Optimization' },
      { name: 'Zustand', level: '88%', desc: 'Lightweight Global State Management, Atomic Stores & Middleware Integration' }
    ]
  },
  {
    id: 'styling_tools',
    title: 'Styling & Tools',
    subtitle: 'Workflow & Developer Tooling',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
      </svg>
    ),
    skills: [
      { name: 'Tailwind CSS', level: '95%', desc: 'Utility-first rapid prototyping, JIT compiler, Custom design tokens & Responsive utilities' },
      { name: 'Git & GitHub', level: '90%', desc: 'Version control, feature branching workflows, pull requests & merge conflict resolution' },
      { name: 'Vite & VS Code', level: '95%', desc: 'Fast HMR build configurations, linting, debugging & developer productivity tooling' },
      { name: 'Figma', level: '82%', desc: 'UI Design inspection, asset export, prototyping & responsive design conversion' }
    ]
  },
  {
    id: 'concepts',
    title: 'Core Principles',
    subtitle: 'Engineering Standards',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
    ),
    skills: [
      { name: 'Responsive Web Design', level: '96%', desc: 'Mobile-first workflows, fluid typography, cross-browser compatibility across all devices' },
      { name: 'REST API Integration', level: '90%', desc: 'Asynchronous data fetching, Axios/Fetch API, JSON parsing & error boundary states' },
      { name: 'Component Architecture', level: '94%', desc: 'Atomic design hierarchy, reusability, props contracts & separation of concerns' },
      { name: 'Web Performance', level: '86%', desc: 'Lighthouse audits, code splitting, lazy loading images & bundle size optimization' }
    ]
  }
];

export default function SkillsClothesline2D() {
  const [activeTab, setActiveTab] = useState('languages');

  const activeCategory = categoriesList.find((cat) => cat.id === activeTab) || categoriesList[0];

  return (
    <div className="sawad-skills-dashboard">
      {/* Category Tab Selector */}
      <div className="skills-tabs-grid">
        {categoriesList.map((category) => {
          const isActive = activeTab === category.id;
          return (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`skill-tab-card ${isActive ? 'active' : ''}`}
            >
              <div className="tab-icon-wrapper">
                {category.icon}
              </div>
              <div className="tab-text-wrap">
                <span className="tab-title">{category.title}</span>
                <span className="tab-subtitle">{category.subtitle}</span>
              </div>
              <span className="tab-active-indicator" />
            </button>
          );
        })}
      </div>

      {/* Detail Panel */}
      <div className="skills-details-panel">
        <div className="panel-header-wrap">
          <div className="panel-heading">
            <span className="panel-icon">{activeCategory.icon}</span>
            <div>
              <h3>{activeCategory.title}</h3>
              <p className="panel-sub-label">{activeCategory.subtitle}</p>
            </div>
          </div>
          <span className="skill-count-badge">{activeCategory.skills.length} Competencies</span>
        </div>
        
        <div className="skills-grid-inner">
          {activeCategory.skills.map((skill, idx) => (
            <div key={skill.name} className="skill-detail-row" style={{ animationDelay: `${idx * 0.08}s` }}>
              <div className="skill-row-header">
                <span className="skill-detail-name">{skill.name}</span>
                <span className="skill-detail-level">{skill.level}</span>
              </div>
              
              <div className="skill-level-bar-bg">
                <div 
                  className="skill-level-bar-fill"
                  style={{ width: skill.level }}
                ></div>
              </div>
              
              <p className="skill-detail-desc">{skill.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
