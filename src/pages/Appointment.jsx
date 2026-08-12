import React from 'react';
import BookingFlow from '../components/BookingFlow';
import { ShieldCheck, Phone, Check } from 'lucide-react';

export default function Appointment() {
  return (
    <div className="appointment-page fade-in">
      <section className="appointment-hero text-center">
        <div className="container">
          <span className="badge badge-accent">Booking Portal</span>
          <h1>Request an Appointment</h1>
          <p className="hero-p" style={{ maxWidth: '600px', margin: '16px auto 0' }}>
            Use our interactive online scheduling request wizard. We accept most major PPO insurances and Denti-Cal, and offer low-interest financing.
          </p>
        </div>
      </section>

      <section className="section booking-wizard-sec">
        <div className="container grid-2" style={{ gridTemplateColumns: '1.5fr 1fr', gap: '50px' }}>
          {/* Booking Flow Component */}
          <div>
            <BookingFlow />
          </div>

          {/* Details / Verification Checklist */}
          <div className="booking-info-sidebar">
            <div className="card booking-checklist-card">
              <h3>Important Booking Notes</h3>
              <p style={{ margin: '8px 0 24px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Please review our office confirmation process and standard security policies.</p>
              
              <ul className="booking-checklist">
                <li>
                  <div className="check-bullet"><Check size={14} /></div>
                  <div>
                    <h4>This is a Request, Not a Final Booking</h4>
                    <p>Our scheduling coordinators will review active availability and call or text you shortly to lock in your exact time slot.</p>
                  </div>
                </li>
                <li>
                  <div className="check-bullet"><Check size={14} /></div>
                  <div>
                    <h4>HIPAA Private Transmission</h4>
                    <p>We do not collect sensitive clinical charts or health records via our online booking wizard. Your contact details are fully encrypted.</p>
                  </div>
                </li>
                <li>
                  <div className="check-bullet"><Check size={14} /></div>
                  <div>
                    <h4>SMS Confirmation Update</h4>
                    <p>By checking the SMS consent box, you will receive text messages regarding scheduling, cancellations, and notifications.</p>
                  </div>
                </li>
              </ul>

              <div className="sidebar-divider"></div>
              <div className="sidebar-phone-cta">
                <p>Prefer to schedule immediately by phone?</p>
                <a href="tel:8185550199" className="btn btn-secondary" style={{ width: '100%', marginTop: '10px' }}>
                  <Phone size={16} /> Call (818) 555-0199
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .appointment-hero {
          padding: 80px 0 60px;
          background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
        }
        .booking-checklist-card {
          border-left: 4px solid var(--color-teal);
        }
        .booking-checklist {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .booking-checklist li {
          display: flex;
          gap: 12px;
        }
        .check-bullet {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background-color: var(--color-teal-light);
          color: var(--color-teal);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .booking-checklist h4 {
          font-size: 0.95rem;
          margin-bottom: 4px;
        }
        .booking-checklist p {
          font-size: 0.82rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }
        .sidebar-divider {
          height: 1px;
          background-color: var(--border-color);
          margin: 24px 0;
        }
        .sidebar-phone-cta p {
          font-size: 0.88rem;
          font-weight: 500;
          text-align: center;
        }

        @media (max-width: 1024px) {
          .booking-wizard-sec .container {
            grid-template-columns: 1fr !important;
          }
          .booking-info-sidebar {
            margin-top: 30px;
          }
        }
      `}</style>
    </div>
  );
}
