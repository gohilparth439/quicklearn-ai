const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const MODEL_NAME = 'gemini-2.5-flash';

// 1. Endpoint: Generate AI Summary
app.post('/api/summary', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "No text provided" });

    const prompt = `
Analyze the following study notes and return a JSON object with this exact structure:
{
  "overview": "A clear 2-3 sentence overview of the topic.",
  "keyPoints": [
    "Key takeaway point 1",
    "Key takeaway point 2",
    "Key takeaway point 3",
    "High-yield exam tip"
  ]
}
Return only valid JSON. Do not include markdown code fences or backticks.

Study Notes:
${text}`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });

    res.json(JSON.parse(response.text));
  } catch (err) {
    console.error("Summary error:", err);
    res.status(500).json({ error: "Failed to generate summary" });
  }
});

// 2. Endpoint: Generate 10-Question Quiz
app.post('/api/quiz', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "No text provided" });

    const prompt = `
Create 10 multiple-choice questions from the following study notes.
Return strictly a JSON array of 10 objects with this exact structure:
[
  {
    "q": "The question text?",
    "opts": ["Option A", "Option B", "Option C", "Option D"],
    "correct": 0,
    "exp": "Brief explanation of why this answer is correct."
  }
]
Note: 'correct' must be the index (0, 1, 2, or 3) of the correct option.
Return only valid JSON.

Study Notes:
${text}`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });

    res.json(JSON.parse(response.text));
  } catch (err) {
    console.error("Quiz error:", err);
    res.status(500).json({ error: "Failed to generate quiz" });
  }
});

// 3. Endpoint: Generate 10 Flashcards
app.post('/api/flashcards', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "No text provided" });

    const prompt = `
Create 10 active-recall flashcards from the following study notes.
Return strictly a JSON array of 10 objects with this exact structure:
[
  {
    "front": "Concise concept, question, or term",
    "back": "Clear definition, formula, or explanation"
  }
]
Return only valid JSON.

Study Notes:
${text}`;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });

    res.json(JSON.parse(response.text));
  } catch (err) {
    console.error("Flashcards error:", err);
    res.status(500).json({ error: "Failed to generate flashcards" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`EduMind / QuickLearn AI backend running on http://localhost:${PORT}`);
});