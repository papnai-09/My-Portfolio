import React, { useState } from 'react';

const categoriesList = [
  {
    id: 'languages',
    title: 'Languages',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    ),
    skills: [
      { name: 'JavaScript (ES6+)', level: '90%', desc: 'Asynchronous Programming, Promises, DOM API, ES Modules' },
      { name: 'TypeScript', level: '80%', desc: 'Static Typing, Interfaces, Generic Types, Build Integration' },
      { name: 'HTML5', level: '95%', desc: 'Semantic Tags, SEO Best Practices, Accessibility (ARIA)' },
      { name: 'CSS3', level: '90%', desc: 'Flexbox, Grid Layouts, Keyframe Animations, Custom Properties' }
    ]
  },
  {
    id: 'frameworks',
    title: 'Frameworks & Libraries',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"></polygon>
        <line x1="12" y1="22" x2="12" y2="12"></line>
        <line x1="12" y1="12" x2="22" y2="8.5"></line>
        <line x1="12" y1="12" x2="2" y2="8.5"></line>
      </svg>
    ),
    skills: [
      { name: 'React.js', level: '90%', desc: 'Hooks, Custom Hook Design, Context API, Performance Profiling' },
      { name: 'Next.js', level: '85%', desc: 'Server-Side Rendering (SSR), Incremental Static Regeneration (ISR), App Router' },
      { name: 'Zustand', level: '88%', desc: 'Lightweight Global State Management, Atomic Stores' }
    ]
  },
  {
    id: 'styling_tools',
    title: 'Styling & Tools',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
      </svg>
    ),
    skills: [
      { name: 'Tailwind CSS', level: '95%', desc: 'Utility-first styling, JIT compilation, Responsive layouts' },
      { name: 'Bootstrap', level: '85%', desc: 'Grid systems, pre-built utility layout classes' },
      { name: 'Git & GitHub', level: '90%', desc: 'Branch management, PR reviews, merge conflict resolution' },
      { name: 'VS Code & Vite', level: '95%', desc: 'Development environments, fast Hot Module Replacement config' },
      { name: 'Figma', level: '80%', desc: 'Asset extraction, interactive design mockups, wireframing' }
    ]
  },
  {
    id: 'concepts',
    title: 'Core Concepts',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
    ),
    skills: [
      { name: 'Responsive Web Design', level: '95%', desc: 'Fluid grids, media queries, mobile-first design principles' },
      { name: 'REST API Integration', level: '90%', desc: 'Data fetching, HTTP protocols, error handling mechanisms' },
      { name: 'Component Architecture', level: '95%', desc: 'Creating highly modular, reusable, scalable UI blocks' },
      { name: 'Performance Optimization', level: '85%', desc: 'Lighthouse audits, code splitting, image loading optimization' }
    ]
  }
];

export default function SkillsClothesline2D() {
  const [activeTab, setActiveTab] = useState('languages');

  const activeCategory = categoriesList.find((cat) => cat.id === activeTab) || categoriesList[0];

  return (
    <div className="sawad-skills-dashboard">
      {/* Tab Switcher Grid */}
      <div className="skills-tabs-grid">
        {categoriesList.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveTab(category.id)}
            className={`skill-tab-card ${activeTab === category.id ? 'active' : ''}`}
          >
            <div className="tab-icon-wrapper" style={{ color: activeTab === category.id ? 'var(--accent)' : 'var(--text-gray)' }}>
              {category.icon}
            </div>
            <span className="tab-title">{category.title}</span>
          </button>
        ))}
      </div>

      {/* Selected Category Skill Details */}
      <div className="skills-details-panel">
        <h3 className="panel-heading">
          {activeCategory.icon}
          {activeCategory.title}
        </h3>
        
        <div className="skills-grid-inner">
          {activeCategory.skills.map((skill) => (
            <div key={skill.name} className="skill-detail-row">
              <div className="skill-row-header">
                <span className="skill-detail-name">{skill.name}</span>
                <span className="skill-detail-level">{skill.level}</span>
              </div>
              
              {/* Clean Level Indicator Bar */}
              <div className="skill-level-bar-bg">
                <div 
                  className="skill-level-bar-fill"
                  style={{ width: skill.level, '--accent-fill': activeTab === 'languages' || activeTab === 'styling_tools' ? 'var(--accent)' : 'var(--accent-orange)' }}
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
