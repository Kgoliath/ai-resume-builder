# 🤖 AI Resume Builder

A full-stack, AI-powered web application that helps you create professional, ATS-friendly resumes with intelligent content generation and analysis.

[![Live Demo](https://img.shields.io/badge/🚀-Live%20Demo-brightgreen)](https://your-app-name.vercel.app)
[![Frontend](https://img.shields.io/badge/Vercel-Deployed-black)](https://vercel.com)
[![Backend](https://img.shields.io/badge/Railway-Deployed-orange)](https://railway.app)

## ✨ Features

- **🤖 AI-Powered Content Generation**: Get professional bullet points, summaries, and skill suggestions powered by Google Gemini.
- **📊 ATS Compatibility Analyzer**: Scan your resume against job descriptions to find missing keywords and improve your score.
- **🎨 Multiple Professional Templates**: Choose from Modern, Classic, and Professional designs.
- **📥 One-Click PDF Export**: Download your resume as a high-quality, print-ready PDF.
- **💾 Auto-Save with Local Storage**: Your progress is saved automatically on your device.
- **📱 Fully Responsive Design**: Works perfectly on desktop, tablet, and mobile devices.

## 🚀 Live Demo

The application is fully deployed and ready to use!  
**👉 [Click here to start building your resume](https://ai-resume-builder-phi-nine.vercel.app/)**

---

## 🛠️ Local Development Setup

*These instructions are for developers who want to run the project locally.*

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A [Google AI API Key](https://aistudio.google.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/Kgoliath/ai-resume-builder
cd ai-resume-builder
2. Backend Setup
The backend API handles all AI requests securely.

bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create environment variables file
cp .env.example .env
# Edit .env file and add your API key:
# GEMINI_API_KEY=your_actual_api_key_here

# Start the development server (runs on http://localhost:3001)
npm run dev
3. Frontend Setup
Open a new terminal window/tab for the frontend

bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server (runs on http://localhost:5173)
npm run dev
4. Access the Application
Open your browser to http://localhost:5173

The frontend will connect to your locally running backend

Start building your resume!

📁 Project Structure
text
ai-resume-builder/
├── frontend/                 # React Vite Application
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── utils/           # Helper functions
│   │   └── main.jsx         # App entry point
│   ├── package.json
│   └── vite.config.js
├── backend/                  # Node.js Express API
│   ├── routes/              # API endpoint handlers
│   ├── middleware/          # Custom middleware
│   ├── .env                 # Environment variables
│   ├── package.json
│   └── server.js           # Express server setup
└── README.md
🌐 API Endpoints
Method	Endpoint	Description
POST	/api/generate	Generate AI content for resume sections
POST	/api/analyze-ats	Analyze resume for ATS compatibility
POST	/api/feedback	Submit user feedback
GET	/health	Server health check
🚦 Available Scripts
Backend (in /backend directory):

npm run dev - Start development server with hot reload

npm start - Start production server

Frontend (in /frontend directory):

npm run dev - Start Vite development server

npm run build - Build for production

npm run preview - Preview production build

🛡️ Environment Variables
Backend (.env file):

env
GEMINI_API_KEY=AIzaSyDMcLOPGWkVgGkVSg1_1h_5r8xxaM0iclQ
PORT=5000
🤝 Contributing
Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments
Google Gemini AI for powerful content generation

Material-UI for the component library

Vite for fast build tooling

Vercel & Railway for deployment
