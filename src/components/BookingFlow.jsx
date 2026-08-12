import React, { useState } from 'react';
import { Calendar, Clock, User, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';

export default function BookingFlow() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    visitType: '',
    date: '',
    timePreference: '',
    fullName: '',
    phone: '',
    email: '',
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

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.visitType) newErrors.visitType = 'Please select a visit type';
    } else if (step === 2) {
      if (!formData.date) newErrors.date = 'Please select a date';
      if (!formData.timePreference) newErrors.timePreference = 'Please select a time preference';
    } else if (step === 3) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid 10-digit phone number';
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData.smsConsent) {
        newErrors.smsConsent = 'SMS consent is required to process notifications';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      // Simulate API submit
      setStep(4);
    }
  };

  return (
    <div className="booking-wizard card">
      {step < 4 && (
        <div className="wizard-progress">
          <div className={`progress-dot ${step >= 1 ? 'active' : ''}`}>1</div>
          <div className="progress-line">
            <div className="progress-line-fill" style={{ width: step > 1 ? (step === 2 ? '50%' : '100%') : '0%' }} />
          </div>
          <div className={`progress-dot ${step >= 2 ? 'active' : ''}`}>2</div>
          <div className="progress-line">
            <div className="progress-line-fill" style={{ width: step > 2 ? '100%' : '0%' }} />
          </div>
          <div className={`progress-dot ${step >= 3 ? 'active' : ''}`}>3</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="wizard-form">
        {/* Step 1: Visit Type */}
        {step === 1 && (
          <div className="wizard-step fade-in">
            <h3>What type of dental care do you need?</h3>
            <p className="step-desc">Select the category that best describes your dental needs.</p>
            
            <div className="visit-grid">
              {[
                { id: 'general', title: 'Routine Checkup & Cleaning', desc: 'Preventative care, exams, and cleanings' },
                { id: 'pediatric', title: 'Pediatric (Children) Visit', desc: 'Comfortable dentistry for kids' },
                { id: 'emergency', title: 'Dental Emergency', desc: 'Severe pain, swelling, or tooth damage' },
                { id: 'cosmetic', title: 'Cosmetic Consultation', desc: 'Whitening, veneers, and smile makeovers' },
                { id: 'implant', title: 'Implants & Restorative', desc: 'Replacing missing teeth or fixing crowns' },
                { id: 'other', title: 'Other Concern', desc: 'Consultations, second opinions, or specific pain' }
              ].map(item => (
                <button
                  key={item.id}
                  type="button"
                  className={`visit-card ${formData.visitType === item.id ? 'selected' : ''}`}
                  onClick={() => handleFieldChange('visitType', item.id)}
                >
                  <span className="visit-title">{item.title}</span>
                  <span className="visit-desc">{item.desc}</span>
                </button>
              ))}
            </div>
            {errors.visitType && <span className="error-message">{errors.visitType}</span>}

            <div className="wizard-actions">
              <span className="info-txt">Step 1 of 3</span>
              <button type="button" className="btn btn-primary" onClick={handleNext}>
                Next Step <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Date & Time */}
        {step === 2 && (
          <div className="wizard-step fade-in">
            <h3>When would you like to visit?</h3>
            <p className="step-desc">Select your preferred date and time range. Our team will verify and confirm details.</p>

            <div className="form-group">
              <label className="form-label" htmlFor="pref-date">Preferred Date</label>
              <div className="input-with-icon">
                <Calendar size={18} className="input-icon" />
                <input
                  id="pref-date"
                  type="date"
                  className="form-control"
                  value={formData.date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => handleFieldChange('date', e.target.value)}
                />
              </div>
              {errors.date && <span className="error-message">{errors.date}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Preferred Time of Day</label>
              <div className="time-options">
                {[
                  { id: 'morning', label: 'Morning (8:00 AM - 12:00 PM)', icon: '☀️' },
                  { id: 'afternoon', label: 'Afternoon (12:00 PM - 6:00 PM)', icon: '⛅' }
                ].map(time => (
                  <button
                    key={time.id}
                    type="button"
                    className={`time-card ${formData.timePreference === time.id ? 'selected' : ''}`}
                    onClick={() => handleFieldChange('timePreference', time.id)}
                  >
                    <span className="time-icon">{time.icon}</span>
                    <span className="time-label">{time.label}</span>
                  </button>
                ))}
              </div>
              {errors.timePreference && <span className="error-message">{errors.timePreference}</span>}
            </div>

            <div className="wizard-actions">
              <button type="button" className="btn btn-outline" onClick={handleBack}>
                <ArrowLeft size={16} /> Back
              </button>
              <button type="button" className="btn btn-primary" onClick={handleNext}>
                Next Step <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Patient Details */}
        {step === 3 && (
          <div className="wizard-step fade-in">
            <h3>Enter your contact details</h3>
            <p className="step-desc">Provide your information. We respect your privacy and will never share your details.</p>

            <div className="form-group">
              <label className="form-label" htmlFor="fullName">Full Name</label>
              <div className="input-with-icon">
                <User size={18} className="input-icon" />
                <input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  className="form-control"
                  value={formData.fullName}
                  onChange={(e) => handleFieldChange('fullName', e.target.value)}
                />
              </div>
              {errors.fullName && <span className="error-message">{errors.fullName}</span>}
            </div>

            <div className="grid-2" style={{ gap: '20px', marginBottom: '10px' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="(818) 555-0199"
                  className="form-control"
                  value={formData.phone}
                  onChange={(e) => handleFieldChange('phone', e.target.value)}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className="form-control"
                  value={formData.email}
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
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
                  I consent to receive automated appointment notifications, reminders, and office updates via text message at the phone number provided. Message & data rates may apply. Reply STOP to opt-out. See our Privacy Policy.
                </span>
              </label>
              {errors.smsConsent && <span className="error-message">{errors.smsConsent}</span>}
            </div>

            <div className="wizard-actions">
              <button type="button" className="btn btn-outline" onClick={handleBack}>
                <ArrowLeft size={16} /> Back
              </button>
              <button type="submit" className="btn btn-primary">
                Request Appointment
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <div className="wizard-step success-step fade-in">
            <div className="success-icon-wrapper">
              <CheckCircle size={64} className="success-icon" />
            </div>
            <h3>Appointment Request Received!</h3>
            <p className="success-main">
              Thank you, <strong>{formData.fullName}</strong>. We have received your request for a <strong>{formData.visitType.toUpperCase()}</strong> dentistry consultation.
            </p>
            
            <div className="summary-card">
              <div className="summary-item">
                <span className="summary-title">Preferred Date:</span>
                <span className="summary-val">{formData.date}</span>
              </div>
              <div className="summary-item">
                <span className="summary-title">Time Window:</span>
                <span className="summary-val">{formData.timePreference === 'morning' ? 'Morning (8am - 12pm)' : 'Afternoon (12pm - 6pm)'}</span>
              </div>
              <div className="summary-item">
                <span className="summary-title">Contact Phone:</span>
                <span className="summary-val">{formData.phone}</span>
              </div>
            </div>

            <div className="success-note">
              <p>
                <strong>What happens next?</strong> A staff coordinator from our Van Nuys office will review our schedule and call or text you shortly to verify your medical history and lock in your exact appointment slot.
              </p>
            </div>
            
            <button type="button" className="btn btn-primary" onClick={() => setStep(1)}>
              Request Another Appointment
            </button>
          </div>
        )}
      </form>

      <style>{`
        .booking-wizard {
          max-width: 600px;
          margin: 0 auto;
        }
        .wizard-progress {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 40px;
          padding: 0 10px;
        }
        .progress-dot {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: var(--bg-neutral-light);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.95rem;
          transition: var(--transition-normal);
          border: 2px solid var(--border-color);
        }
        .progress-dot.active {
          background-color: var(--color-teal);
          color: var(--text-light);
          border-color: var(--color-teal);
        }
        .progress-line {
          flex: 1;
          height: 4px;
          background-color: var(--border-color);
          margin: 0 12px;
          position: relative;
          border-radius: 2px;
        }
        .progress-line-fill {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          background-color: var(--color-teal);
          transition: width 0.4s ease;
        }
        .wizard-form h3 {
          margin-bottom: 8px;
          font-size: 1.4rem;
        }
        .step-desc {
          font-size: 0.95rem;
          margin-bottom: 30px;
        }
        .visit-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 20px;
        }
        .visit-card {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 16px;
          text-align: left;
          cursor: pointer;
          transition: var(--transition-normal);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .visit-card:hover {
          border-color: var(--color-teal);
          background-color: var(--color-teal-light);
        }
        .visit-card.selected {
          border-color: var(--color-teal);
          background-color: var(--color-teal-light);
          box-shadow: 0 0 0 1px var(--color-teal);
        }
        .visit-title {
          font-weight: 600;
          color: var(--text-primary);
          font-size: 0.95rem;
        }
        .visit-desc {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        .input-with-icon {
          position: relative;
        }
        .input-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-secondary);
          pointer-events: none;
        }
        .input-with-icon .form-control {
          padding-left: 48px;
        }
        .time-options {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        .time-card {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 20px;
          text-align: center;
          cursor: pointer;
          transition: var(--transition-normal);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .time-card:hover {
          border-color: var(--color-teal);
          background-color: var(--color-teal-light);
        }
        .time-card.selected {
          border-color: var(--color-teal);
          background-color: var(--color-teal-light);
          box-shadow: 0 0 0 1px var(--color-teal);
        }
        .time-icon {
          font-size: 1.5rem;
        }
        .time-label {
          font-weight: 500;
          font-size: 0.95rem;
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
        .error-message {
          color: var(--color-emergency);
          font-size: 0.82rem;
          margin-top: 4px;
          display: block;
        }
        .wizard-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 32px;
          padding-top: 20px;
          border-top: 1px solid var(--border-color);
        }
        .info-txt {
          font-size: 0.88rem;
          color: var(--text-secondary);
        }

        /* Success screen styling */
        .success-step {
          text-align: center;
          padding: 20px 0;
        }
        .success-icon-wrapper {
          color: var(--color-teal);
          margin-bottom: 20px;
        }
        .success-main {
          font-size: 1.1rem;
          margin-bottom: 24px;
        }
        .summary-card {
          background-color: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 20px;
          max-width: 400px;
          margin: 0 auto 24px;
          text-align: left;
        }
        .summary-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px dashed var(--border-color);
        }
        .summary-item:last-child {
          border-bottom: none;
        }
        .summary-title {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        .summary-val {
          font-weight: 600;
        }
        .success-note {
          background-color: var(--color-teal-light);
          border: 1px solid rgba(13, 148, 136, 0.15);
          border-radius: var(--radius-md);
          padding: 16px 20px;
          max-width: 480px;
          margin: 0 auto 30px;
          font-size: 0.88rem;
          text-align: left;
        }
        @media (max-width: 640px) {
          .visit-grid, .time-options {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
