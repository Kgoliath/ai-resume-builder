// backend/server.js - COMPLETE FIXED VERSION
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = [
  'https://ai-resume-builder-phi-nine.vercel.app',
  'http://localhost:5173'
];

// Middleware - UPDATED CORS CONFIGURATION
// Middleware - SIMPLIFIED CORS CONFIGURATION
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use(express.json());

// Initialize Google AI
let genAI;
try {
  if (process.env.GOOGLE_AI_API_KEY) {
    genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
    console.log('Google AI initialized successfully');
  } else {
    console.warn('Google AI API key missing - using fallback mode');
  }
} catch (error) {
  console.error('Google AI initialization failed:', error.message);
}

app.options('/api/generate', cors());
app.options('/api/analyze-ats', cors());
app.options('/api/feedback', cors());


// POST endpoint for AI content generation
app.post('/api/generate', async (req, res) => {
  // Declare variables here so they're available in catch block
  let section, field, prompt;
  if (!genAI) {
    console.log('Using fallback response (Google AI not initialized)');
    return res.json({ 
      text: 'AI enhancement is temporarily unavailable. Please try again later.',
      fallback: true
    });
  }
  try {
    ({ prompt, section, field } = req.body);

    console.log('AI request received:', { section, field, prompt: prompt.substring(0, 50) + '...' });

    let fullPrompt = '';
    
    // Context-aware prompts for different sections
    if (section === 'workExperience' && field === 'description') {
      fullPrompt = `Create resume bullet points from this job description. Rules: 1. Use strong action verbs and quantifiable results 2. No headings, titles, or introductory text 3. Each point should be a separate sentence 4. Focus on ATS keywords and professional language Input: "${prompt}"`;
    } 
    else if (section === 'skills') {
      fullPrompt = `Suggest 5-10 relevant hard and soft skills for this role or industry. Return as a comma-separated list without numbers or bullet points. Role: "${prompt}"`;
    }
    else if (section === 'personalInfo' && field === 'summary') {
      fullPrompt = `Write a compelling professional summary for a resume. Make it concise, impactful, and tailored for ATS systems. Return only the summary. Background: "${prompt}"`;
    }
    else if (section === 'education') {
      fullPrompt = `Improve this education section description. Highlight achievements, relevant coursework, or honors. Make it more professional. Return only the improved version. Original: "${prompt}"`;
    }
    else {
      fullPrompt = `Improve this resume content for the ${section} section. Make it more professional, impactful, and ATS-friendly. Return only the improved version. Original: "${prompt}"`;
    }

    // Use Real Google AI API - FIXED MODEL NAME
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // CHANGED FROM gemini-pro
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const generatedText = response.text();

    console.log('AI response generated successfully');
    res.json({ text: generatedText });

  } catch (error) {
    console.error('Error calling Google AI API:', error);
    
    // Fallback to mock responses if API fails - FIXED VARIABLE SCOPE
    let fallbackResponse = '';
    
    if (section === 'workExperience' && field === 'description') {
      fallbackResponse = `Spearheaded project initiatives and optimized workflow processes, resulting in a 25% increase in team productivity through strategic planning and execution.`;
    } 
    else if (section === 'skills') {
      fallbackResponse = `JavaScript, React, Node.js, Python, SQL, Git, AWS, Docker, Problem Solving, Team Collaboration`;
    }
    else if (section === 'personalInfo' && field === 'summary') {
      fallbackResponse = `Results-driven IT professional with comprehensive technical expertise and demonstrated success in streamlining operations and enhancing customer experiences.`;
    }
    else if (section && field) {
      fallbackResponse = `Professionally enhanced: ${prompt}`;
    }
    else {
      fallbackResponse = 'AI enhancement failed. Please try again.';
    }
    
    res.json({ text: fallbackResponse });
  }
});

