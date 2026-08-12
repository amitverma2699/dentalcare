import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Calendar, Phone, Menu, X, ShieldAlert } from 'lucide-react';

export default function Navbar({ onMobileMenuToggle }) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mega menus on page change
  useEffect(() => {
    setActiveDropdown(null);
  }, [location]);

  const toggleDropdown = (name) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  return (
    <header className={`main-header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="container nav-container">
        {/* Brand Logo */}
        <Link to="/" className="logo-area">
          <div className="logo-icon">AD</div>
          <div className="logo-text">
            <span className="brand-name">Affordable Dental</span>
            <span className="brand-sub">Multi-Specialty Care</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul className="nav-links">
            <li>
              <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                Home
              </Link>
            </li>
            
            {/* Services Mega Menu Trigger */}
            <li 
              className="has-dropdown services-trigger"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link to="/services" className={`nav-link ${location.pathname.startsWith('/services') ? 'active' : ''}`}>
                Services <ChevronDown size={14} className={`chevron ${activeDropdown === 'services' ? 'rotate' : ''}`} />
              </Link>
              
              {/* Services Mega Menu Overlay */}
              <div className={`mega-menu ${activeDropdown === 'services' ? 'mega-menu-open' : ''}`}>
                <div className="mega-menu-content">
                  <div className="mega-grid">
                    {/* Category 1 */}
                    <div className="mega-column">
                      <h4 className="mega-title">General Care</h4>
                      <ul className="mega-links">
                        <li><Link to="/services/general-dentistry">General Dentistry</Link></li>
                        <li><Link to="/services/endodontics">Root Canals (Endodontics)</Link></li>
                        <li><Link to="/services/periodontics">Gum Care (Periodontics)</Link></li>
                        <li><Link to="/emergency">Emergency Treatment</Link></li>
                      </ul>
                    </div>

                    {/* Category 2 */}
                    <div className="mega-column">
                      <h4 className="mega-title">Pediatric Dentistry</h4>
                      <ul className="mega-links">
                        <li><Link to="/services/pediatric-dentistry">Children's Dentistry</Link></li>
                        <li><Link to="/services/pediatric-dentistry#first-visit">Your Child's First Visit</Link></li>
                        <li><Link to="/services/pediatric-dentistry#prevention">Cavity Prevention</Link></li>
                      </ul>
                    </div>

                    {/* Category 3 */}
                    <div className="mega-column">
                      <h4 className="mega-title">Cosmetic & Ortho</h4>
                      <ul className="mega-links">
                        <li><Link to="/services/cosmetic-dentistry">Cosmetic Dentistry</Link></li>
                        <li><Link to="/services/orthodontics">Braces & Invisalign</Link></li>
                        <li><Link to="/services/cosmetic-dentistry#whitening">Teeth Whitening</Link></li>
                      </ul>
                    </div>

                    {/* Category 4 */}
                    <div className="mega-column">
                      <h4 className="mega-title">Restoration & Implants</h4>
                      <ul className="mega-links">
                        <li><Link to="/services/dental-implants">Dental Implants</Link></li>
                        <li><Link to="/services/restorative-dentistry">Crowns, Bridges & Dentures</Link></li>
                        <li><Link to="/services/oral-surgery">Oral & Maxillofacial Surgery</Link></li>
                      </ul>
                    </div>
                  </div>
                  <div className="mega-menu-footer">
                    <div className="mega-footer-content">
                      <span className="emergency-highlight">
                        <ShieldAlert size={16} /> Dental Pain? We provide same-day emergency relief.
                      </span>
                      <Link to="/emergency" className="mega-footer-link">Emergency Guide →</Link>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            {/* Why Choose Us */}
            <li>
              <Link to="/services#why-choose-us" className="nav-link">
                Why Us
              </Link>
            </li>

            {/* Our Team */}
            <li>
              <Link to="/team" className={`nav-link ${location.pathname === '/team' ? 'active' : ''}`}>
                Our Team
              </Link>
            </li>

            {/* Patient Info Dropdown */}
            <li 
              className="has-dropdown"
              onMouseEnter={() => setActiveDropdown('patientInfo')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link to="/patient-info" className={`nav-link ${location.pathname.startsWith('/patient-info') || location.pathname === '/financing' || location.pathname === '/offers' || location.pathname === '/gallery' ? 'active' : ''}`}>
                Patient Info <ChevronDown size={14} className={`chevron ${activeDropdown === 'patientInfo' ? 'rotate' : ''}`} />
              </Link>
              <ul className={`dropdown-menu ${activeDropdown === 'patientInfo' ? 'dropdown-open' : ''}`}>
                <li><Link to="/patient-info">Resources Hub</Link></li>
                <li><Link to="/financing">Insurance & Financing</Link></li>
                <li><Link to="/offers">Special Offers</Link></li>
                <li><Link to="/gallery">Smile Gallery</Link></li>
              </ul>
            </li>

            {/* Reviews */}
            <li>
              <Link to="/reviews" className={`nav-link ${location.pathname === '/reviews' ? 'active' : ''}`}>
                Reviews
              </Link>
            </li>

            {/* Blog */}
            <li>
              <Link to="/blog" className={`nav-link ${location.pathname.startsWith('/blog') ? 'active' : ''}`}>
                Blog
              </Link>
            </li>

            {/* Contact */}
            <li>
              <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Action CTAs */}
        <div className="nav-ctas">
          <a href="tel:8185550199" className="nav-cta-btn btn-phone" aria-label="Call Office">
            <Phone size={16} />
            <span>Call Office</span>
          </a>
          <Link to="/appointment" className="nav-cta-btn btn-book">
            <Calendar size={16} />
            <span>Book Visit</span>
          </Link>
          <button className="mobile-menu-btn" onClick={onMobileMenuToggle} aria-label="Toggle Navigation Menu">
            <Menu size={24} />
          </button>
        </div>
      </div>

      <style>{`
        .main-header {
          position: sticky;
          top: 0;
          left: 0;
          width: 100%;
          background-color: var(--bg-secondary);
          z-index: 999;
          transition: var(--transition-normal);
          box-shadow: var(--shadow-sm);
        }
        .header-scrolled {
          box-shadow: var(--shadow-md);
          background-color: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(10px);
        }
        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 80px;
        }
        .logo-area {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .logo-icon {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          background-color: var(--color-teal);
          color: var(--text-light);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 1.3rem;
          box-shadow: 0 4px 12px rgba(13, 148, 136, 0.2);
        }
        .logo-text {
          display: flex;
          flex-direction: column;
        }
        .brand-name {
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 1.3rem;
          color: var(--text-primary);
          line-height: 1.1;
        }
        .brand-sub {
          font-size: 0.75rem;
          color: var(--color-teal);
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .desktop-nav {
          display: flex;
          align-items: center;
          height: 100%;
        }
        .nav-links {
          display: flex;
          list-style: none;
          align-items: center;
          height: 100%;
          gap: 4px;
        }
        .nav-links > li {
          height: 100%;
          display: flex;
          align-items: center;
          position: relative;
        }
        .nav-link {
          padding: 8px 14px;
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--text-secondary);
          border-radius: var(--radius-full);
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .nav-link:hover {
          color: var(--color-teal);
          background-color: var(--color-teal-light);
        }
        .nav-link.active {
          color: var(--color-teal);
          font-weight: 600;
          background-color: var(--color-teal-light);
        }
        .chevron {
          transition: var(--transition-fast);
        }
        .chevron.rotate {
          transform: rotate(180deg);
        }

        /* Dropdown Menu Style */
        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(10px);
          background-color: var(--bg-secondary);
          min-width: 220px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-lg);
          padding: 12px;
          list-style: none;
          opacity: 0;
          visibility: hidden;
          transition: var(--transition-normal);
        }
        .has-dropdown:hover .dropdown-menu,
        .dropdown-menu.dropdown-open {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }
        .dropdown-menu li a {
          display: block;
          padding: 10px 16px;
          font-size: 0.95rem;
          color: var(--text-secondary);
          border-radius: var(--radius-sm);
        }
        .dropdown-menu li a:hover {
          background-color: var(--bg-primary);
          color: var(--color-teal);
        }

        /* Mega Menu Styles */
        .mega-menu {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(10px);
          width: 900px;
          background-color: var(--bg-secondary);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-lg);
          opacity: 0;
          visibility: hidden;
          transition: var(--transition-normal);
          pointer-events: none;
        }
        .has-dropdown:hover .mega-menu,
        .mega-menu.mega-menu-open {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
          pointer-events: auto;
        }
        .mega-menu-content {
          padding: 32px;
        }
        .mega-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .mega-column h4 {
          font-family: 'Outfit', sans-serif;
          font-size: 0.95rem;
          color: var(--text-primary);
          margin-bottom: 14px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 8px;
        }
        .mega-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .mega-links a {
          font-size: 0.9rem;
          color: var(--text-secondary);
          display: block;
        }
        .mega-links a:hover {
          color: var(--color-teal);
          transform: translateX(4px);
        }
        .mega-menu-footer {
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid var(--border-color);
        }
        .mega-footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.88rem;
        }
        .emergency-highlight {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--color-emergency);
          font-weight: 600;
        }
        .mega-footer-link {
          color: var(--color-teal);
          font-weight: 600;
        }

        /* Nav CTAs */
        .nav-ctas {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .nav-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: var(--radius-full);
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition-normal);
        }
        .btn-phone {
          background-color: var(--bg-neutral-light);
          color: var(--text-primary);
        }
        .btn-phone:hover {
          background-color: var(--border-color);
        }
        .btn-book {
          background-color: var(--color-teal);
          color: var(--text-light);
        }
        .btn-book:hover {
          background-color: var(--color-teal-hover);
          box-shadow: 0 4px 12px rgba(13, 148, 136, 0.2);
        }
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
          padding: 4px;
        }

        @media (max-width: 1024px) {
          .desktop-nav {
            display: none;
          }
          .nav-cta-btn span {
            display: none;
          }
          .nav-cta-btn {
            padding: 10px;
          }
          .mobile-menu-btn {
            display: block;
          }
        }
      `}</style>
    </header>
  );
}
