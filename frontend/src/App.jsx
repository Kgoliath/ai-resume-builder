// frontend/src/App.jsx
import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  Button, 
  Box, 
  Collapse, 
  TextField 
} from '@mui/material';
import PersonalInfo from './components/PersonalInfo';
import WorkExperience from './components/WorkExperience';
import Education from './components/Education';
import Skills from './components/Skills';
import ResumePreview from './components/ResumePreview';
import ATSResults from './components/ATSResults';
import { loadData, saveData } from './utils/storage';
import { exportToPDF } from './utils/pdfExport';
import './App.css';
//import {API_BASE} from '.config';

function App() {
  const [resumeData, setResumeData] = useState({
    personalInfo: { 
      name: '', 
      email: '', 
      phone: '', 
      linkedin: '',
      summary: ''
    },
    workExperience: [],
    education: [],
    skills: []
  });

  const [showEducation, setShowEducation] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [atsResults, setAtsResults] = useState(null);
  const [atsLoading, setAtsLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');

  // Load data from Local Storage when the app starts
  useEffect(() => {
    const loadSavedData = () => {
      try {
        const savedData = loadData('resumeData');
        console.log('Loaded from storage:', savedData);
        if (savedData) {
          setResumeData(savedData);
        }
      } catch (error) {
        console.error('Error loading from localStorage:', error);
      }
    };
    
    loadSavedData();
  }, []);

  // Save data to Local Storage whenever resumeData changes
  useEffect(() => {
    const saveDataToStorage = () => {
      try {
        saveData('resumeData', resumeData);
        console.log('Saved to storage:', resumeData);
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
    };
    
    saveDataToStorage();
  }, [resumeData]);

  // Function to update any section of the resume data
  const updateSection = (section, data) => {
    setResumeData(prevData => ({
      ...prevData,
      [section]: data
    }));
  };

  const analyzeATS = async () => {
  if (!jobDescription.trim()) {
    alert('Please enter a job description first');
    return;
  }

  setAtsLoading(true);
  try {
    // Use environment variable for production, fallback to localhost for development
    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    
    const response = await fetch(`${API_BASE}/api/analyze-ats`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        resumeData: resumeData,
        jobDescription: jobDescription
      })
    });
    
    if (!response.ok) throw new Error('ATS analysis failed');
    
    const results = await response.json();
    setAtsResults(results);
  } catch (error) {
    console.error('ATS analysis error:', error);
    alert('Failed to analyze ATS compatibility. Please try again.');
  }
  setAtsLoading(false);
};

  const handleGenerateResume = () => {
    setShowPreview(true);
    // Small delay to ensure the preview renders before PDF generation
    setTimeout(() => exportToPDF('resume-preview', `${resumeData.personalInfo.name || 'My'}-Resume.pdf`), 100);
  };

  return (
    <div className="App">
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          AI Resume Builder
        </Typography>

        {/* Personal Information Section */}
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Personal Information
          </Typography>
          <PersonalInfo 
            data={resumeData.personalInfo} 
            onUpdate={(newData) => updateSection('personalInfo', newData)} 
          />
        </Paper>

        {/* Work Experience Section */}
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Work Experience
          </Typography>
          <WorkExperience 
            data={resumeData.workExperience} 
            onUpdate={(newData) => updateSection('workExperience', newData)} 
          />
        </Paper>

        {/* Education Section - Collapsible */}
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Education
            </Typography>
            <Button 
              variant="outlined" 
              onClick={() => setShowEducation(!showEducation)}
            >
              {showEducation ? 'Hide' : 'Show'} Education
            </Button>
          </Box>
          <Collapse in={showEducation}>
            <Education 
              data={resumeData.education} 
              onUpdate={(newData) => updateSection('education', newData)} 
            />
          </Collapse>
        </Paper>

        {/* Skills Section - Collapsible */}
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Skills
            </Typography>
            <Button 
              variant="outlined" 
              onClick={() => setShowSkills(!showSkills)}
            >
              {showSkills ? 'Hide' : 'Show'} Skills
            </Button>
          </Box>
          <Collapse in={showSkills}>
            <Skills 
              data={resumeData.skills} 
              onUpdate={(newData) => updateSection('skills', newData)} 
            />
          </Collapse>
        </Paper>

        {/* Job Description Analysis Section */}
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Job Description Analysis
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Paste a job description to check ATS compatibility and get keyword suggestions
          </Typography>
          
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Paste Job Description Here"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Copy and paste the job description to analyze ATS compatibility..."
            sx={{ mt: 2 }}
          />
          
          <Button 
            variant="contained" 
            onClick={analyzeATS} 
            disabled={atsLoading || !jobDescription.trim()}
            sx={{ mt: 2 }}
          >
            {atsLoading ? 'Analyzing...' : 'Analyze ATS Compatibility'}
          </Button>
        </Paper>

        <ATSResults results={atsResults} loading={atsLoading} />

        {/* Template Selection Section - MOVED ABOVE GENERATE BUTTON */}
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Choose Template
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              variant={selectedTemplate === 'modern' ? 'contained' : 'outlined'} 
              onClick={() => setSelectedTemplate('modern')}
            >
              Modern
            </Button>
            <Button 
              variant={selectedTemplate === 'classic' ? 'contained' : 'outlined'} 
              onClick={() => setSelectedTemplate('classic')}
            >
              Classic
            </Button>
            <Button 
              variant={selectedTemplate === 'professional' ? 'contained' : 'outlined'} 
              onClick={() => setSelectedTemplate('professional')}
            >
              Professional
            </Button>
          </Box>
        </Paper>

        {/* Generate Resume Button */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 3 }}>
          <Button 
            variant="contained" 
            color="success" 
            size="large"
            onClick={handleGenerateResume}
            disabled={!resumeData.personalInfo.name}
          >
            Generate & Download Resume
          </Button>
        </Box>

        {/* Resume Preview */}
        {showPreview && (
          <Box id="resume-preview" sx={{ mt: 4 }}>
            <ResumePreview data={resumeData} template={selectedTemplate} />
          </Box>
        )}
      </Container>
    </div>
  );
}

export default App;