import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, Printer, Smartphone, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Offers() {
  const { specialOffers: activeOffers } = useAppContext();
  const currentMonthYear = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="offers-page fade-in">
      {/* Hero */}
      <section className="offers-hero text-center">
        <div className="container">
          <span className="badge badge-accent">Exclusive Savings</span>
          <h1>Special Offers & Promotions</h1>
          <p className="hero-p" style={{ maxWidth: '600px', margin: '16px auto 0' }}>
            Claim active clinical promotions at our Van Nuys office. Present the code on your phone or print a copy to redeem.
          </p>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="section offers-grid-sec">
        <div className="container">
          <div className="grid-2 offers-detailed-grid">
            {activeOffers.map((offer, idx) => (
              <div key={idx} className="card offer-long-card">
                <div className="offer-long-header">
                  <span className="badge badge-accent">{offer.badge}</span>
                  <span className="offer-code-badge">Code: {offer.code}</span>
                </div>
                
                <h3>{offer.title}</h3>
                <p className="offer-desc-txt">{offer.desc}</p>
                
                <div className="offer-print-how">
                  <div className="how-redeem">
                    <Smartphone size={16} className="redeem-icon" />
                    <span>Show voucher code on your phone during check-in</span>
                  </div>
                  <div className="how-redeem" style={{ marginTop: '8px' }}>
                    <Calendar size={16} className="redeem-icon" />
                    <span>Valid through the end of {currentMonthYear}</span>
                  </div>
                </div>

                <div className="offer-fine-print">
                  <p><strong>Terms:</strong> {offer.finePrint}</p>
                </div>

                <div className="offer-long-footer">
                  <Link to="/appointment" className="btn btn-primary btn-sm">
                    Claim & Book Visit <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Financing Callout */}
      <section className="section bg-cream text-center">
        <div className="container">
          <h2>Looking for Flexible Payment Options?</h2>
          <p style={{ maxWidth: '650px', margin: '12px auto 28px', color: 'var(--text-secondary)' }}>
            We work with PPO insurance and Denti-Cal, and offer low monthly payment options through CareCredit® to make treatments affordable.
          </p>
          <div className="flex-center" style={{ gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/financing" className="btn btn-primary">Explore Financing Plans</Link>
            <a href="tel:8185550199" className="btn btn-outline">Call Billing Desk</a>
          </div>
        </div>
      </section>

      <style>{`
        .offers-hero {
          padding: 80px 0 60px;
          background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
        }
        .offers-detailed-grid {
          gap: 32px;
        }
        .offer-long-card {
          border-top: 4px solid var(--color-teal);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .offer-long-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .offer-code-badge {
          font-family: monospace;
          background-color: var(--bg-neutral-light);
          padding: 4px 8px;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .offer-long-card h3 {
          font-size: 1.35rem;
        }
        .offer-desc-txt {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }
        .offer-print-how {
          background-color: var(--bg-primary);
          padding: 14px 18px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
        }
        .how-redeem {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.85rem;
          color: var(--text-primary);
          font-weight: 500;
        }
        .redeem-icon {
          color: var(--color-teal);
        }
        .offer-fine-print {
          font-size: 0.75rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }
        .offer-long-footer {
          border-top: 1px solid var(--border-color);
          padding-top: 16px;
          display: flex;
          justify-content: flex-end;
          margin-top: auto;
        }

        @media (max-width: 640px) {
          .offer-long-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
          .offer-code-badge {
            align-self: flex-start;
          }
        }
      `}</style>
    </div>
  );
}
