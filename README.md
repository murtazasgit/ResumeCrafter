# 🚀 ResumeCrafter

**ResumeCrafter** is an AI-powered tool that helps users generate and optimize resumes or CVs based on job descriptions. It uses Google's **Gemini API** to smartly tailor resumes for job relevance and outputs a ready-to-use PDF.

---

## 🧠 Features

- 📄 Upload your existing resume (PDF)
- 📝 Paste any job description
- 🤖 Uses Gemini AI to match resume to job
- 📤 Upload and parse PDF content
- 📥 Generates a clean, optimized resume/CV as a downloadable PDF

---

## 🛠 Tech Stack

| Tech         | Use                             |
|--------------|----------------------------------|
| React        | Frontend UI                      |
| Node.js + Express | Backend server & API routing  |
| Gemini API   | Resume optimization logic (LLM)  |
| Multer       | File uploads                     |
| PDF-lib / html-pdf | PDF parsing and generation       |
| Tailwind CSS | Frontend styling (optional)      |

---

## 📂 Project Structure

ResumeCrafter/
│
├── backend/                      # (optional, if you want to separate backend code)
│   └── controllers/              # Logic handlers (e.g., Gemini integration)
│   └── routes/                   # Express routes
│   └── services/                 # PDF generation, file handling
│   └── utils/                    # Helper functions
│   └── middleware/               # Multer, error handling, etc.
│   └── config/                   # Config files (e.g., env loader)
│   └── server.js                 # Main Express server
│   └── package.json              # Backend dependencies
├── frontend/                     # React app (created via create-react-app)
│   ├── public/                   # index.html, favicon, etc.
│   └── src/
│       ├── components/           # React components (Input, UploadForm, Result)
│       ├── pages/                # Page-level views
│       ├── styles/               # Tailwind or CSS modules
│       ├── App.js
│       ├── index.js
│       └── api.js                # Axios or fetch wrapper
│
├── uploads/                     # Temporarily uploaded resume files (ignored in git)
├── outputs/                     # Generated PDF resumes (ignored in git)
│
├── .env                         # Environment variables (Gemini API key)
├── .gitignore                   # Git ignore rules
├── LICENSE                      # MIT License
├── README.md                    # Project info


## Setup Instructions

# Clone the repo
git clone https://github.com/murtazasgit/ResumeCrafter.git
cd ResumeCrafter

# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Go back and run backend
cd ..
node server.js

# In a second terminal, run frontend
cd frontend
npm start


 ## Example Usage

Upload a resume PDF
Paste a job description
Click "generate"
Download your new AI-optimized resume and CV PDF 🎯
