# PROJECT SYNOPSIS

## Title of the Project
**VDCET Official Website with AI-Powered RAG Knowledge Assistant**

---

### Student & Team Information
* **Lead Student**: Suraj Gajanan Pathade
* **Team Members**:
  1. Suraj Gajanan Pathade
  2. Rohit Shirbhate
  3. Khushal Hajare
  4. Harshal Kalbhut
  5. Sanket Nasare
  6. Tejas Sawargaokar
* **Course**: B.Tech (Computer Engineering)
* **College**: Vilasrao Deshmukh College of Engineering & Technology, Mouda (VDCET)
* **Affiliated University**: Dr. Babasaheb Ambedkar Technological University (DBATU), Lonere
* **Guide**: Rohini Ma’am
* **Academic Session**: 2026–2027

---

## 1. Introduction
Vilasrao Deshmukh College of Engineering & Technology (VDCET), Mouda (DTE Code: 04141) requires a modern, responsive, and easy-to-navigate official digital portal. This project delivers an Apple-style web platform integrated with an AI-Powered Retrieval-Augmented Generation (RAG) Assistant and a hidden Content Management System (CMS).

---

## 2. Problem Statement
Traditional college websites are often overcrowded, difficult to navigate, unoptimized for mobile devices, and lack real-time query resolution. Standard AI chatbots frequently generate hallucinated or unverified facts (such as fake fees, dates, or faculty names). There is a need for a modern website equipped with a grounded AI assistant that answers strictly from an official VDCET knowledge base.

---

## 3. Objectives
1. Build a minimal, Apple-style responsive website for VDCET Mouda.
2. Develop a RAG AI assistant grounded in verified VDCET knowledge chunks.
3. Provide source citations for AI answers and return strict fallback notifications when queries exceed knowledge boundaries.
4. Implement a hidden, secure admin portal (`/admin`) for simple notice, event, and document management.
5. Donate the completed, production-ready website to VDCET as a B.Tech Computer Engineering project gift.

---

## 4. Methodology & Architecture
The system is built using Next.js 14 (App Router), TypeScript, and Tailwind CSS. The backend utilizes a modular repository layer (`vdcet-db.json` / SQLite) storing notices, events, documents, and knowledge base chunks. 

When a user submits a query on `/ai-assistant`:
1. The RAG engine calculates relevance scores against knowledge chunks.
2. If relevance score passes threshold, top chunks are injected into a grounded LLM system prompt (Groq Llama-3 API).
3. The AI returns a grounded answer accompanied by official source badges.
4. If no chunk matches, the AI outputs: *"I couldn't find this information in the official VDCET knowledge base. Please contact the college office."*

Administrative management is isolated at secret route `/admin` protected by HTTP-only JWT sessions.

---

## 5. Technology Stack
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Lucide React
- **Backend & API**: Next.js API Routes, Server Actions
- **Database**: Modular Repository Pattern (`vdcet-db.json` / SQLite)
- **Security**: JWT Session Cookies (`jsonwebtoken`), Password Verification
- **AI RAG Framework**: Groq SDK (`groq-sdk` Llama-3-8B-Instant) + TF-IDF Relevance Engine

---

## 6. Expected Outcome
A production-ready, high-performance website and AI assistant providing instant, accurate college information to prospective students and visitors while allowing non-technical college administrators to post notices easily.

---

## 7. Future Scope
- Voice search capabilities in English, Marathi, and Hindi.
- Automated document OCR ingestion into the AI knowledge base.

---

## 8. References
1. Next.js Documentation: `https://nextjs.org/docs`
2. State Common Entrance Test Cell, Maharashtra: `https://cetcell.mahacet.org/`
3. Dr. Babasaheb Ambedkar Technological University: `https://dbatu.ac.in/`
