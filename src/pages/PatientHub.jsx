import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, CreditCard, ShieldAlert, Sparkles, Video, Users, HelpCircle, 
  ChevronRight, Calendar, ArrowRight, Download, Eye, FileQuestion
} from 'lucide-react';

export default function PatientHub() {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    if (activeFaq === index) {
      setActiveFaq(null);
    } else {
      setActiveFaq(index);
    }
  };

  const hubLinks = [
    { title: 'Schedule Visit', desc: 'Request your dental exam or specialist consultation online.', path: '/appointment', icon: <Calendar />, type: 'accent' },
    { title: 'Insurance & Financing', desc: 'Understand PPO coverage, Denti-Cal benefits, and CareCredit.', path: '/financing', icon: <CreditCard />, type: 'neutral' },
    { title: 'Special Promotions', desc: 'Claim free oral exams, whitening promotions, and dental implant discounts.', path: '/offers', icon: <Sparkles />, type: 'neutral' },
    { title: 'Emergency Care', desc: 'First-aid advice for severe toothaches, chipped teeth, and knocked-out roots.', path: '/emergency', icon: <ShieldAlert className="text-emergency" />, type: 'emergency' },
    { title: 'Smile Gallery', desc: 'View verified clinical before-and-after results for veneers and implants.', path: '/gallery', icon: <Eye />, type: 'neutral' },
    { title: 'Patient Referral Program', desc: 'Learn about dental care referral rewards for friends and family.', path: '#referral', icon: <Users />, type: 'neutral' }
  ];

  const faqs = [
    { q: 'What insurance plans do you accept?', a: 'We accept most major PPO dental insurance plans (including Delta Dental, Aetna, Cigna, MetLife, Guardian, and Blue Shield) and are proud to accept Denti-Cal (Medi-Cal Dental) to make care accessible for our community.' },
    { q: 'Do you offer payment options for uninsured patients?', a: 'Yes. We offer 0% interest payment plans through CareCredit® and offer a private-pay discount on exams, cleanings, and major procedures for patients without insurance.' },
    { q: 'What should I bring to my first visit?', a: 'Please bring a valid photo ID, your dental insurance card (if applicable), and any recent digital dental X-rays taken within the last 12 months.' },
    { q: 'What is your appointment cancellation policy?', a: 'We request at least 24 hours\' notice for any cancellations or rescheduling to allow us to offer that slot to other waiting patients.' }
  ];

  return (
    <div className="patient-hub-page fade-in">
      {/* Hero */}
      <section className="hub-hero text-center">
        <div className="container">
          <span className="badge badge-accent">Patient Portal</span>
          <h1>Patient Resources Hub</h1>
          <p className="hero-p">
            Find patient intake forms, billing details, insurance guides, emergency instructions, and smile transformation galleries all in one place.
          </p>
        </div>
      </section>

      {/* Quick Links Grid */}
      <section className="section hub-links-sec">
        <div className="container">
          <div className="grid-3 hub-links-grid">
            {hubLinks.map((link, idx) => (
              <div key={idx} className={`card hub-card ${link.type === 'accent' ? 'hub-card-accent' : ''} ${link.type === 'emergency' ? 'hub-card-emergency' : ''}`}>
                <div className="hub-card-header">
                  <div className="hub-icon-wrapper">{link.icon}</div>
                  <h3>{link.title}</h3>
                </div>
                <p className="hub-desc">{link.desc}</p>
                {link.path.startsWith('#') ? (
                  <a href={link.path} className="text-link">Explore Program</a>
                ) : (
                  <Link to={link.path} className="text-link">Access Resource</Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Forms Section */}
      <section className="section forms-sec bg-cream" id="forms">
        <div className="container grid-2">
          <div className="forms-content">
            <span className="badge badge-accent">Registration Forms</span>
            <h2>Complete Patient Forms Online</h2>
            <p>
              Save 15 minutes in our waiting room by completing your patient intake and medical history forms online prior to your visit. 
            </p>
            <p style={{ marginTop: '16px', color: 'var(--text-secondary)' }}>
              Completed forms are transmitted directly to our secure database, keeping your clinical histories fully private and HIPAA-compliant.
            </p>

            <div className="forms-action-list" style={{ marginTop: '28px' }}>
              <div className="form-download-item">
                <FileText className="form-icon-file" />
                <div>
                  <h4>New Patient Intake Registration</h4>
                  <p>Required for all new patients. Captures contact details and basic histories.</p>
                </div>
                <button type="button" className="btn btn-outline btn-sm">
                  <Download size={14} /> Download PDF
                </button>
              </div>

              <div className="form-download-item" style={{ marginTop: '16px' }}>
                <FileText className="form-icon-file" />
                <div>
                  <h4>HIPAA Privacy Notice & SMS Consent</h4>
                  <p>Outlines our patient data privacy guidelines and text notification policies.</p>
                </div>
                <button type="button" className="btn btn-outline btn-sm">
                  <Download size={14} /> Download PDF
                </button>
              </div>
            </div>
          </div>

          <div className="forms-visual flex-center">
            <div className="forms-reminder-card card">
              <HelpCircle className="reminder-icon" />
              <h3>Need Help with Forms?</h3>
              <p>Our office staff is happy to walk you through registration. If you prefer to fill them out in person, please arrive 15 minutes before your scheduled appointment time.</p>
              <a href="tel:8185550199" className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }}>Call Office Support</a>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Videos Mock Grid */}
      <section className="section videos-sec">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-accent">Patient Education</span>
            <h2>Dental Treatment Videos</h2>
            <p>Watch short, informative videos describing clinical procedures, oral care routines, and implant recovery steps.</p>
          </div>

          <div className="grid-3 videos-grid">
            {[
              { title: 'What is a dental implant?', duration: '2:15', category: 'Implants' },
              { title: 'Brushing techniques for children', duration: '3:40', category: 'Pediatrics' },
              { title: 'What to expect during root canals', duration: '2:50', category: 'Endodontics' }
            ].map((video, idx) => (
              <div key={idx} className="card video-card">
                <div className="video-thumb-mock flex-center">
                  <Video size={36} color="var(--color-teal)" />
                  <span className="video-time">{video.duration}</span>
                </div>
                <span className="video-cat">{video.category}</span>
                <h3>{video.title}</h3>
                <a href="#play" className="text-link">Play Video</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Referral Program */}
      <section className="section bg-cream" id="referral">
        <div className="container grid-2" style={{ alignItems: 'center' }}>
          <div className="referral-visual flex-center">
            <div className="referral-promo-badge flex-center">
              <div>
                <span className="ref-big-num">$50</span>
                <span className="ref-big-lbl">Credit Card</span>
              </div>
            </div>
          </div>
          
          <div className="referral-content">
            <span className="badge badge-accent">Patient Loyalty</span>
            <h2>Our Patient Referral Program</h2>
            <p>
              The highest compliment our specialists can receive is the recommendation of our practice to your friends, family, and coworkers.
            </p>
            <p style={{ marginTop: '16px', color: 'var(--text-secondary)' }}>
              To show our appreciation, when you refer a new patient who completes an initial exam and cleaning, we will apply a <strong>$50 credit</strong> to your account, which can be used toward any future cosmetic or restorative treatments.
            </p>
            <Link to="/contact" className="btn btn-primary" style={{ marginTop: '24px' }}>Invite a Friend</Link>
          </div>
        </div>
      </section>

      {/* General FAQs */}
      <section className="section faqs-hub-sec">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-accent">Office FAQs</span>
            <h2>General Questions & Policies</h2>
            <p>Quick details on dental insurance, financing plans, billing, and scheduling policies.</p>
          </div>

          <div className="faqs-accordion-list">
            {faqs.map((faq, idx) => (
              <div key={idx} className="card faq-accordion-card">
                <button className="faq-toggle-btn" onClick={() => toggleFaq(idx)}>
                  <div className="faq-title-row">
                    <FileQuestion size={18} className="icon-teal" />
                    <span>{faq.q}</span>
                  </div>
                  <ChevronRight size={18} className={`chevron-faq ${activeFaq === idx ? 'rotate-chevron' : ''}`} />
                </button>
                <div className={`faq-body-collapse ${activeFaq === idx ? 'show-faq-body' : ''}`}>
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .hub-hero {
          padding: 80px 0 60px;
          background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
        }
        .hub-card-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 16px;
        }
        .hub-icon-wrapper {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-sm);
          background-color: var(--color-teal-light);
          color: var(--color-teal);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .hub-card-accent {
          border-color: var(--color-teal);
          background-color: var(--color-teal-light);
        }
        .hub-card-emergency {
          border-color: var(--color-emergency);
          background-color: var(--color-emergency-light);
        }
        .hub-desc {
          font-size: 0.92rem;
          margin-bottom: 20px;
          flex: 1;
        }

        /* Forms downloads */
        .form-download-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          background-color: var(--bg-secondary);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
        }
        .form-icon-file {
          color: var(--color-teal);
          flex-shrink: 0;
        }
        .form-download-item h4 {
          font-size: 0.98rem;
          margin-bottom: 4px;
        }
        .form-download-item p {
          font-size: 0.82rem;
          color: var(--text-secondary);
        }
        .form-download-item button {
          margin-left: auto;
        }
        .forms-reminder-card h3 {
          font-size: 1.2rem;
          margin-bottom: 12px;
        }
        .forms-reminder-card p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .reminder-icon {
          color: var(--color-teal);
          margin-bottom: 12px;
          width: 32px;
          height: 32px;
        }

        /* Videos */
        .video-card h3 {
          font-size: 1.1rem;
          margin: 12px 0 16px;
        }
        .video-cat {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--color-teal);
          text-transform: uppercase;
        }
        .video-thumb-mock {
          height: 160px;
          background-color: var(--bg-neutral-light);
          border-radius: var(--radius-md);
          position: relative;
          border: 1px solid var(--border-color);
        }
        .video-time {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background-color: rgba(30,34,41,0.8);
          color: white;
          font-size: 0.72rem;
          padding: 2px 6px;
          border-radius: var(--radius-sm);
        }

        /* Referral */
        .referral-promo-badge {
          width: 180px;
          height: 180px;
          border-radius: 50%;
          background-color: var(--color-teal);
          color: white;
          text-align: center;
          box-shadow: 0 10px 25px rgba(13, 148, 136, 0.3);
        }
        .ref-big-num {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1;
          display: block;
        }
        .ref-big-lbl {
          font-size: 0.88rem;
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        /* FAQ accordion */
        .faqs-accordion-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-width: 800px;
          margin: 0 auto;
        }
        .faq-accordion-card {
          padding: 0;
          overflow: hidden;
        }
        .faq-toggle-btn {
          width: 100%;
          background: none;
          border: none;
          padding: 20px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          text-align: left;
          font-weight: 600;
        }
        .faq-title-row {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1.05rem;
        }
        .chevron-faq {
          transition: var(--transition-fast);
          color: var(--text-secondary);
        }
        .rotate-chevron {
          transform: rotate(90deg);
        }
        .faq-body-collapse {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-out;
        }
        .show-faq-body {
          max-height: 200px;
          border-top: 1px solid var(--border-color);
          padding: 20px 24px;
        }
        .faq-body-collapse p {
          font-size: 0.95rem;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .form-download-item {
            flex-direction: column;
            text-align: center;
          }
          .form-download-item button {
            margin-left: 0;
            width: 100%;
          }
          .faq-title-row {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </div>
  );
}
