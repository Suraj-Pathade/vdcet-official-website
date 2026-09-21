# VDCET Official Website with AI-Powered RAG Knowledge Assistant

Final-Year B.Tech Computer Engineering Project for **Vilasrao Deshmukh College of Engineering & Technology (VDCET), Mouda**, affiliated with **Dr. Babasaheb Ambedkar Technological University (DBATU), Lonere**.

---

## Project Metadata
- **Project Title**: VDCET Official Website with AI-Powered RAG Knowledge Assistant
- **Student Lead**: Suraj Gajanan Pathade
- **Team Members**:
  1. Suraj Gajanan Pathade
  2. Rohit Shirbhate
  3. Khushal Hajare
  4. Harshal Kalbhut
  5. Sanket Nasare
  6. Tejas Sawargaokar
- **Guide**: Rohini Ma’am
- **Course**: B.Tech (Computer Engineering)
- **College**: Vilasrao Deshmukh College of Engineering & Technology, Mouda (DTE Code: 04141)
- **University**: Dr. Babasaheb Ambedkar Technological University (DBATU), Lonere
- **Academic Session**: 2026–2027

---

## Overview
This project presents an Apple-style minimalist official web application and hidden Content Management System (CMS) for **VDCET Mouda**, integrated with an **AI-Powered Retrieval-Augmented Generation (RAG) Knowledge Assistant**.

### Key Features
- **Apple-Inspired Design Language**: Built using Next.js 14 (App Router), TypeScript, and Tailwind CSS.
- **Strict Scope Control**: No student portal, no ERP, no fees, no login/signup buttons on public UI.
- **Public Navigation**: 8 core areas (`/`, `/about`, `/academics`, `/admissions`, `/campus`, `/notices`, `/contact`, `/ai-assistant`).
- **Integrated RAG AI Assistant**: Answers visitor queries grounded in an official VDCET knowledge base. Shows source badges and outputs a strict fallback notification when information is unavailable.
- **Hidden Secret Admin Portal (`/admin`)**: Protected by HTTP-only JWT cookies (`vdcet_admin_session`) and password verification. Allows non-technical staff to manage notices, events, documents, knowledge chunks, and contact info.
- **Subtle Credit**: Footer subtly displays `"Made by Developer Suraj"`.

---

## Repository Structure

```
vdcet-official-website/
├── Documentation/
│   ├── Project-Report.md      # Full 40-chapter B.Tech academic project report
│   ├── Synopsis.md            # DBATU university project synopsis
│   └── Abstract.md            # Academic abstract
├── Presentation/
│   └── VDCET-Project-Presentation.md  # 18 viva presentation slides
├── Testing/
│   └── Test-Execution-Matrix.md  # System test execution log
├── Screenshots/
│   └── Screenshot-Checklist.md  # Final report screenshot checklist
├── src/
│   ├── app/                   # App Router pages & API routes
│   ├── components/            # Navbar & Footer UI components
│   └── lib/                   # Database, Repository, Auth, RAG engine, Seed data
├── package.json
├── README.md
└── vdcet-db.json
```

---

## Quick Setup & Running Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Seed Initial Verified Database
```bash
npm run seed
```

### 3. Run Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## Environment Variables (`.env.local`)
```env
GROQ_API_KEY=gsk_your_groq_api_key_here
ADMIN_JWT_SECRET=vdcet_secret_jwt_key_local_development_2026
ADMIN_PASSWORD=adminvdcet123
```

---

## Default Admin Credentials
- **Secret Route**: `/admin` (e.g. `http://localhost:3000/admin`)
- **Password**: `adminvdcet123`

---

## License & Attribution
Designed & developed as a final-year B.Tech Computer Engineering project and practical digital gift for Vilasrao Deshmukh College of Engineering & Technology, Mouda.
