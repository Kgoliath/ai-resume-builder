import React from 'react';
import { IconButton, Tooltip, Snackbar, Alert } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

function FeedbackButton({ originalText, generatedSuggestion, section, onFeedback }) {
  const [feedbackSent, setFeedbackSent] = React.useState(false);

  const sendFeedback = async (feedbackType) => {
  try {
    // Use environment variable for production, fallback to localhost for development
    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const response = await fetch(`${API_BASE}/api/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        originalPrompt: originalText,
        generatedSuggestion: generatedSuggestion,
        feedback: feedbackType,
        section: section
      })
    });

    if (response.ok) {
      setFeedbackSent(true);
      onFeedback?.(feedbackType);
    }
  } catch (error) {
    console.error('Feedback error:', error);
  }
};

  const handleCloseSnackbar = () => {
    setFeedbackSent(false);
  };

  return (
    <>
      <Tooltip title="Like this suggestion">
        <IconButton 
          size="small" 
          color="success"
          onClick={() => sendFeedback('positive')}
          sx={{ ml: 1 }}
        >
          <ThumbUpIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Dislike this suggestion">
        <IconButton 
          size="small" 
          color="error"
          onClick={() => sendFeedback('negative')}
        >
          <ThumbDownIcon />
        </IconButton>
      </Tooltip>

      <Snackbar open={feedbackSent} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Thank you for your feedback!
        </Alert>
      </Snackbar>
    </>
  );
}

// ⚠️ MAKE SURE THIS LINE IS AT THE VERY END ⚠️
export default FeedbackButton;