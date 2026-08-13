import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ShieldAlert, Star } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Footer() {
  const { officeSettings } = useAppContext();
  const currentYear = new Date().getFullYear();
  const phoneTel = officeSettings.phone.replace(/[^0-9]/g, '');

  return (
    <footer className="global-footer">
      <div className="container footer-top">
        {/* Column 1: Info & Reviews */}
        <div className="footer-col footer-col-info">
          <Link to="/" className="footer-logo">
            <div className="logo-icon-sm">AD</div>
            <span className="logo-name">Affordable Dental</span>
          </Link>
          <p className="footer-tagline">
            Providing trusted, multi-specialty dental care for families in Van Nuys, California under one roof. Comfort-focused, high-technology treatments.
          </p>
          <div className="footer-ratings">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="var(--color-gold)" color="var(--color-gold)" />
              ))}
            </div>
            <span className="rating-text">4.9/5 stars from 450+ verified patient reviews on Google</span>
          </div>
        </div>

        {/* Column 2: Services */}
        <div className="footer-col">
          <h4 className="footer-heading">Services</h4>
          <ul className="footer-links">
            <li><Link to="/services/general-dentistry">General Dentistry</Link></li>
            <li><Link to="/services/pediatric-dentistry">Pediatric Dentistry</Link></li>
            <li><Link to="/services/cosmetic-dentistry">Cosmetic Care</Link></li>
            <li><Link to="/services/dental-implants">Dental Implants</Link></li>
            <li><Link to="/services/restorative-dentistry">Restorative Care</Link></li>
            <li><Link to="/services/orthodontics">Orthodontics</Link></li>
            <li><Link to="/services/endodontics">Endodontics</Link></li>
            <li><Link to="/services/periodontics">Periodontics</Link></li>
          </ul>
        </div>

        {/* Column 3: Patient Info */}
        <div className="footer-col">
          <h4 className="footer-heading">Resources</h4>
          <ul className="footer-links">
            <li><Link to="/patient-info">Resources Hub</Link></li>
            <li><Link to="/financing">Insurance & Financing</Link></li>
            <li><Link to="/offers">Special Offers</Link></li>
            <li><Link to="/gallery">Smile Gallery</Link></li>
            <li><Link to="/reviews">Patient Reviews</Link></li>
            <li><Link to="/emergency" className="text-emergency-footer"><ShieldAlert size={14} className="inline-icon" /> Emergency Guide</Link></li>
            <li><Link to="/blog">Blog & Education</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact & Hours */}
        <div className="footer-col footer-col-contact">
          <h4 className="footer-heading">Contact Us</h4>
          <ul className="contact-details">
            <li>
              <MapPin size={18} className="footer-icon" />
              <span>{officeSettings.address.split(',')[0]}<br />{officeSettings.address.split(',').slice(1).join(',')}</span>
            </li>
            <li>
              <Phone size={18} className="footer-icon" />
              <a href={`tel:${phoneTel}`}>{officeSettings.phone}</a>
            </li>
            <li>
              <Mail size={18} className="footer-icon" />
              <a href={`mailto:${officeSettings.email}`}>{officeSettings.email}</a>
            </li>
            <li>
              <Clock size={18} className="footer-icon" />
              <span style={{ whiteSpace: 'pre-line' }}>{officeSettings.hoursFull}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <div className="seo-copy">
          <p>
            <strong>Serving Communities:</strong> Affordable Dental proudly serves patients in Van Nuys, CA, and surrounding areas including Sherman Oaks, Valley Glen, Panorama City, North Hollywood, and the greater San Fernando Valley. Our multi-specialty office accommodates dental implants, cosmetic transformations, family cleanings, root canals, and emergency dentistry.
          </p>
        </div>
        <div className="footer-legal">
          <p>&copy; {currentYear} Affordable Dental. All Rights Reserved.</p>
          <div className="legal-links">
            <Link to="/patient-info">Privacy Policy</Link>
            <span className="separator">|</span>
            <Link to="/patient-info">Terms & Conditions</Link>
            <span className="separator">|</span>
            <Link to="/contact">Directions</Link>
          </div>
        </div>
      </div>

      <style>{`
        .global-footer {
          background-color: var(--bg-neutral-dark);
          color: var(--text-light);
          padding: 80px 0 30px;
          font-size: 0.95rem;
          border-top: 4px solid var(--color-teal);
        }
        .footer-top {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 40px;
          margin-bottom: 50px;
        }
        .footer-col-info {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--text-light);
        }
        .logo-name {
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 1.25rem;
        }
        .footer-tagline {
          color: #94A3B8;
          font-size: 0.95rem;
          line-height: 1.6;
        }
        .footer-ratings {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .stars {
          display: flex;
          gap: 2px;
        }
        .rating-text {
          font-size: 0.85rem;
          color: #94A3B8;
        }
        .footer-heading {
          font-family: 'Outfit', sans-serif;
          color: var(--text-light);
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 24px;
          position: relative;
        }
        .footer-heading::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -8px;
          width: 30px;
          height: 2px;
          background-color: var(--color-teal);
        }
        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .footer-links a {
          color: #94A3B8;
          transition: var(--transition-fast);
        }
        .footer-links a:hover {
          color: var(--color-teal);
          transform: translateX(4px);
        }
        .text-emergency-footer {
          color: #F87171 !important;
          font-weight: 600;
        }
        .text-emergency-footer:hover {
          color: #EF4444 !important;
        }
        .inline-icon {
          display: inline;
          vertical-align: middle;
          margin-right: 4px;
        }
        .contact-details {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .contact-details li {
          display: flex;
          gap: 12px;
          color: #94A3B8;
          line-height: 1.5;
        }
        .footer-icon {
          color: var(--color-teal);
          flex-shrink: 0;
          margin-top: 3px;
        }
        .contact-details a {
          color: #94A3B8;
        }
        .contact-details a:hover {
          color: var(--color-teal);
        }

        /* Footer Bottom Area */
        .footer-bottom {
          padding-top: 30px;
          border-top: 1px solid #334155;
        }
        .seo-copy {
          color: #64748B;
          font-size: 0.82rem;
          margin-bottom: 24px;
          line-height: 1.6;
        }
        .footer-legal {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          font-size: 0.85rem;
          color: #64748B;
        }
        .legal-links {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .legal-links a {
          color: #64748B;
        }
        .legal-links a:hover {
          color: var(--color-teal);
        }
        .separator {
          color: #334155;
        }

        @media (max-width: 1024px) {
          .footer-top {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
        }
        @media (max-width: 640px) {
          .footer-top {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .global-footer {
            padding: 60px 0 80px; /* Leave room for mobile bottom sticky nav */
          }
        }
      `}</style>
    </footer>
  );
}
