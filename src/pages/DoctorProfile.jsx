import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, Award, Star, Mail, GraduationCap, ClipboardList, Smile, Phone } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function DoctorProfile() {
  const { doctorSlug } = useParams();
  const { teamDoctors } = useAppContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [doctorSlug]);

  const rawDoc = teamDoctors.find(d => d.slug === doctorSlug);
  const doc = rawDoc ? { ...rawDoc, title: rawDoc.role } : null;

  if (!doc) {
    return (
      <div className="container text-center" style={{ padding: '100px 0' }}>
        <h2>Provider Profile Not Found</h2>
        <p style={{ margin: '16px 0 32px' }}>We couldn't locate the dental specialist profile you requested.</p>
        <Link to="/team" className="btn btn-primary">Meet Our Team</Link>
      </div>
    );
  }

  return (
    <div className="doctor-profile-page fade-in">
      {/* Hero */}
      <section className="doc-profile-hero bg-cream">
        <div className="container doc-profile-grid">
          <div className="doc-hero-avatar-mock">
            <span>{doc.name.substring(4, 5)}</span>
          </div>
          
          <div className="doc-hero-content">
            <span className="badge badge-accent">{doc.specialty}</span>
            <h1>{doc.name}</h1>
            <p className="doc-title-desc">{doc.title}</p>
            <p className="doc-school-bullet">
              <GraduationCap size={16} className="inline-icon" /> {doc.education[0]}
            </p>
            
            <div className="doc-hero-ctas">
              <Link to="/appointment" className="btn btn-primary">
                Book Appointment with {doc.name.split(',')[0]}
              </Link>
              <a href="tel:8185550199" className="btn btn-outline">
                <Phone size={16} /> Call Office
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy & Anxiety */}
      <section className="section philosophy-anxiety-sec">
        <div className="container grid-2">
          {/* Care Philosophy */}
          <div className="card phil-card-detailed">
            <span className="badge badge-accent">My Philosophy</span>
            <h3>Philosophy of Care</h3>
            <p className="philosophy-text">{doc.philosophy}</p>
          </div>

          {/* Dental Anxiety Message */}
          <div className="card anxiety-card-detailed">
            <span className="badge badge-emergency">Comfort First</span>
            <h3>A Message to Nervous Patients</h3>
            <div className="anxiety-icon-msg">
              <Smile size={24} className="anxiety-icon" />
              <p className="anxiety-text">{doc.anxietyMsg}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Focus & Details */}
      <section className="section bg-cream">
        <div className="container grid-2">
          {/* Clinical Focus List */}
          <div className="card focus-card-detailed">
            <div className="card-header-icon">
              <ClipboardList size={24} className="icon-teal" />
              <h3>Clinical Focus & Expertise</h3>
            </div>
            <p style={{ marginBottom: '20px', color: 'var(--text-secondary)' }}>Specialized clinical procedures and cosmetic treatments offered at our Van Nuys office:</p>
            <ul className="profile-focus-list">
              {doc.clinicalFocus.map((focus, idx) => (
                <li key={idx}>
                  <CheckCircle2 size={18} className="icon-teal" />
                  <span>{focus}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Education & Memberships */}
          <div className="card credentials-card-detailed">
            <div className="card-header-icon">
              <Award size={24} className="icon-teal" />
              <h3>Credentials & Associations</h3>
            </div>
            
            <div className="cred-section">
              <h4>Education & Training</h4>
              <ul className="cred-list">
                {doc.education.map((edu, idx) => (
                  <li key={idx}><span>•</span> {edu}</li>
                ))}
              </ul>
            </div>

            <div className="cred-section" style={{ marginTop: '20px' }}>
              <h4>Professional Affiliations</h4>
              <ul className="cred-list">
                {doc.memberships.map((member, idx) => (
                  <li key={idx}><span>•</span> {member}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="section final-cta-section text-center">
        <div className="container">
          <h2>Ready to Schedule a Consultation?</h2>
          <p>Book an appointment with {doc.name.split(',')[0]} at our Van Nuys office. We look forward to meeting you.</p>
          <div className="cta-buttons flex-center">
            <Link to="/appointment" className="btn btn-primary">Request Appointment</Link>
            <Link to="/team" className="btn btn-secondary">Meet Other Specialists</Link>
          </div>
        </div>
      </section>

      <style>{`
        .doc-profile-hero {
          padding: 80px 0;
          border-bottom: 1px solid var(--border-color);
        }
        .doc-profile-grid {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 48px;
          align-items: center;
        }
        .doc-hero-avatar-mock {
          width: 240px;
          height: 240px;
          border-radius: var(--radius-lg);
          background-color: var(--bg-secondary);
          color: var(--color-teal);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 6rem;
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          box-shadow: var(--shadow-md);
          border: 1px solid var(--border-color);
        }
        .doc-hero-content {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .doc-title-desc {
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .doc-school-bullet {
          font-size: 0.95rem;
          color: var(--text-primary);
        }
        .inline-icon {
          display: inline;
          vertical-align: middle;
          margin-right: 6px;
        }
        .doc-hero-ctas {
          display: flex;
          gap: 16px;
          margin-top: 16px;
          flex-wrap: wrap;
        }

        /* Detailed cards */
        .card-header-icon {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 12px;
        }
        .icon-teal {
          color: var(--color-teal);
        }
        .philosophy-text, .anxiety-text {
          font-size: 1.05rem;
          line-height: 1.6;
          margin-top: 16px;
        }
        .anxiety-icon-msg {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }
        .anxiety-icon {
          color: var(--color-emergency);
          margin-top: 18px;
          flex-shrink: 0;
        }
        .profile-focus-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .profile-focus-list li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-weight: 500;
          font-size: 0.98rem;
        }
        .cred-section h4 {
          font-size: 0.95rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 10px;
        }
        .cred-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .cred-list li {
          font-size: 0.9rem;
          color: var(--text-primary);
          line-height: 1.4;
        }
        .cred-list span {
          color: var(--color-teal);
          margin-right: 6px;
          font-weight: 700;
        }

        @media (max-width: 768px) {
          .doc-profile-grid {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 30px;
          }
          .doc-hero-avatar-mock {
            margin: 0 auto;
            width: 180px;
            height: 180px;
            font-size: 4.5rem;
          }
          .doc-hero-ctas {
            justify-content: center;
          }
          .anxiety-icon-msg {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .anxiety-icon {
            margin-top: 0;
          }
        }
      `}</style>
    </div>
  );
}

// Reusable icons
function CheckCircle2({ size, className }) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
