import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, ShieldCheck, Check, Info, Calculator, Phone } from 'lucide-react';

export default function Financing() {
  const [cost, setCost] = useState('1200');
  const [months, setMonths] = useState('12');

  const calculateMonthly = () => {
    const principal = parseFloat(cost);
    if (isNaN(principal) || principal <= 0) return '0.00';
    const term = parseInt(months);
    // Assuming 0% APR promotional financing
    return (principal / term).toFixed(2);
  };

  return (
    <div className="financing-page fade-in">
      {/* Hero */}
      <section className="financing-hero text-center">
        <div className="container">
          <span className="badge badge-accent">Insurance & Billing</span>
          <h1>Insurance & Payment Options</h1>
          <p className="hero-p" style={{ maxWidth: '650px', margin: '16px auto 0' }}>
            We work to make high-quality, specialty dental care fit your budget. We accept most major PPO insurances, Denti-Cal, and offer flexible financing.
          </p>
        </div>
      </section>

      {/* Insurance Guides */}
      <section className="section insurance-guides-sec">
        <div className="container grid-2" style={{ gap: '40px' }}>
          {/* PPO */}
          <div className="card insurance-card-detailed">
            <span className="badge badge-accent">PPO Insurances</span>
            <h3>PPO Dental Insurance</h3>
            <p className="ins-p-text">
              We are in-network with most major dental PPO insurance plans. Our office coordinators will file claims directly on your behalf, maximize your yearly benefits, and verify coverage details prior to starting any treatment.
            </p>
            <div className="ins-companies-box bg-cream">
              <h4>Popular In-Network PPO Plans:</h4>
              <div className="ins-comp-grid">
                <div>✓ Delta Dental</div>
                <div>✓ Aetna</div>
                <div>✓ Cigna</div>
                <div>✓ MetLife</div>
                <div>✓ Guardian</div>
                <div>✓ Blue Shield</div>
              </div>
            </div>
            <p className="ins-note">
              *Co-pays and deductibles are determined by your specific insurance policy, and are collected at the time of your visit.
            </p>
          </div>

          {/* Denti-Cal */}
          <div className="card insurance-card-detailed">
            <span className="badge badge-neutral">Medi-Cal Dental</span>
            <h3>Denti-Cal Welcomed</h3>
            <p className="ins-p-text">
              We are proud to accept Denti-Cal (Medi-Cal Dental) at our Van Nuys clinic to ensure that children, adults, and seniors under the state health plan receive quality dental care. Many general and pediatric procedures are fully covered.
            </p>
            
            <div className="ins-companies-box bg-cream">
              <h4>Standard Denti-Cal Covered Procedures:</h4>
              <ul className="dentical-list">
                <li><span>•</span> Routine dental examinations & cleanings</li>
                <li><span>•</span> Digital diagnostics & diagnostic X-rays</li>
                <li><span>•</span> Fillings, root canals & emergency extractions</li>
                <li><span>•</span> Children's fluorides & cavity sealants</li>
              </ul>
            </div>
            <p className="ins-note">
              *Major restorations and surgical treatments may require pre-authorization from the state before care begins.
            </p>
          </div>
        </div>
      </section>

      {/* CareCredit & Interactive Calculator */}
      <section className="section carecredit-sec bg-cream">
        <div className="container grid-2" style={{ gridTemplateColumns: '1.2fr 1fr', gap: '50px' }}>
          {/* Info */}
          <div className="carecredit-info">
            <span className="badge badge-accent">CareCredit® Financing</span>
            <h2>0% Interest Promotional Financing</h2>
            <p className="carecredit-p">
              CareCredit® operates like a dental credit card. It allows you to pay for out-of-pocket dental procedures immediately, then split the payments into low monthly installments. 
            </p>
            <p style={{ marginTop: '16px' }}>
              For qualifying procedures, we offer <strong>6, 12, and 24-month promotional terms with 0% interest</strong>. As long as you make your minimum monthly payments and pay the full balance by the end of the term, you pay no interest.
            </p>

            <div className="carecredit-bullets" style={{ marginTop: '24px' }}>
              <div className="cc-bullet">
                <Check size={16} className="icon-teal" />
                <span>No upfront fees or prepay penalties</span>
              </div>
              <div className="cc-bullet" style={{ marginTop: '10px' }}>
                <Check size={16} className="icon-teal" />
                <span>Covers general, cosmetic, and surgical dental work</span>
              </div>
              <div className="cc-bullet" style={{ marginTop: '10px' }}>
                <Check size={16} className="icon-teal" />
                <span>Instant credit decision online in minutes</span>
              </div>
            </div>

            <a href="https://www.carecredit.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginTop: '30px' }}>
              Apply for CareCredit Online
            </a>
          </div>

          {/* Calculator */}
          <div className="calculator-area">
            <div className="card calculator-card">
              <div className="card-header-icon" style={{ marginBottom: '20px' }}>
                <Calculator size={22} className="icon-teal" />
                <h3>Payment Estimator</h3>
              </div>
              <p style={{ marginBottom: '24px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Use this calculator to estimate your monthly payments under 0% interest CareCredit promotions.</p>

              <div className="form-group">
                <label className="form-label" htmlFor="calcTreatmentCost">Estimated Treatment Cost ($)</label>
                <input
                  id="calcTreatmentCost"
                  type="number"
                  className="form-control"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  placeholder="1200"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Promotional Term (Months)</label>
                <div className="calc-terms-grid">
                  {[6, 12, 24].map(term => (
                    <button
                      key={term}
                      type="button"
                      className={`term-btn ${months === String(term) ? 'selected' : ''}`}
                      onClick={() => setMonths(String(term))}
                    >
                      {term} Months
                    </button>
                  ))}
                </div>
              </div>

              <div className="calc-divider"></div>
              
              <div className="calc-result-box text-center">
                <span className="monthly-label">Estimated Monthly Payment</span>
                <span className="monthly-val">${calculateMonthly()}</span>
                <span className="monthly-sub">at 0% APR Promo Interest</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Billing CTA */}
      <section className="section final-cta-section text-center">
        <div className="container">
          <h2>Have Questions About Your Dental Insurance Plan?</h2>
          <p>Call our reception desk. Our billing coordinators will verify your benefits and explain copays before your visit.</p>
          <div className="cta-buttons flex-center">
            <a href="tel:8185550199" className="btn btn-primary">
              <Phone size={16} /> Call Billing Desk: (818) 555-0199
            </a>
            <Link to="/appointment" className="btn btn-secondary">Book Consultation</Link>
          </div>
        </div>
      </section>

      <style>{`
        .financing-hero {
          padding: 80px 0 60px;
          background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
        }
        .insurance-card-detailed {
          border-top: 4px solid var(--color-teal);
        }
        .ins-p-text {
          font-size: 0.98rem;
          line-height: 1.6;
          margin-top: 16px;
          margin-bottom: 24px;
        }
        .ins-companies-box {
          padding: 20px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          margin-bottom: 16px;
        }
        .ins-companies-box h4 {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 12px;
          text-transform: uppercase;
        }
        .ins-comp-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          font-weight: 600;
          font-size: 0.92rem;
        }
        .dentical-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .dentical-list li {
          font-size: 0.9rem;
          font-weight: 500;
        }
        .dentical-list span {
          color: var(--color-teal);
          margin-right: 6px;
        }
        .ins-note {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        /* CareCredit Section */
        .carecredit-p {
          font-size: 1.05rem;
          line-height: 1.6;
          margin-top: 16px;
        }
        .cc-bullet {
          display: flex;
          gap: 10px;
          font-weight: 500;
          font-size: 0.95rem;
        }
        .icon-teal {
          color: var(--color-teal);
        }

        /* Calculator styling */
        .calculator-card {
          border-top: 4px solid var(--color-teal);
        }
        .calc-terms-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .term-btn {
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          padding: 12px;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: var(--transition-fast);
        }
        .term-btn:hover {
          border-color: var(--color-teal);
          color: var(--color-teal);
        }
        .term-btn.selected {
          background-color: var(--color-teal-light);
          border-color: var(--color-teal);
          color: var(--color-teal);
        }
        .calc-divider {
          height: 1px;
          background-color: var(--border-color);
          margin: 24px 0;
        }
        .calc-result-box {
          background-color: var(--color-teal-light);
          border: 1px solid rgba(13, 148, 136, 0.1);
          border-radius: var(--radius-md);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .monthly-label {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-secondary);
        }
        .monthly-val {
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.1;
        }
        .monthly-sub {
          font-size: 0.78rem;
          color: var(--color-teal);
          font-weight: 600;
        }

        @media (max-width: 1024px) {
          .carecredit-sec .container {
            grid-template-columns: 1fr !important;
          }
          .calculator-area {
            margin-top: 30px;
          }
        }
      `}</style>
    </div>
  );
}
