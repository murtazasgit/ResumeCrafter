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
└── README.md ``` </code></pre>


---

## ⚙️ Environment Variables

Create a `.env` file in the root with:

```env
GEMINI_API_KEY=your_actual_api_key
```
## 📦 Setup Instrctions
# 1.Clone the repo
git clone https://github.com/murtazasgit/ResumeCrafter.git

``` cd ResumeCrafter```

# 2.Install backend dependencies
```npm install```

# 3.Install frontend dependencies
```cd frontend```
```npm install```

# 4.Go back and run backend
```cd ..```
```node server.js```

# 5.In a second terminal, run frontend
```cd frontend```
```npm start```


 ## Example Usage

1.Upload a resume PDF

2.Paste a job description

3.Click "generate"

4.Download your new AI-optimized resume and CV PDF 🎯
