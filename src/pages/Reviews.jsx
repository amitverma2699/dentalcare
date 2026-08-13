import React, { useState } from 'react';
import { Star, CheckCircle, ShieldAlert, Award, MessageSquare } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Reviews() {
  const { reviewsList, addReview } = useAppContext();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    treatment: 'General Dentistry',
    comment: ''
  });
  const [errors, setErrors] = useState({});

  const handleFieldChange = (field, value) => {
    setNewReview(prev => ({ ...prev, [field]: value }));
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
    if (!newReview.name.trim()) newErrors.name = 'Name is required';
    if (!newReview.comment.trim()) newErrors.comment = 'Review text is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Add mock review to global context state
    addReview({
      author: newReview.name,
      rating: Number(newReview.rating),
      text: newReview.comment,
      treatment: newReview.treatment
    });
    setFormSubmitted(true);
  };

  return (
    <div className="reviews-page fade-in">
      {/* Hero */}
      <section className="reviews-hero text-center">
        <div className="container">
          <span className="badge badge-accent">Patient Testimonials</span>
          <h1>Patient Reviews & Ratings</h1>
          <p className="hero-p">
            Read verified reviews from local Van Nuys residents. We take pride in delivering gentle, clinical excellence that keeps our patients smiling.
          </p>
        </div>
      </section>

      {/* Stats Summary */}
      <section className="section bg-cream">
        <div className="container grid-3 stats-row-boxes">
          <div className="card stat-box text-center">
            <span className="stat-big">4.9</span>
            <div className="stars-row flex-center" style={{ margin: '8px 0' }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="var(--color-gold)" color="var(--color-gold)" />)}
            </div>
            <p>Overall Rating based on 450+ verified ratings</p>
          </div>

          <div className="card stat-box text-center">
            <span className="stat-big">98%</span>
            <div className="flex-center" style={{ height: '34px', color: 'var(--color-teal)' }}>
              <CheckCircle size={28} />
            </div>
            <p>Patient Satisfaction and comfort recommendation score</p>
          </div>

          <div className="card stat-box text-center">
            <span className="stat-big">100%</span>
            <div className="flex-center" style={{ height: '34px', color: 'var(--color-teal)' }}>
              <Award size={28} />
            </div>
            <p>Certified Providers carrying recognized qualifications</p>
          </div>
        </div>
      </section>

      {/* Main Grid: Reviews List & Write a Review */}
      <section className="section reviews-list-sec">
        <div className="container grid-2" style={{ gridTemplateColumns: '1.4fr 1fr', gap: '50px' }}>
          
          {/* Reviews List */}
          <div className="reviews-feed">
            <h3>Verified Feedback</h3>
            <p style={{ marginBottom: '30px', color: 'var(--text-secondary)' }}>Showing clinical testimonials from our patients.</p>

            <div className="reviews-feed-list">
              {reviewsList.map((rev, idx) => (
                <div key={idx} className="card review-long-card-item fade-in">
                  <div className="rev-header">
                    <div>
                      <h4>{rev.author}</h4>
                      <span className="rev-treatment">{rev.treatment}</span>
                    </div>
                    <div className="rev-meta">
                      <div className="stars-row">
                        {[...Array(rev.rating)].map((_, i) => <Star key={i} size={14} fill="var(--color-gold)" color="var(--color-gold)" />)}
                      </div>
                      <span className="rev-date">{rev.date}</span>
                    </div>
                  </div>
                  <p className="rev-text">"{rev.text}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* Write a Review */}
          <div className="write-review-sticky">
            <div className="card write-review-card">
              {!formSubmitted ? (
                <form onSubmit={handleSubmit} className="review-form">
                  <div className="card-header-icon" style={{ marginBottom: '20px' }}>
                    <MessageSquare size={22} className="icon-teal" />
                    <h3>Leave a Review</h3>
                  </div>
                  <p style={{ marginBottom: '24px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Shared experiences help other patients choose the right care. Submit your anonymous review below.</p>

                  <div className="form-group">
                    <label className="form-label" htmlFor="reviewerName">Your Name</label>
                    <input
                      id="reviewerName"
                      type="text"
                      placeholder="Elena R."
                      className="form-control"
                      value={newReview.name}
                      onChange={(e) => handleFieldChange('name', e.target.value)}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="reviewRating">Rating</label>
                    <select
                      id="reviewRating"
                      className="form-control"
                      value={newReview.rating}
                      onChange={(e) => handleFieldChange('rating', e.target.value)}
                    >
                      <option value="5">5 Stars (Excellent)</option>
                      <option value="4">4 Stars (Good)</option>
                      <option value="3">3 Stars (Average)</option>
                      <option value="2">2 Stars (Poor)</option>
                      <option value="1">1 Star (Very Poor)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="reviewTreatment">Treatment Received</label>
                    <select
                      id="reviewTreatment"
                      className="form-control"
                      value={newReview.treatment}
                      onChange={(e) => handleFieldChange('treatment', e.target.value)}
                    >
                      <option value="General Dentistry">General Dentistry</option>
                      <option value="Pediatric Dentistry">Pediatric Dentistry</option>
                      <option value="Cosmetic Dentistry">Cosmetic Dentistry</option>
                      <option value="Dental Implants">Dental Implants</option>
                      <option value="Restorative Care">Restorative Care</option>
                      <option value="Orthodontics">Orthodontics</option>
                      <option value="Root Canal Therapy">Root Canal Therapy</option>
                      <option value="Gum Care (Periodontics)">Gum Care (Periodontics)</option>
                      <option value="Oral Surgery">Oral Surgery</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="reviewerComment">Your Comments</label>
                    <textarea
                      id="reviewerComment"
                      placeholder="Describe your comfort level, our specialists, and results..."
                      className="form-control"
                      value={newReview.comment}
                      onChange={(e) => handleFieldChange('comment', e.target.value)}
                    />
                    {errors.comment && <span className="error-message">{errors.comment}</span>}
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    Submit Review
                  </button>
                </form>
              ) : (
                <div className="review-success text-center fade-in" style={{ padding: '20px 0' }}>
                  <div className="success-icon-wrapper" style={{ color: 'var(--color-teal)', marginBottom: '16px' }}>
                    <CheckCircle size={48} />
                  </div>
                  <h3>Thank You for Submitting!</h3>
                  <p style={{ margin: '12px 0 24px', fontSize: '0.95rem' }}>Your clinical testimonial has been successfully loaded into the local reviews feed below.</p>
                  <button type="button" className="btn btn-outline" onClick={() => setFormSubmitted(false)}>
                    Submit Another Review
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
    .reviews-hero {
      padding: 80px 0 60px;
      background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
    }
    .stats-row-boxes {
      gap: 24px;
    }
    .stat-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }
    .stat-big {
      font-family: 'Outfit', sans-serif;
      font-size: 3rem;
      font-weight: 700;
      color: var(--text-primary);
      line-height: 1;
    }
    .stat-box p {
      font-size: 0.88rem;
      color: var(--text-secondary);
      margin-top: 10px;
    }

    /* Feed list items */
    .reviews-feed-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .review-long-card-item {
      padding: 24px;
    }
    .review-long-card-item:hover {
      transform: translateY(-2px);
    }
    .rev-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 12px;
      flex-wrap: wrap;
      gap: 8px;
    }
    .rev-header h4 {
      font-size: 1.1rem;
    }
    .rev-treatment {
      font-size: 0.8rem;
      color: var(--color-teal);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .rev-meta {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
    .rev-date {
      font-size: 0.8rem;
      color: var(--text-secondary);
    }
    .rev-text {
      font-size: 0.95rem;
      font-style: italic;
      line-height: 1.6;
    }

    /* Sticky write a review */
    .write-review-sticky {
      position: sticky;
      top: 100px;
      height: fit-content;
    }
    .write-review-card {
      border-top: 4px solid var(--color-teal);
    }

    @media (max-width: 1024px) {
      .reviews-list-sec .container {
        grid-template-columns: 1fr !important;
      }
      .write-review-sticky {
        position: static;
        margin-top: 40px;
      }
    }
  `}</style>
);
