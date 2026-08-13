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

  const handleBoxMouseEnter = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="resume-box-wrapper">
      <div 
        className={`resume-box-container ${boxOpened ? 'opened' : ''}`}
        onMouseEnter={handleBoxMouseEnter}
      >
        {/* Lid of the box */}
        <div className="box-lid">
          <div className="lid-top"></div>
          <div className="lid-front"></div>
        </div>

        {/* Paper sliding out of chest */}
        <div className="box-paper">
          <div className="paper-preview-content">
            <h4>Gaurav Papnai</h4>
            <span className="paper-line"></span>
            <span className="paper-line short"></span>
            <span className="paper-line"></span>
          </div>
        </div>

        {/* Base body of the chest */}
        <div className="box-body">
          <div className="box-label">
            My Resume
          </div>
        </div>
      </div>
      
      {!boxOpened && (
        <div className="box-instruction">
          Hover over the box to instantly open resume
        </div>
      )}
    </div>
  );
}
