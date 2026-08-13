import React, { useEffect, useState } from 'react';

const sections = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Services', id: 'services' },
  { label: 'Projects', id: 'projects' },
  { label: 'Education', id: 'education' },
  { label: 'Interests', id: 'interests' },
  { label: 'Resume', id: 'resume' },
  { label: 'Contact', id: 'contact' }
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      let currentSection = 'about';
      const scrollPos = window.scrollY + 250;

      for (let sec of sections) {
        const element = document.getElementById(sec.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            currentSection = sec.id;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Desktop Floating Pill Navigation */}
      <nav className={`desktop-nav-container ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-logo" onClick={() => handleNavClick('about')}>
          <span className="logo-bracket">&lt;</span>
          <span className="logo-name">GP</span>
          <span className="logo-bracket">/&gt;</span>
        </div>

        <div className="nav-links-wrapper">
          {sections.map((sec) => (
            <button
              key={sec.label}
              onClick={() => handleNavClick(sec.id)}
              className={`nav-link ${activeSection === sec.id ? 'active' : ''}`}
            >
              {sec.label}
            </button>
          ))}
        </div>

        <a 
          href="#contact" 
          onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}
          className="nav-cta-btn"
        >
          Let's Talk
        </a>
      </nav>

      {/* Mobile Top Header + Drawer */}
      <div className={`mobile-nav-header ${scrolled ? 'header-scrolled' : ''}`}>
        <div className="nav-logo" onClick={() => handleNavClick('about')}>
          <span className="logo-bracket">&lt;</span>
          <span className="logo-name">Gaurav.P</span>
          <span className="logo-bracket">/&gt;</span>
        </div>

        <button 
          className={`mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span className="hamburger-line line-1"></span>
          <span className="hamburger-line line-2"></span>
          <span className="hamburger-line line-3"></span>
        </button>
      </div>

      {/* Mobile Menu Backdrop & Drawer */}
      <div 
        className={`mobile-drawer-backdrop ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-links">
          {sections.map((sec, idx) => (
            <button
              key={sec.label}
              onClick={() => handleNavClick(sec.id)}
              className={`mobile-nav-link ${activeSection === sec.id ? 'active' : ''}`}
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <span className="mobile-nav-num">0{idx + 1}.</span>
              <span className="mobile-nav-label">{sec.label}</span>
              {activeSection === sec.id && <span className="mobile-active-dot" />}
            </button>
          ))}
        </div>

        <div className="mobile-drawer-footer">
          <a 
            href="#contact" 
            onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}
            className="mobile-drawer-cta"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </>
  );
}
