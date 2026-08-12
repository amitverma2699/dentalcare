import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Phone, ShieldAlert, BookOpen } from 'lucide-react';

const POSTS_DATA = {
  'prevent-early-childhood-cavities': {
    title: 'Preventing Early Childhood Cavities: A Parent\'s Guide',
    category: 'Pediatric Dentistry',
    author: 'Dr. Jane Smith, DDS',
    authorRole: 'Board-Certified Pediatric Specialist',
    date: 'August 10, 2026',
    readTime: '4 Min Read',
    content: (
      <>
        <p className="lead-paragraph">
          Cavities in baby teeth are highly preventable, yet they remain one of the most common chronic diseases affecting children. Early prevention is essential, as baby teeth act as the natural guides for adult teeth.
        </p>
        
        <h3>When Should Brushing Begin?</h3>
        <p>
          Brushing should begin even before the first tooth erupts. Wipe your infant's gums with a clean, damp washcloth after feedings to remove food residue. Once the first baby tooth emerges (usually around 6 months), transition to a soft-bristled baby toothbrush and a tiny smear of fluoride toothpaste (the size of a grain of rice).
        </p>

        <blockquote>
          "Early childhood cavities can spread rapidly because baby tooth enamel is much thinner than adult enamel. Early clinical interventions are essential."
        </blockquote>

        <h3>The Truth About Fruit Juice & Bottle Decay</h3>
        <p>
          One of the primary causes of infant decay is "baby bottle tooth decay," which occurs when sugars from milk, formula, or fruit juice cling to a child's teeth for long periods. Never put your child to bed with a bottle containing anything other than water. Fruit juices, even 100% natural ones, are packed with sugars that feed decay-causing bacteria.
        </p>

        <h3>Practical Cavity-Prevention Habits</h3>
        <ul>
          <li><strong>Limit snacking:</strong> Keep snacks structured. Constant grazing keeps mouth acids high, accelerating enamel erosion.</li>
          <li><strong>Drink tap water:</strong> Verified tap water contains trace fluoride, which actively remineralizes teeth.</li>
          <li><strong>Schedule regular exams:</strong> Children should see a pediatric specialist by their first birthday or within six months of their first tooth.</li>
        </ul>
      </>
    ),
    cta: 'Schedule your child\'s first checkup today.'
  },
  'advantages-of-3d-guided-implants': {
    title: 'The Clinical Advantages of 3D Guided Dental Implants',
    category: 'Dental Implants',
    author: 'Dr. Robert Lee, DDS, MS',
    authorRole: 'Surgical Specialist',
    date: 'July 28, 2026',
    readTime: '6 Min Read',
    content: (
      <>
        <p className="lead-paragraph">
          Replacing missing teeth has been transformed by 3D imaging. Computer-guided implant surgery allows surgical specialists to plan placements with absolute precision.
        </p>

        <h3>What is a 3D Guided Implant?</h3>
        <p>
          Traditional implant placements relied on two-dimensional X-rays. While useful, 2D scans cannot show bone thickness, nerve paths, or sinus cavities. Guided surgery utilizes a 3D CBCT scan to compile a virtual model of your jaw, allowing our surgeons to simulate placements digitally.
        </p>

        <blockquote>
          "Digital guided planning means smaller surgical entries, lower post-op swelling, and highly predictable long-term implant bonding."
        </blockquote>

        <h3>Key Clinical Benefits:</h3>
        <ul>
          <li><strong>Optimal Angling:</strong> Avoids nerve pathways and coordinates spacing with adjacent teeth.</li>
          <li><strong>Reduced Surgical Time:</strong> The guide indicates the exact placement, shortening chair time.</li>
          <li><strong>Faster Recovery:</strong> Precise incisions mean minimal gum trauma and accelerated tissue healing.</li>
        </ul>
      </>
    ),
    cta: 'Request an implant consultation.'
  },
  'invisalign-vs-traditional-braces': {
    title: 'Invisalign® Clear Aligners vs. Low-Profile Braces',
    category: 'Orthodontics',
    author: 'Dr. Sarah Patel, DDS, MS',
    authorRole: 'Orthodontist Specialist',
    date: 'July 15, 2026',
    readTime: '5 Min Read',
    content: (
      <>
        <p className="lead-paragraph">
          Straightening crowded teeth improves both smile aesthetics and bite function. Modern orthodontics offers discreet, comfortable alternatives to traditional metal brackets.
        </p>

        <h3>Invisalign® Clear Aligners: Aesthetics & Convenience</h3>
        <p>
          Invisalign® utilizes removable, medical-grade polyurethane trays that fit snugly over teeth. They are virtually invisible, allowing adults and teenagers to maintain normal social confidence. Because they are removable, patients can eat any foods and brush and floss normally without threading floss through wires.
        </p>

        <blockquote>
          "Orthodontics is not just cosmetic. Straightening crowded teeth removes pockets where plaque accumulates, preventing cavities."
        </blockquote>

        <h3>Traditional & Ceramic Braces: Power & Bite Mechanics</h3>
        <p>
          Traditional braces utilize low-profile brackets bonded to teeth, connected by archwires. They are highly effective for correcting severe bite issues (overbites, underbites, rotated teeth). Ceramic braces utilize clear brackets that blend with enamel, offering a middle ground between clear trays and metal brackets.
        </p>

        <h3>Comparison Summary</h3>
        <ul>
          <li><strong>Hygiene:</strong> Aligners are easier to clean. Braces require careful flossing.</li>
          <li><strong>Compliance:</strong> Aligners must be worn 22 hours daily. Braces are permanent and work continuously.</li>
          <li><strong>Bite Issues:</strong> Braces remain the clinical standard for complex skeletal bite changes.</li>
        </ul>
      </>
    ),
    cta: 'Schedule an orthodontic consult.'
  },
  'gum-disease-and-cardiology-connection': {
    title: 'Understanding the Gum Disease & Heart Health Connection',
    category: 'Gum Care (Periodontics)',
    author: 'Dr. Robert Lee, DDS, MS',
    authorRole: 'Board-Certified Periodontist',
    date: 'June 30, 2026',
    readTime: '5 Min Read',
    content: (
      <>
        <p className="lead-paragraph">
          Your oral health is a direct window into your systemic wellness. Recent medical research has verified a strong clinical link between periodontal gum disease and heart health.
        </p>

        <h3>How Gum Bacteria Enters the Bloodstream</h3>
        <p>
          Gum disease begins when plaque calcifies into tartar beneath the gums, creating inflamed pockets. When gums bleed during brushing or eating, it indicates that the blood vessels are exposed. Bacteria from these pockets can enter your bloodstream, circulating to your heart and arteries.
        </p>

        <blockquote>
          "Chronic gum inflammation leads to systemic arterial plaque buildup, increasing cardiovascular risks."
        </blockquote>

        <h3>Preventive Maintenance Tips</h3>
        <ul>
          <li><strong>Floss daily:</strong> Brushing only cleans 60% of tooth surfaces. Flossing removes plaque between teeth.</li>
          <li><strong>Manage pocket depths:</strong> Pocket charting helps identify areas needing deep cleanings.</li>
          <li><strong>Deep Cleanings (Scaling):</strong> Smoothes root surfaces to keep bacteria from sticking.</li>
        </ul>
      </>
    ),
    cta: 'Book a gum health screening.'
  },
  'how-to-handle-common-dental-emergencies': {
    title: 'First-Aid Guide: How to Handle Common Dental Emergencies',
    category: 'General Dentistry',
    author: 'Dr. John Doe, DDS',
    authorRole: 'Lead General Practitioner',
    date: 'June 12, 2026',
    readTime: '4 Min Read',
    content: (
      <>
        <p className="lead-paragraph">
          Knowing how to react in the first 30 minutes of a dental emergency can mean the difference between saving and losing a tooth.
        </p>

        <h3>1. Knocked-Out Adult Tooth</h3>
        <p>
          Handle the tooth only by the crown (chewing surface), never the root. Gently rinse it with water if dirty, and try to place it back in the socket. If that is not possible, place the tooth in a glass of milk or saline solution and visit our office immediately. Saving the tooth is highly possible if treated within 60 minutes.
        </p>

        <blockquote>
          "Tooth trauma requires fast action. Keep the tooth root moist and seek same-day dental care."
        </blockquote>

        <h3>2. Severe, Throbbing Toothache</h3>
        <p>
          Rinse your mouth with warm salt water and use dental floss to remove any lodged food debris. Do not place aspirin directly on the gums, as this will burn the tissue. Call our office to schedule a same-day emergency appointment to identify the cause of the nerve infection.
        </p>

        <h3>3. Lost Fillings or Broken Crowns</h3>
        <p>
          Keep the crown safe if it has come off. You can use sugar-free gum or temporary dental cement from a pharmacy to cover the exposed tooth surface, shielding it from temperature sensitivity until you reach our office.
        </p>
      </>
    ),
    cta: 'Call our emergency line for assistance.'
  },
  'composite-fillings-vs-amalgam': {
    title: 'Tooth-Colored Composite Fillings vs. Silver Amalgam',
    category: 'Cosmetic Dentistry',
    author: 'Dr. John Doe, DDS',
    authorRole: 'Lead Practitioner',
    date: 'May 20, 2026',
    readTime: '3 Min Read',
    content: (
      <>
        <p className="lead-paragraph">
          Dental fillings are essential for stopping decay. Modern composite materials have replaced traditional silver metals, offering strength and aesthetics.
        </p>

        <h3>What are Composite Fillings?</h3>
        <p>
          Composite fillings are made from a mixture of fine glass particles and acrylic resin. The material starts as a paste, which is placed directly into the cavity, shaped, and cured with a specialized high-intensity light. The material bonds directly to the tooth structure.
        </p>

        <blockquote>
          "Composite fillings require less enamel removal than traditional silver amalgams, preserving natural tooth strength."
        </blockquote>

        <h3>Comparison Summary</h3>
        <ul>
          <li><strong>Aesthetics:</strong> Composites are shade-matched to your teeth. Amalgams are dark silver.</li>
          <li><strong>Tooth Integrity:</strong> Composite material bonds directly to the tooth, strengthening it.</li>
          <li><strong>Conservatism:</strong> Less natural tooth structure needs to be removed for composite fillings.</li>
        </ul>
      </>
    ),
    cta: 'Schedule a routine checkup.'
  }
};

