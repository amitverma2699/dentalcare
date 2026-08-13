import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

// Default hardcoded initial data to populate localStorage if empty
const DEFAULT_OFFICE_SETTINGS = {
  phone: '(818) 555-0199',
  address: '6251 Van Nuys Blvd., Van Nuys, CA 91401',
  email: 'info@bestfamilydental.com',
  hours: 'Mon - Sat: 8:00 AM - 6:00 PM',
  hoursFull: 'Monday - Saturday: 8:00 AM - 6:00 PM\nSunday: Closed',
  parking: 'Free client parking is available in the dedicated lot directly behind the dental building.',
  logoText: 'Affordable Dental',
  tagline: 'Complete Dental Care for Your Whole Family — Under One Roof',
  facebook: 'https://facebook.com',
  instagram: 'https://instagram.com',
  yelp: 'https://yelp.com',
  heroImage: '',
  logoImage: ''
};

const DEFAULT_OFFERS = [
  {
    id: '1',
    badge: 'New Patients',
    title: 'Free Oral Exam & X-Rays',
    desc: 'Available for eligible new private-pay patients (without insurance coverage). Includes a comprehensive clinical evaluation, diagnostic X-rays, and customized treatment planning advice.',
    finePrint: 'Limit one per patient. Cannot be combined with insurance or other discount plans. Valid for private-pay patients only.',
    code: 'NEW-EXAM-FREE'
  },
  {
    id: '2',
    badge: 'Dental Implants',
    title: 'Dental Implant Consultation Promotion',
    desc: 'Includes a comprehensive implant consultation, a diagnostic 3D CBCT bone structure scan, and a personalized implant treatment plan mapped out by our surgical lead Dr. Robert Lee.',
    finePrint: 'Required for all implant candidates. Bone density must be evaluated prior to surgical confirmation. Includes CBCT scan ($350 value).',
    code: 'IMPLANT-CONS'
  },
  {
    id: '3',
    badge: 'Cosmetics',
    title: 'Braces Teeth Whitening',
    desc: 'Complete your orthodontic braces or clear aligner treatment with a complimentary professional whitening kit (Opalescence®) to finalize your new smile.',
    finePrint: 'Kit delivered post-treatment after appliances are removed. Patient must maintain regular cleanings during orthodontic care.',
    code: 'ORTHO-WHITE'
  }
];

