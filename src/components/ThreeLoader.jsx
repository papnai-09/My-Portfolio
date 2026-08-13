import React, { useState, useEffect, useRef } from 'react';

// Side animated lines — pure CSS canvas
function SideLines({ fadeOut }) {
  return (
    <>
      {/* Left side vertical lines */}
      <div className={`loader-side loader-side-left ${fadeOut ? 'fade-out-side' : ''}`}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="side-line" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
        <div className="side-corner side-corner-tl" />
        <div className="side-corner side-corner-bl" />
      </div>
      {/* Right side vertical lines */}
      <div className={`loader-side loader-side-right ${fadeOut ? 'fade-out-side' : ''}`}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="side-line" style={{ animationDelay: `${i * 0.15 + 0.08}s` }} />
        ))}
        <div className="side-corner side-corner-tr" />
        <div className="side-corner side-corner-br" />
      </div>
    </>
  );
}

export default function ThreeLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
              onComplete();
            }, 600);
          }, 300);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 10) + 7;
        return next > 100 ? 100 : next;
      });
    }, 90); // faster interval

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`sawad-loader-overlay ${fadeOut ? 'fade-out' : ''}`}>

      <SideLines fadeOut={fadeOut} />

      <div className="loader-content-wrapper">
        <div className="loader-title">Gaurav Papnai</div>
        <div className="loader-subtitle">Creative Frontend Developer</div>

        <div className="loader-progress-container">
          <div className="loader-progress-bar" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="loader-percentage">
          {progress}%
        </div>
      </div>
    </div>
  );
}
