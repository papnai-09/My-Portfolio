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

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = 'about';
      const scrollPos = window.scrollY + 200; // offset for triggers

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
    // Initial check on mount
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="nav-container">
      {sections.map((sec) => (
        <a
          key={sec.label}
          onClick={() => handleNavClick(sec.id)}
          className={`nav-link ${activeSection === sec.id ? 'active' : ''}`}
        >
          {sec.label}
        </a>
      ))}
    </div>
  );
}
