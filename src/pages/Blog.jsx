import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, ArrowRight, User } from 'lucide-react';

export default function Blog() {
  const [activeFilter, setActiveFilter] = useState('all');

  const blogPosts = [
    {
      slug: 'prevent-early-childhood-cavities',
      category: 'pediatrics',
      title: 'Preventing Early Childhood Cavities: A Parent\'s Guide',
      excerpt: 'Learn when to start brushing baby teeth, the truth about fruit juice decay, and how to make children\'s dental visits stress-free.',
      author: 'Dr. Jane Smith, DDS',
      date: 'Aug 10, 2026',
      readTime: '4 Min Read'
    },
    {
      slug: 'advantages-of-3d-guided-implants',
      category: 'implants',
      title: 'The Clinical Advantages of 3D Guided Dental Implants',
      excerpt: 'How CBCT 3D jaw bone mapping eliminates surgical guesswork, reduces healing times, and ensures highly predictable tooth replacement.',
      author: 'Dr. Robert Lee, DDS, MS',
      date: 'Jul 28, 2026',
      readTime: '6 Min Read'
    },
    {
      slug: 'invisalign-vs-traditional-braces',
      category: 'ortho',
      title: 'Invisalign® Clear Aligners vs. Low-Profile Braces',
      excerpt: 'An objective comparison of comfort, alignment timelines, hygiene requirements, and monthly payment options for adults and teens.',
      author: 'Dr. Sarah Patel, DDS, MS',
      date: 'Jul 15, 2026',
      readTime: '5 Min Read'
    },
    {
      slug: 'gum-disease-and-cardiology-connection',
      category: 'periodontics',
      title: 'Understanding the Gum Disease & Heart Health Connection',
      excerpt: 'How systemic bacterial inflammation originating in bleeding gum pockets can circulate and affect cardiovascular wellness.',
      author: 'Dr. Robert Lee, DDS, MS',
      date: 'Jun 30, 2026',
      readTime: '5 Min Read'
    },
    {
      slug: 'how-to-handle-common-dental-emergencies',
      category: 'general',
      title: 'First-Aid Guide: How to Handle Common Dental Emergencies',
      excerpt: 'Step-by-step instructions for preserving a knocked-out tooth, stopping minor bleeding, and handling severe sudden toothache.',
      author: 'Dr. John Doe, DDS',
      date: 'Jun 12, 2026',
      readTime: '4 Min Read'
    },
    {
      slug: 'composite-fillings-vs-amalgam',
      category: 'cosmetic',
      title: 'Tooth-Colored Composite Fillings vs. Silver Amalgam',
      excerpt: 'Why modern cosmetic composite fillings provide superior bonding strength, mimic natural tooth structure, and contain no metals.',
      author: 'Dr. John Doe, DDS',
      date: 'May 20, 2026',
      readTime: '3 Min Read'
    }
  ];

  const filteredPosts = activeFilter === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.category === activeFilter);

  const categoryLabels = {
    all: 'All Articles',
    general: 'General Care',
    pediatrics: 'For Kids',
    cosmetic: 'Cosmetic',
    implants: 'Implants',
    ortho: 'Orthodontics',
    periodontics: 'Periodontics'
  };

  return (
    <div className="blog-page fade-in">
      {/* Hero */}
      <section className="blog-hero text-center">
        <div className="container">
          <span className="badge badge-accent">Dental Education</span>
          <h1>Blog & Educational Resources</h1>
          <p className="hero-p" style={{ maxWidth: '650px', margin: '16px auto 0' }}>
            Explore clinically reviewed articles covering childrens dentistry, advanced implants, orthodontic comparisons, and gum disease prevention.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="section blog-filters-sec bg-cream" style={{ padding: '30px 0' }}>
        <div className="container flex-center">
          <div className="filters-container">
            {Object.entries(categoryLabels).map(([id, label]) => (
              <button
                key={id}
                type="button"
                className={`filter-btn ${activeFilter === id ? 'active' : ''}`}
                onClick={() => setActiveFilter(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section blog-grid-sec">
        <div className="container">
          <div className="grid-3 blog-grid">
            {filteredPosts.map((post, idx) => (
              <div key={idx} className="card blog-post-card">
                <span className="blog-post-cat">{categoryLabels[post.category]}</span>
                <h3>{post.title}</h3>
                <p className="blog-post-excerpt">{post.excerpt}</p>
                
                <div className="blog-post-meta">
                  <div className="meta-author">
                    <User size={14} className="meta-icon" />
                    <span>{post.author}</span>
                  </div>
                  <div className="meta-date">
                    <Calendar size={14} className="meta-icon" />
                    <span>{post.date}</span>
                  </div>
                </div>

                <div className="blog-post-footer">
                  <span className="read-time">{post.readTime}</span>
                  <Link to={`/blog/${post.slug}`} className="text-link">Read Article</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="section bg-cream newsletter-sec text-center">
        <div className="container" style={{ maxWidth: '600px' }}>
          <BookOpen className="icon-teal" style={{ marginBottom: '12px' }} />
          <h3>Subscribe to Our Dental Newsletter</h3>
          <p style={{ margin: '12px 0 28px', color: 'var(--text-secondary)' }}>
            Get monthly dental health tips, special promotions, and orthodontic guides delivered directly to your inbox.
          </p>
          
          <form onSubmit={(e) => e.preventDefault()} className="newsletter-form flex-center" style={{ gap: '12px' }}>
            <input type="email" placeholder="Enter your email address" className="form-control" style={{ maxWidth: '350px' }} />
            <button type="submit" className="btn btn-primary" onClick={() => alert('Thank you for subscribing!')}>Subscribe</button>
          </form>
        </div>
      </section>

      <style>{`
        .blog-hero {
          padding: 80px 0 60px;
          background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
        }
        .filters-container {
          display: flex;
          background-color: var(--bg-secondary);
          padding: 6px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-color);
          overflow-x: auto;
          gap: 4px;
        }
        .filter-btn {
          border: none;
          background: none;
          padding: 10px 20px;
          border-radius: var(--radius-full);
          font-weight: 500;
          font-size: 0.92rem;
          cursor: pointer;
          transition: var(--transition-fast);
          white-space: nowrap;
          color: var(--text-secondary);
        }
        .filter-btn:hover {
          color: var(--color-teal);
        }
        .filter-btn.active {
          background-color: var(--color-teal);
          color: var(--text-light);
        }

        /* Post card styling */
        .blog-post-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
        }
        .blog-post-card:hover {
          transform: translateY(-4px);
        }
        .blog-post-cat {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--color-teal);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .blog-post-card h3 {
          font-size: 1.2rem;
          line-height: 1.4;
        }
        .blog-post-excerpt {
          font-size: 0.9rem;
          line-height: 1.5;
          color: var(--text-secondary);
          flex: 1;
        }
        .blog-post-meta {
          width: 100%;
          display: flex;
          justify-content: space-between;
          border-top: 1px solid var(--border-color);
          padding-top: 12px;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        .meta-author, .meta-date {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .meta-icon {
          color: var(--color-teal);
        }
        .blog-post-footer {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
        }
        .read-time {
          font-weight: 600;
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );
}
