import React, { useState, useEffect } from 'react';

export default function ResumeBox2D({ isModalOpen, setIsModalOpen }) {
  const [boxOpened, setBoxOpened] = useState(false);

  // Sync state with modal status
  useEffect(() => {
    if (isModalOpen) {
      setBoxOpened(true);
    } else {
      setBoxOpened(false);
    }
  }, [isModalOpen]);

  const handleBoxTrigger = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="resume-box-wrapper">
      <div 
        className={`resume-box-container ${boxOpened ? 'opened' : ''}`}
        onMouseEnter={() => setBoxOpened(true)}
        onMouseLeave={() => !isModalOpen && setBoxOpened(false)}
        onClick={handleBoxTrigger}
        role="button"
        tabIndex={0}
        aria-label="Open Interactive Resume"
      >
        {/* Lid of the box */}
        <div className="box-lid">
          <div className="lid-top"></div>
          <div className="lid-front"></div>
        </div>

        {/* Paper sliding out of chest */}
        <div className="box-paper">
          <div className="paper-preview-content">
            <div className="paper-header-row">
              <h4>Gaurav Papnai</h4>
              <span className="paper-badge">CV</span>
            </div>
            <span className="paper-line"></span>
            <span className="paper-line short"></span>
            <span className="paper-line"></span>
            <span className="paper-line short"></span>
          </div>
        </div>

        {/* Base body of the chest */}
        <div className="box-body">
          <div className="box-label">
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
            </svg>
            Interactive Resume
          </div>
        </div>
      </div>
      
      <div className="resume-actions-row">
        <button 
          onClick={handleBoxTrigger}
          className="btn-sawad-primary"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          View Full Interactive CV
        </button>

        <a 
          href="/resume/Gaurav-Papnai-Resume.pdf" 
          download="Gaurav-Papnai-Resume.pdf"
          className="btn-sawad-secondary"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Download PDF (Direct)
        </a>
      </div>
    </div>
  );
}
