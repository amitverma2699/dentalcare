import React, { useState } from 'react';
import BeforeAfter from '../components/BeforeAfter';
import { Sparkles, Star, Calendar } from 'lucide-react';

export default function SmileGallery() {
  const [activeTab, setActiveTab] = useState('all');

  const galleryCases = [
    {
      id: 1,
      category: 'implants',
      title: 'Full Arch Implant Restoration',
      procedure: 'Implant-Supported Bridge',
      duration: '4 Months',
      beforeImg: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="280" viewBox="0 0 400 280"><rect width="100%" height="100%" fill="%23ECC94B"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="bold" fill="%23744210">BEFORE: Missing Teeth %26 Decay</text></svg>',
      afterImg: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="280" viewBox="0 0 400 280"><rect width="100%" height="100%" fill="%234FD1C5"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="bold" fill="%2300443E">AFTER: Complete Premium Smile</text></svg>'
    },
    {
      id: 2,
      category: 'cosmetic',
      title: 'Cosmetic Veneers Makeover',
      procedure: '6 Porcelain Veneers',
      duration: '2 Visits',
      beforeImg: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="280" viewBox="0 0 400 280"><rect width="100%" height="100%" fill="%23E2E8F0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="bold" fill="%234A5568">BEFORE: Stained %26 Chipped</text></svg>',
      afterImg: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="280" viewBox="0 0 400 280"><rect width="100%" height="100%" fill="%23F0FDFA"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="bold" fill="%230D9488">AFTER: Brilliant Whitened Veneers</text></svg>'
    },
    {
      id: 3,
      category: 'ortho',
      title: 'Adult Crowding Correction',
      procedure: 'Invisalign® Clear Aligners',
      duration: '14 Months',
      beforeImg: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="280" viewBox="0 0 400 280"><rect width="100%" height="100%" fill="%23CBD5E0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="bold" fill="%232D3748">BEFORE: Severely Crowded Bite</text></svg>',
      afterImg: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="280" viewBox="0 0 400 280"><rect width="100%" height="100%" fill="%23EBF8FF"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="bold" fill="%232B6CB0">AFTER: Perfectly Aligned Smile</text></svg>'
    },
    {
      id: 4,
      category: 'restorative',
      title: 'Damaged Molar Crown',
      procedure: 'Porcelain Dental Crown',
      duration: '1 Visit (Same-Day)',
      beforeImg: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="280" viewBox="0 0 400 280"><rect width="100%" height="100%" fill="%23F6AD55"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="bold" fill="%237B341E">BEFORE: Fractured Molar Tooth</text></svg>',
      afterImg: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="280" viewBox="0 0 400 280"><rect width="100%" height="100%" fill="%23EDF2F7"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="bold" fill="%231A202C">AFTER: Natural Matching Crown</text></svg>'
    }
  ];

  const filteredCases = activeTab === 'all' 
    ? galleryCases 
    : galleryCases.filter(item => item.category === activeTab);

  return (
    <div className="smile-gallery-page fade-in">
      {/* Hero */}
      <section className="gallery-hero text-center">
        <div className="container">
          <span className="badge badge-accent">Before & After Results</span>
          <h1>Smile Gallery</h1>
          <p className="hero-p" style={{ maxWidth: '600px', margin: '16px auto 0' }}>
            Interact with our slider cards to see verified case results completed by our specialists. We prioritize natural shapes, shade matches, and bite alignments.
          </p>
        </div>
      </section>

      {/* Tabs Menu */}
      <section className="section gallery-tabs-sec bg-cream" style={{ padding: '30px 0' }}>
        <div className="container flex-center">
          <div className="tabs-container">
            {[
              { id: 'all', label: 'All Cases' },
              { id: 'implants', label: 'Dental Implants' },
              { id: 'cosmetic', label: 'Cosmetic Veneers' },
              { id: 'ortho', label: 'Invisalign® & Braces' },
              { id: 'restorative', label: 'Crowns & Bridges' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                className={`gallery-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Cases List */}
      <section className="section gallery-grid-sec">
        <div className="container">
          <div className="grid-2 gallery-grid">
            {filteredCases.map(item => (
              <BeforeAfter
                key={item.id}
                beforeImage={item.beforeImg}
                afterImage={item.afterImg}
                title={item.title}
                procedure={item.procedure}
                duration={item.duration}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="section bg-cream text-center">
        <div className="container" style={{ maxWidth: '680px' }}>
          <Sparkles className="icon-teal" style={{ marginBottom: '12px' }} />
          <h3>Real Patients, Real Results</h3>
          <p style={{ marginTop: '12px', fontSize: '0.88rem', color: 'var(--text-secondary)', lineSpacing: '1.5' }}>
            *Disclaimer: The interactive images above represent illustrative dental clinical restorations. Outcomes differ based on existing jaw bone thickness, hygiene routines, and overall oral structure.
          </p>
        </div>
      </section>

      <style>{`
        .gallery-hero {
          padding: 80px 0 60px;
          background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
        }
        .tabs-container {
          display: flex;
          background-color: var(--bg-secondary);
          padding: 6px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-color);
          overflow-x: auto;
          gap: 4px;
        }
        .gallery-tab-btn {
          border: none;
          background: none;
          padding: 10px 20px;
          border-radius: var(--radius-full);
          font-weight: 500;
          font-size: 0.92rem;
          cursor: pointer;
          transition: var(--transition-fast);
          white-space: nowrap;
          color: var(--text-secondary);
        }
        .gallery-tab-btn:hover {
          color: var(--color-teal);
        }
        .gallery-tab-btn.active {
          background-color: var(--color-teal);
          color: var(--text-light);
        }
        .gallery-grid {
          gap: 40px;
        }
      `}</style>
    </div>
  );
}
