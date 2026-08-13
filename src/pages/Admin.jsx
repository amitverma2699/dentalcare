import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { 
  Lock, Settings, ShieldCheck, Tag, UserCheck, MessageSquare, 
  Trash2, Edit, Plus, Info, LayoutDashboard, Sparkles, CheckCircle2 
} from 'lucide-react';

export default function Admin() {
  const {
    officeSettings,
    specialOffers,
    teamDoctors,
    reviewsList,
    updateOfficeSettings,
    addSpecialOffer,
    editSpecialOffer,
    deleteSpecialOffer,
    updateDoctor,
    deleteReview
  } = useAppContext();

  // Authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Tab State
  const [activeTab, setActiveTab] = useState('overview');

  // Form Success Alerts
  const [saveAlert, setSaveAlert] = useState('');

  // Office Settings Local Form State
  const [settingsForm, setSettingsForm] = useState({ ...officeSettings });

  // Offers Local Form State
  const [isEditingOffer, setIsEditingOffer] = useState(false);
  const [offerEditId, setOfferEditId] = useState(null);
  const [offerForm, setOfferForm] = useState({
    badge: 'New Patients',
    title: '',
    desc: '',
    finePrint: '',
    code: ''
  });

  // Doctor Local Form State
  const [selectedDoctorSlug, setSelectedDoctorSlug] = useState('dr-john-doe');
  const [doctorForm, setDoctorForm] = useState(() => {
    const doc = (teamDoctors || []).find(d => d && d.slug === 'dr-john-doe');
    return doc ? { ...doc } : {};
  });

  // Trigger Auth Check
  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === 'admin123') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect passcode. Please try again.');
    }
  };

  const triggerAlert = (message) => {
    setSaveAlert(message);
    setTimeout(() => setSaveAlert(''), 3000);
  };

  // Save Settings
  const handleSaveSettings = (e) => {
    e.preventDefault();
    updateOfficeSettings(settingsForm);
    triggerAlert('Office settings successfully updated!');
  };

  // Select Doctor to Edit
  const handleSelectDoctor = (slug) => {
    setSelectedDoctorSlug(slug);
    const doc = teamDoctors.find(d => d.slug === slug);
    if (doc) {
      setDoctorForm({ ...doc });
    }
  };

  // Save Doctor Details
  const handleSaveDoctor = (e) => {
    e.preventDefault();
    updateDoctor(selectedDoctorSlug, doctorForm);
    triggerAlert('Doctor profile successfully updated!');
  };

  // Trigger Editing an Offer
  const handleStartEditOffer = (offer) => {
    setIsEditingOffer(true);
    setOfferEditId(offer.id);
    setOfferForm({ ...offer });
  };

  const handleStartNewOffer = () => {
    setIsEditingOffer(true);
    setOfferEditId(null);
    setOfferForm({
      badge: 'New Patients',
      title: '',
      desc: '',
      finePrint: '',
      code: ''
    });
  };

  // Save Offer CRUD
  const handleSaveOffer = (e) => {
    e.preventDefault();
    if (!offerForm.title.trim() || !offerForm.desc.trim()) {
      alert('Title and description are required.');
      return;
    }
    
    if (offerEditId) {
      editSpecialOffer(offerEditId, offerForm);
      triggerAlert('Special offer successfully modified!');
    } else {
      addSpecialOffer(offerForm);
      triggerAlert('New special offer successfully created!');
    }

    setIsEditingOffer(false);
    setOfferEditId(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-overlay flex-center">
        <div className="card login-card text-center fade-in">
          <div className="lock-icon-container flex-center">
            <Lock size={30} className="icon-lock" />
          </div>
          <h2>Client Admin Portal</h2>
          <p style={{ margin: '8px 0 24px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Enter your passcode to manage promotions, office details, and patient reviews.
          </p>
          
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <input
                type="password"
                placeholder="Enter Passcode (e.g. admin123)"
                className="form-control text-center"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
              />
              {authError && <span className="error-message text-center" style={{ marginTop: '8px' }}>{authError}</span>}
            </div>
            
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Log In to Dashboard
            </button>
          </form>
          <span className="demo-hint">Demo Passcode: <strong>admin123</strong></span>
        </div>
        <style>{`
          .admin-login-overlay {
            min-height: calc(100vh - 80px);
            background-color: var(--bg-neutral-light);
          }
          .login-card {
            max-width: 400px;
            width: 90%;
            border-top: 4px solid var(--color-teal);
          }
          .lock-icon-container {
            width: 60px;
            height: 60px;
            background-color: var(--color-teal-light);
            border-radius: 50%;
            color: var(--color-teal);
            margin: 0 auto 16px;
          }
          .demo-hint {
            display: block;
            margin-top: 20px;
            font-size: 0.8rem;
            color: var(--text-secondary);
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-page fade-in">
      <div className="container admin-container">
        
        {/* Sidebar Nav */}
        <aside className="admin-sidebar">
          <div className="admin-profile-badge">
            <div className="avatar-admin">A</div>
            <div>
              <h4>Affordable Dental</h4>
              <span className="admin-status">Office Manager</span>
            </div>
          </div>
          
          <ul className="sidebar-tabs">
            <li>
              <button className={`tab-link ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
                <LayoutDashboard size={18} /> Overview
              </button>
            </li>
            <li>
              <button className={`tab-link ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
                <Settings size={18} /> Office Settings
              </button>
            </li>
            <li>
              <button className={`tab-link ${activeTab === 'offers' ? 'active' : ''}`} onClick={() => setActiveTab('offers')}>
                <Tag size={18} /> Manage Offers
              </button>
            </li>
            <li>
              <button className={`tab-link ${activeTab === 'doctors' ? 'active' : ''}`} onClick={() => setActiveTab('doctors')}>
                <UserCheck size={18} /> Manage Doctors
              </button>
            </li>
            <li>
              <button className={`tab-link ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>
                <MessageSquare size={18} /> Review Queue
              </button>
            </li>
          </ul>

          <div className="sidebar-logout">
            <button className="btn btn-outline btn-sm" style={{ width: '100%' }} onClick={() => setIsAuthenticated(false)}>
              Log Out Portal
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="admin-main">
          
          {/* Notification Alert */}
          {saveAlert && (
            <div className="alert-success-bubble fade-in">
              <CheckCircle2 size={16} /> <span>{saveAlert}</span>
            </div>
          )}

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="admin-tab-content fade-in">
              <h2>Dashboard Overview</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>Quick metrics and active integrations for your dental practice site.</p>
              
              <div className="grid-3 stats-row">
                <div className="card admin-stat-card">
                  <span className="ad-stat-lbl">Active Promotions</span>
                  <span className="ad-stat-num">{specialOffers.length}</span>
                  <span className="ad-stat-note">Visible on the offers page</span>
                </div>
                <div className="card admin-stat-card">
                  <span className="ad-stat-lbl">Approved Reviews</span>
                  <span className="ad-stat-num">{reviewsList.length}</span>
                  <span className="ad-stat-note">Showing in feeds</span>
                </div>
                <div className="card admin-stat-card">
                  <span className="ad-stat-lbl">Featured Specialists</span>
                  <span className="ad-stat-num">{teamDoctors.length}</span>
                  <span className="ad-stat-note">With detail profiles</span>
                </div>
              </div>

              <div className="card integration-guide-card" style={{ marginTop: '30px', borderLeft: '4px solid var(--color-teal)' }}>
                <div className="flex-center" style={{ gap: '10px', justifyContent: 'flex-start', marginBottom: '12px' }}>
                  <Info className="icon-teal" />
                  <h4>Production Database Integration Guide</h4>
                </div>
                <p>
                  This admin panel currently saves updates locally inside your web browser’s **localStorage**. To roll this out to a live production server so that the public sees changes made by the office manager, link this state provider to a cloud database.
                </p>
                <p style={{ marginTop: '12px' }}>
                  <strong>Suggested Free Database Services:</strong>
                </p>
                <ul className="guide-db-list">
                  <li><strong>Firebase Firestore</strong>: Set up a free Firebase project, install their JS SDK, and replace our `localStorage.setItem` calls inside `src/context/AppContext.jsx` with Firestore `.update()` or `.set()` calls.</li>
                  <li><strong>Supabase</strong>: A PostgreSQL database option. Offers full CRUD APIs out-of-the-box, allowing you to sync reviews, offers, and settings with just a few API calls.</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: OFFICE SETTINGS */}
          {activeTab === 'settings' && (
            <div className="admin-tab-content fade-in">
              <h2>Edit Office Information</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>Update hours, contact phone numbers, and addresses shown across the navbar, footer, and contact views.</p>
              
              <form onSubmit={handleSaveSettings} className="card admin-form-card">
                <div className="form-group">
                  <label className="form-label" htmlFor="adminPhone">Clinic Phone Number</label>
                  <input
                    id="adminPhone"
                    type="text"
                    className="form-control"
                    value={settingsForm.phone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="adminEmail">Contact Email Address</label>
                  <input
                    id="adminEmail"
                    type="email"
                    className="form-control"
                    value={settingsForm.email}
                    onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="adminAddress">Physical Address</label>
                  <input
                    id="adminAddress"
                    type="text"
                    className="form-control"
                    value={settingsForm.address}
                    onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="adminHoursShort">Hours of Operation (Short Format)</label>
                  <input
                    id="adminHoursShort"
                    type="text"
                    className="form-control"
                    value={settingsForm.hours}
                    onChange={(e) => setSettingsForm({ ...settingsForm, hours: e.target.value })}
                    placeholder="Mon - Sat: 8:00 AM - 6:00 PM"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="adminHoursFull">Hours of Operation (Detailed Format)</label>
                  <textarea
                    id="adminHoursFull"
                    className="form-control"
                    value={settingsForm.hoursFull}
                    onChange={(e) => setSettingsForm({ ...settingsForm, hoursFull: e.target.value })}
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="adminParking">Parking Details</label>
                  <textarea
                    id="adminParking"
                    className="form-control"
                    value={settingsForm.parking}
                    onChange={(e) => setSettingsForm({ ...settingsForm, parking: e.target.value })}
                    rows="2"
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  Save Office Settings
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: MANAGE OFFERS */}
          {activeTab === 'offers' && (
            <div className="admin-tab-content fade-in">
              <div className="admin-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                  <h2>Manage Special Offers</h2>
                  <p style={{ color: 'var(--text-secondary)' }}>Add, edit, or delete coupon promotions displayed on the site.</p>
                </div>
                {!isEditingOffer && (
                  <button type="button" className="btn btn-primary btn-sm" onClick={handleStartNewOffer}>
                    <Plus size={16} /> New Offer
                  </button>
                )}
              </div>

              {isEditingOffer ? (
                <form onSubmit={handleSaveOffer} className="card admin-form-card">
                  <h4>{offerEditId ? 'Modify Special Offer' : 'Create Special Offer'}</h4>
                  <div className="form-group" style={{ marginTop: '16px' }}>
                    <label className="form-label" htmlFor="offerBadge">Offer Category (Badge)</label>
                    <select
                      id="offerBadge"
                      className="form-control"
                      value={offerForm.badge}
                      onChange={(e) => setOfferForm({ ...offerForm, badge: e.target.value })}
                    >
                      <option value="New Patients">New Patients</option>
                      <option value="Dental Implants">Dental Implants</option>
                      <option value="Cosmetics">Cosmetics</option>
                      <option value="Gum Therapy">Gum Therapy</option>
                      <option value="General Dentistry">General Dentistry</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="offerTitle">Promotion Title</label>
                    <input
                      id="offerTitle"
                      type="text"
                      className="form-control"
                      value={offerForm.title}
                      onChange={(e) => setOfferForm({ ...offerForm, title: e.target.value })}
                      placeholder="e.g. Free Oral Exam %26 X-Rays"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="offerDesc">Description</label>
                    <textarea
                      id="offerDesc"
                      className="form-control"
                      value={offerForm.desc}
                      onChange={(e) => setOfferForm({ ...offerForm, desc: e.target.value })}
                      placeholder="Provide simple patient-friendly explanation..."
                      rows="3"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="offerCode">Promo Code</label>
                    <input
                      id="offerCode"
                      type="text"
                      className="form-control"
                      value={offerForm.code}
                      onChange={(e) => setOfferForm({ ...offerForm, code: e.target.value })}
                      placeholder="e.g. NEW-EXAM-FREE"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="offerFine">Terms & Conditions (Fine Print)</label>
                    <textarea
                      id="offerFine"
                      className="form-control"
                      value={offerForm.finePrint}
                      onChange={(e) => setOfferForm({ ...offerForm, finePrint: e.target.value })}
                      placeholder="e.g. Limit one per patient. Private-pay only..."
                      rows="2"
                    />
                  </div>

                  <div className="form-actions flex-center" style={{ gap: '12px', justifyContent: 'flex-end' }}>
                    <button type="button" className="btn btn-outline" onClick={() => setIsEditingOffer(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Save Promotion</button>
                  </div>
                </form>
              ) : (
                <div className="admin-offers-list">
                  {specialOffers.length === 0 ? (
                    <p>No active promotions created. Click "New Offer" to add one.</p>
                  ) : (
                    specialOffers.map(offer => (
                      <div key={offer.id} className="card admin-offer-item" style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <span className="badge badge-accent" style={{ marginRight: '10px' }}>{offer.badge}</span>
                          <span className="code-lbl" style={{ fontStyle: 'italic', fontSize: '0.85rem' }}>{offer.code}</span>
                          <h4 style={{ marginTop: '8px' }}>{offer.title}</h4>
                        </div>
                        <div className="offer-actions-buttons" style={{ display: 'flex', gap: '8px' }}>
                          <button type="button" className="btn btn-outline btn-sm" onClick={() => handleStartEditOffer(offer)}>
                            <Edit size={14} /> Edit
                          </button>
                          <button type="button" className="btn btn-outline btn-sm" style={{ color: 'var(--color-emergency)', borderColor: 'rgba(185,28,28,0.2)' }} onClick={() => deleteSpecialOffer(offer.id)}>
                            <Trash2 size={14} /> Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: MANAGE DOCTORS */}
          {activeTab === 'doctors' && (
            <div className="admin-tab-content fade-in">
              <h2>Manage Doctor Biographies</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Modify the biographies, specialties, clinical focuses, and patient communication details for each doctor.</p>
              
              <div className="doctor-select-row" style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
                {teamDoctors.map(doc => (
                  <button
                    key={doc.slug}
                    type="button"
                    className={`btn btn-sm ${selectedDoctorSlug === doc.slug ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => handleSelectDoctor(doc.slug)}
                  >
                    {doc.name.split(',')[0]}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSaveDoctor} className="card admin-form-card">
                <h4>Editing {doctorForm.name} Profile</h4>
                
                <div className="form-group" style={{ marginTop: '20px' }}>
                  <label className="form-label" htmlFor="docSpecialty">Specialty Category</label>
                  <input
                    id="docSpecialty"
                    type="text"
                    className="form-control"
                    value={doctorForm.specialty || ''}
                    onChange={(e) => setDoctorForm({ ...doctorForm, specialty: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="docFocus">Clinical Focus (Key Highlights)</label>
                  <input
                    id="docFocus"
                    type="text"
                    className="form-control"
                    value={doctorForm.focus || ''}
                    onChange={(e) => setDoctorForm({ ...doctorForm, focus: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="docBio">Biographical Summary</label>
                  <textarea
                    id="docBio"
                    className="form-control"
                    value={doctorForm.bio || ''}
                    onChange={(e) => setDoctorForm({ ...doctorForm, bio: e.target.value })}
                    rows="4"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="docPhil">Philosophy of Care</label>
                  <textarea
                    id="docPhil"
                    className="form-control"
                    value={doctorForm.philosophy || ''}
                    onChange={(e) => setDoctorForm({ ...doctorForm, philosophy: e.target.value })}
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="docAnxiety">Anxious Patient Comfort Message</label>
                  <textarea
                    id="docAnxiety"
                    className="form-control"
                    value={doctorForm.anxietyMsg || ''}
                    onChange={(e) => setDoctorForm({ ...doctorForm, anxietyMsg: e.target.value })}
                    rows="3"
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  Save Doctor Profile
                </button>
              </form>
            </div>
          )}

          {/* TAB 5: REVIEWS QUEUE */}
          {activeTab === 'reviews' && (
            <div className="admin-tab-content fade-in">
              <h2>Patient Reviews Queue</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>Moderate patient feedback. Deleting a review removes it permanently from the website's database feed.</p>
              
              <div className="admin-reviews-list">
                {reviewsList.length === 0 ? (
                  <p>No patient reviews have been submitted yet.</p>
                ) : (
                  reviewsList.map(rev => (
                    <div key={rev.id} className="card admin-review-item" style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                          <span style={{ fontWeight: '600' }}>{rev.author}</span>
                          <span className="rev-treatment" style={{ fontSize: '0.75rem', color: 'var(--color-teal)', fontWeight: '600' }}>{rev.treatment}</span>
                        </div>
                        <p style={{ fontStyle: 'italic', fontSize: '0.9rem', marginTop: '8px', color: 'var(--text-secondary)' }}>"{rev.text}"</p>
                      </div>
                      <button type="button" className="btn btn-outline btn-sm" style={{ color: 'var(--color-emergency)', borderColor: 'rgba(185,28,28,0.2)', alignSelf: 'center' }} onClick={() => deleteReview(rev.id)}>
                        <Trash2 size={14} /> Remove
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

        </main>
      </div>

      <style>{`
        .admin-dashboard-page {
          padding: 60px 0;
          background-color: var(--bg-primary);
          min-height: calc(100vh - 80px);
        }
        .admin-container {
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 40px;
          align-items: start;
        }
        .admin-sidebar {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 24px;
          box-shadow: var(--shadow-sm);
        }
        .admin-profile-badge {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 30px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 16px;
        }
        .avatar-admin {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: var(--color-teal);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 1.25rem;
        }
        .admin-profile-badge h4 {
          font-size: 0.95rem;
          line-height: 1.2;
        }
        .admin-status {
          font-size: 0.75rem;
          color: var(--color-teal);
          font-weight: 600;
        }
        
        .sidebar-tabs {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 30px;
        }
        .tab-link {
          width: 100%;
          border: none;
          background: none;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--text-secondary);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: var(--transition-fast);
          text-align: left;
        }
        .tab-link:hover {
          background-color: var(--bg-neutral-light);
          color: var(--text-primary);
        }
        .tab-link.active {
          background-color: var(--color-teal-light);
          color: var(--color-teal);
          font-weight: 600;
        }
        
        /* Main dashboard */
        .admin-main {
          position: relative;
        }
        .alert-success-bubble {
          position: fixed;
          top: 100px;
          right: 24px;
          background-color: var(--color-teal-light);
          color: var(--color-teal);
          border: 1px solid rgba(13, 148, 136, 0.2);
          padding: 12px 20px;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-md);
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 600;
          z-index: 1000;
          animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes slideIn {
          from { transform: translateX(50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        .stats-row {
          gap: 20px;
        }
        .admin-stat-card {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .ad-stat-lbl {
          font-size: 0.8rem;
          text-transform: uppercase;
          font-weight: 700;
          color: var(--text-secondary);
          letter-spacing: 0.05em;
        }
        .ad-stat-num {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--text-primary);
          font-family: 'Outfit', sans-serif;
          line-height: 1.1;
        }
        .ad-stat-note {
          font-size: 0.78rem;
          color: var(--text-secondary);
        }
        .guide-db-list {
          margin-top: 12px;
          padding-left: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .guide-db-list li {
          font-size: 0.88rem;
          line-height: 1.4;
        }

        /* CRUD Layout */
        .admin-offer-item, .admin-review-item {
          padding: 20px;
        }
        .admin-offer-item:hover, .admin-review-item:hover {
          transform: none;
          box-shadow: var(--shadow-sm);
        }

        @media (max-width: 1024px) {
          .admin-container {
            grid-template-columns: 1fr;
          }
          .admin-sidebar {
            width: 100%;
          }
          .sidebar-tabs {
            flex-direction: row;
            overflow-x: auto;
            padding-bottom: 8px;
          }
          .tab-link {
            white-space: nowrap;
          }
        }
      `}</style>
    </div>
  );
}
