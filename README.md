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

<pre><code> ```ResumeCrafter/
│
├── backend/
│ ├── controllers/ # Gemini AI logic
│ ├── routes/ # Express routes
│ ├── services/ # PDF creation & file logic
│ ├── utils/ # Helper functions
│ ├── middleware/ # Multer, error handling
│ ├── config/ # Environment configs
│ └── server.js # Main Express app
│
├── frontend/
│ ├── public/ # index.html, assets
│ └── src/
│ ├── components/ # Reusable React components
│ ├── pages/ # Main pages
│ ├── styles/ # Tailwind or CSS
│ ├── App.js
│ ├── index.js
│ └── api.js # API functions
│
├── uploads/ # Temp uploaded files (gitignored)
├── outputs/ # Final generated PDFs (gitignored)
├── .env # Gemini API key (gitignored)
├── .gitignore
├── LICENSE
└── README.md ``` </code></pre>

## Setup Instructions

# Clone the repo
git clone https://github.com/murtazasgit/ResumeCrafter.git
cd ResumeCrafter

Install Backend Dependencies
npm install

Install Frontend Dependencies
cd frontend
npm install

Start the Backend Server
cd ..
node server.js

In a second terminal, run frontend
cd frontend
npm start


 ## Example Usage

Upload a resume PDF
Paste a job description
Click "generate"
Download your new AI-optimized resume and CV PDF 🎯
