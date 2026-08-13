import React from 'react';
import { MapPin, Clock, Phone, AlertCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function UtilityBar() {
  const { officeSettings } = useAppContext();
  const phoneTel = officeSettings.phone.replace(/[^0-9]/g, '');

  return (
    <div className="utility-bar">
      <div className="container utility-content">
        <div className="utility-left">
          <a href={`https://maps.google.com/?q=${encodeURIComponent(officeSettings.address)}`} target="_blank" rel="noopener noreferrer" className="utility-item">
            <MapPin size={14} className="icon-teal" />
            <span>{officeSettings.address.split(',')[0] + ', ' + officeSettings.address.split(',')[1]}</span>
          </a>
          <div className="utility-item">
            <Clock size={14} className="icon-teal" />
            <span>{officeSettings.hours}</span>
          </div>
        </div>
        <div className="utility-right">
          <div className="utility-item emergency-badge-pulse">
            <AlertCircle size={14} className="icon-red" />
            <span className="text-red">Same-Day Emergency Appointments</span>
          </div>
          <a href={`tel:${phoneTel}`} className="utility-item phone-link">
            <Phone size={14} className="icon-teal" />
            <span className="font-semibold">{officeSettings.phone}</span>
          </a>
        </div>
      </div>
      <style>{`
        .utility-bar {
          background-color: var(--bg-neutral-light);
          border-bottom: 1px solid var(--border-color);
          font-size: 0.85rem;
          padding: 8px 0;
          color: var(--text-secondary);
        }
        .utility-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        .utility-left, .utility-right {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .utility-item {
          display: flex;
          align-items: center;
          gap: 6px;
          transition: var(--transition-fast);
        }
        a.utility-item:hover {
          color: var(--color-teal);
        }
        .phone-link {
          color: var(--text-primary);
        }
        .phone-link:hover {
          color: var(--color-teal);
        }
        .icon-teal {
          color: var(--color-teal);
        }
        .icon-red {
          color: var(--color-emergency);
        }
        .text-red {
          color: var(--color-emergency);
          font-weight: 600;
        }
        .emergency-badge-pulse {
          display: flex;
          align-items: center;
          position: relative;
        }
        .emergency-badge-pulse::before {
          content: '';
          position: absolute;
          left: -4px;
          top: 50%;
          transform: translateY(-50%);
          width: 6px;
          height: 6px;
          background-color: var(--color-emergency);
          border-radius: 50%;
          animation: pulse 1.8s infinite;
        }
        .font-semibold {
          font-weight: 600;
        }
        @keyframes pulse {
          0% { transform: translateY(-50%) scale(0.95); box-shadow: 0 0 0 0 rgba(185, 28, 28, 0.7); }
          70% { transform: translateY(-50%) scale(1); box-shadow: 0 0 0 6px rgba(185, 28, 28, 0); }
          100% { transform: translateY(-50%) scale(0.95); box-shadow: 0 0 0 0 rgba(185, 28, 28, 0); }
        }
        @media (max-width: 768px) {
          .utility-content {
            justify-content: center;
            text-align: center;
          }
          .utility-left, .utility-right {
            justify-content: center;
            width: 100%;
            gap: 16px;
          }
        }
      `}</style>
    </div>
  );
}
