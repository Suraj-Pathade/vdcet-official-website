import fs from 'fs';
import path from 'path';

export interface Notice {
  id: number;
  title: string;
  category: string;
  content: string;
  pdf_url?: string | null;
  status: 'Draft' | 'Published' | 'Archived';
  date: string;
  created_at?: string;
}

export interface EventItem {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  image_url?: string | null;
  status: 'Draft' | 'Published' | 'Archived';
  created_at?: string;
}

export interface DocumentItem {
  id: number;
  title: string;
  category: string;
  file_url: string;
  file_size?: string | null;
  uploaded_at?: string;
}

export interface KnowledgeChunk {
  id: number;
  title: string;
  content: string;
  source_name: string;
  category: string;
  created_at?: string;
}

export interface DBData {
  notices: Notice[];
  events: EventItem[];
  documents: DocumentItem[];
  knowledge_base: KnowledgeChunk[];
  website_content: Record<string, string>;
  counters: {
    noticeId: number;
    eventId: number;
    documentId: number;
    knowledgeId: number;
  };
}

const dbFilePath = path.join(process.cwd(), 'vdcet-db.json');

const initialDBData: DBData = {
  notices: [],
  events: [],
  documents: [],
  knowledge_base: [],
  website_content: {
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
  },
  counters: {
    noticeId: 0,
    eventId: 0,
    documentId: 0,
    knowledgeId: 0,
  },
};

export function readDB(): DBData {
  try {
    if (!fs.existsSync(dbFilePath)) {
      writeDB(initialDBData);
      return initialDBData;
    }
    const raw = fs.readFileSync(dbFilePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading DB file, returning initial data:', err);
    return initialDBData;
  }
}

export function writeDB(data: DBData): void {
  try {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing DB file:', err);
  }
}
