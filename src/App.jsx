import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import UtilityBar from './components/UtilityBar';
import Navbar from './components/Navbar';
import MobileNav from './components/MobileNav';
import Footer from './components/Footer';
import StickyActionBar from './components/StickyActionBar';
import { AppProvider } from './context/AppContext';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Team from './pages/Team';
import DoctorProfile from './pages/DoctorProfile';
import Reviews from './pages/Reviews';
import PatientHub from './pages/PatientHub';
import Appointment from './pages/Appointment';
import Contact from './pages/Contact';
import Offers from './pages/Offers';
import Financing from './pages/Financing';
import SmileGallery from './pages/SmileGallery';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Emergency from './pages/Emergency';
import Admin from './pages/Admin';

// Reusable ScrollToTop component
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there is a hash, scroll to that element instead of the top
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(prev => !prev);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <div className="app-container">
          {/* Global Utilities & Headers */}
          <UtilityBar />
          <Navbar onMobileMenuToggle={handleMobileMenuToggle} />
          
          {/* Mobile Navigation Drawer */}
          <MobileNav isOpen={mobileMenuOpen} onClose={handleMobileMenuClose} />
          
          {/* Main Routes */}
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:serviceId" element={<ServiceDetail />} />
              <Route path="/team" element={<Team />} />
              <Route path="/team/:doctorSlug" element={<DoctorProfile />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/patient-info" element={<PatientHub />} />
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/offers" element={<Offers />} />
              <Route path="/financing" element={<Financing />} />
              <Route path="/gallery" element={<SmileGallery />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:postSlug" element={<BlogPost />} />
              <Route path="/emergency" element={<Emergency />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          
          {/* Global Footer & Mobile Actions */}
          <Footer />
          <StickyActionBar />
        </div>

        <style>{`
          .app-container {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
          .main-content {
            flex: 1;
          }
        `}</style>
      </Router>
    </AppProvider>
  );
}