const DEFAULT_DOCTORS = [
  {
    slug: 'dr-john-doe',
    name: 'Dr. John Doe, DDS',
    role: 'Lead Dentist & Clinic Director',
    specialty: 'General & Cosmetic Dentistry',
    credentials: 'UCLA School of Dentistry, Member of ADA & CDA',
    focus: 'Porcelain veneers, cosmetic bonding, full-mouth restorations, and dental anxiety management.',
    bio: 'Dr. Doe has spent over 12 years delivering comprehensive dental care to families in the San Fernando Valley. He established Affordable Dental with the vision of offering advanced, multi-specialty care in a single warm, comfort-first location.',
    education: [
      'Doctor of Dental Surgery (DDS) - UCLA School of Dentistry (2012)',
      'Bachelor of Science in Biology - UC Irvine (2008)',
      'Advanced Aesthetic & Restorative Residency - Esthetic Dental Institute (2013)'
    ],
    memberships: [
      'American Dental Association (ADA)',
      'California Dental Association (CDA)',
      'San Fernando Valley Dental Society (SFVDS)',
      'American Academy of Cosmetic Dentistry (AACD)'
    ],
    philosophy: 'My clinical philosophy is built on education and active listening. I believe that a visit to the dentist should never be stressful or filled with clinical surprises. By explaining the "why" behind every recommendation and offering gentle comfort options, I help my patients feel completely in control of their dental health.',
    anxietyMsg: 'To my nervous patients: I understand that dental anxiety is real and can prevent you from seeking care. In our office, we prioritize your comfort above all else. We will move at your exact pace, explain every instrument before we use it, and offer nitrous oxide (laughing gas) or oral conscious sedation so you can get the care you need completely stress-free.',
    clinicalFocus: [
      'Smile Makeovers & Porcelain Veneers',
      'Composite Restorations (Tooth-Colored Fillings)',
      'Full-Mouth Reconstructive Rehabilitation',
      'Minimally Invasive Decay Prevention'
    ]
  },
  {
    slug: 'dr-jane-smith',
    name: 'Dr. Jane Smith, DDS',
    role: 'Pediatric Dental Specialist',
    specialty: 'Pediatric Dentistry',
    credentials: 'USC School of Dentistry, Board Certified by the AAPD',
    focus: 'Early growth screening, childhood decay prevention, special-needs dentistry, and child desensitization.',
    bio: 'Dr. Smith completed an additional two years of specialized residency training in pediatric dentistry. She focuses on building positive associations with dental health, making visits fun, painless, and educational for young patients.',
    education: [
      'Doctor of Dental Surgery (DDS) - USC School of Dentistry (2015)',
      'Pediatric Dentistry Specialty Certificate - Children\'s Hospital Oakland (2017)',
      'Bachelor of Science in Psychology - UCLA (2011)'
    ],
    memberships: [
      'American Academy of Pediatric Dentistry (AAPD)',
      'American Dental Association (ADA)',
      'California Dental Association (CDA)'
    ],
    philosophy: 'Children are not just miniature adults—they require specialized behavioral, developmental, and clinical approaches. I focus on creating a whimsical, non-threatening space where children feel safe and curious. By teaching children about dental hygiene using games and positive reinforcement, we lay the foundation for a lifetime of happy smiles.',
    anxietyMsg: 'For parents of anxious children: We specialize in pediatric desensitization. We use simple, non-threatening language, let children touch clean instruments, and offer rewarding patient prizes. We also accommodate parents sitting directly beside the treatment chair to provide constant reassurance.',
    clinicalFocus: [
      'Early Childhood Desensitization & Exams',
      'Pediatric Growth & Developmental Screening',
      'Fluoride Varnishes & Custom Dental Sealants',
      'Special-Needs Pediatric Dentistry'
    ]
  },
  {
    slug: 'dr-robert-lee',
    name: 'Dr. Robert Lee, DDS, MS',
    role: 'Surgical Specialist',
    specialty: 'Periodontics & Implantology',
    credentials: 'Loma Linda University, Diplomate of the American Board of Periodontology',
    focus: 'Computer-guided implant placement, 3D bone grafting, periodontal gum therapy, and surgical extractions.',
    bio: 'Dr. Lee is a board-certified periodontist with a master’s degree in implantology. He specializes in restorative gum surgery and jaw bone reconstructions, translating complex anatomical scans into highly precise, comfortable implant plans.',
    education: [
      'Doctor of Dental Surgery (DDS) - Loma Linda University (2009)',
      'Master of Science (MS) in Periodontics & Implantology - Loma Linda Graduate School (2012)',
      'Board Certified - American Board of Periodontology (2013)'
    ],
    memberships: [
      'American Academy of Periodontology (AAP)',
      'Academy of Osseointegration (AO)',
      'American Dental Association (ADA)',
      'California Dental Association (CDA)'
    ],
    philosophy: 'Surgical dentistry relies on extreme precision and biological understanding. I utilize 3D CBCT scans and digital planning software to map out implant surgeries virtually before touching a patient. This careful planning ensures smaller incisions, virtually no post-operative discomfort, and highly predictable long-term outcomes.',
    anxietyMsg: 'To patients requiring surgery: It is completely normal to feel apprehensive about extractions, implants, or gum grafts. We offer advanced localized numbing blocks and conscious IV sedation options. Under sedation, you will fall into a deeply relaxed sleep and wake up with the procedure finished, remembering nothing.',
    clinicalFocus: [
      'Computer-Guided Dental Implant Placement',
      'Advanced 3D Jaw Bone Grafting & Sinus Lifts',
      'Non-Surgical & Surgical Periodontal Gum Therapy',
      'Surgical Extractions & Wisdom Tooth Removals'
    ]
  },
  {
    slug: 'dr-sarah-patel',
    name: 'Dr. Sarah Patel, DDS, MS',
    role: 'Orthodontic Specialist',
    specialty: 'Orthodontics & Dentofacial Orthopedics',
    credentials: 'Columbia University School of Dental Medicine, Member of AAO',
    focus: 'Invisalign® clear aligner planning, digital bite simulations, and pediatric interceptive growth guidance.',
    bio: 'Dr. Patel focuses on bite mechanics and alignment aesthetics for children and adults. She designs custom clear aligner plans that minimize treatment duration while ensuring optimal jaw joint comfort.',
    education: [
      'Doctor of Dental Surgery (DDS) - Columbia University School of Dental Medicine (2016)',
      'Master of Science (MS) & Certificate in Orthodontics - Columbia University (2019)',
      'Bachelor of Science in Biochemistry - UC San Diego (2012)'
    ],
    memberships: [
      'American Association of Orthodontists (AAO)',
      'Pacific Coast Society of Orthodontists (PCSO)',
      'American Dental Association (ADA)',
      'California Dental Association (CDA)'
    ],
    philosophy: 'Orthodontics is the perfect intersection of biomechanical engineering and artistry. A straight smile is not only beautiful—it aligns your jaw joints, stops enamel wear, and makes teeth much easier to clean. I design aligner and braces plans that accommodate your lifestyle, prioritizing long-term joint comfort and jaw health.',
    anxietyMsg: 'To patients considering orthodontic work: Getting braces or aligners is a journey. We utilize comfortable 3D scanners rather than messy physical putties to map your teeth, and we walk you through a digital simulation of your smile progression so you know exactly what to expect at every step.',
    clinicalFocus: [
      'Invisalign® for Adults & Teenagers',
      'SureSmile® Clear Aligner System Treatments',
      'Traditional Ceramic & Low-Profile Braces',
      'Pediatric Phase 1 Interceptive Growth Appliances'
    ]
  }
];

