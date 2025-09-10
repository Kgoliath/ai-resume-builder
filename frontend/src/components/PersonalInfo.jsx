// frontend/src/components/PersonalInfo.jsx
import React from 'react';
import { TextField, Grid, Box } from '@mui/material';
import AISuggestionButton from './AISuggestionButton';

function PersonalInfo({ data, onUpdate }) {

  const handleChange = (field, value) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Full Name"
            value={data.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6}}>
          <TextField
            fullWidth
            label="Email"
            value={data.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6}}>
          <TextField
            fullWidth
            label="Phone"
            value={data.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12}}>
          <TextField
            fullWidth
            label="LinkedIn URL"
            value={data.linkedin || ''}
            onChange={(e) => handleChange('linkedin', e.target.value)}
          />
        </Grid>
        <Grid size= {{ xs: 12}}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Professional Summary"
            value={data.summary || ''}
            onChange={(e) => handleChange('summary', e.target.value)}
            placeholder="Brief overview of your professional background and strengths..."
          />
          <AISuggestionButton
            currentText={data.summary || ''}
            section="personalInfo"
            fieldName="summary"
            onSuggestionGenerated={(suggestion) => handleChange('summary', suggestion)}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default PersonalInfo;