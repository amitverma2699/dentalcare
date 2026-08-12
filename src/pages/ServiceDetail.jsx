import React, { useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ShieldCheck, Sparkles, AlertCircle, Phone, Calendar, ArrowRight, UserCheck, CheckCircle2, FileQuestion } from 'lucide-react';

const SERVICES_DATA = {
  'general-dentistry': {
    title: 'General Dentistry',
    tagline: 'Maintain Strong, Healthy Smiles for Life',
    location: 'Van Nuys, CA',
    quickFacts: {
      whoFor: 'Patients of all ages seeking preventive checkups, hygiene cleaning, and early decay treatments.',
      benefits: 'Prevents painful toothaches, halts decay progression, keeps gums healthy, fresh breath.',
      comfort: 'Nitrous Oxide (laughing gas), topical local anesthetics, gentle clinical touch.',
      tech: 'Digital low-radiation X-Rays, Intraoral camera examinations.'
    },
    problem: 'Daily brushing and flossing are essential, but microscopic plaque and tartar accumulation still occur in hard-to-reach pockets. Over time, this buildup leads to enamel erosion, decay (cavities), and early gum irritation (gingivitis). Without professional exams, silent decay can spread deep into the tooth, causing painful infections.',
    solution: 'Our general dentistry appointments focus on thorough plaque removal and complete visual diagnostics. Our hygienists scale away tartar deposits, polish teeth, and apply protective seals. Our general dentists review digital X-rays to locate decay early, placing durable tooth-colored fillings to seal teeth before structural damage worsens.',
    benefitsList: [
      'Stops dental decay before it reaches sensitive nerves.',
      'Eliminates persistent bad breath by removing calcified plaque.',
      'Includes screening for oral cancer and periodontal pockets.',
      'Protects chewing surfaces with professional dental sealants.'
    ],
    howItWorks: [
      { step: 1, name: 'Oral Assessment', desc: 'A thorough visual exam of teeth, gums, and surrounding tissue, supported by intraoral photographs.' },
      { step: 2, name: 'Digital X-Rays', desc: 'Fast, digital scans showing bone levels and highlighting decay hiding between teeth.' },
      { step: 3, name: 'Professional Hygiene', desc: 'Gentle scaling to remove tartar, followed by professional polishing and fluoride treatment.' },
      { step: 4, name: 'Customized Report', desc: 'A clear explanation of any decay found, with transparent treatment scheduling.' }
    ],
    doctor: {
      name: 'Dr. John Doe, DDS',
      role: 'Lead General Practitioner',
      bio: 'Dr. Doe specializes in preventive care and restorative treatments, emphasizing patient education and gentle techniques.'
    },
    faqs: [
      { q: 'How often should I schedule a dental exam?', a: 'We recommend visiting our Van Nuys office every six months for a routine checkup and professional hygiene cleaning.' },
      { q: 'Are digital X-rays safe for my family?', a: 'Yes. Our digital X-rays emit up to 90% less radiation than traditional film X-rays and provide instantaneous high-resolution scans.' },
      { q: 'What is a dental sealant, and do I need one?', a: 'A sealant is a thin, protective coating painted onto the chewing surfaces of back teeth to block decay-causing bacteria. It is highly recommended for children and cavity-prone adults.' }
    ],
    reviews: [
      { author: 'James L.', text: 'The gentlest cleaning I have ever had. The hygienist explained every step, and the digital camera let me see exactly what teeth needed attention.' }
    ],
    related: [
      { name: 'Pediatric Dentistry', path: '/services/pediatric-dentistry' },
      { name: 'Root Canal Therapy', path: '/services/endodontics' }
    ]
  },
  'pediatric-dentistry': {
    title: 'Pediatric Dentistry',
    tagline: 'Building Happy, Healthy Smile Habits from the Start',
    location: 'Van Nuys, CA',
    quickFacts: {
      whoFor: 'Infants, toddlers, children, and teenagers who need specialized, patient developmental dental care.',
      benefits: 'Creates positive associations with dental visits, prevents childhood cavities, guides tooth alignment.',
      comfort: 'Kid-friendly terminology, sensory-sensitive environments, laughing gas options, patient pacing.',
      tech: 'Low-dose digital X-rays, painless fluoride varnishes.'
    },
    problem: 'Children’s teeth have thinner enamel than adult teeth, making them highly susceptible to rapid decay. Additionally, early childhood experiences at the dentist can shape their long-term attitude toward oral health. A frightening, clinical visit can trigger dental anxiety that persists into adulthood.',
    solution: 'Our pediatric specialists create a fun, welcoming, and warm environment. We focus on gentle, non-threatening introductions to the dental chair. By teaching children about their "sugar bugs" using interactive tools and administering comfortable cleanings, fluoride varnishes, and sealants, we set them up for a lifetime of confident oral hygiene.',
    benefitsList: [
      'Prevents painful cavities that can disrupt sleep, school, and nutrition.',
      'Monitors jaw structure and early tooth development for interceptive orthodontics.',
      'Saves baby teeth, which serve as essential space maintainers for adult teeth.',
      'Educates children on proper brushing and nutritional choices in simple language.'
    ],
    howItWorks: [
      { step: 1, name: 'Comfort Check-In', desc: 'Introducing your child to the dental instruments using interactive, kid-friendly names.' },
      { step: 2, name: 'Developmental Check', desc: 'Examining baby teeth, gum health, and screening for pacifier or thumb-sucking changes.' },
      { step: 3, name: 'Gentle Clean & Protect', desc: 'A quick, comfortable cleaning, followed by a sweet-tasting fluoride varnish to strengthen enamel.' },
      { step: 4, name: 'Parent Consultation', desc: 'Discussing developmental timelines, nutrition, and home brushing tips for baby teeth.' }
    ],
    doctor: {
      name: 'Dr. Jane Smith, DDS',
      role: 'Board-Certified Pediatric Specialist',
      bio: 'Dr. Smith completed residency training in pediatric care, focusing on gentle behavior management and special-needs dentistry.'
    },
    faqs: [
      { q: 'When should my child have their first dental visit?', a: 'According to the AAPD, children should see a dentist within six months of their first tooth erupting, or by their first birthday.' },
      { q: 'What should I do if my child is terrified of the dentist?', a: 'Let our team know! We specialize in dental desensitization. We use simple terminology, allow parents to sit beside the chair, and offer safe nitrous oxide sedation if needed.' },
      { q: 'Are baby teeth really that important to treat?', a: 'Yes. Decaying baby teeth can cause severe pain, spread infections to underlying adult teeth, and lead to premature tooth loss, which disrupts jaw alignment.' }
    ],
    reviews: [
      { author: 'Megan K.', text: 'My 5-year-old actually asks when we are going back to see Dr. Smith! They make visits feel like a game and have the best patient rewards.' }
    ],
    related: [
      { name: 'General Dentistry', path: '/services/general-dentistry' },
      { name: 'Orthodontics (Braces)', path: '/services/orthodontics' }
    ]
  },
  'cosmetic-dentistry': {
    title: 'Cosmetic Dentistry',
    tagline: 'Reveal a Confident, Radiant Smile You Love',
    location: 'Van Nuys, CA',
    quickFacts: {
      whoFor: 'Adults seeking to correct discolored, chipped, misaligned, or unevenly spaced teeth.',
      benefits: 'Dramatically improves smile aesthetics, boosts self-confidence, strengthens worn enamel.',
      comfort: 'Local anesthesia for veneers, zero-sensitivity whitening techniques, comfortable procedures.',
      tech: 'Intraoral 3D scanning, digital smile previews, Opalescence® and Zoom!® whitening.'
    },
    problem: 'Stained, chipped, or uneven teeth can cause you to hide your smile in photos, avoid social gatherings, and experience self-consciousness. Traditional whitening strips often lead to severe tooth sensitivity or uneven results, while untreated chips can accumulate bacteria and lead to structural cracks.',
    solution: 'We customize cosmetic solutions to your facial features and goals. Using clinical teeth whitening systems (Opalescence® and Zoom!®), we safely lift deep organic stains. For structural corrections, we place ultra-thin, custom porcelain veneers that bond directly to your natural teeth, correcting length, shade, and minor gaps instantly.',
    benefitsList: [
      'Lifts years of coffee, tea, and tobacco stains in a single session.',
      'Veneers resist future staining, maintaining a bright look permanently.',
      'Corrects chipped, short, or worn-down teeth to a natural proportion.',
      'Provides a completely customized smile makeover tailored to your goals.'
    ],
    howItWorks: [
      { step: 1, name: 'Smile Consultation', desc: 'Discussing your aesthetic goals, selecting shade guides, and capturing digital photographs.' },
      { step: 2, name: '3D Virtual Planning', desc: 'Using digital intraoral scans to map out veneers, crowns, or bonding templates.' },
      { step: 3, name: 'Clinical Treatment', desc: 'Performing clinical whitening, or prepping teeth and placing temporary custom veneers.' },
      { step: 4, name: 'Permanent Bonding', desc: 'Affixing permanent porcelain veneers or completing cosmetic composite fillings with high-cure lights.' }
    ],
    doctor: {
      name: 'Dr. John Doe, DDS',
      role: 'Cosmetic & Restorative Specialist',
      bio: 'Dr. Doe has over 12 years of experience crafting customized porcelain restorations and cosmetic veneers in the valley.'
    },
    faqs: [
      { q: 'How long do porcelain veneers last?', a: 'With proper brushing, flossing, and regular exams, high-quality porcelain veneers typically last between 10 to 15 years.' },
      { q: 'Will professional teeth whitening damage my enamel?', a: 'No. Clinical whitening products used under dental supervision are formulated to safely break up stains without degrading the tooth enamel.' },
      { q: 'What is the difference between bonding and veneers?', a: 'Composite bonding uses tooth-colored resin shaped directly on the tooth for minor chips in one visit. Veneers are custom porcelain shells fabricated in a lab for comprehensive makeovers.' }
    ],
    reviews: [
      { author: 'Rachel V.', text: 'The Zoom whitening got my teeth 5 shades lighter for my wedding! And they were so careful to manage my usual tooth sensitivity.' }
    ],
    related: [
      { name: 'Dental Implants', path: '/services/dental-implants' },
      { name: 'Invisalign & Ortho', path: '/services/orthodontics' }
    ]
  },
  'dental-implants': {
    title: 'Dental Implants',
    tagline: 'Permanent, Bio-Compatible Tooth Replacement',
    location: 'Van Nuys, CA',
    quickFacts: {
      whoFor: 'Patients missing one, multiple, or all teeth looking for a stable, lifetime alternative to partials.',
      benefits: 'Halts jawbone deterioration, looks and functions like a natural tooth, restores full chewing force.',
      comfort: 'Local conscious IV sedation options, local block anesthesia, precise placement for low pain.',
      tech: 'CBCT 3D bone mapping, computer-guided surgical planning.'
    },
    problem: 'When a tooth is lost, the underlying jawbone no longer receives stimulation from chewing forces. Within the first year, up to 25% of the surrounding bone is reabsorbed by the body. This causes adjacent teeth to shift, changes your facial structure, and makes dentures lose their fit and slip.',
    solution: 'Dental implants are small, medical-grade titanium posts placed surgically into the jawbone, acting as artificial roots. Once the bone fuses to the titanium post (osseointegration), we attach a custom porcelain crown. This provides a rock-solid, permanent replacement that stimulates bone health and restores full chewing ability.',
    benefitsList: [
      'Fuses directly to your jawbone, preventing facial collapsing and bone loss.',
      'Allows you to eat hard, crunchy foods without slipping or discomfort.',
      'Requires no reduction or grinding of neighboring teeth (unlike dental bridges).',
      'Can last a lifetime with standard brushing, flossing, and dental exams.'
    ],
    howItWorks: [
      { step: 1, name: '3D CBCT Evaluation', desc: 'Capturing a high-resolution 3D scan of your jawbone to verify density and map nerve lines.' },
      { step: 2, name: 'Virtual Placement Plan', desc: 'Digitally simulating the implant angle and depth using surgical software for absolute precision.' },
      { step: 3, name: 'Titanium Root Placement', desc: 'A comfortable surgical procedure to position the titanium post under local numbing or sedation.' },
      { step: 4, name: 'Porcelain Restoration', desc: 'After osseointegration, placing the custom abutment and permanent porcelain crown.' }
    ],
    doctor: {
      name: 'Dr. Robert Lee, DDS, MS',
      role: 'Lead Implantologist & Periodontist',
      bio: 'Dr. Lee completed advanced specialty residency training in dental implants and surgical reconstruction, placing over 2,000 implants.'
    },
    faqs: [
      { q: 'How long does the dental implant process take?', a: 'The entire process typically takes 3 to 6 months. This timeline allows the titanium root to fully fuse with your jawbone before we attach the permanent chewing crown.' },
      { q: 'Am I a candidate for implants if I have bone loss?', a: 'Often, yes. If your bone is too thin, we can perform a simple bone grafting procedure during or before placement to rebuild support.' },
      { q: 'Are dental implants painful?', a: 'Most patients report that implant placement is less uncomfortable than a standard tooth extraction. We use local anesthetics and offer sedation to ensure a comfortable visit.' }
    ],
    reviews: [
      { author: 'Thomas D.', text: 'I replaced two missing molars with implants here. Dr. Lee was fantastic. The procedure was fast, and the new teeth feel exactly like my real ones.' }
    ],
    related: [
      { name: 'Restorative Care', path: '/services/restorative-dentistry' },
      { name: 'Oral Surgery', path: '/services/oral-surgery' }
    ]
  },
  'restorative-dentistry': {
    title: 'Restorative Care',
    tagline: 'Rebuild the Strength and Form of Damaged Teeth',
    location: 'Van Nuys, CA',
    quickFacts: {
      whoFor: 'Patients with severely cracked, broken, decaying, or missing teeth needing structural support.',
      benefits: 'Restores complete chewing function, protects weakened teeth from fractures, aligns bite.',
      comfort: 'Anesthetic numbing blocks, sedation options, metal-free cosmetic restorations.',
      tech: 'Digital intraoral impressions, advanced high-strength porcelain composites.'
    },
    problem: 'A cracked, heavily decayed, or structurally weak tooth is at high risk for bacterial infection and fractures. If left untreated, chewing forces will eventually split the tooth down to the root, requiring a surgical extraction. Additionally, empty spaces from missing teeth cause adjacent teeth to tilt, throwing off your bite.',
    solution: 'Our restorative treatments rebuild the structure of compromised teeth. We place dental crowns (custom porcelain caps) to encase and protect weakened teeth. To bridge gaps, we create anchored dental bridges. For patients missing multiple teeth, we craft partial and full dentures that fit comfortably and look completely natural.',
    benefitsList: [
      'Encases fractured or heavily filled teeth, preventing catastrophic breaks.',
      'Bridges empty dental spaces, keeping surrounding teeth from shifting.',
      'Custom dentures restore natural speech, lip support, and chewing.',
      'Uses color-matched, metal-free porcelain for a natural appearance.'
    ],
    howItWorks: [
      { step: 1, name: 'Structural Review', desc: 'Examining the tooth structure using high-definition cameras to determine if a crown is needed.' },
      { step: 2, name: 'Tooth Preparation', desc: 'Carefully removing decay and reshaping the tooth to allow room for the protective crown.' },
      { step: 3, name: 'Digital Impression', desc: 'Creating a highly accurate digital 3D model of your bite without messy tray putties.' },
      { step: 4, name: 'Custom Placement', desc: 'Bonding the custom-fabricated porcelain restoration and adjusting it for a comfortable bite.' }
    ],
    doctor: {
      name: 'Dr. John Doe, DDS',
      role: 'Restorative Specialist',
      bio: 'Dr. Doe specializes in reconstructive dentistry, combining aesthetic details with clinical strength to restore function.'
    },
    faqs: [
      { q: 'What is the difference between a filling and a crown?', a: 'A filling repairs minor decay inside a small area. A crown encases the entire visible tooth above the gumline, providing structural reinforcement for weakened or cracked teeth.' },
      { q: 'How long do dental bridges last?', a: 'With proper oral hygiene and regular professional cleanings, a dental bridge typically lasts between 8 to 15 years.' },
      { q: 'Will my custom denture slip or click?', a: 'We design dentures using digital scans of your gums to ensure a secure, snug fit. We also offer implant-secured dentures for patients seeking absolute stability.' }
    ],
    reviews: [
      { author: 'Linda M.', text: 'Got a bridge to replace an old missing tooth. It looks so natural, and I can finally chew comfortably on both sides of my mouth again.' }
    ],
    related: [
      { name: 'Dental Implants', path: '/services/dental-implants' },
      { name: 'General Dentistry', path: '/services/general-dentistry' }
    ]
  },
  'orthodontics': {
    title: 'Orthodontics',
    tagline: 'Straighten Your Smile Comfortably & Discreetly',
    location: 'Van Nuys, CA',
    quickFacts: {
      whoFor: 'Children, teens, and adults looking to correct crooked teeth, crowding, gaps, or bite issues.',
      benefits: 'Improves bite alignment, makes teeth easier to brush, prevents jaw strain, enhances smile aesthetics.',
      comfort: 'Clear aligners with smooth edges, customized brace adjustments, low-profile brackets.',
      tech: 'Intraoral digital scanners, Invisalign® and SureSmile® aligner systems.'
    },
    problem: 'Crooked, crowded, or rotated teeth are difficult to brush and floss effectively. This increases plaque accumulation, leading to cavities and gum disease. Furthermore, bite misalignments like overbites and underbites place excessive pressure on jaw joints, causing TMJ pain, enamel wear, and headaches.',
    solution: 'We offer customized orthodontic treatments for all ages. For a virtually invisible solution, we design clear aligners (Invisalign® and SureSmile®) that move teeth step-by-step. For complex bite corrections, we provide traditional low-profile metal and ceramic braces. Our early interceptive phase treatments help children’s jaws grow correctly, reducing braces time later.',
    benefitsList: [
      'Aligns teeth to remove crowded pockets where plaque hides.',
      'Corrects bite issues, reducing TMJ strain and jaw joint clicking.',
      'Clear aligners are removable, letting you eat your favorite foods.',
      'Tailored plans for adults, teens, and early childhood diagnostics.'
    ],
    howItWorks: [
      { step: 1, name: '3D Orthodontic Scan', desc: 'Creating a highly detailed digital replica of your bite using our intraoral scanners.' },
      { step: 2, name: 'Bite Simulation', desc: 'Showing you a digital simulation of how your teeth will move and your final smile.' },
      { step: 3, name: 'System Delivery', desc: 'Bonding orthodontic brackets, or delivering your first sets of custom clear aligners.' },
      { step: 4, name: 'Progress Checks', desc: 'Periodic adjustments or tray changes every few weeks to ensure teeth are moving correctly.' }
    ],
    doctor: {
      name: 'Dr. Sarah Patel, DDS, MS',
      role: 'Orthodontist Specialist',
      bio: 'Dr. Patel holds a master’s degree in Orthodontics and specializes in clear aligner treatment plans for adults and pediatric growth guidance.'
    },
    faqs: [
      { q: 'Am I too old for orthodontic treatment?', a: 'Absolutely not. Over 30% of our orthodontic patients are adults. Clear aligners like Invisalign® offer a highly discreet way to straighten your teeth.' },
      { q: 'What is the difference between Invisalign® and SureSmile®?', a: 'Both are premium clear aligner systems. SureSmile® utilizes unique design software that often results in fewer adjustments, while Invisalign® is the most widely tested aligner brand globally. We will recommend the best fit for your bite.' },
      { q: 'How long will I need to wear aligners or braces?', a: 'Treatment times vary based on complexity, but most cosmetic aligner cases take between 12 to 18 months, with simpler cases finished in under a year.' }
    ],
    reviews: [
      { author: 'Kevin B.', text: 'Currently on tray 14 of my Invisalign. The scan was super fast, and nobody even notices I have the aligners in. Very happy with the progress.' }
    ],
    related: [
      { name: 'Pediatric Dentistry', path: '/services/pediatric-dentistry' },
      { name: 'Cosmetic Dentistry', path: '/services/cosmetic-dentistry' }
    ]
  },
  'endodontics': {
    title: 'Root Canals (Endodontics)',
    tagline: 'Gently Eliminate Severe Nerve Pain and Save Your Tooth',
    location: 'Van Nuys, CA',
    quickFacts: {
      whoFor: 'Patients experiencing severe throbbing tooth pain, temperature sensitivity, or abscesses.',
      benefits: 'Immediately stops severe dental pain, stops systemic infections, avoids tooth extraction.',
      comfort: 'Advanced localized numbing blocks, Nitrous oxide sedation, gentle behavior management.',
      tech: 'High-magnification clinical endodontic digital diagnostics.'
    },
    problem: 'When dental decay or a crack penetrates deep into the inner chamber of a tooth, bacteria infect the dental pulp (nerves and blood vessels). This leads to pressure buildup, throbbing nerve pain, and abscesses at the root tip. Left untreated, the infection will destroy the surrounding bone, requiring extraction.',
    solution: 'A root canal is a straightforward, pain-relieving procedure. Under local anesthesia, our specialist creates a tiny opening in the tooth, gently removes the infected pulp tissue, disinfects the inner canals, and seals them with a biocompatible material. This removes the source of the infection and saves the tooth structure.',
    benefitsList: [
      'Stops severe tooth pain and facial swelling by removing infected nerves.',
      'Saves the natural tooth shell, maintaining your normal biting force.',
      'Precludes the need for costly bridges or implants to fill extracted spaces.',
      'Safe, comfortable procedure that feels similar to getting a routine filling.'
    ],
    howItWorks: [
      { step: 1, name: 'Diagnostic Mapping', desc: 'Taking digital X-rays to locate the infection and map the length of the tooth canals.' },
      { step: 2, name: 'Anesthetic Comfort', desc: 'Administering advanced numbing blocks to ensure you feel absolutely nothing during the visit.' },
      { step: 3, name: 'Infection Removal', desc: 'Gently cleansing and sanitizing the inner root chambers using micro-instruments.' },
      { step: 4, name: 'Sealing & Restoring', desc: 'Filling the root canals with gutta-percha and preparing the tooth for a protective crown.' }
    ],
    doctor: {
      name: 'Dr. John Doe, DDS',
      role: 'Endodontist Specialist',
      bio: 'Dr. Doe specializes in diagnosing facial pain and performing root canal procedures using gentle, micro-surgical techniques.'
    },
    faqs: [
      { q: 'Are root canals painful?', a: 'No. Modern root canals are performed under localized numbing blocks, meaning you will feel no pain during the procedure. The treatment is designed to eliminate pain, not cause it.' },
      { q: 'Can a tooth survive without its nerve?', a: 'Yes. Once a tooth has fully emerged, its nerve is only used to detect hot and cold temperatures. Removing the nerve doesn\'t affect the tooth\'s daily function or stability.' },
      { q: 'Why do I need a crown after a root canal?', a: 'A tooth that has undergone a root canal is no longer living and can become brittle over time. Placing a porcelain crown protects it from splitting under chewing pressure.' }
    ],
    reviews: [
      { author: 'Gaby S.', text: 'I was so nervous about getting a root canal, but the doctor made me feel completely relaxed. I felt zero pain, and the toothache was gone instantly.' }
    ],
    related: [
      { name: 'General Dentistry', path: '/services/general-dentistry' },
      { name: 'Restorative Care', path: '/services/restorative-dentistry' }
    ]
  },
  'periodontics': {
    title: 'Gum Care (Periodontics)',
    tagline: 'Protect the Bone and Gum Foundation of Your Smile',
    location: 'Van Nuys, CA',
    quickFacts: {
      whoFor: 'Patients experiencing bleeding gums, recession, loose teeth, or diagnosed gum disease.',
      benefits: 'Halts gum recession, protects jawbone support, stops bleeding, prevents systemic inflammation.',
      comfort: 'Comfortable numbing gels, localized anesthetics, non-surgical ultrasonic scaling.',
      tech: 'Ultrasonic piezo scalers, computerized gum pocket tracking.'
    },
    problem: 'Gum disease (periodontitis) is a silent infection triggered by tartar buildup below the gumline. As bacteria colonize, gums pull away, creating deep pockets. If left unchecked, the infection dissolves the jawbone supporting your teeth, causing teeth to become loose, fall out, and increasing the risk of cardiovascular issues.',
    solution: 'We focus on halting gum disease through customized therapies. Our specialists perform non-surgical deep cleanings (scaling and root planing) to remove tartar from deep pockets and smooth root surfaces. For advanced cases, we offer gum grafting to cover exposed roots and bone regeneration to rebuild loose tooth foundations.',
    benefitsList: [
      'Stops persistent gum bleeding during brushing and flossing.',
      'Cleans out bacterial reservoirs below the gumline that standard brushes miss.',
      'Protects jawbone density, stopping teeth from loosening.',
      'Reduces systemic bacterial inflammation linked to heart health.'
    ],
    howItWorks: [
      { step: 1, name: 'Periodontal Charting', desc: 'Measuring the depth of gum pockets around every tooth to locate areas of active infection.' },
      { step: 2, name: 'Ultrasonic Scaling', desc: 'Using micro-vibrating piezo tools to break up calcified tartar deposits beneath the gums.' },
      { step: 3, name: 'Root Planing', desc: 'Smoothing the root surfaces to prevent future bacterial buildup and help gums reattach.' },
      { step: 4, name: 'Healing Assessment', desc: 'Evaluating pocket depths after a few weeks to monitor tissue health and bone support.' }
    ],
    doctor: {
      name: 'Dr. Robert Lee, DDS, MS',
      role: 'Board-Certified Periodontist',
      bio: 'Dr. Lee specializes in the diagnosis, prevention, and treatment of gum disease, as well as cosmetic gum contouring.'
    },
    faqs: [
      { q: 'What is the difference between a regular cleaning and a deep cleaning?', a: 'A regular cleaning removes plaque above the gumline on healthy teeth. A deep cleaning (scaling and root planing) removes calcified tartar below the gumline inside infected periodontal pockets.' },
      { q: 'Is gum disease curable?', a: 'Early gum irritation (gingivitis) is fully reversible. Advanced gum disease (periodontitis) cannot be fully cured, but it can be successfully managed and halted to prevent tooth loss.' },
      { q: 'Why do my gums bleed when I brush?', a: 'Bleeding gums are a primary warning sign of active inflammation caused by plaque buildup. A professional exam will determine if you need a specialized cleaning.' }
    ],
    reviews: [
      { author: 'Arturo P.', text: 'After my deep cleaning treatment, my gums stopped bleeding entirely, and my pocket measurements dropped from 6mm to healthy 3mm ranges.' }
    ],
    related: [
      { name: 'General Dentistry', path: '/services/general-dentistry' },
      { name: 'Dental Implants', path: '/services/dental-implants' }
    ]
  },
  'oral-surgery': {
    title: 'Oral & Maxillofacial Surgery',
    tagline: 'Expert Surgical Care for Complex Dental Concerns',
    location: 'Van Nuys, CA',
    quickFacts: {
      whoFor: 'Patients needing wisdom tooth removal, jaw bone grafting, complex extractions, or TMJ relief.',
      benefits: 'Resolves jaw pain, removes impacted teeth that threaten alignment, prepares bone for implants.',
      comfort: 'IV conscious sedation, general anesthesia options, local block numbing, custom healing plans.',
      tech: 'CBCT 3D jaw mapping, computer-guided surgical surgical setups.'
    },
    problem: 'Impacted wisdom teeth, severely decayed roots, and severe jawbone loss present complex anatomical challenges. Leaving impacted teeth in place leads to painful cysts, damage to adjacent molar roots, and tooth crowding. Furthermore, when teeth have been missing for years, the jawbone is often too thin to support implants.',
    solution: 'Our qualified oral surgeons perform delicate procedures with precision. We safely extract impacted wisdom teeth under comfortable IV sedation to ensure a completely memory-free experience. We perform sinus lifts and bone grafts to rebuild bone thickness, and offer therapeutic Botox® injections to relax jaw muscles and resolve chronic TMJ pain.',
    benefitsList: [
      'Removes impacted wisdom teeth before they damage adjacent tooth roots.',
      'Surgical extractions resolve painful infections in severely decayed teeth.',
      'Bone grafting reconstructs natural jaw shape for stable implant posts.',
      'Botox® treatments offer targeted relief for chronic TMJ jaw clenching.'
    ],
    howItWorks: [
      { step: 1, name: '3D CBCT Jaw Scan', desc: 'Evaluating bone structures, sinus cavities, and nerve pathways in high-resolution 3D.' },
      { step: 2, name: 'Anesthesia Selection', desc: 'Choosing your level of comfort, from local numbing to deep IV conscious sedation.' },
      { step: 3, name: 'Surgical Treatment', desc: 'Performing the extraction or bone graft using specialized, minimally invasive techniques.' },
      { step: 4, name: 'Recovery Care', desc: 'Providing clear post-op instructions, custom prescriptions, and follow-up checks.' }
    ],
    doctor: {
      name: 'Dr. Robert Lee, DDS, MS',
      role: 'Oral Surgeon & Specialist',
      bio: 'Dr. Lee completed surgical residency training, focusing on wisdom teeth extractions, implant planning, and bone grafts.'
    },
    faqs: [
      { q: 'Why do wisdom teeth need to be removed?', a: 'Most jaws don\'t have room for wisdom teeth. When they remain impacted or emerge at angles, they cause severe pain, shift teeth, and easily develop decay or cysts.' },
      { q: 'What is the recovery time after a wisdom tooth extraction?', a: 'Most patients return to school or work within 3 to 4 days. We provide detailed soft-food guides and healing tips to keep you comfortable during recovery.' },
      { q: 'What does a bone graft do?', a: 'A bone graft uses biocompatible minerals to stimulate new bone growth in areas where your jawbone has thinned, creating a solid base for dental implants.' }
    ],
    reviews: [
      { author: 'Brandon H.', text: 'Got all 4 wisdom teeth pulled under sedation. I fell asleep and woke up with the procedure finished, feeling no pain at all. Outstanding surgical team.' }
    ],
    related: [
      { name: 'Dental Implants', path: '/services/dental-implants' },
      { name: 'Restorative Care', path: '/services/restorative-dentistry' }
    ]
  }
};

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const location = useLocation();

  // Scroll to top when serviceId changes or on hash navigation
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.substring(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [serviceId, location]);

  const service = SERVICES_DATA[serviceId];

  if (!service) {
    return (
      <div className="container text-center" style={{ padding: '100px 0' }}>
        <h2>Service Page Not Found</h2>
        <p style={{ margin: '16px 0 32px' }}>We couldn't locate the dental specialty page you requested.</p>
        <Link to="/services" className="btn btn-primary">Browse All Services</Link>
      </div>
    );
  }

  return (
    <div className="service-detail-page fade-in">
      {/* Hero */}
      <section className="service-detail-hero">
        <div className="container">
          <span className="badge badge-accent">{service.location} Office</span>
          <h1>{service.title}</h1>
          <p className="detail-hero-tagline">{service.tagline}</p>
          <div className="hero-ctas">
            <Link to="/appointment" className="btn btn-primary">Book Consultation</Link>
            <a href="tel:8185550199" className="btn btn-outline">Call Office Now</a>
          </div>
        </div>
      </section>

      {/* Trust & Quick Facts */}
      <section className="section bg-cream">
        <div className="container">
          <div className="quick-facts-box card">
            <h3>Quick Facts & Trust Information</h3>
            <div className="facts-grid">
              <div className="fact-item">
                <span className="fact-lbl">Who it is for:</span>
                <p className="fact-desc">{service.quickFacts.whoFor}</p>
              </div>
              <div className="fact-item">
                <span className="fact-lbl">Key Benefits:</span>
                <p className="fact-desc">{service.quickFacts.benefits}</p>
              </div>
              <div className="fact-item">
                <span className="fact-lbl">Comfort Options:</span>
                <p className="fact-desc">{service.quickFacts.comfort}</p>
              </div>
              <div className="fact-item">
                <span className="fact-lbl">Verified Technology:</span>
                <p className="fact-desc">{service.quickFacts.tech}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="section problem-solution-section">
        <div className="container grid-2">
          <div className="problem-area">
            <span className="badge badge-neutral">The Problem</span>
            <h3>Understanding the Symptoms</h3>
            <p className="prob-sol-p">{service.problem}</p>
          </div>
          <div className="solution-area">
            <span className="badge badge-accent">Our Solution</span>
            <h3>Clinical Treatment Philosophy</h3>
            <p className="prob-sol-p">{service.solution}</p>
          </div>
        </div>
      </section>

      {/* Benefits List */}
      <section className="section benefits-section bg-cream">
        <div className="container grid-2">
          <div className="benefits-left">
            <span className="badge badge-accent">Patient Outcomes</span>
            <h2>Patient-Focused Benefits</h2>
            <p>We focus on delivering tangible improvements to your oral health and daily life, ensuring each treatment aligns with your goals.</p>
          </div>
          <div className="benefits-right flex-center">
            <div className="benefits-list-card card">
              <ul className="details-benefits-list">
                {service.benefitsList.map((benefit, idx) => (
                  <li key={idx}>
                    <CheckCircle2 size={20} className="benefit-check-icon" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="section how-it-works-sec">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-accent">Procedure Timeline</span>
            <h2>How It Works</h2>
            <p>We demystify the dental process. Here are the standard steps involved in your treatment journey.</p>
          </div>

          <div className="grid-4 process-grid">
            {service.howItWorks.map((step, idx) => (
              <div key={idx} className="card process-step-card">
                <div className="process-num">0{step.step}</div>
                <h4>{step.name}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctor & Reviews */}
      <section className="section bg-cream">
        <div className="container grid-2">
          {/* Featured Specialist */}
          <div className="card specialist-card">
            <span className="badge badge-accent">Featured Provider</span>
            <h3>Led by {service.doctor.name}</h3>
            <span className="specialist-role">{service.doctor.role}</span>
            <p className="specialist-bio">{service.doctor.bio}</p>
            <div className="specialist-footer">
              <Link to="/team" className="text-link">Meet Our Complete Team</Link>
            </div>
          </div>

          {/* Genuine Reviews */}
          <div className="card review-single-card">
            <span className="badge badge-neutral">Patient Story</span>
            <h3>Treatment Review</h3>
            <p className="single-review-text">"{service.reviews[0].text}"</p>
            <div className="single-review-footer">
              <span className="review-author">- {service.reviews[0].author}</span>
              <Link to="/reviews" className="text-link">Read More Reviews</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section faqs-section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-accent">Common Questions</span>
            <h2>Frequently Asked Questions</h2>
            <p>Clear, direct answers to help you feel confident and prepared for your appointment.</p>
          </div>

          <div className="faqs-list">
            {service.faqs.map((faq, idx) => (
              <div key={idx} className="card faq-item-card">
                <div className="faq-q-row">
                  <FileQuestion size={20} className="faq-q-icon" />
                  <h4>{faq.q}</h4>
                </div>
                <div className="faq-a-row">
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="section bg-cream">
        <div className="container text-center">
          <h2>Related Dental Treatments</h2>
          <p style={{ margin: '8px 0 24px', color: 'var(--text-secondary)' }}>You might also be interested in our other specialty procedures:</p>
          <div className="related-links flex-center" style={{ gap: '16px' }}>
            {service.related.map((rel, idx) => (
              <Link key={idx} to={rel.path} className="btn btn-outline">
                {rel.name} <ArrowRight size={14} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="section final-cta-section text-center">
        <div className="container">
          <h2>Schedule Your {service.title} Consult Today</h2>
          <p>We provide comfortable visits, upfront billing, and accept most PPO insurance and Denti-Cal.</p>
          <div className="cta-buttons flex-center">
            <Link to="/appointment" className="btn btn-primary">Request Appointment</Link>
            <a href="tel:8185550199" className="btn btn-secondary">Call (818) 555-0199</a>
          </div>
        </div>
      </section>

      <style>{`
        .service-detail-hero {
          padding: 80px 0;
          background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
        }
        .detail-hero-tagline {
          font-size: 1.25rem;
          color: var(--text-secondary);
          margin: 12px 0 32px;
        }
        .hero-ctas {
          display: flex;
          gap: 16px;
        }

        /* Quick Facts Box */
        .quick-facts-box {
          border-left: 4px solid var(--color-teal);
        }
        .quick-facts-box h3 {
          margin-bottom: 24px;
        }
        .facts-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        .fact-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .fact-lbl {
          font-weight: 700;
          font-size: 0.88rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-teal);
        }
        .fact-desc {
          font-size: 0.95rem;
          line-height: 1.5;
        }

        /* Problem & Solution */
        .prob-sol-p {
          font-size: 1.02rem;
          line-height: 1.6;
          margin-top: 16px;
        }

        /* Benefits */
        .details-benefits-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .details-benefits-list li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-weight: 500;
          font-size: 0.98rem;
        }
        .benefit-check-icon {
          color: var(--color-teal);
          flex-shrink: 0;
          margin-top: 2px;
        }
        .benefits-list-card {
          width: 100%;
          max-width: 480px;
        }

        /* Process Steps */
        .process-num {
          font-size: 1.8rem;
          font-family: 'Outfit', sans-serif;
          color: var(--color-teal);
          font-weight: 700;
          margin-bottom: 12px;
        }
        .process-step-card h4 {
          font-size: 1.15rem;
          margin-bottom: 8px;
        }
        .process-step-card p {
          font-size: 0.88rem;
          line-height: 1.5;
        }

        /* Specialist & Reviews */
        .specialist-role {
          display: block;
          color: var(--color-teal);
          font-size: 0.88rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 4px 0 16px;
        }
        .specialist-bio {
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 20px;
        }
        .single-review-text {
          font-size: 1.05rem;
          font-style: italic;
          line-height: 1.6;
          margin-top: 16px;
          margin-bottom: 24px;
        }
        .single-review-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--border-color);
          padding-top: 16px;
        }
        .review-author {
          font-weight: 600;
          font-size: 0.9rem;
        }

        /* FAQs */
        .faqs-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-width: 800px;
          margin: 0 auto;
        }
        .faq-item-card h4 {
          font-size: 1.1rem;
        }
        .faq-q-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 10px;
        }
        .faq-q-icon {
          color: var(--color-teal);
          flex-shrink: 0;
        }
        .faq-a-row {
          padding-left: 32px;
        }
        .faq-a-row p {
          font-size: 0.95rem;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .facts-grid {
            grid-template-columns: 1fr;
          }
          .faq-a-row {
            padding-left: 0;
          }
          .faq-q-row {
            align-items: flex-start;
          }
          .faq-q-icon {
            margin-top: 3px;
          }
        }
      `}</style>
    </div>
  );
}
