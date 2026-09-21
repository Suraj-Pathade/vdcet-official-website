import { contentRepo, knowledgeRepo } from './repository';
import { readDB } from './db';

export function seedDatabase() {
  console.log('Seeding official VDCET initial settings and verified knowledge base...');

  const dbData = readDB();

  // Set initial verified website content
  const defaultContent: Record<string, string> = {
    college_name: 'Vilasrao Deshmukh College of Engineering & Technology',
    short_name: 'VDCET',
    location_tag: 'Mouda, Maharashtra',
    hero_tagline: 'A modern engineering education experience.',
    dte_code: '04141',
    address: 'Sr. No. 121, 262, Mouza Mouda, Bhandara Road, Taluka Mouda, District Nagpur, Maharashtra - 441104',
    phone: '07115-281254',
    email: 'info@vdcet.in',
    maps_embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14875.257404457635!2d79.3871!3d21.1685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a2b1660d3d5f81f%3A0x6b2e3f5b7a1c8d9e!2sMouda%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
    affiliation_info: 'Approved by AICTE (All India Council for Technical Education), New Delhi, and Directorate of Technical Education (DTE), Maharashtra. Affiliated with Dr. Babasaheb Ambedkar Technological University (DBATU), Lonere / Rashtrasant Tukadoji Maharaj Nagpur University (RTMNU). DTE Code: 04141.',
    admission_eligibility: 'Candidates must have passed 10+2 (HSC) or equivalent with Physics, Mathematics, and Chemistry/Biotechnology/Technical Vocational subjects. Valid score in MHT-CET or JEE Main is required for Maharashtra CAP allotment rounds.',
    document_checklist: '1. MHT-CET / JEE Main Scorecard\n2. SSC (10th) & HSC (12th) Marksheets\n3. School/College Leaving Certificate (TC)\n4. DTE CAP Allotment Letter\n5. Caste & Validity Certificate (if applicable)\n6. Income Certificate & Domicile Certificate\n7. Aadhaar Card & Passport Size Photos',
  };

  Object.entries(defaultContent).forEach(([key, val]) => {
    contentRepo.set(key, val);
  });

  // Seed Verified Knowledge Base Chunks for RAG AI Assistant if empty
  if (dbData.knowledge_base.length === 0) {
    const verifiedKnowledge = [
      {
        title: 'Institutional Identity & Location',
        category: 'General',
        source_name: 'Official VDCET Institutional Profile',
        content:
          'Vilasrao Deshmukh College of Engineering & Technology (VDCET) is situated in Mouda, Bhandara Road, District Nagpur, Maharashtra (PIN: 441104). DTE Institute Code is 04141. Contact phone is 07115-281254 and official email is info@vdcet.in.',
      },
      {
        title: 'Available B.Tech Academic Programs',
        category: 'Academics',
        source_name: 'DTE Maharashtra Approved Course List (Code 04141)',
        content:
          'VDCET Mouda offers undergraduate Bachelor of Technology (B.Tech) degree programs in four major engineering streams:\n1. Computer Engineering\n2. Artificial Intelligence & Data Science\n3. Civil Engineering\n4. Mechanical Engineering.',
      },
      {
        title: 'Approvals & Institutional Affiliations',
        category: 'General',
        source_name: 'Official Accreditation & Approval Records',
        content:
          'VDCET Mouda is approved by AICTE (All India Council for Technical Education), New Delhi, and Directorate of Technical Education (DTE), Maharashtra State. DTE Institute Code: 04141. The college is affiliated with Dr. Babasaheb Ambedkar Technological University (DBATU), Lonere and Rashtrasant Tukadoji Maharaj Nagpur University (RTMNU).',
      },
      {
        title: 'B.Tech Admission Eligibility Criteria',
        category: 'Admissions',
        source_name: 'Maharashtra State CET Cell Admission Guidelines',
        content:
          'For B.Tech admission at VDCET (Code 04141), candidates must pass 10+2 / HSC with Physics and Mathematics as compulsory subjects along with Chemistry/Biotechnology/Biology/Technical Vocational subject. Candidates must possess a valid score in MHT-CET or JEE Main for Maharashtra State CAP allotment rounds.',
      },
      {
        title: 'Required Admission Documents Checklist',
        category: 'Admissions',
        source_name: 'VDCET Admission Office Verification List',
        content:
          'Essential documents for B.Tech admission verification include: MHT-CET / JEE Main Scorecard, SSC (10th) & HSC (12th) Marksheets, School/College Leaving Certificate, DTE CAP Seat Allotment Letter, Caste Certificate and Caste Validity (if applicable), Income & Domicile Certificates, Aadhaar Card, and Passport-size Photographs.',
      },
      {
        title: 'Campus & Academic Facilities',
        category: 'Campus',
        source_name: 'VDCET Campus Facilities Record',
        content:
          'VDCET Mouda campus features dedicated computer software and hardware laboratories, digital AI & Data Science labs, Civil & Mechanical engineering workshops, a central reference library, internet connectivity, and student seminar halls.',
      },
      {
        title: 'Official Contact & Office Hours',
        category: 'Contact',
        source_name: 'VDCET Administration Office',
        content:
          'VDCET Campus Address: Sr. No. 121, 262, Mouza Mouda, Bhandara Road, Taluka Mouda, District Nagpur, Maharashtra - 441104. Phone: 07115-281254. Email: info@vdcet.in.',
      },
    ];

    verifiedKnowledge.forEach((item) => {
      knowledgeRepo.create(item);
    });
    console.log(`Seeded ${verifiedKnowledge.length} verified knowledge base chunks.`);
  }

  console.log('Database initialization & seeding complete.');
}

// Execute if run directly
if (require.main === module) {
  seedDatabase();
}