export default function BlogPost() {
  const { postSlug } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [postSlug]);

  const post = POSTS_DATA[postSlug];

  if (!post) {
    return (
      <div className="container text-center" style={{ padding: '100px 0' }}>
        <h2>Article Not Found</h2>
        <p style={{ margin: '16px 0 32px' }}>We couldn\'t find the educational resource page you requested.</p>
        <Link to="/blog" className="btn btn-primary">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="blog-post-page fade-in">
      {/* Breadcrumbs */}
      <div className="blog-breadcrumbs">
        <div className="container">
          <Link to="/blog" className="back-blog-link">
            <ArrowLeft size={14} /> Back to Blog
          </Link>
          <span className="bread-sep">/</span>
          <span className="bread-current">{post.title}</span>
        </div>
      </div>

      {/* Main Content Layout */}
      <section className="section post-content-sec">
        <div className="container grid-2" style={{ gridTemplateColumns: '2fr 1fr', gap: '50px' }}>
          
          {/* Article Body */}
          <article className="post-main-content">
            <span className="badge badge-accent post-meta-cat">{post.category}</span>
            <h1 className="post-title-detail">{post.title}</h1>
            
            <div className="post-author-row">
              <div className="author-details-grp">
                <div className="author-avatar-sm">
                  <span>{post.author.substring(4, 5)}</span>
                </div>
                <div>
                  <span className="author-name-text">{post.author}</span>
                  <span className="author-role-lbl">{post.authorRole}</span>
                </div>
              </div>
              <div className="post-date-read">
                <div className="date-item">
                  <Calendar size={14} />
                  <span>{post.date}</span>
                </div>
                <div className="read-time-item">
                  <BookOpen size={14} />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>

            <div className="article-body-text">
              {post.content}
            </div>

            {/* Inline CTA Box */}
            <div className="article-inline-cta card">
              <h4>Interested in this treatment?</h4>
              <p>Schedule a consult at our Van Nuys clinic. We accept PPO plans, Denti-Cal, and CareCredit.</p>
              <Link to="/appointment" className="btn btn-primary btn-sm" style={{ marginTop: '14px' }}>
                {post.cta}
              </Link>
            </div>
          </article>

          {/* Sidebar widget */}
          <div className="post-sidebar-area">
            <div className="card sidebar-cta-box text-center">
              <ShieldAlert className="sidebar-icon-emergency" />
              <h3>Dental Emergency?</h3>
              <p style={{ margin: '12px 0 24px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                Don't wait for dental pain to worsen. We provide same-day emergency appointments in Van Nuys, CA.
              </p>
              <a href="tel:8185550199" className="btn btn-emergency" style={{ width: '100%' }}>
                <Phone size={16} /> Call (818) 555-0199
              </a>
              <Link to="/emergency" className="btn btn-outline" style={{ width: '100%', marginTop: '12px' }}>
                Emergency First-Aid Guide
              </Link>
            </div>

            <div className="card sidebar-hours-box" style={{ marginTop: '24px' }}>
              <h3>Office Hours</h3>
              <ul className="sidebar-hours-list">
                <li><span>Mon - Sat:</span> 8:00 AM - 6:00 PM</li>
                <li><span>Sunday:</span> Closed</li>
              </ul>
              <div className="sidebar-hours-footer" style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Location: 6251 Van Nuys Blvd, Van Nuys, CA 91401
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      <style>{`
        .blog-breadcrumbs {
          background-color: var(--bg-neutral-light);
          padding: 14px 0;
          font-size: 0.88rem;
          border-bottom: 1px solid var(--border-color);
        }
        .blog-breadcrumbs .container {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .back-blog-link {
          color: var(--color-teal);
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .bread-sep {
          color: var(--text-secondary);
        }
        .bread-current {
          color: var(--text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 300px;
        }

        /* Article content detailed */
        .post-title-detail {
          font-size: clamp(2rem, 4vw, 2.8rem);
          margin-top: 12px;
          margin-bottom: 24px;
          line-height: 1.2;
        }
        .post-author-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 20px;
          margin-bottom: 30px;
          flex-wrap: wrap;
          gap: 16px;
        }
        .author-details-grp {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .author-avatar-sm {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: var(--color-teal-light);
          color: var(--color-teal);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
        }
        .author-name-text {
          font-weight: 600;
          display: block;
          font-size: 0.98rem;
        }
        .author-role-lbl {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        .post-date-read {
          display: flex;
          gap: 20px;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .date-item, .read-time-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* Body text styling */
        .article-body-text p {
          font-size: 1.05rem;
          line-height: 1.7;
          margin-bottom: 24px;
        }
        .lead-paragraph {
          font-size: 1.2rem !important;
          color: var(--text-primary);
          line-height: 1.6;
        }
        .article-body-text h3 {
          font-size: 1.35rem;
          margin-top: 36px;
          margin-bottom: 16px;
        }
        .article-body-text blockquote {
          border-left: 4px solid var(--color-teal);
          padding-left: 20px;
          margin: 32px 0;
          font-style: italic;
          font-size: 1.15rem;
          color: var(--text-primary);
          line-height: 1.6;
        }
        .article-body-text ul {
          list-style: none;
          margin-bottom: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-left: 8px;
        }
        .article-body-text ul li {
          font-size: 1.02rem;
          line-height: 1.6;
        }
        .article-body-text ul li strong {
          color: var(--text-primary);
        }
        
        .article-inline-cta {
          border-left: 4px solid var(--color-teal);
          background-color: var(--bg-neutral-light);
          margin-top: 40px;
        }
        .article-inline-cta h4 {
          font-size: 1.15rem;
          margin-bottom: 4px;
        }
        .article-inline-cta p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 0;
        }

        /* Sidebar */
        .sidebar-cta-box {
          border: 1px solid rgba(185, 28, 28, 0.15);
          background-color: var(--color-emergency-light);
        }
        .sidebar-icon-emergency {
          color: var(--color-emergency);
          width: 36px;
          height: 36px;
          margin: 0 auto 12px;
        }
        .sidebar-cta-box h3 {
          color: var(--color-emergency);
        }
        .sidebar-hours-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 16px;
        }
        .sidebar-hours-list li {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
        }
        .sidebar-hours-list span {
          font-weight: 600;
        }

        @media (max-width: 1024px) {
          .post-content-sec .container {
            grid-template-columns: 1fr !important;
          }
          .post-sidebar-area {
            margin-top: 40px;
          }
        }
      `}</style>
    </div>
  );
}
