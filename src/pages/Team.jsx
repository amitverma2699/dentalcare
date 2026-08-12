import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Calendar, Award, Star, Mail } from 'lucide-react';

export default function Team() {
  const doctors = [
    {
      slug: 'dr-john-doe',
      name: 'Dr. John Doe, DDS',
      role: 'Lead Dentist & Clinic Director',
      specialty: 'General & Cosmetic Dentistry',
      credentials: 'UCLA School of Dentistry, Member of ADA & CDA',
      focus: 'Porcelain veneers, cosmetic bonding, full-mouth restorations, and dental anxiety management.',
      bio: 'Dr. Doe has spent over 12 years delivering comprehensive dental care to families in the San Fernando Valley. He established Affordable Dental with the vision of offering advanced, multi-specialty care in a single warm, comfort-first location.'
    },
    {
      slug: 'dr-jane-smith',
      name: 'Dr. Jane Smith, DDS',
      role: 'Pediatric Dental Specialist',
      specialty: 'Pediatric Dentistry',
      credentials: 'USC School of Dentistry, Board Certified by the AAPD',
      focus: 'Early growth screening, childhood decay prevention, special-needs dentistry, and child desensitization.',
      bio: 'Dr. Smith completed an additional two years of specialized residency training in pediatric dentistry. She focuses on building positive associations with dental health, making visits fun, painless, and educational for young patients.'
    },
    {
      slug: 'dr-robert-lee',
      name: 'Dr. Robert Lee, DDS, MS',
      role: 'Surgical Specialist',
      specialty: 'Periodontics & Implantology',
      credentials: 'Loma Linda University, Diplomate of the American Board of Periodontology',
      focus: 'Computer-guided implant placement, 3D bone grafting, periodontal gum therapy, and surgical extractions.',
      bio: 'Dr. Lee is a board-certified periodontist with a master’s degree in implantology. He specializes in restorative gum surgery and jaw bone reconstructions, translating complex anatomical scans into highly precise, comfortable implant plans.'
    },
    {
      slug: 'dr-sarah-patel',
      name: 'Dr. Sarah Patel, DDS, MS',
      role: 'Orthodontic Specialist',
      specialty: 'Orthodontics & Dentofacial Orthopedics',
      credentials: 'Columbia University School of Dental Medicine, Member of AAO',
      focus: 'Invisalign® clear aligner planning, digital bite simulations, and pediatric interceptive growth guidance.',
      bio: 'Dr. Patel focuses on bite mechanics and alignment aesthetics for children and adults. She designs custom clear aligner plans that minimize treatment duration while ensuring optimal jaw joint comfort.'
    }
  ];

  const staff = [
    {
      name: 'Elena Rostova, RDH',
      role: 'Registered Dental Hygienist',
      experience: '8 Years Experience',
      statement: 'I love helping patients understand the oral-systemic health connection and showing them that cleanings can be comfortable and pain-free.'
    },
    {
      name: 'Marcus Vance, RDH',
      role: 'Registered Dental Hygienist',
      experience: '5 Years Experience',
      statement: 'My goal is to make every cleaning patient-centered and thorough. I specialize in deep cleanings and scaling for active gum disease management.'
    },
    {
      name: 'Sophia Castillo',
      role: 'Lead Dental Assistant (RDA)',
      experience: '6 Years Experience',
      statement: 'I assist our doctors during cosmetic and surgical procedures, ensuring our patients feel calm, relaxed, and fully cared for during their visits.'
    },
    {
      name: 'Clara Henderson',
      role: 'Office Manager & Billing Director',
      experience: '10 Years Experience',
      statement: 'I help patients navigate their PPO insurance claims, explain financing options, and coordinate scheduling to keep appointments seamless.'
    }
  ];

  return (
    <div className="team-page fade-in">
      {/* Hero */}
      <section className="team-hero text-center">
        <div className="container">
          <span className="badge badge-accent">Our Providers & Staff</span>
          <h1>Meet the Affordable Dental Team</h1>
          <p className="hero-p">
            Our practice brings together general practitioners, pediatric experts, implant specialists, and orthodontists under one roof, backed by warm, experienced hygienists and office managers.
          </p>
        </div>
      </section>

      {/* Clinical Doctors Section */}
      <section className="section doctors-section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-accent">Clinical Specialists</span>
            <h2>Our Dental Providers</h2>
            <p>Qualified specialists with recognized credentials and a shared commitment to gentle, patient-focused clinical care.</p>
          </div>

          <div className="grid-2 doctors-grid">
            {doctors.map((doc, idx) => (
              <div key={idx} className="card doctor-card">
                <div className="doctor-card-body">
                  <div className="doctor-avatar-mock">
                    <span className="avatar-letter">{doc.name.substring(4, 5)}</span>
                  </div>
                  
                  <div className="doctor-info">
                    <span className="doc-specialty">{doc.specialty}</span>
                    <h3>{doc.name}</h3>
                    <p className="doc-role">{doc.role}</p>
                    <p className="doc-credentials"><strong>Education:</strong> {doc.credentials}</p>
                    <p className="doc-focus"><strong>Clinical Focus:</strong> {doc.focus}</p>
                    <p className="doc-bio">{doc.bio}</p>
                  </div>
                </div>

                <div className="doctor-card-footer">
                  <Link to={`/team/${doc.slug}`} className="btn btn-outline btn-sm">
                    View Complete Profile
                  </Link>
                  <Link to="/appointment" className="btn btn-primary btn-sm">
                    Book Consult
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Staff Section */}
      <section className="section staff-section bg-cream">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-accent">Office Support</span>
            <h2>Our Hygienists & Support Staff</h2>
            <p>The friendly faces who welcome you, keep your cleanings comfortable, and help manage your appointments and financing.</p>
          </div>

          <div className="grid-4 staff-grid">
            {staff.map((member, idx) => (
              <div key={idx} className="card staff-card">
                <div className="staff-avatar-mock">
                  <span>{member.name.substring(0, 1)}</span>
                </div>
                <h3>{member.name}</h3>
                <span className="staff-role">{member.role}</span>
                <span className="staff-experience">{member.experience}</span>
                <div className="staff-divider"></div>
                <p className="staff-statement">"{member.statement}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Callout */}
      <section className="section team-callout text-center">
        <div className="container">
          <h2>Patient-Centered Care is Our Foundation</h2>
          <p style={{ maxWidth: '600px', margin: '16px auto 32px', color: 'var(--text-secondary)' }}>
            We work as a single, coordinated team to ensure you receive consistent dental advice, upfront pricing guides, and absolute comfort during every visit.
          </p>
          <div className="callout-actions flex-center" style={{ gap: '16px' }}>
            <Link to="/contact" className="btn btn-primary">Contact Our Office</Link>
            <a href="tel:8185550199" className="btn btn-secondary">Call (818) 555-0199</a>
          </div>
        </div>
      </section>

      <style>{`
        .team-hero {
          padding: 80px 0 60px;
          background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
        }
        .doctors-grid {
          gap: 32px;
        }
        .doctor-card {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .doctor-card:hover {
          transform: translateY(-4px);
        }
        .doctor-card-body {
          display: flex;
          gap: 24px;
        }
        .doctor-avatar-mock {
          width: 120px;
          height: 120px;
          border-radius: var(--radius-md);
          background-color: var(--bg-neutral-light);
          color: var(--color-teal);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          flex-shrink: 0;
          border: 1px solid var(--border-color);
        }
        .doctor-info {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .doc-specialty {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--color-teal);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .doctor-info h3 {
          font-size: 1.35rem;
        }
        .doc-role {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .doc-credentials, .doc-focus {
          font-size: 0.88rem;
          line-height: 1.4;
          color: var(--text-primary);
        }
        .doc-bio {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-top: 8px;
        }
        .doctor-card-footer {
          display: flex;
          justify-content: space-between;
          border-top: 1px solid var(--border-color);
          padding-top: 16px;
          align-items: center;
        }

        /* Support Staff */
        .staff-card {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .staff-avatar-mock {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background-color: var(--color-teal-light);
          color: var(--color-teal);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          margin-bottom: 16px;
          border: 1px solid rgba(13, 148, 136, 0.1);
        }
        .staff-card h3 {
          font-size: 1.15rem;
          margin-bottom: 4px;
        }
        .staff-role {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--color-teal);
        }
        .staff-experience {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        .staff-divider {
          width: 30px;
          height: 1px;
          background-color: var(--border-color);
          margin: 12px 0;
        }
        .staff-statement {
          font-size: 0.85rem;
          font-style: italic;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        @media (max-width: 1024px) {
          .doctor-card-body {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .doctor-avatar-mock {
            width: 100px;
            height: 100px;
            font-size: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
}
