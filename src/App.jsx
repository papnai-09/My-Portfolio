import React, { useState, useEffect, useRef, useCallback } from 'react';
import Navigation from './components/Navigation';
import SkillsClothesline2D from './components/SkillsClothesline2D';
import ProjectsSawad from './components/ProjectsSawad';
import ResumeBox2D from './components/ResumeBox2D';
import ThreeLoader from './components/ThreeLoader';

// Torch / Flashlight reveal component
export const TorchPhoto = ({ src, alt }) => {
  const containerRef = useRef(null);
  const [pos, setPos] = useState({ x: -999, y: -999 });
  const [isOn, setIsOn] = useState(false);
  const [radius, setRadius] = useState(0);
  const rafRef = useRef(null);

  const updatePos = useCallback((clientX, clientY) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => setPos({ x, y }));
  }, []);

  const handleMove = (e) => {
    updatePos(e.clientX, e.clientY);
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      updatePos(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleEnter = () => {
    setIsOn(true);
    setRadius(0);
    setTimeout(() => setRadius(130), 10);
  };
  
  const handleLeave = () => {
    setRadius(0);
    setTimeout(() => setIsOn(false), 350);
  };

  const maskStyle = isOn
    ? `radial-gradient(circle ${radius}px at ${pos.x}px ${pos.y}px, transparent 0%, transparent 60%, rgba(0,0,0,0.97) 100%)`
    : 'rgba(0,0,0,0.97)';

  return (
    <div
      ref={containerRef}
      className="torch-photo-wrapper"
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onTouchStart={handleEnter}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleLeave}
    >
      <img src={src} alt={alt} className="avatar-image-direct" />
      <div className="torch-overlay" style={{ WebkitMaskImage: maskStyle, maskImage: maskStyle }} />
    </div>
  );
};

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Typewriter effect state & logic
  const words = ["Gaurav Papnai", "Frontend Developer"];
  const [typewriterText, setTypewriterText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    let timer;
    const i = loopNum % words.length;
    const fullWord = words[i];

    if (!isDeleting) {
      // Typing state
      if (typewriterText !== fullWord) {
        timer = setTimeout(() => {
          setTypewriterText(fullWord.substring(0, typewriterText.length + 1));
        }, 100);
      } else {
        // Finished typing: pause, then start deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 1500);
      }
    } else {
      // Deleting state
      if (typewriterText !== "") {
        timer = setTimeout(() => {
          setTypewriterText(fullWord.substring(0, typewriterText.length - 1));
        }, 50);
      } else {
        // Finished deleting: move to next word
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    }

    return () => clearTimeout(timer);
  }, [typewriterText, isDeleting, loopNum]);

  return (
    <>
      {isLoading && <ThreeLoader onComplete={() => setIsLoading(false)} />}
      
      <div className="app-container">
      
      {/* Floating navigation overlay */}
      <Navigation />

      {/* Hero Section (Sawad Split-Grid) */}
      <section id="about" className="portfolio-section" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
        <div className="sawad-hero">
          <div className="hero-left">
            <div className="hero-badge-glowing">
              <span className="badge-dot"></span>
              Open to Frontend Roles & Internships — 2026
            </div>
            
            <h1 className="hero-title-sawad" style={{ minHeight: '105px' }}>
              <span className="typewriter-text">{typewriterText}</span>
              <span className="typewriter-cursor">|</span>
            </h1>
            
            <p className="hero-bio-sawad">
              I am a Frontend Developer focused on building clean, user-centric, and highly responsive web applications. Specialized in React.js, Next.js, JavaScript, and Tailwind CSS.
            </p>
            
            <div className="hero-actions-sawad">
              <a href="#projects" className="btn-sawad-primary">
                View My Work
              </a>
              <a href="#contact" className="btn-sawad-secondary">
                Let's Chat
              </a>
            </div>
          </div>
          
          <div className="hero-right">
            <TorchPhoto src="/avatar.png" alt="Gaurav Papnai" />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="portfolio-section">
        <h2 className="sawad-section-title">My <span>Toolkit</span></h2>
        <span className="skills-interactive-hint" style={{ display: 'block', marginTop: '-2.2rem', marginBottom: '2rem', color: 'var(--text-gray)', fontSize: '0.8rem' }}>
          Explore technical expertise by selecting different skill categories
        </span>
        <SkillsClothesline2D />
      </section>

      {/* Services Section */}
      <section id="services" className="portfolio-section">
        <h2 className="sawad-section-title">My <span>Services</span></h2>
        <div className="sawad-services-grid">
          <div className="sawad-service-card">
            <div className="service-icon">
              <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            </div>
            <h3 className="service-title">Frontend Development</h3>
            <p className="service-desc">
              Building high-performance, responsive single-page web applications. Specialized in creating scalable, component-based architectures using React.js and Next.js.
            </p>
            <span className="service-pill">React & Next</span>
          </div>

          <div className="sawad-service-card">
            <div className="service-icon" style={{ color: 'var(--accent-orange)' }}>
              <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none">
                <path d="M12 18h.01"></path>
                <path d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"></path>
              </svg>
            </div>
            <h3 className="service-title">Responsive UI & Styling</h3>
            <p className="service-desc">
              Translating wireframes and Figma designs into modern, pixel-perfect user interfaces with Tailwind CSS, clean responsive layouts, and micro-interactions.
            </p>
            <span className="service-pill orange">Tailwind & CSS3</span>
          </div>

          <div className="sawad-service-card">
            <div className="service-icon">
              <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </div>
            <h3 className="service-title">State & API Integration</h3>
            <p className="service-desc">
              Connecting frontend interfaces with RESTful APIs, handling dynamic asynchronous data flows, and implementing clean state management with Zustand.
            </p>
            <span className="service-pill">REST & Zustand</span>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="portfolio-section">
        <h2 className="sawad-section-title">My <span>Projects</span></h2>
        <span className="skills-interactive-hint" style={{ display: 'block', marginTop: '-2.2rem', marginBottom: '2.5rem', color: 'var(--text-gray)', fontSize: '0.8rem' }}>
          Explore featured frontend development projects
        </span>
        <ProjectsSawad />
      </section>

      {/* Education Section */}
      <section id="education" className="portfolio-section">
        <h2 className="sawad-section-title"><span>Education</span></h2>
        
        <div className="sawad-education-timeline-centered">
          <div className="timeline-center-line"></div>

          {/* Row 1 (B.Tech) - Left text, Right photo */}
          <div className="timeline-row row-left">
            <div className="timeline-side-content text-side">
              <div className="education-details-card">
                <span className="edu-time">2022 - 2026</span>
                <h3 className="edu-title">Bachelor of Technology (B.Tech)</h3>
                <span className="edu-org">Birla Institute of Applied Sciences, Bhimtal</span>
                <p className="edu-desc">Specialized in Computer Science Engineering. Core focus on database systems, data structures, algorithms, and modular frontend architectures.</p>
                <div className="edu-badge-wrapper">
                  <span className="edu-badge">Graduation</span>
                </div>
              </div>
            </div>
            
            <div className="timeline-center-node">
              <div className="node-dot"></div>
            </div>
            
            <div className="timeline-side-content photo-side">
              <div className="edu-timeline-photo-wrapper">
                <img src="/college_photo.jpg" alt="BIAS Campus" className="edu-timeline-photo" />
              </div>
            </div>
          </div>

          {/* Row 2 (Class XII) - Left photo, Right text */}
          <div className="timeline-row row-right">
            <div className="timeline-side-content photo-side">
              <div className="edu-timeline-photo-wrapper">
                <img src="/school_photo.jpg" alt="M.P. Hindu Inter College" className="edu-timeline-photo" />
              </div>
            </div>
            
            <div className="timeline-center-node">
              <div className="node-dot orange"></div>
            </div>
            
            <div className="timeline-side-content text-side">
              <div className="education-details-card">
                <span className="edu-time">2021 - 2022</span>
                <h3 className="edu-title">Senior Secondary School (Class XII)</h3>
                <span className="edu-org">M.P. Hindu Inter College</span>
                <p className="edu-desc">Science Stream (PCM). Built strong foundational mathematical logic and analytical problem-solving skills.</p>
                <div className="edu-badge-wrapper">
                  <span className="edu-badge orange">Class XII</span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 3 (Class X) - Left text, Right photo */}
          <div className="timeline-row row-left">
            <div className="timeline-side-content text-side">
              <div className="education-details-card">
                <span className="edu-time">2019 - 2020</span>
                <h3 className="edu-title">Secondary School (Class X)</h3>
                <span className="edu-org">M.P. Hindu Inter College</span>
                <p className="edu-desc">Completed secondary school education with a focus on mathematics, computer applications, and science.</p>
                <div className="edu-badge-wrapper">
                  <span className="edu-badge">Class X</span>
                </div>
              </div>
            </div>
            
            <div className="timeline-center-node">
              <div className="node-dot"></div>
            </div>
            
            <div className="timeline-side-content photo-side">
              <div className="edu-timeline-photo-wrapper">
                <img src="/school_photo.jpg" alt="M.P. Hindu Inter College" className="edu-timeline-photo" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interests Section */}
      <section id="interests" className="portfolio-section">
        <h2 className="sawad-section-title">My <span>Interests</span></h2>
        <div className="sawad-interests-grid">
          <div className="interest-card">
            <div className="interest-icon">
              {/* Cricket Ball custom icon */}
              <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M6 12a6 6 0 0 1 12 0"></path>
                <path d="M12 6a6 6 0 0 1 0 12"></path>
              </svg>
            </div>
            <h3 className="interest-title">Watching Cricket</h3>
            <p className="interest-desc">Enthusiastically following matches, analyzing team statistics, and supporting team India during major tournaments.</p>
          </div>

          <div className="interest-card">
            <div className="interest-icon" style={{ color: 'var(--accent-orange)' }}>
              {/* Music Note custom icon */}
              <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none">
                <path d="M9 18V5l12-2v13"></path>
                <circle cx="6" cy="18" r="3"></circle>
                <circle cx="18" cy="16" r="3"></circle>
              </svg>
            </div>
            <h3 className="interest-title">Listening to Music</h3>
            <p className="interest-desc">Tuning into diverse genres and artist playlists to relax, focus, and find creative coding inspiration.</p>
          </div>

          <div className="interest-card">
            <div className="interest-icon">
              {/* Camera custom icon */}
              <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                <circle cx="12" cy="13" r="4"></circle>
              </svg>
            </div>
            <h3 className="interest-title">Nature Photography</h3>
            <p className="interest-desc">Exploring outdoor trails, chasing natural lighting, and capturing aesthetic visual moments of landscapes and surroundings through the lens.</p>
          </div>

          <div className="interest-card">
            <div className="interest-icon" style={{ color: 'var(--accent-orange)' }}>
              {/* Sports Trophy custom icon */}
              <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                <path d="M4 22h16"></path>
                <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34"></path>
                <path d="M12 2a4 4 0 0 0-4 4v7a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4z"></path>
              </svg>
            </div>
            <h3 className="interest-title">Playing Sports</h3>
            <p className="interest-desc">Playing outdoor games to build team spirit, stay active, maintain peak fitness, and enjoy friendly competition.</p>
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="portfolio-section">
        <h2 className="sawad-section-title"><span>Resume</span></h2>
        <ResumeBox2D isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </section>

      {/* Contact Section */}
      <section id="contact" className="portfolio-section" style={{ minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', width: '100%' }}>
          <h2 className="sawad-section-title" style={{ textAlign: 'center', marginBottom: '1.25rem' }}>Let's Build <span>Together</span></h2>
          <p style={{ color: 'var(--text-gray)', maxWidth: '480px', margin: '0 auto 2.2rem', fontSize: '0.88rem', lineHeight: '1.6' }}>
            I am currently looking for frontend developer internships or junior developer positions. Drop me a line!
          </p>
          
          <div className="contact-links-2d">
            <a href="https://github.com/papnai-09" target="_blank" rel="noreferrer" className="contact-link-btn">
              {/* Custom Inline SVG for GitHub */}
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              GitHub
            </a>
            
            <a href="https://www.linkedin.com/in/gaurav-papnai-66027825b/" target="_blank" rel="noreferrer" className="contact-link-btn">
              {/* Custom Inline SVG for LinkedIn */}
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
              LinkedIn
            </a>
            
            <a href="mailto:gauravpapnai2005@gmail.com" className="contact-link-btn">
              {/* Custom Inline SVG for Mail */}
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              Email
            </a>
          </div>
        </div>
      </section>

      {/* Detailed Resume Modal Popup */}
      <div 
        className={`modal-overlay ${isModalOpen ? 'open' : ''}`}
        onClick={(e) => {
          if (e.target.classList.contains('modal-overlay')) {
            setIsModalOpen(false);
          }
        }}
      >
        <div className="resume-modal">
          <button className="close-btn" onClick={() => setIsModalOpen(false)} aria-label="Close Resume Modal">
            {/* Custom Inline SVG for X Close */}
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <div className="resume-header">
            <div className="resume-name">Gaurav Papnai</div>
            <div className="resume-title">Frontend Developer</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-gray)', marginTop: '0.4rem', fontFamily: 'var(--font-sans)', userSelect: 'text' }}>
              Gauravpapnai2005@gmail.com | +91 8791132616 | Ghaziabad, Uttar Pradesh
            </div>
          </div>
          
          <div className="resume-scrollable-content" style={{ userSelect: 'text' }}>
            
            <div className="resume-section">
              <h3 className="resume-section-title">Summary</h3>
              <p style={{ fontSize: '0.82rem', lineHeight: '1.6', color: 'var(--text-gray)' }}>
                Frontend Developer with hands-on experience building responsive web applications through academic and personal projects using React.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, and Bootstrap. Skilled in developing reusable UI components, integrating REST APIs, implementing responsive designs, and optimizing web performance. Passionate about building clean, user-centric, and scalable web applications.
              </p>
            </div>

            <div className="resume-section">
              <h3 className="resume-section-title">Key Skills</h3>
              <div style={{ fontSize: '0.82rem', lineHeight: '1.6', color: 'var(--text-gray)' }}>
                <strong>Languages:</strong> JavaScript (ES6+), HTML5, CSS3, TypeScript<br />
                <strong>Frameworks & Libraries:</strong> React.js, Next.js<br />
                <strong>Styling:</strong> Tailwind CSS, Bootstrap<br />
                <strong>Tools:</strong> Git, GitHub, VS Code, Vite, Figma<br />
                <strong>Concepts:</strong> Responsive Web Design, REST API Integration, Component-Based Architecture, State Management (Zustand), Performance Optimization
              </div>
            </div>

            <div className="resume-section">
              <h3 className="resume-section-title">Projects</h3>
              
              <div className="resume-item">
                <div className="resume-item-header">
                  <span>CineStream — Movie Discovery Platform</span>
                  <span style={{ color: 'var(--accent)' }}>Next.js / React.js</span>
                </div>
                <div className="resume-item-sub">
                  <span>Tech Stack: Next.js, React.js, JavaScript (ES6+), Tailwind CSS, TMDB API</span>
                </div>
                <ul className="resume-desc-list">
                  <li>Developed a responsive movie discovery platform using Next.js and React.js.</li>
                  <li>Integrated TMDB REST API for real-time movie search and detailed information.</li>
                  <li>Built reusable UI components and optimized web performance across devices.</li>
                </ul>
              </div>

              <div className="resume-item" style={{ marginTop: '1rem' }}>
                <div className="resume-item-header">
                  <span>TaskFlow — Kanban Task Management Board</span>
                  <span style={{ color: 'var(--accent)' }}>React.js / Zustand</span>
                </div>
                <div className="resume-item-sub">
                  <span>Tech Stack: React.js, JavaScript (ES6+), Tailwind CSS, Zustand</span>
                </div>
                <ul className="resume-desc-list">
                  <li>Developed a Kanban-style task management application using React.js.</li>
                  <li>Implemented CRUD operations, drag-and-drop, and state management with Zustand.</li>
                  <li>Designed a responsive UI using reusable components for an improved user experience.</li>
                </ul>
              </div>

              <div className="resume-item" style={{ marginTop: '1rem' }}>
                <div className="resume-item-header">
                  <span>Health Companion — Healthcare Management Interface</span>
                  <span style={{ color: 'var(--accent)' }}>React.js</span>
                </div>
                <div className="resume-item-sub">
                  <span>Tech Stack: React.js, JavaScript (ES6+), Tailwind CSS</span>
                </div>
                <ul className="resume-desc-list">
                  <li>Developed the frontend interface for a team-based healthcare management project.</li>
                  <li>Built responsive UI components and integrated REST APIs for dynamic data.</li>
                  <li>Collaborated using Git/GitHub to deliver a consistent and user-friendly experience.</li>
                </ul>
              </div>

              <div className="resume-item" style={{ marginTop: '1rem' }}>
                <div className="resume-item-header">
                  <span>ShopEase — E-Commerce Frontend</span>
                  <span style={{ color: 'var(--accent)' }}>React.js</span>
                </div>
                <div className="resume-item-sub">
                  <span>Tech Stack: React.js, JavaScript (ES6+), Tailwind CSS</span>
                </div>
                <ul className="resume-desc-list">
                  <li>Developed a responsive e-commerce frontend using React.js.</li>
                  <li>Implemented product search, filtering, and shopping cart functionality.</li>
                  <li>Integrated REST APIs and optimized application performance with reusable components.</li>
                </ul>
              </div>
            </div>

            <div className="resume-section">
              <h3 className="resume-section-title">Education</h3>
              <div className="resume-item">
                <div className="resume-item-header">
                  <span>Bachelor of Technology (B.Tech)</span>
                  <span>2022 - 2026</span>
                </div>
                <div className="resume-item-sub">
                  <span>Birla Institute of Applied Sciences, Bhimtal</span>
                  <span>Computer Science Engineering</span>
                </div>
              </div>
            </div>

            <div className="resume-section">
              <h3 className="resume-section-title">Certification</h3>
              <div className="resume-item">
                <div className="resume-item-header">
                  <span>Diploma in Computer Applications and Programming (DCAP)</span>
                </div>
              </div>
            </div>

          </div>

          <div className="resume-footer">
            <a 
              href="/resume/Gaurav-Papnai-Resume.pdf" 
              download="Gaurav-Papnai-Resume.pdf"
              className="btn-primary"
            >
              {/* Custom Inline SVG for Download */}
              <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download CV
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
