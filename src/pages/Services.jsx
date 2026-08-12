import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Sparkles, Smile, Award, ClipboardCheck, ArrowRight } from 'lucide-react';

export default function Services() {
  const serviceCategories = [
    {
      id: 'general-dentistry',
      title: 'General Dentistry',
      desc: 'Routine cleanings, digital X-rays, sealants, fluoride treatments, and gentle extractions.',
      features: ['Comprehensive Oral Exams', 'Teeth Cleanings & Hygiene', 'Digital X-Rays & Screening', 'Sealants & Cavity Prevention']
    },
    {
      id: 'pediatric-dentistry',
      title: 'Pediatric Dentistry',
      desc: 'Comfortable, kid-friendly dental care for children of all ages, from infants to teens.',
      features: ['Anxiety-Free Kids Exams', 'Tooth Development Screenings', 'Cavity Prevention & Diet Guidance', 'Gentle Cleanings & Fluoride']
    },
    {
      id: 'cosmetic-dentistry',
      title: 'Cosmetic Dentistry',
      desc: 'Teeth whitening, porcelain veneers, cosmetic composite bonding, and full mouth smile design.',
      features: ['Opalescence® & Zoom!® Whitening', 'Porcelain Veneers & Laminates', 'Cosmetic Bonding', 'Inlays & Onlays']
    },
    {
      id: 'dental-implants',
      title: 'Dental Implants',
      desc: 'State-of-the-art permanent replacement for missing teeth using single or multi-implants.',
      features: ['Single-Tooth Implants', 'Implant-Supported Bridges', 'Implant-Retained Dentures', 'Bone Grafting & Plan Prep']
    },
    {
      id: 'restorative-dentistry',
      title: 'Restorative Care',
      desc: 'Reconstruct broken or decaying teeth with high-quality crowns, bridges, and partials.',
      features: ['Porcelain Crowns & Caps', 'Dental Bridges & Restorations', 'Partial & Full Dentures', 'Full-Mouth Rehabilitation']
    },
    {
      id: 'orthodontics',
      title: 'Orthodontics',
      desc: 'Straighten crooked teeth with standard metal braces, ceramic braces, or clear aligners.',
      features: ['Invisalign® for Adults & Teens', 'SureSmile® Clear Aligner System', 'Traditional Braces', 'Phase 1 & Phase 2 Ortho']
    },
    {
      id: 'endodontics',
      title: 'Endodontics (Root Canals)',
      desc: 'Gentle root canal treatments and retreatments to save infected teeth and stop toothache.',
      features: ['Gentle Root Canal Therapy', 'Root Canal Retreatment', 'Internal Abscess Treatments', 'Emergency Nerve Pain Relief']
    },
    {
      id: 'periodontics',
      title: 'Periodontics (Gum Care)',
      desc: 'Deep cleaning procedures, scaling, root planing, and advanced treatments for gum disease.',
      features: ['Deep Cleaning (Scaling & Planing)', 'Gum Grafting & Recession Therapy', 'Bone & Soft Tissue Therapy', 'Pocket Reduction Surgery']
    },
    {
      id: 'oral-surgery',
      title: 'Oral & Maxillofacial Surgery',
      desc: 'Complex tooth extractions, wisdom teeth extraction, bone grafting, and TMJ therapies.',
      features: ['Wisdom Tooth Extractions', 'Simple & Surgical Extractions', 'Bone Grafting & Jaw Prep', 'Botox® for TMJ Relief']
    }
  ];

  return (
    <div className="services-page fade-in">
      {/* Hero */}
      <section className="services-hero text-center">
        <div className="container">
          <span className="badge badge-accent">Comprehensive Dental Offerings</span>
          <h1>Dental Services in Van Nuys, CA</h1>
          <p className="hero-p">
            At Affordable Dental, we provide general, pediatric, cosmetic, and surgical specialty care under one roof. Our specialists coordinate closely to make sure you receive highly personalized, comfortable treatment plans.
          </p>
        </div>
      </section>

      {/* Specialty Philosophy */}
      <section className="section bg-cream" id="why-choose-us">
        <div className="container grid-2">
          <div className="philosophy-content">
            <span className="badge badge-accent">The Affordable Advantage</span>
            <h2>Why Multi-Specialty Care Matters for Your Family</h2>
            <p>
              Traditional dental care often requires patients to visit separate offices for root canals, braces, wisdom teeth removals, or pediatric care. This causes scheduling headaches, duplicated X-rays, and fragmented communication between doctors.
            </p>
            <p style={{ marginTop: '16px' }}>
              Our practice changes that. By housing general practitioners, pediatric experts, implant specialists, and surgeons in a single modern facility, we deliver:
            </p>
            
            <div className="phil-grid">
              <div className="phil-item">
                <Award size={20} className="phil-icon" />
                <div>
                  <h4>Coordinated Care</h4>
                  <p>Our specialists consult with each other instantly, ensuring seamless treatment transitions.</p>
                </div>
              </div>
              <div className="phil-item">
                <Smile size={20} className="phil-icon" />
                <div>
                  <h4>Unified Records</h4>
                  <p>Your charts, 3D scans, and treatment history are shared securely across our internal team.</p>
                </div>
              </div>
              <div className="phil-item">
                <Shield size={20} className="phil-icon" />
                <div>
                  <h4>Stress-Free Environment</h4>
                  <p>See the same friendly office staff and stay in the same comfortable facility for all procedures.</p>
                </div>
              </div>
              <div className="phil-item">
                <ClipboardCheck size={20} className="phil-icon" />
                <div>
                  <h4>Streamlined Financing</h4>
                  <p>All insurances and payment plans are coordinated through a single billing desk.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="philosophy-visual flex-center">
            <div className="insurance-box card">
              <h3>Insurance & Financing Accepted</h3>
              <p>We work to make dental care affordable and accessible for local Van Nuys families.</p>
              
              <ul className="ins-list">
                <li><span>✓</span> Accepted PPO Insurance plans</li>
                <li><span>✓</span> Denti-Cal (Medi-Cal Dental) welcome</li>
                <li><span>✓</span> CareCredit® 0% Financing options</li>
                <li><span>✓</span> Direct payment savings for uninsured patients</li>
              </ul>
              
              <Link to="/financing" className="btn btn-primary" style={{ width: '100%' }}>Explore Payment Options</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Category Sections */}
      <section className="section categories-section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-accent">Procedural Categories</span>
            <h2>Explore Our Specialties</h2>
            <p>Select a category below to learn about the clinical symptoms we address, the solutions we provide, and how each procedure works.</p>
          </div>

          <div className="services-list-grid">
            {serviceCategories.map((category, index) => (
              <div key={index} className="card service-long-card">
                <div className="service-long-body">
                  <div>
                    <span className="service-number-badge">0{index + 1}</span>
                    <h3>{category.title}</h3>
                    <p className="service-long-desc">{category.desc}</p>
                  </div>
                  
                  <div className="service-features-column">
                    <span className="features-title">Popular Treatments:</span>
                    <ul className="features-list">
                      {category.features.map((feature, fIdx) => (
                        <li key={fIdx}><span>•</span> {feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="service-long-footer">
                  <Link to={`/services/${category.id}`} className="btn btn-outline btn-sm">
                    View Procedure Details <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Education Teaser */}
      <section className="section bg-cream text-center">
        <div className="container">
          <h2>Looking for Dental Education & FAQs?</h2>
          <p style={{ maxWidth: '600px', margin: '12px auto 32px', color: 'var(--text-secondary)' }}>
            We believe that informed patients make the best health decisions. Visit our resources hub for insurance guides, billing options, patient forms, and clinical advice.
          </p>
          <div className="hub-ctas flex-center" style={{ gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/patient-info" className="btn btn-primary">Visit Patient Resources Hub</Link>
            <Link to="/blog" className="btn btn-secondary">Read Dental Blog</Link>
          </div>
        </div>
      </section>

      <style>{`
        .services-hero {
          padding: 80px 0 60px;
          background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
        }
        .hero-p {
          max-width: 720px;
          margin: 16px auto 0;
          font-size: 1.15rem;
          color: var(--text-secondary);
        }

        /* Philosophy Grid */
        .phil-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          margin-top: 30px;
        }
        .phil-item {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }
        .phil-icon {
          color: var(--color-teal);
          margin-top: 3px;
          flex-shrink: 0;
        }
        .phil-item h4 {
          font-size: 0.98rem;
          margin-bottom: 4px;
        }
        .phil-item p {
          font-size: 0.85rem;
          line-height: 1.4;
        }
        .insurance-box {
          background-color: var(--bg-secondary);
          max-width: 420px;
        }
        .insurance-box h3 {
          font-size: 1.3rem;
          margin-bottom: 12px;
        }
        .insurance-box p {
          font-size: 0.95rem;
          color: var(--text-secondary);
          margin-bottom: 24px;
        }
        .ins-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 30px;
        }
        .ins-list li {
          display: flex;
          gap: 10px;
          font-weight: 500;
          color: var(--text-primary);
          font-size: 0.92rem;
        }
        .ins-list span {
          color: var(--color-teal);
          font-weight: 700;
        }

        /* Services long list */
        .services-list-grid {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .service-long-card {
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .service-long-card:hover {
          transform: translateY(-4px);
        }
        .service-long-body {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 40px;
        }
        .service-number-badge {
          display: inline-block;
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--color-teal);
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .service-long-card h3 {
          font-size: 1.4rem;
          margin-bottom: 12px;
        }
        .service-long-desc {
          font-size: 0.98rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .service-features-column {
          background-color: var(--bg-primary);
          padding: 16px 20px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
        }
        .features-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-secondary);
          text-transform: uppercase;
          display: block;
          margin-bottom: 10px;
          letter-spacing: 0.05em;
        }
        .features-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .features-list li {
          font-size: 0.9rem;
          color: var(--text-primary);
          font-weight: 500;
        }
        .features-list span {
          color: var(--color-teal);
          margin-right: 4px;
        }
        .service-long-footer {
          display: flex;
          justify-content: flex-end;
          border-top: 1px solid var(--border-color);
          padding-top: 20px;
        }

        @media (max-width: 768px) {
          .service-long-body {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .service-long-footer {
            justify-content: flex-start;
          }
          .phil-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
