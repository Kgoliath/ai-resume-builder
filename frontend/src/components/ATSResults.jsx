import React from 'react';
import { Paper, Typography, Box, LinearProgress, Chip, List, ListItem, ListItemText, Alert } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';

function ATSResults({ results, loading }) {
  if (loading) {
    return (
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Analyzing ATS Compatibility...
        </Typography>
        <LinearProgress />
      </Paper>
    );
  }

  if (!results) return null;

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        ATS Analysis Results
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Box sx={{ width: '100%', mr: 2 }}>
          <Typography variant="h6" gutterBottom>
            Compatibility Score: {results.score}%
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={results.score} 
            sx={{ 
              height: 10, 
              borderRadius: 5,
              backgroundColor: results.score >= 70 ? '#4caf50' : results.score >= 50 ? '#ff9800' : '#f44336'
            }}
          />
        </Box>
        {results.score >= 70 ? (
          <CheckCircleIcon color="success" sx={{ fontSize: 40 }} />
        ) : (
          <WarningIcon color="warning" sx={{ fontSize: 40 }} />
        )}
      </Box>

      <Alert 
        severity={results.score >= 70 ? 'success' : results.score >= 50 ? 'warning' : 'error'}
        sx={{ mb: 3 }}
      >
        {results.summary}
      </Alert>

      {results.suggestion && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            AI Suggestions:
          </Typography>
          <Alert severity="info">
            {results.suggestion}
          </Alert>
        </Box>
      )}

      {results.matchedKeywords.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            ✅ Matched Keywords ({results.matchedKeywordsCount}/{results.totalKeywordsFound}):
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {results.matchedKeywords.map((keyword, index) => (
              <Chip key={index} label={keyword} color="success" variant="outlined" />
            ))}
          </Box>
        </Box>
      )}

      {results.missingKeywords.length > 0 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            ⚠️ Missing Keywords:
          </Typography>
          <List dense>
            {results.missingKeywords.map((keyword, index) => (
              <ListItem key={index}>
                <ListItemText primary={keyword} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Paper>
  );
}

export default ATSResults;