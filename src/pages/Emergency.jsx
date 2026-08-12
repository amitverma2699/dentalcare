import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Phone, Clock, FileQuestion, ChevronRight, Check } from 'lucide-react';
import BookingFlow from '../components/BookingFlow';

export default function Emergency() {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    if (activeFaq === index) {
      setActiveFaq(null);
    } else {
      setActiveFaq(index);
    }
  };

  const protocols = [
    {
      q: 'Knocked-Out Adult Tooth',
      a: 'Retrieve the tooth by the chewing surface (crown). Do not touch the root. Gently rinse it in water if dirty. Try to reinsert it into the socket immediately. If that is not possible, place it in a glass of milk or saline to keep the root cells hydrated. Call us immediately—re-implantation is highly successful if completed within 60 minutes.'
    },
    {
      q: 'Severe, Throbbing Toothache',
      a: 'Rinse your mouth with warm salt water and use dental floss to gently remove any food particles lodged between teeth. Do not apply aspirin directly to your gums, as it can cause chemical burns. Call our office immediately to schedule an emergency exam.'
    },
    {
      q: 'Abscess or Facial Swelling',
      a: 'An abscess is a bacterial infection that forms at the tooth root or in gums. It presents as painful swelling and is a clinical emergency that can spread systemically. Rinse with salt water and call our office immediately for antibiotics and treatment.'
    },
    {
      q: 'Broken, Chipped, or Cracked Teeth',
      a: 'Rinse your mouth with warm water. Save any broken tooth fragments. Apply a cold compress to your cheek to reduce swelling. Visit us immediately so we can evaluate if the root is fractured and place a protective restoration.'
    },
    {
      q: 'Lost Dental Crown or Filling',
      a: 'Keep the crown safe if it has come off. Use temporary dental cement (available at pharmacies) or sugar-free gum to cover the exposed tooth and shield it from cold/hot air. Schedule an appointment so we can permanently recement or replace the restoration.'
    }
  ];

  return (
    <div className="emergency-page fade-in">
      {/* Hero */}
      <section className="emergency-hero-page bg-red text-center" style={{ borderBottom: '1px solid rgba(185, 28, 28, 0.15)', padding: '80px 0 60px' }}>
        <div className="container">
          <span className="badge badge-emergency">Urgent Care Clinic</span>
          <h1 className="text-emergency-main" style={{ color: 'var(--color-emergency)', marginTop: '16px' }}>Dental Emergency? Same-Day Relief</h1>
          <p className="hero-p" style={{ maxWidth: '650px', margin: '16px auto 0' }}>
            We prioritize same-day appointments in Van Nuys, CA to resolve toothaches, swelling, and broken teeth. Let us get you out of pain immediately.
          </p>
          
          <div className="hero-emergency-ctas flex-center" style={{ gap: '16px', marginTop: '30px', flexWrap: 'wrap' }}>
            <a href="tel:8185550199" className="btn btn-emergency">
              <Phone size={18} /> Call Urgent Line: (818) 555-0199
            </a>
            <a href="#first-aid" className="btn btn-outline btn-emergency-outline">
              First-Aid Instructions
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="section emergency-booking-sec">
        <div className="container grid-2" style={{ gridTemplateColumns: '1.2fr 1fr', gap: '50px' }}>
          
          {/* First-Aid Protocols */}
          <div id="first-aid">
            <h3>First-Aid Instructions</h3>
            <p style={{ margin: '8px 0 30px', color: 'var(--text-secondary)' }}>Identify your dental concern below and follow the immediate steps before arriving.</p>

            <div className="faqs-accordion-list">
              {protocols.map((protocol, idx) => (
                <div key={idx} className="card faq-accordion-card">
                  <button className="faq-toggle-btn" onClick={() => toggleFaq(idx)}>
                    <div className="faq-title-row">
                      <ShieldAlert size={18} className="icon-red" />
                      <span>{protocol.q}</span>
                    </div>
                    <ChevronRight size={18} className={`chevron-faq ${activeFaq === idx ? 'rotate-chevron' : ''}`} />
                  </button>
                  <div className={`faq-body-collapse ${activeFaq === idx ? 'show-faq-body' : ''}`}>
                    <p>{protocol.a}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="card emergency-guideline-card" style={{ marginTop: '30px', borderLeft: '4px solid var(--color-emergency)' }}>
              <h4>Important Safety Notice</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.5' }}>
                If you are experiencing difficulty swallowing, severe facial swelling closing your eyes, difficulty breathing, or a suspected fractured jaw, please bypass the dental clinic and proceed to the nearest hospital Emergency Room immediately.
              </p>
            </div>
          </div>

          {/* Urgent Request Form */}
          <div className="urgent-form-sticky">
            <div className="card contact-form-card" style={{ borderTop: '4px solid var(--color-emergency)' }}>
              <h3>Request Urgent Callback</h3>
              <p style={{ marginBottom: '24px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Submit your details and a receptionist will call you immediately to confirm a same-day slot.</p>
              
              <BookingFlow />
            </div>
          </div>

        </div>
      </section>

      {/* FAQs Specific to Emergencies */}
      <section className="section bg-cream">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="section-header">
            <span className="badge badge-emergency">Urgent Care FAQ</span>
            <h2>Emergency Policies</h2>
          </div>

          <div className="card info-faq-card">
            <ul className="em-policies-list">
              <li>
                <strong>Do you charge extra for emergency visits?</strong>
                <p>We charge standard diagnostic fees for emergency exams. We verify PPO insurances and accept Denti-Cal. There are no hidden surcharges for same-day triage appointments.</p>
              </li>
              <li style={{ marginTop: '20px' }}>
                <strong>What if I need treatment outside office hours?</strong>
                <p>If you call after-hours, our system provides instructions to reach our on-call clinician. If you are experiencing bleeding or severe throat swelling, visit the nearest emergency room.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {styleStyles}
    </div>
  );
}

const styleStyles = (
  <style>{`
    .emergency-hero-page {
      background-color: var(--color-emergency-light);
    }
    .text-emergency-main {
      font-size: clamp(2.2rem, 5vw, 3.2rem);
      font-weight: 800;
      letter-spacing: -0.02em;
    }
    .btn-emergency-outline {
      border-color: var(--color-emergency);
      color: var(--color-emergency);
    }
    .btn-emergency-outline:hover {
      background-color: rgba(185, 28, 28, 0.05);
      color: var(--color-emergency);
    }
    .icon-red {
      color: var(--color-emergency);
    }

    /* Accordion styles */
    .faqs-accordion-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
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

    /* Sticky write a review */
    .urgent-form-sticky {
      position: sticky;
      top: 100px;
      height: fit-content;
    }
    
    /* Policy list */
    .em-policies-list {
      list-style: none;
      padding: 10px;
    }
    .em-policies-list li strong {
      font-size: 1.1rem;
      color: var(--text-primary);
      display: block;
      margin-bottom: 6px;
    }
    .em-policies-list li p {
      font-size: 0.95rem;
      line-height: 1.6;
    }

    @media (max-width: 1024px) {
      .emergency-booking-sec .container {
        grid-template-columns: 1fr !important;
      }
      .urgent-form-sticky {
        position: static;
        margin-top: 40px;
      }
    }
  `}</style>
);