// POST endpoint for ATS compatibility analysis
app.post('/api/analyze-ats', async (req, res) => {
  try {
    if (!genAI) {
      console.log('Using fallback ATS analysis (Google AI not initialized)');
      return res.json({
        score: 75,
        matchedKeywords: ['javascript', 'react', 'node', 'html', 'css'],
        missingKeywords: ['python', 'aws', 'docker', 'typescript'],
        suggestion: 'Add more cloud computing and DevOps skills to match industry trends',
        summary: 'Good match for frontend development roles - 75% keyword compatibility',
        fallback: true
      });
    }
    const { resumeData, jobDescription } = req.body;
    
    if (!jobDescription || jobDescription.trim().length < 10) {
      return res.status(400).json({ error: 'Please provide a valid job description' });
    }

    // Use AI to analyze compatibility
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // CHANGED MODEL NAME
    
    const analysisPrompt = `
    Analyze resume compatibility with this job description. Provide:
    1. Compatibility score (0-100%)
    2. Top 5 matched keywords
    3. Top 5 missing keywords
    4. Brief improvement suggestions
    
    Resume Summary: ${resumeData.personalInfo.summary || 'No summary'}
    Skills: ${resumeData.skills.join(', ') || 'No skills'}
    Experience: ${resumeData.workExperience.map(job => job.title).join(', ') || 'No experience'}
    
    Job Description: ${jobDescription.substring(0, 1000)}
    
    Return response as JSON format: {
      score: number,
      matchedKeywords: string[],
      missingKeywords: string[],
      suggestion: string,
      summary: string
    }
    `;

    const result = await model.generateContent(analysisPrompt);
    const response = await result.response;
    const analysisResult = JSON.parse(response.text());

    res.json(analysisResult);

  } catch (error) {
    console.error('ATS analysis error:', error);
    
    // Fallback mock analysis
    res.json({
      score: 75,
      matchedKeywords: ['javascript', 'react', 'node', 'html', 'css'],
      missingKeywords: ['python', 'aws', 'docker', 'typescript'],
      suggestion: 'Add more cloud computing and DevOps skills to match industry trends',
      summary: 'Good match for frontend development roles - 75% keyword compatibility'
    });
  }
});

// POST endpoint for feedback collection
app.post('/api/feedback', async (req, res) => {
  try {
    const { originalPrompt, generatedSuggestion, feedback, section } = req.body;
    
    console.log('User feedback received:', {
      section,
      originalPrompt: originalPrompt?.substring(0, 50) + '...',
      generatedSuggestion: generatedSuggestion?.substring(0, 50) + '...',
      feedback,
      timestamp: new Date().toISOString()
    });

    res.json({ 
      message: 'Feedback received successfully. Thank you for helping improve our AI!',
      status: 'success'
    });

  } catch (error) {
    console.error('Feedback processing error:', error);
    res.status(500).json({ error: 'Failed to process feedback' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running smoothly',
    timestamp: new Date().toISOString(),
    aiStatus: process.env.GOOGLE_AI_API_KEY ? 'API Key Configured' : 'API Key Missing'
  });
});

// Basic test route
app.get('/', (req, res) => {
  res.send('✅ AI Resume Builder Backend is working! Use /api/generate for AI suggestions');
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    message: 'Something went wrong. Please try again later.'
  });
});

// 404 handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ 
    error: 'Endpoint not found',
    message: 'The requested API endpoint does not exist.',
    path: req.originalUrl
  });
});

// Start the server
app.listen(port, () => {
  console.log('✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨');
  console.log(`🚀 Server is running on port: ${port}`);
  console.log(`📍 Local: http://localhost:${port}`);
  console.log(`📍 Health: http://localhost:${port}/health`);
  console.log(`🤖 AI Status: ${process.env.GOOGLE_AI_API_KEY ? 'Ready' : 'API Key Needed'}`);
  console.log('✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨');
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Server shutting down gracefully...');
  process.exit(0);
});