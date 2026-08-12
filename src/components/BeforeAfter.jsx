import React, { useState, useRef, useEffect } from 'react';

export default function BeforeAfter({ beforeImage, afterImage, title, duration, procedure }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isSliding, setIsSliding] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e) => {
    if (!isSliding) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e) => {
    if (!isSliding) return;
    handleMove(e.clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsSliding(false);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <div className="before-after-card">
      <div 
        ref={containerRef}
        className="ba-container"
        onMouseDown={() => setIsSliding(true)}
        onTouchStart={() => setIsSliding(true)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* After Image (Background) */}
        <img 
          src={afterImage} 
          alt={`${procedure} - After`} 
          className="ba-image image-after" 
          draggable="false"
        />

        {/* Before Image (Foreground, Clipped) */}
        <div 
          className="ba-before-wrapper" 
          style={{ width: `${sliderPosition}%` }}
        >
          <img 
            src={beforeImage} 
            alt={`${procedure} - Before`} 
            className="ba-image image-before" 
            draggable="false"
            style={{ width: containerRef.current ? containerRef.current.offsetWidth : '100%' }}
          />
        </div>

        {/* Labels */}
        <span className="ba-label before-label">Before</span>
        <span className="ba-label after-label">After</span>

        {/* Slider Handle */}
        <div 
          className="ba-handle" 
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="ba-handle-line"></div>
          <div className="ba-handle-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 19-7-7 7-7" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
      <div className="ba-info">
        <h4>{title}</h4>
        <div className="ba-meta">
          <span className="ba-procedure">{procedure}</span>
          <span className="ba-duration">Treatment: {duration}</span>
        </div>
      </div>

      <style>{`
        .before-after-card {
          background-color: var(--bg-secondary);
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-sm);
        }
        .ba-container {
          position: relative;
          width: 100%;
          height: 280px;
          overflow: hidden;
          cursor: ew-resize;
          user-select: none;
          background-color: #E2E8F0;
        }
        .ba-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
        }
        .ba-before-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          overflow: hidden;
        }
        .image-before {
          max-width: none;
          height: 100%;
        }
        .ba-label {
          position: absolute;
          bottom: 12px;
          background-color: rgba(30, 34, 41, 0.7);
          backdrop-filter: blur(4px);
          color: white;
          padding: 4px 10px;
          font-size: 0.75rem;
          font-weight: 600;
          border-radius: var(--radius-sm);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          pointer-events: none;
        }
        .before-label {
          left: 12px;
        }
        .after-label {
          right: 12px;
        }
        .ba-handle {
          position: absolute;
          top: 0;
          height: 100%;
          width: 20px;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }
        .ba-handle-line {
          width: 2px;
          height: 100%;
          background-color: white;
          box-shadow: 0 0 8px rgba(0,0,0,0.3);
        }
        .ba-handle-button {
          position: absolute;
          width: 36px;
          height: 36px;
          background-color: var(--color-teal);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 10px rgba(0,0,0,0.3);
          transform: rotate(90deg);
        }
        .ba-handle-button svg {
          width: 16px;
          height: 16px;
        }
        .ba-info {
          padding: 16px 20px;
        }
        .ba-info h4 {
          font-size: 1.05rem;
          margin-bottom: 4px;
        }
        .ba-meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .ba-procedure {
          font-weight: 500;
          color: var(--color-teal);
        }
      `}</style>
    </div>
  );
}
