# QuickLearn AI - AI-Powered Study Platform

QuickLearn AI is a full-stack, AI-powered learning workspace designed to transform raw lecture notes, text, and textbook excerpts into structured study assets: high-yield executive summaries, active-recall quizzes, and 3D flashcards.

---

## Key Features

- **Dynamic Study Hub (`dashboard.html`):** Real-time tracking of processed notes, generated summaries, completed quizzes, and mastered flashcards via browser persistence (`localStorage`).
- **Notes Ingestion & AI Summarizer (`upload.html`):** Multi-topic sample injection, raw notes processing, and structured breakdown into core overviews and bulleted exam takeaways.
- **Interactive MCQ Engine (`quiz.html`):** 10-question evaluation engine with instant answer validation (green/red feedback), contextual pedagogical explanations, and score analytics.
- **3D Spatial Flashcards (`flashcards.html`):** CSS perspective-based 3D flip card system supporting spaced repetition and active recall.
- **Scalable AI Middleware (`backend/server.js`):** Node.js and Express backend integrated with Google Gemini API (`gemini-2.5-flash`) via structured JSON schemas.

---

## Tech Stack

- **Frontend:** HTML5, CSS3 (Modern Flexbox/Grid, 3D Transforms), Vanilla JavaScript (ES6+), PDF.js
- **Backend:** Node.js, Express.js, CORS, Dotenv
- **AI Integration:** Google Gen AI SDK (`@google/genai`), Model: `gemini-2.5-flash`
- **Client Storage:** Web Storage API (`localStorage`)

---

## Project Structure

```text
QuickLearn AI/
├── index.html           # Landing page with product presentation
├── login.html           # Authentication portal
├── dashboard.html       # Metrics overview & module launchpad
├── upload.html          # Notes ingestion and summary engine
├── quiz.html            # 10-question MCQ quiz runner
├── flashcards.html      # 3D interactive flip-card study tool
├── .gitignore           # Ignores secret credentials & dependencies
├── README.md            # Comprehensive project documentation
└── backend/
    ├── package.json     # Node dependencies & project metadata
    ├── .env             # API credentials & port configuration
    └── server.js        # Express REST API endpoints for Gemini AI