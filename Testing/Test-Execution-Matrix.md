# SYSTEM TEST EXECUTION MATRIX

## Project Title
**VDCET Official Website with AI-Powered RAG Knowledge Assistant**

### Academic Information
* **Student Lead**: Suraj Gajanan Pathade
* **Team**: Suraj Gajanan Pathade, Rohit Shirbhate, Khushal Hajare, Harshal Kalbhut, Sanket Nasare, Tejas Sawargaokar
* **College**: Vilasrao Deshmukh College of Engineering & Technology, Mouda (VDCET)
* **University**: Dr. Babasaheb Ambedkar Technological University (DBATU)
* **Guide**: Rohini Ma’am
* **Academic Year**: 2026–2027

---

## Empirical Execution Matrix

| Test ID | Module | Test Scenario | Input Data | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-01** | Homepage | Load main landing page | GET `http://localhost:3000/` | HTTP 200, Hero & 8 core sections rendered | Renders cleanly with DTE Code 04141 badge | **PASS** |
| **TC-02** | About | Load about VDCET page | GET `http://localhost:3000/about` | HTTP 200, Affiliation & profile displayed | Affiliation text & AICTE approval rendered | **PASS** |
| **TC-03** | Academics | Load academic programs | GET `http://localhost:3000/academics` | HTTP 200, 4 B.Tech branches rendered | CSE, AI&DS, Civil, and Mech cards shown | **PASS** |
| **TC-04** | Admissions | Load admission checklist | GET `http://localhost:3000/admissions` | HTTP 200, CAP checklist & DTE 04141 code | Rendered eligibility & document checklist | **PASS** |
| **TC-05** | Campus | Load campus facilities | GET `http://localhost:3000/campus` | HTTP 200, Labs & photo gallery rendered | Rendering computer labs & workshops | **PASS** |
| **TC-06** | Notices | Load notice board | GET `http://localhost:3000/notices` | HTTP 200, Filterable category notices | Rendered category filter bar & search | **PASS** |
| **TC-07** | Contact | Load contact details | GET `http://localhost:3000/contact` | HTTP 200, Address, phone, email & map | Maps embed & official contacts rendered | **PASS** |
| **TC-08** | AI Assistant | Load AI chatbot interface | GET `http://localhost:3000/ai-assistant` | HTTP 200, Prompt chips & chat window | Rendered preset chips & disclaimer badge | **PASS** |
| **TC-09** | Admin Security| Access hidden admin URL | GET `http://localhost:3000/admin` | HTTP 200, Displays Admin Login Card | Login form rendered; dashboard hidden | **PASS** |
| **TC-10** | Admin Auth | Invalid password login | POST `wrongpass` | HTTP 401 Unauthorized Error | Returned 401 Unauthorized JSON error | **PASS** |
| **TC-11** | Admin Auth | Valid password login | POST `adminvdcet123` | HTTP 200 OK + Set JWT session cookie | Authenticated, sets HTTP-only cookie | **PASS** |
| **TC-12** | Admin CMS | Create notice record | POST Notice Payload | HTTP 201 Created, DB record stored | Created notice ID 1 | **PASS** |
| **TC-13** | Admin CMS | Delete notice record | DELETE `id=1` | HTTP 200 OK, DB record removed | Deleted notice record | **PASS** |
| **TC-14** | RAG Engine | Valid query execution | POST `"What departments are available?"` | Returns 4 B.Tech branches + Sources | Returned 4 branches + source badges | **PASS** |
| **TC-15** | RAG Engine | Unfound query execution | POST `"Who is president of Mars?"` | Returns official fallback notification | Returned exact required fallback message | **PASS** |
| **TC-16** | Security | Unauth API CRUD call | POST `/api/admin/notices` (no cookie) | HTTP 401 Unauthorized | Blocked unauthorized POST request | **PASS** |
| **TC-17** | Production Build | Compile Next.js app | `npm run build` | Exit Code 0, All pages compiled | Build completed with 0 errors | **PASS** |
