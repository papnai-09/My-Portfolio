import React, { useState, useEffect, useRef, useCallback } from 'react';
import Navigation from './components/Navigation';
import SkillsClothesline2D from './components/SkillsClothesline2D';
import ProjectsSawad from './components/ProjectsSawad';
import ResumeBox2D from './components/ResumeBox2D';
import ThreeLoader from './components/ThreeLoader';

// Torch / Flashlight reveal component with both desktop mouse and mobile touch support
export const TorchPhoto = ({ src, alt }) => {
  const containerRef = useRef(null);
  const [pos, setPos] = useState({ x: -999, y: -999 });
  const [isOn, setIsOn] = useState(false);
  const [radius, setRadius] = useState(0);
  const rafRef = useRef(null);

  const updateCoordinates = useCallback((clientX, clientY) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => setPos({ x, y }));
  }, []);

  const handleMouseMove = (e) => {
    updateCoordinates(e.clientX, e.clientY);
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      updateCoordinates(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleStart = () => {
    setIsOn(true);
    setRadius(0);
    setTimeout(() => setRadius(140), 10);
  };

  const handleEnd = () => {
    setRadius(0);
    setTimeout(() => setIsOn(false), 350);
  };

  const maskStyle = isOn
    ? `radial-gradient(circle ${radius}px at ${pos.x}px ${pos.y}px, transparent 0%, transparent 60%, rgba(9, 10, 15, 0.98) 100%)`
    : 'rgba(9, 10, 15, 0.98)';

  return (
    <div
      ref={containerRef}
      className="torch-photo-wrapper"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleStart}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleEnd}
    >
      <img src={src} alt={alt} className="avatar-image-direct" />
      <div className="torch-overlay" style={{ WebkitMaskImage: maskStyle, maskImage: maskStyle }} />
      <div className="avatar-glow-ring" />
    </div>
  );
};

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Typewriter effect state & logic
  const words = ["Gaurav Papnai", "Frontend Developer", "React & Next.js Engineer"];
  const [typewriterText, setTypewriterText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    let timer;
    const i = loopNum % words.length;
    const fullWord = words[i];

    if (!isDeleting) {
      if (typewriterText !== fullWord) {
        timer = setTimeout(() => {
          setTypewriterText(fullWord.substring(0, typewriterText.length + 1));
        }, 90);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 1800);
      }
    } else {
      if (typewriterText !== "") {
        timer = setTimeout(() => {
          setTypewriterText(fullWord.substring(0, typewriterText.length - 1));
        }, 45);
      } else {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    }

    return () => clearTimeout(timer);
  }, [typewriterText, isDeleting, loopNum]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("gauravpapnai2005@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {isLoading && <ThreeLoader onComplete={() => setIsLoading(false)} />}
      
      <div className="app-container">
        
        {/* Navigation bar */}
        <Navigation />

        {/* Hero Section */}
        <section id="about" className="portfolio-section hero-section">
          <div className="sawad-hero">
            <div className="hero-left">
              <div className="hero-badge-glowing">
                <span className="badge-dot"></span>
                <span>Open to Frontend Roles & Internships — 2026</span>
              </div>
              
              <div className="hero-greeting">Hi, I'm</div>
              
              <h1 className="hero-title-sawad">
                <span className="typewriter-text">{typewriterText}</span>
                <span className="typewriter-cursor">|</span>
              </h1>
              
              <p className="hero-bio-sawad">
                Passionate Frontend Developer focused on creating performant, accessible, and responsive user interfaces. Specialized in React.js, Next.js, TypeScript, and modern component architecture with an eye for seamless UX.
              </p>
              
              <div className="hero-actions-sawad">
                <a href="#projects" className="btn-sawad-primary">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                  Explore Projects
                </a>
                
                <a href="#contact" className="btn-sawad-secondary">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                  Get In Touch
                </a>

                <a 
                  href="/resume/Gaurav-Papnai-Resume.pdf" 
                  download="Gaurav-Papnai-Resume.pdf" 
                  className="btn-sawad-ghost"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Resume
                </a>
              </div>

              {/* Quick stats banner */}
              <div className="hero-stats-row">
                <div className="hero-stat-item">
                  <span className="stat-number">4+</span>
                  <span className="stat-label">Web Apps Built</span>
                </div>
                <div className="stat-divider"></div>
                <div className="hero-stat-item">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Responsive Designs</span>
                </div>
                <div className="stat-divider"></div>
                <div className="hero-stat-item">
                  <span className="stat-number">B.Tech</span>
                  <span className="stat-label">CSE (2022-26)</span>
                </div>
              </div>
            </div>
            
            <div className="hero-right">
              <div className="avatar-frame">
                <TorchPhoto src="/avatar.png" alt="Gaurav Papnai" />
                <div className="avatar-caption">
                  <span className="caption-dot"></span>
                  Gaurav Papnai — Frontend Engineer
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="portfolio-section">
          <div className="section-header-wrap">
            <span className="section-eyebrow">Expertise</span>
            <h2 className="sawad-section-title">Technical <span>Toolkit</span></h2>
            <p className="section-description">
              A comprehensive breakdown of programming languages, libraries, workflows, and core web development competencies.
            </p>
          </div>
          <SkillsClothesline2D />
        </section>

        {/* Services Section */}
        <section id="services" className="portfolio-section">
          <div className="section-header-wrap">
            <span className="section-eyebrow">Offerings</span>
            <h2 className="sawad-section-title">What I <span>Deliver</span></h2>
            <p className="section-description">
              Specialized frontend engineering services tailored to modern web applications, startups, and responsive digital products.
            </p>
          </div>

          <div className="sawad-services-grid">
            <div className="sawad-service-card">
              <div className="service-icon">
                <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <h3 className="service-title">Single Page & Web Apps</h3>
              <p className="service-desc">
                Building lightning-fast, reactive client-side and server-rendered web applications utilizing React.js and Next.js with modular component architecture.
              </p>
              <div className="service-pills-wrap">
                <span className="service-pill">React.js</span>
                <span className="service-pill">Next.js</span>
                <span className="service-pill">SPA & SSR</span>
              </div>
            </div>

            <div className="sawad-service-card">
              <div className="service-icon" style={{ color: 'var(--accent-indigo)' }}>
                <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 18h.01"></path>
                  <path d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"></path>
                </svg>
              </div>
              <h3 className="service-title">Responsive UI/UX & Animations</h3>
              <p className="service-desc">
                Translating Figma mockups into pixel-perfect, responsive web layouts with Tailwind CSS, custom micro-animations, and mobile-first fluid design systems.
              </p>
              <div className="service-pills-wrap">
                <span className="service-pill indigo">Tailwind CSS</span>
                <span className="service-pill indigo">Micro-Interactions</span>
                <span className="service-pill indigo">Mobile-First</span>
              </div>
            </div>

            <div className="sawad-service-card">
              <div className="service-icon" style={{ color: 'var(--accent-emerald)' }}>
                <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <h3 className="service-title">API Integration & Performance</h3>
              <p className="service-desc">
                Connecting frontend applications with RESTful APIs, managing complex state with Zustand, and optimizing Lighthouse Core Web Vitals for maximum speed.
              </p>
              <div className="service-pills-wrap">
                <span className="service-pill emerald">REST APIs</span>
                <span className="service-pill emerald">Zustand State</span>
                <span className="service-pill emerald">SEO & Speed</span>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="portfolio-section">
          <div className="section-header-wrap">
            <span className="section-eyebrow">Portfolio</span>
            <h2 className="sawad-section-title">Featured <span>Projects</span></h2>
            <p className="section-description">
              Production-ready web applications demonstrating real-world API integrations, state management, and modern UI engineering.
            </p>
          </div>
          <ProjectsSawad />
        </section>

        {/* Education Section */}
        <section id="education" className="portfolio-section">
          <div className="section-header-wrap">
            <span className="section-eyebrow">Academic Journey</span>
            <h2 className="sawad-section-title">My <span>Education</span></h2>
            <p className="section-description">
              Academic foundation in Computer Science Engineering, algorithms, mathematics, and software design principles.
            </p>
          </div>
          
          <div className="sawad-education-timeline-centered">
            <div className="timeline-center-line"></div>

            {/* Row 1 (B.Tech) */}
            <div className="timeline-row row-left">
              <div className="timeline-side-content text-side">
                <div className="education-details-card">
                  <div className="edu-card-top">
                    <span className="edu-time">2022 - 2026</span>
                    <span className="edu-badge">Graduation</span>
                  </div>
                  <h3 className="edu-title">Bachelor of Technology (B.Tech)</h3>
                  <span className="edu-org">Birla Institute of Applied Sciences, Bhimtal</span>
                  <p className="edu-desc">Specialized in Computer Science Engineering. Core focus on database systems, data structures, algorithms, object-oriented programming, and modular frontend architectures.</p>
                </div>
              </div>
              
              <div className="timeline-center-node">
                <div className="node-dot"></div>
              </div>
              
              <div className="timeline-side-content photo-side">
                <div className="edu-timeline-photo-wrapper">
                  <img src="/college_photo.jpg" alt="BIAS Campus" className="edu-timeline-photo" />
                  <span className="photo-tag">Campus View</span>
                </div>
              </div>
            </div>

            {/* Row 2 (Class XII) */}
            <div className="timeline-row row-right">
              <div className="timeline-side-content photo-side">
                <div className="edu-timeline-photo-wrapper">
                  <img src="/school_photo.jpg" alt="M.P. Hindu Inter College" className="edu-timeline-photo" />
                  <span className="photo-tag">School Campus</span>
                </div>
              </div>
              
              <div className="timeline-center-node">
                <div className="node-dot indigo"></div>
              </div>
              
              <div className="timeline-side-content text-side">
                <div className="education-details-card">
                  <div className="edu-card-top">
                    <span className="edu-time">2021 - 2022</span>
                    <span className="edu-badge indigo">Class XII</span>
                  </div>
                  <h3 className="edu-title">Senior Secondary School (Class XII)</h3>
                  <span className="edu-org">M.P. Hindu Inter College</span>
                  <p className="edu-desc">Science Stream (Physics, Chemistry, Mathematics). Developed strong analytical thinking, mathematical logic, and competitive problem-solving skills.</p>
                </div>
              </div>
            </div>

            {/* Row 3 (Class X) */}
            <div className="timeline-row row-left">
              <div className="timeline-side-content text-side">
                <div className="education-details-card">
                  <div className="edu-card-top">
                    <span className="edu-time">2019 - 2020</span>
                    <span className="edu-badge">Class X</span>
                  </div>
                  <h3 className="edu-title">Secondary School (Class X)</h3>
                  <span className="edu-org">M.P. Hindu Inter College</span>
                  <p className="edu-desc">Completed high school secondary education with distinction in computer applications, mathematics, and natural science fundamentals.</p>
                </div>
              </div>
              
              <div className="timeline-center-node">
                <div className="node-dot emerald"></div>
              </div>
              
              <div className="timeline-side-content photo-side">
                <div className="edu-timeline-photo-wrapper">
                  <img src="/school_photo.jpg" alt="M.P. Hindu Inter College" className="edu-timeline-photo" />
                  <span className="photo-tag">Academics</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interests Section */}
        <section id="interests" className="portfolio-section">
          <div className="section-header-wrap">
            <span className="section-eyebrow">Personal</span>
            <h2 className="sawad-section-title">Beyond The <span>Code</span></h2>
            <p className="section-description">
              Activities, sports, and creative pursuits that keep me energized, balanced, and sharp.
            </p>
          </div>

          <div className="sawad-interests-grid">
            <div className="interest-card">
              <div className="interest-icon">
                <svg viewBox="0 0 24 24" width="26" height="26" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M6 12a6 6 0 0 1 12 0"></path>
                  <path d="M12 6a6 6 0 0 1 0 12"></path>
                </svg>
              </div>
              <h3 className="interest-title">Watching Cricket</h3>
              <p className="interest-desc">Following international series, analyzing game tactics, player statistics, and cheering for Team India in world championships.</p>
            </div>

            <div className="interest-card">
              <div className="interest-icon" style={{ color: 'var(--accent-indigo)' }}>
                <svg viewBox="0 0 24 24" width="26" height="26" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18V5l12-2v13"></path>
                  <circle cx="6" cy="18" r="3"></circle>
                  <circle cx="18" cy="16" r="3"></circle>
                </svg>
              </div>
              <h3 className="interest-title">Listening to Music</h3>
              <p className="interest-desc">Exploring ambient, indie, and lo-fi tracks that provide rhythm and deep focus while architecting complex frontend codebases.</p>
            </div>

            <div className="interest-card">
              <div className="interest-icon" style={{ color: 'var(--accent-emerald)' }}>
                <svg viewBox="0 0 24 24" width="26" height="26" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                  <circle cx="12" cy="13" r="4"></circle>
                </svg>
              </div>
              <h3 className="interest-title">Nature Photography</h3>
              <p className="interest-desc">Exploring scenic mountain trails, chasing golden hour lighting, and framing picturesque landscape compositions.</p>
            </div>

            <div className="interest-card">
              <div className="interest-icon" style={{ color: 'var(--accent-pink)' }}>
                <svg viewBox="0 0 24 24" width="26" height="26" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                  <path d="M4 22h16"></path>
                  <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34"></path>
                  <path d="M12 2a4 4 0 0 0-4 4v7a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4z"></path>
                </svg>
              </div>
              <h3 className="interest-title">Playing Sports</h3>
              <p className="interest-desc">Engaging in team sports and outdoor fitness to foster collaboration, maintain physical agility, and cultivate a competitive edge.</p>
            </div>
          </div>
        </section>

        {/* Resume Section */}
        <section id="resume" className="portfolio-section">
          <div className="section-header-wrap">
            <span className="section-eyebrow">Credentials</span>
            <h2 className="sawad-section-title">Interactive <span>Resume</span></h2>
            <p className="section-description">
              Preview my professional experience, education, and technical certifications directly or download a PDF copy.
            </p>
          </div>
          <ResumeBox2D isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </section>

        {/* Contact Section */}
        <section id="contact" className="portfolio-section contact-section">
          <div className="contact-card-container">
            <div className="contact-glow-orb"></div>
            
            <div className="contact-content-center">
              <div className="hero-badge-glowing" style={{ marginBottom: '1rem' }}>
                <span className="badge-dot"></span>
                <span>Let's Connect</span>
              </div>
              
              <h2 className="sawad-section-title" style={{ textAlign: 'center', marginBottom: '1.2rem' }}>
                Let's Build Something <span>Extraordinary</span>
              </h2>
              
              <p className="contact-subtext">
                I am actively seeking frontend developer roles, internships, and collaborative opportunities. Whether you have a project idea, job opportunity, or just want to connect, feel free to reach out!
              </p>
              
              {/* Interactive Email Bar with Copy Button */}
              <div className="email-copy-container">
                <span className="email-address-text">gauravpapnai2005@gmail.com</span>
                <button 
                  onClick={handleCopyEmail} 
                  className="btn-copy-email"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <>
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-emerald)' }}>
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                      Copy
                    </>
                  )}
                </button>
              </div>

              {/* Social Channels Grid */}
              <div className="contact-links-2d">
                <a href="https://github.com/papnai-09" target="_blank" rel="noreferrer" className="contact-link-btn">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  <span>GitHub</span>
                </a>
                
                <a href="https://www.linkedin.com/in/gaurav-papnai-66027825b/" target="_blank" rel="noreferrer" className="contact-link-btn linkedin">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  <span>LinkedIn</span>
                </a>
                
                <a href="mailto:gauravpapnai2005@gmail.com" className="contact-link-btn mail">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <span>Send Email</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Modern Sleek Footer */}
        <footer className="portfolio-footer">
          <div className="footer-content">
            <div className="footer-brand" onClick={scrollToTop}>
              <span className="logo-bracket">&lt;</span>
              <span className="logo-name">Gaurav Papnai</span>
              <span className="logo-bracket">/&gt;</span>
            </div>

            <div className="footer-copy">
              © {new Date().getFullYear()} Gaurav Papnai. Built with React & Vite.
            </div>

            <button onClick={scrollToTop} className="footer-top-btn" title="Back to top" aria-label="Back to top">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
              <span>Back to Top</span>
            </button>
          </div>
        </footer>

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
            <button 
              className="close-btn" 
              onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <div className="resume-header">
              <div className="resume-name">Gaurav Papnai</div>
              <div className="resume-title">Frontend Developer</div>
              <div className="resume-contact-meta">
                <span>📧 Gauravpapnai2005@gmail.com</span>
                <span>📱 +91 8791132616</span>
                <span>📍 Ghaziabad, Uttar Pradesh</span>
              </div>
            </div>
            
            <div className="resume-scrollable-content">
              
              <div className="resume-section">
                <h3 className="resume-section-title">Summary</h3>
                <p className="resume-text">
                  Frontend Developer with hands-on experience building modern, responsive, and accessible web applications using React.js, Next.js, JavaScript (ES6+), HTML5, CSS3, and Tailwind CSS. Skilled in modular UI component architecture, REST API integration, state management (Zustand), and Lighthouse performance optimization.
                </p>
              </div>

              <div className="resume-section">
                <h3 className="resume-section-title">Technical Expertise</h3>
                <div className="resume-skills-block">
                  <div className="skill-line"><strong>Languages:</strong> JavaScript (ES6+), TypeScript, HTML5, CSS3</div>
                  <div className="skill-line"><strong>Frameworks:</strong> React.js, Next.js (App Router, SSR, SSG)</div>
                  <div className="skill-line"><strong>Styling:</strong> Tailwind CSS, CSS Grid, Flexbox, Responsive Design</div>
                  <div className="skill-line"><strong>State & Tools:</strong> Zustand, Context API, Git, GitHub, Vite, VS Code, Figma</div>
                  <div className="skill-line"><strong>Core Concepts:</strong> REST APIs, Performance Optimization, Clean Code</div>
                </div>
              </div>

              <div className="resume-section">
                <h3 className="resume-section-title">Key Projects</h3>
                
                <div className="resume-item">
                  <div className="resume-item-header">
                    <span className="project-heading">CineStream — Movie Discovery Platform</span>
                    <span className="project-badge">Next.js / React</span>
                  </div>
                  <div className="resume-item-sub">
                    <span>Next.js, React.js, Tailwind CSS, TMDB REST API</span>
                  </div>
                  <ul className="resume-desc-list">
                    <li>Engineered a movie discovery platform utilizing Next.js, React, and TMDB REST API.</li>
                    <li>Implemented real-time live search, genre filters, dynamic trailers, and watchlist management.</li>
                    <li>Optimized asset loading and layout shifts for mobile, tablet, and desktop viewports.</li>
                  </ul>
                </div>

                <div className="resume-item">
                  <div className="resume-item-header">
                    <span className="project-heading">TaskFlow — Kanban Task Board</span>
                    <span className="project-badge">React / Zustand</span>
                  </div>
                  <div className="resume-item-sub">
                    <span>React.js, JavaScript, Tailwind CSS, Zustand</span>
                  </div>
                  <ul className="resume-desc-list">
                    <li>Developed an interactive Kanban task board with custom drag-and-drop column workflows.</li>
                    <li>Integrated real-time task CRUD operations, priority tags, and Zustand global state persistence.</li>
                    <li>Designed clean, responsive interfaces with reusable UI component patterns.</li>
                  </ul>
                </div>

                <div className="resume-item">
                  <div className="resume-item-header">
                    <span className="project-heading">Health Companion — Healthcare Interface</span>
                    <span className="project-badge">React.js</span>
                  </div>
                  <div className="resume-item-sub">
                    <span>React.js, Tailwind CSS, REST APIs</span>
                  </div>
                  <ul className="resume-desc-list">
                    <li>Built the frontend dashboard for health vitals tracking and doctor appointment booking.</li>
                    <li>Integrated REST APIs for patient records and dynamic data visualization charts.</li>
                    <li>Collaborated through Git/GitHub for structured version control and PR reviews.</li>
                  </ul>
                </div>

                <div className="resume-item">
                  <div className="resume-item-header">
                    <span className="project-heading">ShopEase — E-Commerce Storefront</span>
                    <span className="project-badge">React.js</span>
                  </div>
                  <div className="resume-item-sub">
                    <span>React.js, Tailwind CSS, LocalStorage</span>
                  </div>
                  <ul className="resume-desc-list">
                    <li>Developed an interactive e-commerce web storefront with live search and price filters.</li>
                    <li>Constructed a sliding shopping cart drawer with checkout total calculations.</li>
                  </ul>
                </div>
              </div>

              <div className="resume-section">
                <h3 className="resume-section-title">Education</h3>
                <div className="resume-item">
                  <div className="resume-item-header">
                    <span className="project-heading">Bachelor of Technology (B.Tech) - Computer Science</span>
                    <span className="project-badge">2022 - 2026</span>
                  </div>
                  <div className="resume-item-sub">
                    <span>Birla Institute of Applied Sciences, Bhimtal</span>
                  </div>
                </div>
              </div>

              <div className="resume-section">
                <h3 className="resume-section-title">Certifications</h3>
                <div className="resume-item">
                  <div className="resume-item-header">
                    <span className="project-heading">Diploma in Computer Applications and Programming (DCAP)</span>
                  </div>
                </div>
              </div>

            </div>

            <div className="resume-modal-footer">
              <a 
                href="/resume/Gaurav-Papnai-Resume.pdf" 
                download="Gaurav-Papnai-Resume.pdf"
                className="btn-sawad-primary"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download PDF Resume
              </a>

              <button onClick={() => setIsModalOpen(false)} className="btn-sawad-secondary">
                Close Preview
              </button>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
