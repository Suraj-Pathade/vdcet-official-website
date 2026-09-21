# ACADEMIC ABSTRACT

## Project Title
**VDCET Official Website with AI-Powered RAG Knowledge Assistant**

### Student & Team Roster
* **Lead Developer**: Suraj Gajanan Pathade
* **Team Members**: Suraj Gajanan Pathade, Rohit Shirbhate, Khushal Hajare, Harshal Kalbhut, Sanket Nasare, Tejas Sawargaokar
* **Department**: Department of Computer Engineering
* **College**: Vilasrao Deshmukh College of Engineering & Technology, Mouda (VDCET)
* **University**: Dr. Babasaheb Ambedkar Technological University (DBATU), Lonere
* **Guide**: Rohini Ma’am
* **Academic Year**: 2026–2027

---

### Abstract Text
Educational institution web portals frequently suffer from fragmented information structures, poor mobile responsiveness, visual clutter, and lack of real-time query resolution. This final-year B.Tech project presents an official, minimal, Apple-style web application and hidden Content Management System (CMS) for **Vilasrao Deshmukh College of Engineering & Technology (VDCET), Mouda**, integrated with an **AI-Powered Retrieval-Augmented Generation (RAG) Knowledge Assistant**.

The web application is built using Next.js 14 (App Router), TypeScript, and Tailwind CSS, focusing on speed, clean typography, whitespace, and responsive glassmorphism navigation. Public navigation is organized into 8 core areas (`/`, `/about`, `/academics`, `/admissions`, `/campus`, `/notices`, `/contact`, `/ai-assistant`) without public user login overhead. 

To eliminate AI hallucinations, the integrated RAG assistant searches a verified VDCET knowledge base repository before invoking LLM inference. Answers are generated grounded strictly in available official VDCET knowledge chunks and display source attribution badges. If requested information is absent from the knowledge base, the assistant outputs an exact fallback notification directing visitors to contact the college office. Administrative management is isolated under secret route `/admin` secured via HTTP-only JWT cookies.

The complete system provides an accurate, fast digital experience for prospective students and visitors while serving as a practical digital gift to VDCET.