const DEFAULT_REVIEWS = [
  { id: '1', author: 'Maria R.', rating: 5, date: '2 weeks ago', text: 'I have always been terrified of root canals, but Dr. Doe and his assistant were incredibly gentle. I felt absolutely no pain. Highly recommend their comfort options!', treatment: 'Root Canal Therapy' },
  { id: '2', author: 'David T.', rating: 5, date: '1 month ago', text: 'We bring our three kids here for pediatric cleanings. The staff is patient, funny, and keeps the kids completely relaxed. It makes dental visits so much easier.', treatment: 'Pediatric Dentistry' },
  { id: '3', author: 'Sarah M.', rating: 5, date: '1 month ago', text: 'Got dental implants done here, and the entire process was smooth. The 3D imaging let me see the exact plan before starting. Very professional team and clean office.', treatment: 'Dental Implants' },
  { id: '4', author: 'James L.', rating: 5, date: '2 months ago', text: 'The gentlest cleaning I have ever had. The hygienist explained every step, and the digital camera let me see exactly what teeth needed attention.', treatment: 'General Dentistry' },
  { id: '5', author: 'Rachel V.', rating: 5, date: '2 months ago', text: 'The Zoom whitening got my teeth 5 shades lighter for my wedding! And they were so careful to manage my usual tooth sensitivity.', treatment: 'Cosmetic Dentistry' }
];

export function AppProvider({ children }) {
  // ----------------------------------------------------
  // NOTE FOR PRODUCTION DATABASE (e.g. Firebase or Supabase):
  // Instead of loading from/saving to localStorage inside state hooks,
  // you would fetch these collections inside an async useEffect, e.g.:
  // 
  // useEffect(() => {
  //   const loadData = async () => {
  //     const settings = await db.collection('settings').doc('office').get();
  //     setOfficeSettings(settings.data());
  //   };
  //   loadData();
  // }, []);
  // ----------------------------------------------------

  const [officeSettings, setOfficeSettings] = useState(() => {
    try {
      const data = localStorage.getItem('ad_office_settings');
      return data ? JSON.parse(data) : DEFAULT_OFFICE_SETTINGS;
    } catch (e) {
      return DEFAULT_OFFICE_SETTINGS;
    }
  });

  const [specialOffers, setSpecialOffers] = useState(() => {
    try {
      const data = localStorage.getItem('ad_special_offers');
      const parsed = data ? JSON.parse(data) : DEFAULT_OFFERS;
      return Array.isArray(parsed) ? parsed : DEFAULT_OFFERS;
    } catch (e) {
      return DEFAULT_OFFERS;
    }
  });

  const [teamDoctors, setTeamDoctors] = useState(() => {
    try {
      const data = localStorage.getItem('ad_team_doctors');
      const parsed = data ? JSON.parse(data) : DEFAULT_DOCTORS;
      return Array.isArray(parsed) ? parsed : DEFAULT_DOCTORS;
    } catch (e) {
      return DEFAULT_DOCTORS;
    }
  });

  const [reviewsList, setReviewsList] = useState(() => {
    try {
      const data = localStorage.getItem('ad_reviews_list');
      const parsed = data ? JSON.parse(data) : DEFAULT_REVIEWS;
      return Array.isArray(parsed) ? parsed : DEFAULT_REVIEWS;
    } catch (e) {
      return DEFAULT_REVIEWS;
    }
  });

  // Sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem('ad_office_settings', JSON.stringify(officeSettings));
  }, [officeSettings]);

  useEffect(() => {
    localStorage.setItem('ad_special_offers', JSON.stringify(specialOffers));
  }, [specialOffers]);

  useEffect(() => {
    localStorage.setItem('ad_team_doctors', JSON.stringify(teamDoctors));
  }, [teamDoctors]);

  useEffect(() => {
    localStorage.setItem('ad_reviews_list', JSON.stringify(reviewsList));
  }, [reviewsList]);

  // Actions
  const updateOfficeSettings = (newSettings) => {
    setOfficeSettings(prev => ({ ...prev, ...newSettings }));
  };

  const addSpecialOffer = (offer) => {
    const newOffer = { ...offer, id: String(Date.now()) };
    setSpecialOffers(prev => [newOffer, ...prev]);
  };

  const editSpecialOffer = (id, updatedOffer) => {
    setSpecialOffers(prev => prev.map(item => item.id === id ? { ...item, ...updatedOffer } : item));
  };

  const deleteSpecialOffer = (id) => {
    setSpecialOffers(prev => prev.filter(item => item.id !== id));
  };

  const updateDoctor = (slug, updatedDoc) => {
    setTeamDoctors(prev => prev.map(doc => doc.slug === slug ? { ...doc, ...updatedDoc } : doc));
  };

  const addDoctor = (newDoc) => {
    setTeamDoctors(prev => [...prev, newDoc]);
  };

  const deleteDoctor = (slug) => {
    setTeamDoctors(prev => prev.filter(doc => doc.slug !== slug));
  };

  const addReview = (review) => {
    const newRev = { ...review, id: String(Date.now()), date: 'Just now' };
    setReviewsList(prev => [newRev, ...prev]);
  };

  const deleteReview = (id) => {
    setReviewsList(prev => prev.filter(item => item.id !== id));
  };

  return (
    <AppContext.Provider value={{
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
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
