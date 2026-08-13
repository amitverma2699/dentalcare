import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { 
  Lock, Settings, ShieldCheck, Tag, UserCheck, MessageSquare, 
  Trash2, Edit, Plus, Info, LayoutDashboard, Sparkles, CheckCircle2,
  Upload, Image as ImageIcon, Globe, Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';

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
    addDoctor,
    deleteDoctor,
    addReview,
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

  // Office & Brand Settings Local Form State
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

  // Doctor CRUD Local Form State
  const [selectedDoctorSlug, setSelectedDoctorSlug] = useState('dr-john-doe');
  const [isAddingNewDoctor, setIsAddingNewDoctor] = useState(false);
  const [doctorForm, setDoctorForm] = useState(() => {
    const doc = teamDoctors.find(d => d.slug === 'dr-john-doe');
    return doc ? { ...doc } : {};
  });

  // Comma-separated or line-break lists for Doctor input
  const [docEducationStr, setDocEducationStr] = useState(() => {
    const doc = teamDoctors.find(d => d.slug === 'dr-john-doe');
    return doc ? doc.education.join('\n') : '';
  });
  const [docMembershipsStr, setDocMembershipsStr] = useState(() => {
    const doc = teamDoctors.find(d => d.slug === 'dr-john-doe');
    return doc ? doc.memberships.join('\n') : '';
  });
  const [docFocusListStr, setDocFocusListStr] = useState(() => {
    const doc = teamDoctors.find(d => d.slug === 'dr-john-doe');
    return doc ? doc.clinicalFocus.join('\n') : '';
  });

  // Reviews Direct Add Form State
  const [reviewForm, setReviewForm] = useState({
    author: '',
    rating: 5,
    treatment: 'General Dentistry',
    text: ''
  });

  // Helper: Slugify Name
  const slugify = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  // Helper: File to Base64 String
  const handleImageFileChange = (e, callback) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1.5 * 1024 * 1024) {
        alert('File is too large! Please upload an image smaller than 1.5MB to save storage space.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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
    triggerAlert('Branding and office settings successfully updated!');
  };

  // Select Doctor to Edit
  const handleSelectDoctor = (slug) => {
    setIsAddingNewDoctor(false);
    setSelectedDoctorSlug(slug);
    const doc = teamDoctors.find(d => d.slug === slug);
    if (doc) {
      setDoctorForm({ ...doc });
      setDocEducationStr(doc.education ? doc.education.join('\n') : '');
      setDocMembershipsStr(doc.memberships ? doc.memberships.join('\n') : '');
      setDocFocusListStr(doc.clinicalFocus ? doc.clinicalFocus.join('\n') : '');
    }
  };

  // Select "Add New Doctor" Mode
  const handleStartAddDoctor = () => {
    setIsAddingNewDoctor(true);
    setSelectedDoctorSlug('');
    setDoctorForm({
      name: '',
      role: '',
      specialty: 'General Dentistry',
      credentials: '',
      focus: '',
      bio: '',
      philosophy: '',
      anxietyMsg: '',
      image: ''
    });
    setDocEducationStr('');
    setDocMembershipsStr('');
    setDocFocusListStr('');
  };

  // Save Doctor Details (Add or Edit)
  const handleSaveDoctor = (e) => {
    e.preventDefault();
    if (!doctorForm.name.trim()) {
      alert('Doctor name is required.');
      return;
    }

    const parsedEducation = docEducationStr.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const parsedMemberships = docMembershipsStr.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const parsedFocus = docFocusListStr.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    const docPayload = {
      ...doctorForm,
      education: parsedEducation,
      memberships: parsedMemberships,
      clinicalFocus: parsedFocus
    };

    if (isAddingNewDoctor) {
      const generatedSlug = slugify(doctorForm.name);
      // Double check collision
      if (teamDoctors.some(d => d.slug === generatedSlug)) {
        alert('A doctor with this name already exists.');
        return;
      }
      docPayload.slug = generatedSlug;
      addDoctor(docPayload);
      setIsAddingNewDoctor(false);
      setSelectedDoctorSlug(generatedSlug);
      triggerAlert('New doctor profile successfully created!');
    } else {
      updateDoctor(selectedDoctorSlug, docPayload);
      triggerAlert('Doctor profile successfully updated!');
    }
  };

  // Delete Doctor
  const handleDeleteDoctor = (slug) => {
    if (confirm('Are you absolutely sure you want to delete this doctor? This cannot be undone.')) {
      deleteDoctor(slug);
      triggerAlert('Doctor profile has been removed.');
      
      // Fallback selection
      const remainingDocs = teamDoctors.filter(d => d.slug !== slug);
      if (remainingDocs.length > 0) {
        handleSelectDoctor(remainingDocs[0].slug);
      } else {
        handleStartAddDoctor();
      }
    }
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

  // Submit direct admin review
  const handleAddReviewDirect = (e) => {
    e.preventDefault();
    if (!reviewForm.author.trim() || !reviewForm.text.trim()) {
      alert('Author name and testimonial text are required.');
      return;
    }

    addReview({
      author: reviewForm.author,
      rating: Number(reviewForm.rating),
      text: reviewForm.text,
      treatment: reviewForm.treatment
    });

    setReviewForm({
      author: '',
      rating: 5,
      treatment: 'General Dentistry',
      text: ''
    });

    triggerAlert('Patient testimonial added successfully!');
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-overlay flex-center">
        <div className="card login-card text-center fade-in">
          <div className="lock-icon-container flex-center">
            <Lock size={30} className="icon-lock" />
          </div>
          <h2>CMS Client Portal</h2>
          <p style={{ margin: '8px 0 24px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Enter your passcode to upload images, edit pages, manage doctors, and update settings.
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
            {settingsForm.logoImage ? (
              <img src={settingsForm.logoImage} alt="Clinic Logo" style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} />
            ) : (
              <div className="avatar-admin">{settingsForm.logoText ? settingsForm.logoText[0] : 'A'}</div>
            )}
            <div>
              <h4 style={{ fontSize: '0.9rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '150px' }}>{settingsForm.logoText || 'Affordable Dental'}</h4>
              <span className="admin-status">Website CMS Admin</span>
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
                <Settings size={18} /> Website Branding
              </button>
            </li>
            <li>
              <button className={`tab-link ${activeTab === 'offers' ? 'active' : ''}`} onClick={() => setActiveTab('offers')}>
                <Tag size={18} /> Special Offers
              </button>
            </li>
            <li>
              <button className={`tab-link ${activeTab === 'doctors' ? 'active' : ''}`} onClick={() => setActiveTab('doctors')}>
                <UserCheck size={18} /> Manage Doctors
              </button>
            </li>
            <li>
              <button className={`tab-link ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>
                <MessageSquare size={18} /> Reviews Queue
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                  <h2>CMS Dashboard Overview</h2>
                  <p style={{ color: 'var(--text-secondary)' }}>Welcome to your website’s admin panel. Manage details, images, and content below.</p>
                </div>
                <Link to="/" className="btn btn-outline btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Eye size={16} /> View Live Website
                </Link>
              </div>
              
              <div className="grid-3 stats-row">
                <div className="card admin-stat-card">
                  <span className="ad-stat-lbl">Active Promotions</span>
                  <span className="ad-stat-num">{specialOffers.length}</span>
                  <span className="ad-stat-note">Vouchers visible on offers page</span>
                </div>
                <div className="card admin-stat-card">
                  <span className="ad-stat-lbl">Approved Testimonials</span>
                  <span className="ad-stat-num">{reviewsList.length}</span>
                  <span className="ad-stat-note">Synced dynamically in patient feeds</span>
                </div>
                <div className="card admin-stat-card">
                  <span className="ad-stat-lbl">Clinical Roster</span>
                  <span className="ad-stat-num">{teamDoctors.length}</span>
                  <span className="ad-stat-note">Active doctor profiles and biographies</span>
                </div>
              </div>

              {/* Upload Previews */}
              <div className="grid-2" style={{ gap: '20px', marginTop: '30px' }}>
                <div className="card text-center" style={{ padding: '24px' }}>
                  <h4 style={{ marginBottom: '16px' }}>Logo Branding Preview</h4>
                  <div className="flex-center" style={{ height: '100px', backgroundColor: 'var(--bg-neutral-light)', borderRadius: '8px' }}>
                    {settingsForm.logoImage ? (
                      <img src={settingsForm.logoImage} alt="Clinic Logo" style={{ height: '40px', objectFit: 'contain' }} />
                    ) : (
                      <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--color-teal)' }}>{settingsForm.logoText}</span>
                    )}
                  </div>
                  <p style={{ fontSize: '0.8rem', marginTop: '12px', color: 'var(--text-secondary)' }}>Shows in navbar header and footer.</p>
                </div>

                <div className="card text-center" style={{ padding: '24px' }}>
                  <h4 style={{ marginBottom: '16px' }}>Homepage Hero Image</h4>
                  <div className="flex-center" style={{ height: '100px', backgroundColor: 'var(--bg-neutral-light)', borderRadius: '8px', overflow: 'hidden' }}>
                    {settingsForm.heroImage ? (
                      <img src={settingsForm.heroImage} alt="Hero Banner" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div className="flex-center" style={{ flexDirection: 'column', color: 'var(--text-secondary)' }}>
                        <ImageIcon size={28} />
                        <span style={{ fontSize: '0.8rem', marginTop: '6px' }}>Pulsing Smile Icon (Default)</span>
                      </div>
                    )}
                  </div>
                  <p style={{ fontSize: '0.8rem', marginTop: '12px', color: 'var(--text-secondary)' }}>Fills the large visual space in the hero section.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: WEBSITE BRANDING */}
          {activeTab === 'settings' && (
            <div className="admin-tab-content fade-in">
              <h2>Website Settings & Branding</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>Customize your logo, brand tagline, social media feeds, and physical office settings.</p>
              
              <form onSubmit={handleSaveSettings} className="card admin-form-card">
                
                <h4 className="settings-section-title"><Sparkles size={16} className="inline-icon" /> Brand Assets</h4>
                <div className="grid-2 form-row" style={{ gap: '20px', marginTop: '16px' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="logoText">Logo Brand Name</label>
                    <input
                      id="logoText"
                      type="text"
                      className="form-control"
                      value={settingsForm.logoText || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, logoText: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Upload Brand Logo (Optional)</label>
                    <div className="file-uploader-wrap">
                      <label className="file-input-btn btn btn-outline btn-sm">
                        <Upload size={14} /> Choose Logo Image
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={(e) => handleImageFileChange(e, (data) => setSettingsForm({ ...settingsForm, logoImage: data }))}
                        />
                      </label>
                      {settingsForm.logoImage && (
                        <button type="button" className="btn btn-outline btn-sm btn-icon" style={{ color: 'var(--color-emergency)' }} onClick={() => setSettingsForm({ ...settingsForm, logoImage: '' })}>
                          Remove Logo
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="tagline">Homepage Main Tagline</label>
                  <textarea
                    id="tagline"
                    className="form-control"
                    value={settingsForm.tagline || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                    rows="2"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Homepage Hero Visual Photo (Replace default icon)</label>
                  <div className="file-uploader-wrap">
                    <label className="file-input-btn btn btn-outline btn-sm">
                      <Upload size={14} /> Choose Banner Image
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => handleImageFileChange(e, (data) => setSettingsForm({ ...settingsForm, heroImage: data }))}
                      />
                    </label>
                    {settingsForm.heroImage && (
                      <span className="file-uploaded-label">
                        Image Ready. <button type="button" className="text-btn text-red" onClick={() => setSettingsForm({ ...settingsForm, heroImage: '' })}>Delete</button>
                      </span>
                    )}
                  </div>
                </div>

                <h4 className="settings-section-title" style={{ marginTop: '30px' }}><Globe size={16} className="inline-icon" /> Social Media Links</h4>
                <div className="grid-3 form-row" style={{ gap: '16px', marginTop: '16px' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="facebook">Facebook Link</label>
                    <input
                      id="facebook"
                      type="url"
                      className="form-control"
                      value={settingsForm.facebook || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, facebook: e.target.value })}
                      placeholder="https://facebook.com/..."
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="instagram">Instagram Link</label>
                    <input
                      id="instagram"
                      type="url"
                      className="form-control"
                      value={settingsForm.instagram || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, instagram: e.target.value })}
                      placeholder="https://instagram.com/..."
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="yelp">Yelp Page</label>
                    <input
                      id="yelp"
                      type="url"
                      className="form-control"
                      value={settingsForm.yelp || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, yelp: e.target.value })}
                      placeholder="https://yelp.com/biz/..."
                    />
                  </div>
                </div>

                <h4 className="settings-section-title" style={{ marginTop: '30px' }}><Settings size={16} className="inline-icon" /> Office Details</h4>
                <div className="grid-2 form-row" style={{ gap: '20px', marginTop: '16px' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">Clinic Phone Number</label>
                    <input
                      id="phone"
                      type="text"
                      className="form-control"
                      value={settingsForm.phone}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Contact Email Address</label>
                    <input
                      id="email"
                      type="email"
                      className="form-control"
                      value={settingsForm.email}
                      onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="address">Physical Address</label>
                  <input
                    id="address"
                    type="text"
                    className="form-control"
                    value={settingsForm.address}
                    onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="hours">Hours (Short Format)</label>
                  <input
                    id="hours"
                    type="text"
                    className="form-control"
                    value={settingsForm.hours}
                    onChange={(e) => setSettingsForm({ ...settingsForm, hours: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="hoursFull">Hours (Detailed List)</label>
                  <textarea
                    id="hoursFull"
                    className="form-control"
                    value={settingsForm.hoursFull}
                    onChange={(e) => setSettingsForm({ ...settingsForm, hoursFull: e.target.value })}
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="parking">Parking Guidelines</label>
                  <textarea
                    id="parking"
                    className="form-control"
                    value={settingsForm.parking}
                    onChange={(e) => setSettingsForm({ ...settingsForm, parking: e.target.value })}
                    rows="2"
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  Save Brand & Office Settings
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: SPECIAL OFFERS */}
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h2>Manage Doctor Biographies</h2>
                  <p style={{ color: 'var(--text-secondary)' }}>Add new doctors, remove doctors, or edit clinical details and profile images.</p>
                </div>
                <button type="button" className="btn btn-primary btn-sm" onClick={handleStartAddDoctor}>
                  <Plus size={16} /> Add New Specialist
                </button>
              </div>
              
              <div className="doctor-select-row" style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
                {teamDoctors.map(doc => (
                  <button
                    key={doc.slug}
                    type="button"
                    className={`btn btn-sm ${(!isAddingNewDoctor && selectedDoctorSlug === doc.slug) ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => handleSelectDoctor(doc.slug)}
                  >
                    {doc.name.split(',')[0]}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSaveDoctor} className="card admin-form-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4>{isAddingNewDoctor ? 'Create New Provider Profile' : `Editing ${doctorForm.name} Profile`}</h4>
                  {!isAddingNewDoctor && teamDoctors.length > 1 && (
                    <button type="button" className="btn btn-outline btn-sm" style={{ color: 'var(--color-emergency)', borderColor: 'rgba(185,28,28,0.2)' }} onClick={() => handleDeleteDoctor(selectedDoctorSlug)}>
                      <Trash2 size={14} /> Delete Provider
                    </button>
                  )}
                </div>
                
                <div className="grid-2 form-row" style={{ gap: '20px', marginTop: '20px' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="docName">Doctor Name & Title</label>
                    <input
                      id="docName"
                      type="text"
                      className="form-control"
                      value={doctorForm.name || ''}
                      onChange={(e) => setDoctorForm({ ...doctorForm, name: e.target.value })}
                      placeholder="e.g. Dr. John Doe, DDS"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="docRole">Clinic Role</label>
                    <input
                      id="docRole"
                      type="text"
                      className="form-control"
                      value={doctorForm.role || ''}
                      onChange={(e) => setDoctorForm({ ...doctorForm, role: e.target.value })}
                      placeholder="e.g. Lead Dentist & Clinic Director"
                    />
                  </div>
                </div>

                <div className="grid-2 form-row" style={{ gap: '20px' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="docSpecialty">Specialty Category</label>
                    <input
                      id="docSpecialty"
                      type="text"
                      className="form-control"
                      value={doctorForm.specialty || ''}
                      onChange={(e) => setDoctorForm({ ...doctorForm, specialty: e.target.value })}
                      placeholder="e.g. Pediatric Dentistry"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="docCredentials">Medical Degree Credentials</label>
                    <input
                      id="docCredentials"
                      type="text"
                      className="form-control"
                      value={doctorForm.credentials || ''}
                      onChange={(e) => setDoctorForm({ ...doctorForm, credentials: e.target.value })}
                      placeholder="e.g. UCLA School of Dentistry, Board Certified"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="docFocus">Summary Focus Highlight</label>
                  <input
                    id="docFocus"
                    type="text"
                    className="form-control"
                    value={doctorForm.focus || ''}
                    onChange={(e) => setDoctorForm({ ...doctorForm, focus: e.target.value })}
                    placeholder="e.g. Porcelain veneers, dental anxiety management..."
                  />
                </div>

                {/* Portrait Uploader */}
                <div className="form-group">
                  <label className="form-label">Upload Portrait Portrait Image</label>
                  <div className="file-uploader-wrap" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <label className="file-input-btn btn btn-outline btn-sm">
                      <Upload size={14} /> Choose Photo
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => handleImageFileChange(e, (data) => setDoctorForm({ ...doctorForm, image: data }))}
                      />
                    </label>
                    {doctorForm.image ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img src={doctorForm.image} alt="Avatar" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border-color)' }} />
                        <button type="button" className="text-btn text-red" style={{ fontSize: '0.8rem' }} onClick={() => setDoctorForm({ ...doctorForm, image: '' })}>
                          Remove
                        </button>
                      </div>
                    ) : (
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>No custom image uploaded (will render letter badge).</span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="docBio">Biographical Summary</label>
                  <textarea
                    id="docBio"
                    className="form-control"
                    value={doctorForm.bio || ''}
                    onChange={(e) => setDoctorForm({ ...doctorForm, bio: e.target.value })}
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="docPhil">Philosophy of Care</label>
                  <textarea
                    id="docPhil"
                    className="form-control"
                    value={doctorForm.philosophy || ''}
                    onChange={(e) => setDoctorForm({ ...doctorForm, philosophy: e.target.value })}
                    rows="2"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="docAnxiety">Comforting Patient Message (Dental Anxiety)</label>
                  <textarea
                    id="docAnxiety"
                    className="form-control"
                    value={doctorForm.anxietyMsg || ''}
                    onChange={(e) => setDoctorForm({ ...doctorForm, anxietyMsg: e.target.value })}
                    rows="2"
                  />
                </div>

                {/* Comma-separated Lists */}
                <div className="form-group">
                  <label className="form-label" htmlFor="docEduList">Education (One degree per line)</label>
                  <textarea
                    id="docEduList"
                    className="form-control"
                    value={docEducationStr}
                    onChange={(e) => setDocEducationStr(e.target.value)}
                    placeholder="e.g. DDS - UCLA School of Dentistry&#10;BS in Biology - UC Irvine"
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="docMemList">Memberships (One per line)</label>
                  <textarea
                    id="docMemList"
                    className="form-control"
                    value={docMembershipsStr}
                    onChange={(e) => setDocMembershipsStr(e.target.value)}
                    placeholder="e.g. American Dental Association (ADA)&#10;California Dental Association (CDA)"
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="docFocusList">Clinical Expertise Lists (One per line)</label>
                  <textarea
                    id="docFocusList"
                    className="form-control"
                    value={docFocusListStr}
                    onChange={(e) => setDocFocusListStr(e.target.value)}
                    placeholder="e.g. Cosmetic Smile Makeovers&#10;Root Canal Treatments"
                    rows="3"
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  {isAddingNewDoctor ? 'Create Specialist Profile' : 'Save Doctor Profile'}
                </button>
              </form>
            </div>
          )}

          {/* TAB 5: REVIEWS QUEUE */}
          {activeTab === 'reviews' && (
            <div className="admin-tab-content fade-in">
              <h2>Patient Reviews Queue</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>Moderate patient feedback. Add direct testimonials, or delete reviews from the live feed.</p>
              
              {/* Direct Add Review */}
              <form onSubmit={handleAddReviewDirect} className="card admin-form-card" style={{ marginBottom: '30px', borderLeft: '4px solid var(--color-teal)' }}>
                <h4 style={{ marginBottom: '16px' }}><Plus size={16} className="inline-icon" /> Add a Testimonial Direct</h4>
                <div className="grid-3 form-row" style={{ gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="revAuthor">Patient Name</label>
                    <input
                      id="revAuthor"
                      type="text"
                      className="form-control"
                      value={reviewForm.author}
                      onChange={(e) => setReviewForm({ ...reviewForm, author: e.target.value })}
                      placeholder="e.g. Maria R."
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="revTreatment">Treatment Type</label>
                    <input
                      id="revTreatment"
                      type="text"
                      className="form-control"
                      value={reviewForm.treatment}
                      onChange={(e) => setReviewForm({ ...reviewForm, treatment: e.target.value })}
                      placeholder="e.g. Tooth Whitening"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="revRating">Rating Score (Stars)</label>
                    <select
                      id="revRating"
                      className="form-control"
                      value={reviewForm.rating}
                      onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
                    >
                      <option value="5">5 Stars (Excellent)</option>
                      <option value="4">4 Stars (Good)</option>
                      <option value="3">3 Stars (Average)</option>
                      <option value="2">2 Stars (Poor)</option>
                      <option value="1">1 Star (Very Poor)</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="revText">Testimonial Text</label>
                  <textarea
                    id="revText"
                    className="form-control"
                    value={reviewForm.text}
                    onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
                    rows="3"
                    placeholder="Patient feedback copy..."
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-sm">
                  Add Testimonial
                </button>
              </form>

              {/* Reviews Queue List */}
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
        
        .settings-section-title {
          font-size: 1.1rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 8px;
          color: var(--color-teal);
        }
        .file-uploader-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 6px;
        }
        .file-uploaded-label {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .text-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-weight: 600;
          text-decoration: underline;
        }
        .text-red {
          color: var(--color-emergency);
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
