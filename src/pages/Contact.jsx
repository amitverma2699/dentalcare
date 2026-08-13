import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, ShieldAlert, Navigation } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Contact() {
  const { officeSettings } = useAppContext();
  const phoneTel = officeSettings.phone.replace(/[^0-9]/g, '');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    smsConsent: false
  });
  const [errors, setErrors] = useState({});

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (!formData.smsConsent) newErrors.smsConsent = 'SMS consent is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setFormSubmitted(true);
  };

  return (
    <div className="contact-page fade-in">
      {/* Hero */}
      <section className="contact-hero text-center">
        <div className="container">
          <span className="badge badge-accent">Contact Portal</span>
          <h1>Contact Our Van Nuys Office</h1>
          <p className="hero-p" style={{ maxWidth: '600px', margin: '16px auto 0' }}>
            Reach out with any general questions, scheduling concerns, or insurance inquiries. We are here to help you.
          </p>
        </div>
      </section>

      {/* Details & Map */}
      <section className="section bg-cream">
        <div className="container grid-2" style={{ gridTemplateColumns: '1.2fr 1fr', gap: '40px' }}>
          
          {/* Map Mockup & Parking */}
          <div className="contact-map-card card">
            <h3>Our Location</h3>
            <p style={{ margin: '8px 0 24px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Find driving directions and client parking details below.</p>
            
            <div className="map-embed-mock">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3299.704253158022!2d-118.4485744847809!3d34.184379680570395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2977b311394bf%3A0xe5f9c49d885a0659!2s6251%20Van%20Nuys%20Blvd%2C%20Van%20Nuys%2C%20CA%2091401!5e0!3m2!1sen!2sus!4v1689255000000!5m2!1sen!2sus" 
                width="100%" 
                height="250" 
                style={{ border: 0, borderRadius: 'var(--radius-md)', display: 'block' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade" 
                title="Affordable Dental Google Map"
              ></iframe>
            </div>

            <div className="parking-directions" style={{ marginTop: '24px' }}>
              <div className="direction-item">
                <Navigation size={18} className="dir-icon" />
                <div>
                  <h4>Directions & Free Onsite Parking</h4>
                  <p>We are situated on Van Nuys Blvd. Client parking is free and located in the dedicated lot directly behind our dental office building.</p>
                </div>
              </div>
            </div>
            
            <a href={`https://maps.google.com/?q=${encodeURIComponent(officeSettings.address)}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ width: '100%', marginTop: '20px' }}>
              Get Driving Directions
            </a>
          </div>

          {/* Details Column */}
          <div className="contact-details-col">
            <div className="card details-list-card">
              <h3>Office Information</h3>
              <ul className="info-card-list">
                <li>
                  <MapPin className="info-list-icon" />
                  <div>
                    <h4>Office Address</h4>
                    <p>{officeSettings.address.split(',')[0]}<br />{officeSettings.address.split(',').slice(1).join(',')}</p>
                  </div>
                </li>
                <li>
                  <Phone className="info-list-icon" />
                  <div>
                    <h4>Phone Number</h4>
                    <p><a href={`tel:${phoneTel}`}>{officeSettings.phone}</a></p>
                  </div>
                </li>
                <li>
                  <Mail className="info-list-icon" />
                  <div>
                    <h4>Email Address</h4>
                    <p><a href={`mailto:${officeSettings.email}`}>{officeSettings.email}</a></p>
                  </div>
                </li>
                <li>
                  <Clock className="info-list-icon" />
                  <div>
                    <h4>Working Hours</h4>
                    <p style={{ whiteSpace: 'pre-line' }}>{officeSettings.hoursFull}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* Secure Contact Form */}
      <section className="section contact-form-sec">
        <div className="container grid-2" style={{ gridTemplateColumns: '1fr 1.2fr', gap: '50px' }}>
          
          {/* Urgent Care Sidebar */}
          <div className="urgent-care-sidebar">
            <div className="card urgent-sidebar-card">
              <span className="badge badge-emergency">Urgent Care</span>
              <h3>Dental Emergency?</h3>
              <p style={{ margin: '12px 0 24px', fontSize: '0.92rem', lineHeight: '1.6' }}>
                If you are experiencing severe toothache, swelling, bleeding, or a broken tooth, please do not use this general contact form. It may take up to 24 hours to reply.
              </p>
              <a href={`tel:${phoneTel}`} className="btn btn-emergency" style={{ width: '100%' }}>
                <Phone size={16} /> Call Emergency Line
              </a>
            </div>
          </div>

          {/* Form */}
          <div>
            <div className="card contact-form-card">
              {!formSubmitted ? (
                <form onSubmit={handleSubmit} className="c-form">
                  <h3>Send a Message</h3>
                  <p style={{ marginBottom: '24px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Send us a secure inquiry, and our reception desk will reply shortly.</p>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contactName">Your Name</label>
                    <input
                      id="contactName"
                      type="text"
                      placeholder="Elena"
                      className="form-control"
                      value={formData.name}
                      onChange={(e) => handleFieldChange('name', e.target.value)}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>

                  <div className="grid-2" style={{ gap: '20px', marginBottom: '10px' }}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="contactPhone">Phone Number</label>
                      <input
                        id="contactPhone"
                        type="tel"
                        placeholder="(818) 555-0199"
                        className="form-control"
                        value={formData.phone}
                        onChange={(e) => handleFieldChange('phone', e.target.value)}
                      />
                      {errors.phone && <span className="error-message">{errors.phone}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="contactEmail">Email Address</label>
                      <input
                        id="contactEmail"
                        type="email"
                        placeholder="elena@example.com"
                        className="form-control"
                        value={formData.email}
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                      />
                      {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="contactMsg">Message</label>
                    <textarea
                      id="contactMsg"
                      placeholder="Type your question regarding insurance, billing, or general care here..."
                      className="form-control"
                      value={formData.message}
                      onChange={(e) => handleFieldChange('message', e.target.value)}
                    />
                    {errors.message && <span className="error-message">{errors.message}</span>}
                  </div>

                  <div className="form-group sms-consent-box">
                    <label className="sms-label">
                      <input
                        type="checkbox"
                        className="sms-checkbox"
                        checked={formData.smsConsent}
                        onChange={(e) => handleFieldChange('smsConsent', e.target.checked)}
                      />
                      <span className="sms-text">
                        I consent to receive automated appointment notifications and office messages via text message at the phone number provided. Message & data rates may apply. Reply STOP to opt-out. See our Privacy Policy.
                      </span>
                    </label>
                    {errors.smsConsent && <span className="error-message">{errors.smsConsent}</span>}
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    Send Message
                  </button>
                </form>
              ) : (
                <div className="contact-success text-center fade-in" style={{ padding: '30px 0' }}>
                  <div className="success-icon-wrapper" style={{ color: 'var(--color-teal)', marginBottom: '16px' }}>
                    <CheckCircle />
                  </div>
                  <h3>Message Sent Successfully!</h3>
                  <p style={{ margin: '12px 0 24px', fontSize: '0.95rem' }}>Thank you, <strong>{formData.name}</strong>. We have received your inquiry and will follow up within one business day.</p>
                  <button type="button" className="btn btn-outline" onClick={() => setFormSubmitted(false)}>
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {styleStyles}
    </div>
  );
}

const styleStyles = (
  <style>{`
    .contact-hero {
      padding: 80px 0 60px;
      background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
    }
    .map-embed-mock {
      height: 250px;
      background-color: #E2E8F0;
      border-radius: var(--radius-md);
      color: var(--text-secondary);
      border: 1px solid var(--border-color);
    }
    .direction-item {
      display: flex;
      gap: 12px;
    }
    .dir-icon {
      color: var(--color-teal);
      flex-shrink: 0;
      margin-top: 2px;
    }
    .direction-item h4 {
      font-size: 0.95rem;
      margin-bottom: 4px;
    }
    .direction-item p {
      font-size: 0.82rem;
      color: var(--text-secondary);
      line-height: 1.4;
    }

    /* Details List */
    .details-list-card {
      border-left: 4px solid var(--color-teal);
    }
    .info-card-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 24px;
      margin-top: 24px;
    }
    .info-card-list li {
      display: flex;
      gap: 16px;
    }
    .info-list-icon {
      color: var(--color-teal);
      flex-shrink: 0;
      margin-top: 3px;
    }
    .info-card-list h4 {
      font-size: 1.05rem;
      margin-bottom: 4px;
    }
    .info-card-list p {
      font-size: 0.95rem;
      line-height: 1.5;
    }
    .info-card-list a {
      color: var(--text-primary);
    }
    .info-card-list a:hover {
      color: var(--color-teal);
    }

    /* Urgent Care Sidebar */
    .urgent-sidebar-card {
      border: 1px solid rgba(185, 28, 28, 0.15);
      background-color: var(--color-emergency-light);
    }
    .urgent-sidebar-card h3 {
      color: var(--color-emergency);
      margin-top: 12px;
    }

    /* Form Card */
    .contact-form-card {
      border-top: 4px solid var(--color-teal);
    }
    .sms-consent-box {
      background-color: var(--bg-primary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 16px;
      margin-bottom: 24px;
    }
    .sms-label {
      display: flex;
      gap: 12px;
      cursor: pointer;
    }
    .sms-checkbox {
      width: 18px;
      height: 18px;
      margin-top: 3px;
      accent-color: var(--color-teal);
    }
    .sms-text {
      font-size: 0.8rem;
      color: var(--text-secondary);
      line-height: 1.5;
    }

    @media (max-width: 1024px) {
      .contact-page .grid-2 {
        grid-template-columns: 1fr !important;
      }
      .urgent-care-sidebar {
        margin-bottom: 30px;
      }
    }
  `}</style>
);

function CheckCircle({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
