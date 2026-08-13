import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ChevronDown, Phone, Calendar, ArrowRight, ShieldAlert } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function MobileNav({ isOpen, onClose }) {
  const { officeSettings } = useAppContext();
  const phoneTel = officeSettings.phone.replace(/[^0-9]/g, '');
  const [expandedSection, setExpandedSection] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Close menu when location changes
    onClose();
  }, [location]);

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <>
      {/* Drawer Overlay */}
      <div className={`mobile-nav-overlay ${isOpen ? 'show-overlay' : ''}`} onClick={onClose} />

      {/* Drawer Container */}
      <div className={`mobile-nav-drawer ${isOpen ? 'show-drawer' : ''}`}>
        <div className="drawer-header">
          <Link to="/" className="drawer-logo" onClick={onClose}>
            <div className="logo-icon-sm">AD</div>
            <span className="logo-name">Affordable Dental</span>
          </Link>
          <button className="close-btn" onClick={onClose} aria-label="Close menu">
            <X size={24} />
          </button>
        </div>

        <div className="drawer-content">
          <ul className="drawer-links">
            <li>
              <Link to="/" className={`drawer-link ${location.pathname === '/' ? 'active' : ''}`}>
                Home
              </Link>
            </li>

            {/* Services accordion */}
            <li>
              <button 
                className={`drawer-link accordion-trigger ${location.pathname.startsWith('/services') ? 'active' : ''}`}
                onClick={() => toggleSection('services')}
              >
                Services <ChevronDown size={16} className={`chevron-mob ${expandedSection === 'services' ? 'rotate' : ''}`} />
              </button>
              <div className={`drawer-accordion ${expandedSection === 'services' ? 'expand' : ''}`}>
                <ul className="drawer-sublinks">
                  <li><Link to="/services">All Services</Link></li>
                  <li><Link to="/services/general-dentistry">General Dentistry</Link></li>
                  <li><Link to="/services/pediatric-dentistry">Pediatric Dentistry</Link></li>
                  <li><Link to="/services/cosmetic-dentistry">Cosmetic Dentistry</Link></li>
                  <li><Link to="/services/dental-implants">Dental Implants</Link></li>
                  <li><Link to="/services/restorative-dentistry">Restorative Care</Link></li>
                  <li><Link to="/services/orthodontics">Orthodontics</Link></li>
                  <li><Link to="/services/endodontics">Endodontics</Link></li>
                  <li><Link to="/services/periodontics">Periodontics</Link></li>
                  <li><Link to="/services/oral-surgery">Oral Surgery</Link></li>
                </ul>
              </div>
            </li>

            <li>
              <Link to="/services#why-choose-us" className="drawer-link">
                Why Us
              </Link>
            </li>

            <li>
              <Link to="/team" className={`drawer-link ${location.pathname === '/team' ? 'active' : ''}`}>
                Our Team
              </Link>
            </li>

            {/* Patient Info accordion */}
            <li>
              <button 
                className={`drawer-link accordion-trigger ${location.pathname.startsWith('/patient-info') || location.pathname === '/financing' || location.pathname === '/offers' || location.pathname === '/gallery' ? 'active' : ''}`}
                onClick={() => toggleSection('patientInfo')}
              >
                Patient Info <ChevronDown size={16} className={`chevron-mob ${expandedSection === 'patientInfo' ? 'rotate' : ''}`} />
              </button>
              <div className={`drawer-accordion ${expandedSection === 'patientInfo' ? 'expand' : ''}`}>
                <ul className="drawer-sublinks">
                  <li><Link to="/patient-info">Resources Hub</Link></li>
                  <li><Link to="/financing">Insurance & Financing</Link></li>
                  <li><Link to="/offers">Special Offers</Link></li>
                  <li><Link to="/gallery">Smile Gallery</Link></li>
                </ul>
              </div>
            </li>

            <li>
              <Link to="/reviews" className={`drawer-link ${location.pathname === '/reviews' ? 'active' : ''}`}>
                Reviews
              </Link>
            </li>

            <li>
              <Link to="/blog" className={`drawer-link ${location.pathname.startsWith('/blog') ? 'active' : ''}`}>
                Blog
              </Link>
            </li>

            <li>
              <Link to="/contact" className={`drawer-link ${location.pathname === '/contact' ? 'active' : ''}`}>
                Contact
              </Link>
            </li>

            <li>
              <Link to="/emergency" className="drawer-link drawer-emergency-link">
                <ShieldAlert size={16} /> Emergency Dentistry
              </Link>
            </li>
          </ul>
        </div>

        <div className="drawer-footer">
          <div className="drawer-cta-buttons">
            <a href={`tel:${phoneTel}`} className="drawer-btn btn-call">
              <Phone size={18} /> Call {officeSettings.phone}
            </a>
            <Link to="/appointment" className="drawer-btn btn-book-mob">
              <Calendar size={18} /> Book Appointment
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .mobile-nav-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(30, 34, 41, 0.4);
          z-index: 1000;
          opacity: 0;
          visibility: hidden;
          transition: var(--transition-normal);
        }
        .show-overlay {
          opacity: 1;
          visibility: visible;
        }
        .mobile-nav-drawer {
          position: fixed;
          top: 0;
          right: 0;
          width: 85%;
          max-width: 380px;
          height: 100%;
          background-color: var(--bg-secondary);
          z-index: 1001;
          box-shadow: var(--shadow-lg);
          transform: translateX(100%);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
        }
        .show-drawer {
          transform: translateX(0);
        }
        .drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid var(--border-color);
        }
        .drawer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .logo-icon-sm {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-sm);
          background-color: var(--color-teal);
          color: var(--text-light);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 1rem;
        }
        .logo-name {
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
          color: var(--text-primary);
        }
        .close-btn {
          background: none;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
          padding: 4px;
        }
        .drawer-content {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
        }
        .drawer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .drawer-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 12px 16px;
          font-size: 1.05rem;
          font-weight: 500;
          color: var(--text-secondary);
          border: none;
          background: none;
          text-align: left;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: var(--transition-fast);
        }
        .drawer-link:hover, .drawer-link.active {
          background-color: var(--color-teal-light);
          color: var(--color-teal);
        }
        .drawer-emergency-link {
          color: var(--color-emergency);
          background-color: var(--color-emergency-light);
        }
        .drawer-emergency-link:hover {
          background-color: #FEE2E2;
          color: var(--color-emergency);
        }
        .accordion-trigger {
          cursor: pointer;
        }
        .chevron-mob {
          transition: var(--transition-fast);
        }
        .chevron-mob.rotate {
          transform: rotate(180deg);
        }
        .drawer-accordion {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-out;
        }
        .drawer-accordion.expand {
          max-height: 400px;
          overflow-y: auto;
        }
        .drawer-sublinks {
          list-style: none;
          padding-left: 20px;
          margin-top: 4px;
          margin-bottom: 8px;
          border-left: 1px solid var(--border-color);
        }
        .drawer-sublinks li a {
          display: block;
          padding: 8px 16px;
          font-size: 0.95rem;
          color: var(--text-secondary);
          border-radius: var(--radius-sm);
        }
        .drawer-sublinks li a:hover {
          color: var(--color-teal);
          background-color: var(--bg-primary);
        }
        .drawer-footer {
          padding: 24px;
          border-top: 1px solid var(--border-color);
          background-color: var(--bg-primary);
        }
        .drawer-cta-buttons {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .drawer-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px;
          border-radius: var(--radius-full);
          font-weight: 500;
          font-size: 1rem;
        }
        .btn-call {
          background-color: var(--bg-secondary);
          color: var(--text-primary);
          border: 1px solid var(--border-color);
        }
        .btn-call:hover {
          background-color: var(--border-color);
        }
        .btn-book-mob {
          background-color: var(--color-teal);
          color: var(--text-light);
        }
        .btn-book-mob:hover {
          background-color: var(--color-teal-hover);
        }
      `}</style>
    </>
  );
}
