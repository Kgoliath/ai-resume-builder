import React, { useState } from 'react';
import { TextField, Button, Box, Chip, Grid, Typography, Alert } from '@mui/material';
import AISuggestionButton from './AISuggestionButton';

function Skills({ data, onUpdate }) {
  const [newSkill, setNewSkill] = useState('');
  const [aiMessage, setAiMessage] = useState('');

  const handleAdd = () => {
    if (newSkill.trim()) {
      // Check if input contains commas for multiple skills
      if (newSkill.includes(',')) {
        const skillsArray = newSkill.split(',').map(skill => skill.trim()).filter(skill => skill);
        if (skillsArray.length > 0) {
          onUpdate([...data, ...skillsArray]);
          setAiMessage(`Added ${skillsArray.length} skills successfully!`);
          setNewSkill('');
          // Clear message after 3 seconds
          setTimeout(() => setAiMessage(''), 3000);
          return;
        }
      }
      
      // Single skill
      onUpdate([...data, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    onUpdate(updatedData);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  const handleAISuggestion = (suggestion) => {
    // For comma-separated skills from AI, auto-add them
    if (suggestion.includes(',')) {
      const skillsArray = suggestion.split(',').map(skill => skill.trim()).filter(skill => skill);
      if (skillsArray.length > 0) {
        onUpdate([...data, ...skillsArray]);
        setAiMessage(`AI added ${skillsArray.length} skills!`);
        setNewSkill('');
        setTimeout(() => setAiMessage(''), 3000);
      }
    } else {
      // Single skill - put in input for user to review
      setNewSkill(suggestion);
    }
  };

  const clearAllSkills = () => {
    onUpdate([]);
    setAiMessage('All skills cleared!');
    setTimeout(() => setAiMessage(''), 3000);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={8}>
          <TextField
            fullWidth
            label="Skill or Multiple Skills (comma-separated)"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., JavaScript, React, Node.js or just Python"
            helperText="Use commas to add multiple skills at once"
          />
          <AISuggestionButton
            currentText={newSkill}
            section="skills"
            fieldName=""
            onSuggestionGenerated={handleAISuggestion}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button variant="contained" onClick={handleAdd} fullWidth sx={{ mb: 1 }}>
            Add Skill(s)
          </Button>
          {data.length > 0 && (
            <Button variant="outlined" color="error" onClick={clearAllSkills} fullWidth>
              Clear All
            </Button>
          )}
        </Grid>
      </Grid>

      {/* Success Message */}
      {aiMessage && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {aiMessage}
        </Alert>
      )}

      {/* Skills Display */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Skills: {data.length} added
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, minHeight: '40px' }}>
          {data.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              onDelete={() => handleDelete(index)}
              color="primary"
              variant="filled"
              sx={{ 
                fontWeight: 'medium',
                '& .MuiChip-deleteIcon': {
                  color: 'white',
                  '&:hover': {
                    color: '#ffebee'
                  }
                }
              }}
            />
          ))}
          {data.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              No skills added yet. Type skills or use AI Enhance.
            </Typography>
          )}
        </Box>
      </Box>

      {/* Usage Instructions */}
      <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
        <Typography variant="body2" fontWeight="bold" gutterBottom>
          How to add skills:
        </Typography>
        <Typography variant="body2">
          • Type single skill: <code>JavaScript</code> → Click "Add Skill"<br/>
          • Type multiple skills: <code>JavaScript, React, Node.js</code> → Click "Add Skill"<br/>
          • Use AI: Type <code>web developer</code> → Click "AI Enhance" → AI will auto-add skills
        </Typography>
      </Box>
    </Box>
  );
}

export default Skills;