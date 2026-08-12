import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Calendar } from 'lucide-react';

export default function StickyActionBar() {
  return (
    <div className="sticky-action-bar">
      <a href="tel:8185550199" className="action-btn call-action">
        <Phone size={18} />
        <span>Call Office</span>
      </a>
      <Link to="/appointment" className="action-btn book-action">
        <Calendar size={18} />
        <span>Book Appointment</span>
      </Link>

      <style>{`
        .sticky-action-bar {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 64px;
          background-color: var(--bg-secondary);
          box-shadow: 0 -4px 16px rgba(30, 34, 41, 0.08);
          z-index: 990;
          border-top: 1px solid var(--border-color);
        }

        .action-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          height: 100%;
          font-weight: 600;
          font-size: 0.95rem;
          transition: var(--transition-fast);
        }

        .call-action {
          color: var(--text-primary);
          background-color: var(--bg-secondary);
        }

        .call-action:active {
          background-color: var(--bg-neutral-light);
        }

        .book-action {
          color: var(--text-light);
          background-color: var(--color-teal);
        }

        .book-action:active {
          background-color: var(--color-teal-hover);
        }

        @media (max-width: 768px) {
          .sticky-action-bar {
            display: flex;
          }
        }
      `}</style>
    </div>
  );
}
