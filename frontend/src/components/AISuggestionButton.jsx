import React, { useState } from 'react';
import { Button, CircularProgress, Box, Tooltip, Snackbar, Alert } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import FeedbackButton from './FeedbackButton';

function AISuggestionButton({ currentText, section, fieldName, onSuggestionGenerated }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lastSuggestion, setLastSuggestion] = useState('');

  const getAISuggestion = async () => {
    if (!currentText.trim()) {
      setError('Please enter some text first for AI to enhance');
    return;
  }

  setLoading(true);
  setError('');
  
  try {
    // Use environment variable for production, fallback to localhost for development
    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const response = await fetch(`${API_BASE}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: currentText,
        section: section,
        field: fieldName
      })
    });
    
    if (!response.ok) throw new Error('API request failed');
    const data = await response.json();
    if (data.text) {
      onSuggestionGenerated(data.text);
      setLastSuggestion(data.text);
    } else if (data.error) {
      setError(data.error);
    }
  } catch (error) {
    console.error('AI Suggestion error:', error);
    setError('Failed to get AI suggestion. Please check your connection and try again.');
  }
  setLoading(false);
};

  const handleCloseError = () => {
    setError('');
  };

  return (
    <>
      <Tooltip title="Get AI enhancement suggestions">
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 1, mt: 1 }}>
          <Button
            variant="outlined"
            size="small"
            onClick={getAISuggestion}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={16} /> : <AutoAwesomeIcon />}
            sx={{ minWidth: '120px' }}
          >
            {loading ? 'Thinking...' : 'AI Enhance'}
          </Button>
            {lastSuggestion && (
                <FeedbackButton
                    originalText={currentText}
                    generatedSuggestion={lastSuggestion}
                    section={section}
                    onFeedback={(feedback) => console.log('Feedback:', feedback)}
                />
            )}
        </Box>
      </Tooltip>

      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}

export default AISuggestionButton;