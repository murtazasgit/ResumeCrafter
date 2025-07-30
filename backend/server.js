// ✅ Import dependencies
import express from "express";
import multer from "multer";
import fs from "fs";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";
import PDFDocument from "pdfkit";

// ✅ Load .env file for Gemini API key
dotenv.config();

// ✅ Initialize express
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Ensure folders exist
if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");
if (!fs.existsSync("outputs")) fs.mkdirSync("outputs");

// ✅ File upload config
const upload = multer({ dest: "uploads/" });
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// ✅ 🧹 Markdown Cleaner
function cleanMarkdown(text) {
  return text
    // Remove ***bold+italic***, **bold**, and *italic*
    .replace(/\*{1,3}(.+?)\*{1,3}/g, "$1")
    // Remove bullet points at the start of lines
    .replace(/^\s*[-•*]\s+/gm, "")
    // Trim whitespace
    .trim();
}

// ✅ Extract text from PDF/DOCX
async function extractResumeText(filePath) {
  if (filePath.endsWith(".pdf")) {
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    return pdfData.text;
  } else if (filePath.endsWith(".docx")) {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  } else {
    return fs.readFileSync(filePath, "utf-8");
  }
}

// ✅ Create PDF
function createPDF(text, filePath, title) {
  return new Promise((resolve) => {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);
    doc.fontSize(18).text(title, { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(text, { align: "left" });
    doc.end();

    stream.on("finish", () => resolve(filePath));
  });
}

// ✅ API Endpoint: Upload + optimize
app.post("/api/optimize", upload.single("resume"), async (req, res) => {
  try {
    const resumeFile = req.file.path;
    const resumeText = (await extractResumeText(resumeFile)).slice(0, 8000);
    const { jobDescription } = req.body;

    // ✅ Gemini Prompt
    const prompt = `
You are an expert career advisor. The student provided:

📄 Resume:
${resumeText}

📌 Job Description:
${jobDescription}

🎯 TASK:
1. Rewrite the resume with strong language and include keywords from the job description.
2. ✅ DO NOT change or remove the candidate's personal details (name, phone number, email, LinkedIn, etc.).
3. ✅ Keep the formatting professional and ATS-friendly.
4. Write a short, tailored cover letter connecting their projects/skills to the job.

Return ONLY JSON like this:
{
  "optimizedResume": "…",
  "coverLetter": "…"
}
`;

    // ✅ Call Gemini API with error handling
    let geminiResponse;
    try {
      geminiResponse = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        { contents: [{ role: "user", parts: [{ text: prompt }] }] }
      );
    } catch (error) {
      console.error("❌ Gemini API Error", error.response?.status, error.response?.data);
      return res.status(500).json({
        error: "Gemini API is down or returned an error",
        details: error.response?.data || error.message
      });
    }

    // ✅ Extract Gemini response text
    let outputText =
      geminiResponse.data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    outputText = outputText.replace(/```json/g, "").replace(/```/g, "").trim();

    // ✅ Parse JSON safely
    let parsed;
    try {
      parsed = JSON.parse(outputText);
    } catch (err) {
      console.error("❌ JSON Parse Error:", err);
      return res.status(500).json({ error: "Gemini returned invalid JSON", raw: outputText });
    }

    let { optimizedResume, coverLetter } = parsed;

    // 🧹 Clean markdown before generating PDFs
    optimizedResume = cleanMarkdown(optimizedResume);
    coverLetter = cleanMarkdown(coverLetter);

    // ✅ Delete uploaded file (cleanup)
    fs.unlinkSync(resumeFile);

    // ✅ Create PDFs
    const resumePdfPath = `outputs/Optimized_Resume_${Date.now()}.pdf`;
    const coverPdfPath = `outputs/Cover_Letter_${Date.now()}.pdf`;

    await createPDF(optimizedResume, resumePdfPath, "Optimized Resume");
    await createPDF(coverLetter, coverPdfPath, "Cover Letter");

    // ✅ Send response
    res.json({
      optimizedResume,
      coverLetter,
      resumePdf: `http://localhost:5000/${resumePdfPath}`,
      coverLetterPdf: `http://localhost:5000/${coverPdfPath}`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ✅ Serve PDFs statically
app.use(express.static("."));

// ✅ Start server
app.listen(5000, () => console.log("🚀 Backend running on http://localhost:5000"));
