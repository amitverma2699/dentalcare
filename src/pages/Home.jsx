import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, ShieldAlert, Award, Star, ArrowRight, Phone, Calendar, 
  Sparkles, Smile, Shield, Check, MapPin, Navigation, Clock 
} from 'lucide-react';
import BookingFlow from '../components/BookingFlow';
import { useAppContext } from '../context/AppContext';

export default function Home() {
  const { officeSettings, specialOffers, reviewsList } = useAppContext();
  const currentMonthYear = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const phoneTel = officeSettings.phone.replace(/[^0-9]/g, '');

  return (
    <div className="home-page fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="badge badge-accent">Comprehensive Family Dental Care</span>
            <h1>{officeSettings.tagline || 'Complete Dental Care for Your Whole Family — Under One Roof'}</h1>
            <p className="hero-support">
              {officeSettings.logoText || 'Affordable Dental'} provides premium general, cosmetic, pediatric, and specialty treatments in Van Nuys, CA. Our team of experienced specialists ensures a gentle, anxiety-free experience using state-of-the-art dental technology.
            </p>
            
            <div className="hero-actions">
              <Link to="/appointment" className="btn btn-primary">
                <Calendar size={18} /> Book Appointment
              </Link>
              <a href={`tel:${phoneTel}`} className="btn btn-secondary">
                <Phone size={18} /> Call {officeSettings.phone}
              </a>
            </div>

            {/* Trust Chips */}
            <div className="hero-chips">
              <div className="chip"><Check size={14} /> PPO Insurances Accepted</div>
              <div className="chip"><Check size={14} /> Denti-Cal Welcomed</div>
              <div className="chip"><Check size={14} /> 0% Financing Available</div>
              <div className="chip"><Check size={14} /> Same-Day Emergency Care</div>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="hero-visual-card">
              <div className="badge badge-accent visual-badge"><Sparkles size={14} /> Gentle Care First</div>
              <div className="visual-graphic" style={{ overflow: 'hidden', height: '100%', minHeight: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {officeSettings.heroImage ? (
                  <img src={officeSettings.heroImage} alt="Clinic Hero Visual" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
                ) : (
                  <Smile size={100} className="visual-icon-glow" />
                )}
              </div>
              <div className="visual-rating-card">
                <div className="stars-row">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="var(--color-gold)" color="var(--color-gold)" />)}
                </div>
                <span className="rating-num">4.9/5 Rating</span>
                <span className="rating-desc">Trusted by over 4,500+ local families</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="trust-strip-sec">
        <div className="container trust-strip">
          <div className="trust-item">
            <Award className="trust-icon" />
            <div className="trust-text">
              <h3>Multi-Specialty Office</h3>
              <p>Everything from cleanings to implants under one roof</p>
            </div>
          </div>
          <div className="trust-item">
            <Smile className="trust-icon" />
            <div className="trust-text">
              <h3>Family Friendly</h3>
              <p>Specialized treatments for children, adults & seniors</p>
            </div>
          </div>
          <div className="trust-item">
            <Shield className="trust-icon" />
            <div className="trust-text">
              <h3>Comfort-Focused Care</h3>
              <p>Sedation options & gentle therapies for anxious patients</p>
            </div>
          </div>
          <div className="trust-item">
            <ShieldAlert className="trust-icon text-emergency" />
            <div className="trust-text">
              <h3>Emergency Dentistry</h3>
              <p>Same-day pain relief & urgent repairs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="section services-section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-accent">Our Specialties</span>
            <h2>Complete Clinical Excellence</h2>
            <p>We organize our procedures into patient-friendly categories, ensuring you get the exact care you need without navigating clinical clutter.</p>
          </div>

          <div className="grid-3">
            {[
              { path: '/services/general-dentistry', title: 'General Dentistry', desc: 'Maintain clean, healthy teeth with cleanings, comprehensive digital exams, sealants, simple extractions, and home care education.', icon: '🦷' },
              { path: '/services/pediatric-dentistry', title: 'Pediatric Dentistry', desc: 'Anxiety-free childrens dentistry, developmental screenings, fluoride applications, and cavity-prevention habits designed just for kids.', icon: '👶' },
              { path: '/services/cosmetic-dentistry', title: 'Cosmetic Dentistry', desc: 'Transform your smile with porcelain veneers, custom whitening treatments, composite fillings, and complete smile enhancements.', icon: '✨' },
              { path: '/services/dental-implants', title: 'Dental Implants', desc: 'Permanent, premium tooth replacement utilizing implant-supported bridges, single-tooth implants, and hybrid dentures.', icon: '🔩' },
              { path: '/services/restorative-dentistry', title: 'Restorative Care', desc: 'Rebuild damaged teeth with porcelain crowns, high-strength dental bridges, and comfortable full or partial dentures.', icon: '🛠️' },
              { path: '/services/orthodontics', title: 'Orthodontics', desc: 'Straighten smiles comfortably using custom braces or clear, removable Invisalign® and SureSmile® clear aligners.', icon: '😬' },
              { path: '/services/endodontics', title: 'Endodontics (Root Canals)', desc: 'Save infected teeth and eliminate severe pain with gentle, modern root canal therapy and retreatment.', icon: '⚡' },
              { path: '/services/periodontics', title: 'Periodontics (Gum Care)', desc: 'Protect your jawbone and teeth from periodontal disease with scaling, root planing, and advanced gum therapy.', icon: '🌿' },
              { path: '/services/oral-surgery', title: 'Oral Surgery', desc: 'Wisdom tooth extractions, tooth removals, bone grafting, and TMJ therapies performed by qualified specialists.', icon: '🏥' }
            ].map((service, index) => (
              <div key={index} className="card service-card">
                <span className="service-emoji">{service.icon}</span>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <Link to={service.path} className="text-link">Learn More</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section why-us-section bg-cream">
        <div className="container grid-2">
          <div className="why-content">
            <span className="badge badge-accent">Why Choose Affordable Dental</span>
            <h2>Comprehensive Dental Care Made Convenient & Safe</h2>
            <p className="section-desc">
              We understand that selecting a dental practice is a personal decision. We’ve structured our practice to deliver high-quality, specialty care while prioritizing your comfort and financial convenience.
            </p>
            
            <ul className="why-list">
              <li>
                <div className="check-bullet"><Check size={16} /></div>
                <div>
                  <h4>Everything Under One Roof</h4>
                  <p>Skip driving all over the valley. Our team includes multiple specialists in general care, children's dentistry, implants, and orthodontics.</p>
                </div>
              </li>
              <li>
                <div className="check-bullet"><Check size={16} /></div>
                <div>
                  <h4>Sedation & Anxiety Relief</h4>
                  <p>We provide multiple sedation options and gentle techniques to keep your cleanings, fillings, or surgeries completely stress-free.</p>
                </div>
              </li>
              <li>
                <div className="check-bullet"><Check size={16} /></div>
                <div>
                  <h4>No Hidden Costs</h4>
                  <p>We work with most PPO insurance plans, accept Denti-Cal, and offer low-interest financing through CareCredit, so care fits your budget.</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="why-visual flex-center">
            <div className="why-badge-card card">
              <h3>Anxiety-Free Dentistry</h3>
              <p>We offer Nitrous Oxide (laughing gas) and oral conscious sedation to help nervous patients feel calm and relaxed during any procedure.</p>
              <div className="why-divider"></div>
              <div className="why-stat-row">
                <div className="why-stat">
                  <span className="stat-num">100%</span>
                  <span className="stat-lbl">Comfort Priority</span>
                </div>
                <div className="why-stat">
                  <span className="stat-num">0%</span>
                  <span className="stat-lbl">Judgment Zone</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="section tech-section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-accent">Modern Equipment</span>
            <h2>Advanced Technology for Better Outcomes</h2>
            <p>We invest in verified clinical technologies that translate directly into faster treatments, less radiation, and increased comfort for you.</p>
          </div>

          <div className="grid-4">
            <div className="card tech-card">
              <h4>Intraoral Scanners</h4>
              <p className="tech-benefit">No Messy Putty</p>
              <p>Creates precise, 3D digital impressions of your teeth in seconds, eliminating sticky, gag-inducing physical molds.</p>
            </div>
            <div className="card tech-card">
              <h4>CBCT 3D Imaging</h4>
              <p className="tech-benefit">Pinpoint Diagnostics</p>
              <p>Provides highly detailed 3D scans of bone, nerve paths, and soft tissues for ultra-precise implant planning.</p>
            </div>
            <div className="card tech-card">
              <h4>Digital X-Rays</h4>
              <p className="tech-benefit">90% Less Radiation</p>
              <p>Produces instant high-resolution jaw images while exposing you and your family to a fraction of traditional radiation levels.</p>
            </div>
            <div className="card tech-card">
              <h4>Soft Tissue Lasers</h4>
              <p className="tech-benefit">Faster, Painless Healing</p>
              <p>Performs precise gum therapies with virtually no bleeding, minimal discomfort, and significantly accelerated recovery times.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Special Offers */}
      <section className="section offers-section bg-cream">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-accent">Special Promotions</span>
            <h2>Affordable Dentistry Offers</h2>
            <p>Claim one of our current promotions during your next visit. Expirations update dynamically to serve active patients.</p>
          </div>

          <div className="grid-3">
            {specialOffers.slice(0, 3).map((offer, index) => (
              <div key={offer.id || index} className="card offer-card">
                <div className="offer-badge">{offer.badge}</div>
                <h3>{offer.title}</h3>
                <p className="offer-desc">{offer.desc}</p>
                <div className="offer-divider"></div>
                <div className="offer-footer">
                  <span className="expiry">Expires: {currentMonthYear}</span>
                  <Link to="/appointment" className="btn btn-outline btn-sm">Claim Offer</Link>
                </div>
              </div>
            ))}
          </div>

          <div className="offers-action flex-center">
            <Link to="/offers" className="btn btn-secondary">Explore All Active Promotions <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="section reviews-section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-accent">Testimonials</span>
            <h2>What Our Patients Say</h2>
            <p>Read authentic, verified experiences from individuals and families who rely on Affordable Dental for their oral health.</p>
          </div>

          <div className="grid-3">
            {reviewsList.slice(0, 3).map((review, idx) => (
              <div key={review.id || idx} className="card review-card">
                <div className="stars-row">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="var(--color-gold)" color="var(--color-gold)" />)}
                </div>
                <p className="review-txt">"{review.text}"</p>
                <div className="review-author-info">
                  <span className="author-name">{review.author}</span>
                  <span className="review-source">{review.treatment || 'Verified Patient'}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="reviews-action flex-center">
            <Link to="/reviews" className="btn btn-outline">Read More Patient Stories</Link>
          </div>
        </div>
      </section>

      {/* Emergency Section */}
      <section className="section emergency-section bg-red">
        <div className="container grid-2">
          <div className="emergency-content">
            <span className="badge badge-emergency">Urgent Care Availability</span>
            <h2>Suffering from a Dental Emergency?</h2>
            <p className="emergency-p">
              Tooth pain, a broken crown, swelling, or a knocked-out tooth shouldn't wait. We provide <strong>same-day emergency dental appointments</strong> in Van Nuys to diagnose your problem and get you out of pain immediately.
            </p>
            <div className="emergency-ctas">
              <a href={`tel:${phoneTel}`} className="btn btn-emergency">
                <Phone size={18} /> Call Now: {officeSettings.phone}
              </a>
              <Link to="/emergency" className="btn btn-outline btn-emergency-outline">
                First-Aid Instructions
              </Link>
            </div>
            <p className="emergency-disclaimer">
              *If you are experiencing difficulty breathing, severe bleeding, or a broken jaw, please go to the nearest emergency room immediately.
            </p>
          </div>
          
          <div className="emergency-visual flex-center">
            <div className="emergency-card card">
              <h4>We Treat Emergencies Like:</h4>
              <ul className="em-list">
                <li><span>💥</span> Severe Toothache</li>
                <li><span>💥</span> Knocked-Out or Loose Tooth</li>
                <li><span>💥</span> Broken or Chipped Teeth</li>
                <li><span>💥</span> Abscess or Facial Swelling</li>
                <li><span>💥</span> Lost Filling or Broken Crown</li>
              </ul>
              <Link to="/appointment" className="text-link">Request Emergency Slot</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Experience Steps */}
      <section className="section experience-section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-accent">Your Visit</span>
            <h2>The Affordable Dental Experience</h2>
            <p>We've streamlined our patient care process to remove stress, save time, and keep you in control of your dental health.</p>
          </div>

          <div className="grid-3 steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h4>Book Your Visit</h4>
              <p>Request an appointment online or call us. We verify your insurance and schedule your appointment with the appropriate specialist.</p>
            </div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h4>Gentle Diagnosis</h4>
              <p>During your visit, we use comfortable 3D scans and digital X-rays to compile a precise map of your oral health, explaining findings clearly.</p>
            </div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h4>Custom Care Plan</h4>
              <p>We outline treatment choices, comfort/sedation levels, and transparent pricing. You decide what fits your timeline and budget.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Booking & Info Map */}
      <section className="section booking-map-section bg-cream" id="booking-section">
        <div className="container grid-2">
          <div className="booking-form-area">
            <span className="badge badge-accent">Online Request</span>
            <h2 className="section-title-left">Request an Appointment</h2>
            <p style={{ marginBottom: '30px' }}>Fill out our quick appointment request form. Our office team will call or text you shortly to lock in your date.</p>
            <BookingFlow />
          </div>

          <div className="map-info-area">
            <span className="badge badge-accent">Our Office</span>
            <h2 className="section-title-left">Location & Directions</h2>
            <p style={{ marginBottom: '30px' }}>We are located on Van Nuys Boulevard, featuring dedicated onsite parking for easy access.</p>
            
            <div className="location-card card">
              <div className="loc-detail">
                <MapPin className="loc-icon" />
                <div>
                  <h4>Affordable Dental Office</h4>
                  <p>{officeSettings.address}</p>
                </div>
              </div>
              <div className="loc-detail">
                <Clock className="loc-icon" />
                <div>
                  <h4>Hours of Operation</h4>
                  <p style={{ whiteSpace: 'pre-line' }}>{officeSettings.hoursFull}</p>
                </div>
              </div>
              <div className="loc-detail">
                <Navigation className="loc-icon" />
                <div>
                  <h4>Parking & Access</h4>
                  <p>Free client parking is available in the dedicated lot directly behind the dental building.</p>
                </div>
              </div>
              <a href="https://maps.google.com/?q=6251+Van+Nuys+Blvd,+Van+Nuys,+CA+91401" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ marginTop: '10px', width: '100%' }}>
                Get Driving Directions
              </a>
            </div>

            {/* Embedded Google Map */}
            <div className="map-mockup">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3299.704253158022!2d-118.4485744847809!3d34.184379680570395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2977b311394bf%3A0xe5f9c49d885a0659!2s6251%20Van%20Nuys%20Blvd%2C%20Van%20Nuys%2C%20CA%2091401!5e0!3m2!1sen!2sus!4v1689255000000!5m2!1sen!2sus" 
                width="100%" 
                height="200" 
                style={{ border: 0, borderRadius: 'var(--radius-md)', display: 'block' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade" 
                title="Affordable Dental Google Map"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section final-cta-section text-center">
        <div className="container">
          <h2>Ready to Feel Confident About Your Smile?</h2>
          <p>Book a general exam, children's cleaning, or specialized cosmetic consultation today.</p>
          <div className="cta-buttons flex-center">
            <Link to="/appointment" className="btn btn-primary">Book Appointment Now</Link>
            <a href={`tel:${phoneTel}`} className="btn btn-secondary">Call {officeSettings.phone}</a>
          </div>
        </div>
      </section>

      <style>{`
        /* Hero Section */
        .hero-section {
          padding: 80px 0;
          background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 50px;
          align-items: center;
        }
        .hero-content h1 {
          margin: 16px 0 20px;
        }
        .hero-support {
          font-size: 1.15rem;
          line-height: 1.6;
          margin-bottom: 32px;
          color: var(--text-secondary);
        }
        .hero-actions {
          display: flex;
          gap: 16px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }
        .hero-chips {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px 24px;
        }
        .chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          color: var(--text-primary);
          font-weight: 500;
        }
        .chip svg {
          color: var(--color-teal);
        }
        
        .hero-visual {
          display: flex;
          justify-content: center;
        }
        .hero-visual-card {
          width: 100%;
          max-width: 400px;
          height: 420px;
          background: linear-gradient(135deg, var(--bg-neutral-light) 0%, var(--border-color) 100%);
          border-radius: var(--radius-lg);
          padding: 24px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-md);
        }
        .visual-badge {
          align-self: flex-start;
        }
        .visual-graphic {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .visual-icon-glow {
          color: var(--color-teal);
          filter: drop-shadow(0 0 20px rgba(13, 148, 136, 0.2));
        }
        .visual-rating-card {
          background-color: var(--bg-secondary);
          padding: 16px 20px;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          gap: 4px;
          border: 1px solid var(--border-color);
        }
        .stars-row {
          display: flex;
          gap: 2px;
        }
        .rating-num {
          font-weight: 700;
          font-size: 1.1rem;
        }
        .rating-desc {
          font-size: 0.82rem;
          color: var(--text-secondary);
        }

        /* Trust Strip */
        .trust-strip-sec {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
          padding: 30px 0;
        }
        .trust-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .trust-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }
        .trust-icon {
          color: var(--color-teal);
          flex-shrink: 0;
          width: 28px;
          height: 28px;
          margin-top: 2px;
        }
        .text-emergency {
          color: var(--color-emergency);
        }
        .trust-text h3 {
          font-size: 1.05rem;
          margin-bottom: 4px;
        }
        .trust-text p {
          font-size: 0.85rem;
          line-height: 1.4;
        }

        /* Service Cards emoji */
        .service-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .service-emoji {
          font-size: 2.2rem;
          margin-bottom: 20px;
        }
        .service-card h3 {
          font-size: 1.25rem;
          margin-bottom: 12px;
        }
        .service-card p {
          font-size: 0.95rem;
          margin-bottom: 20px;
          flex: 1;
        }

        /* Background Colors */
        .bg-cream {
          background-color: var(--bg-neutral-light);
        }

        /* Why Choose Us */
        .why-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-top: 32px;
        }
        .why-list li {
          display: flex;
          gap: 16px;
        }
        .check-bullet {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background-color: var(--color-teal-light);
          color: var(--color-teal);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .why-list h4 {
          font-size: 1.1rem;
          margin-bottom: 4px;
        }
        .why-list p {
          font-size: 0.95rem;
        }
        .why-badge-card {
          max-width: 380px;
          background-color: var(--bg-secondary);
        }
        .why-badge-card h3 {
          font-size: 1.3rem;
          color: var(--color-teal);
          margin-bottom: 12px;
        }
        .why-badge-card p {
          font-size: 0.95rem;
          margin-bottom: 20px;
        }
        .why-divider {
          height: 1px;
          background-color: var(--border-color);
          margin-bottom: 20px;
        }
        .why-stat-row {
          display: flex;
          gap: 40px;
        }
        .why-stat {
          display: flex;
          flex-direction: column;
        }
        .stat-num {
          font-family: 'Outfit', sans-serif;
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .stat-lbl {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        /* Technology Cards */
        .tech-card h4 {
          font-size: 1.15rem;
          margin-bottom: 4px;
        }
        .tech-benefit {
          color: var(--color-teal);
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 16px;
        }
        .tech-card p:not(.tech-benefit) {
          font-size: 0.92rem;
          line-height: 1.5;
        }

        /* Offers Section */
        .offer-card {
          position: relative;
          display: flex;
          flex-direction: column;
        }
        .offer-badge {
          position: absolute;
          top: 20px;
          right: 20px;
          background-color: var(--color-teal-light);
          color: var(--color-teal);
          padding: 4px 10px;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
        }
        .offer-card h3 {
          font-size: 1.3rem;
          margin-top: 10px;
          margin-bottom: 12px;
          padding-right: 80px;
        }
        .offer-desc {
          font-size: 0.95rem;
          flex: 1;
          margin-bottom: 24px;
        }
        .offer-divider {
          height: 1px;
          background-color: var(--border-color);
          margin-bottom: 16px;
        }
        .offer-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .expiry {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        .btn-sm {
          padding: 8px 16px;
          font-size: 0.88rem;
        }
        .offers-action {
          margin-top: 40px;
        }

        /* Reviews Card */
        .review-card {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .review-txt {
          font-size: 0.98rem;
          line-height: 1.6;
          font-style: italic;
          flex: 1;
        }
        .review-author-info {
          display: flex;
          flex-direction: column;
          border-top: 1px solid var(--border-color);
          padding-top: 12px;
        }
        .author-name {
          font-weight: 600;
          color: var(--text-primary);
        }
        .review-source {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        .reviews-action {
          margin-top: 40px;
        }

        /* Emergency Section */
        .bg-red {
          background-color: var(--color-emergency-light);
          border-top: 1px solid rgba(185, 28, 28, 0.1);
          border-bottom: 1px solid rgba(185, 28, 28, 0.1);
        }
        .emergency-content h2 {
          margin: 16px 0;
          color: var(--color-emergency);
        }
        .emergency-p {
          font-size: 1.1rem;
          margin-bottom: 32px;
        }
        .emergency-ctas {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }
        .btn-emergency-outline {
          border-color: var(--color-emergency);
          color: var(--color-emergency);
        }
        .btn-emergency-outline:hover {
          background-color: rgba(185, 28, 28, 0.05);
          color: var(--color-emergency);
        }
        .emergency-disclaimer {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        .emergency-card h4 {
          font-size: 1.2rem;
          margin-bottom: 20px;
          color: var(--color-emergency);
        }
        .em-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
        }
        .em-list li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 500;
        }

        /* Experience steps */
        .steps-grid {
          margin-top: 20px;
        }
        .step-card {
          text-align: center;
          padding: 0 16px;
        }
        .step-number {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: var(--color-teal);
          color: var(--text-light);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 1.3rem;
          margin: 0 auto 24px;
          box-shadow: 0 4px 12px rgba(13, 148, 136, 0.25);
        }
        .step-card h4 {
          font-size: 1.25rem;
          margin-bottom: 12px;
        }
        .step-card p {
          font-size: 0.95rem;
        }

        /* Booking & Map Section */
        .section-title-left {
          margin: 12px 0 16px;
          text-align: left;
        }
        .location-card {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 24px;
        }
        .loc-detail {
          display: flex;
          gap: 16px;
        }
        .loc-icon {
          color: var(--color-teal);
          flex-shrink: 0;
          margin-top: 3px;
        }
        .loc-detail h4 {
          font-size: 1.05rem;
          margin-bottom: 4px;
        }
        .loc-detail p {
          font-size: 0.92rem;
          line-height: 1.5;
        }
        .map-mockup {
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-color);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
        }
        .map-placeholder {
          height: 200px;
          background-color: #E2E8F0;
          color: var(--text-secondary);
        }

        /* Final CTA */
        .final-cta-section {
          background-color: var(--bg-neutral-dark);
          color: var(--text-light);
        }
        .final-cta-section h2 {
          color: var(--text-light);
          margin-bottom: 16px;
        }
        .final-cta-section p {
          color: #94A3B8;
          font-size: 1.15rem;
          margin-bottom: 32px;
        }
        .cta-buttons {
          gap: 16px;
          flex-wrap: wrap;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .hero-actions, .hero-chips {
            justify-content: center;
          }
          .hero-chips {
            max-width: 500px;
            margin: 0 auto;
          }
          .trust-strip {
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
          }
        }

        @media (max-width: 768px) {
          .trust-strip {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }
      `}</style>
    </div>
  );
}
