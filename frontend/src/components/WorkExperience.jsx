// frontend/src/components/WorkExperience.jsx
import React, { useState } from 'react';
import { TextField, Button, Box, Grid, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AISuggestionButton from './AISuggestionButton';

function WorkExperience({ data, onUpdate }) {
  const [newJob, setNewJob] = useState({ 
    company: '', 
    title: '', 
    startDate: '', 
    endDate: '', 
    description: '' 
  });

  const handleAdd = () => {
    if (newJob.company && newJob.title) {
      onUpdate([...data, newJob]);
      setNewJob({ company: '', title: '', startDate: '', endDate: '', description: '' });
    }
  };

  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    onUpdate(updatedData);
  };

  const handleInputChange = (field, value) => {
    setNewJob(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Add New Work Experience
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6}}>
          <TextField
            fullWidth
            label="Company"
            value={newJob.company}
            onChange={(e) => handleInputChange('company', e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6}}>
          <TextField
            fullWidth
            label="Job Title"
            value={newJob.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6}}>
          <TextField
            fullWidth
            label="Start Date"
            value={newJob.startDate}
            onChange={(e) => handleInputChange('startDate', e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6}}>
          <TextField
            fullWidth
            label="End Date"
            value={newJob.endDate}
            onChange={(e) => handleInputChange('endDate', e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 12}}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Description"
            value={newJob.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
          />
          <AISuggestionButton
            currentText={newJob.description}
            section="workExperience"
            fieldName="description"
            onSuggestionGenerated={(suggestion) => handleInputChange('description', suggestion)}
          />
        </Grid>
        <Grid size={{ xs: 12}}>
          <Button variant="contained" onClick={handleAdd}>
            Add Experience
          </Button>
        </Grid>
      </Grid>

      {data.map((job, index) => (
        <Box key={index} sx={{ mt: 2, p: 2, border: '1px solid #ccc', borderRadius: 1 }}>
          <Grid container alignItems="center">
            <Grid size={{ xs: 11}}>
              <strong>{job.title}</strong> at {job.company} ({job.startDate} - {job.endDate})
              <div>{job.description}</div>
            </Grid>
            <Grid size={{ xs: 1}}>
              <IconButton onClick={() => handleDelete(index)} color="error">
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
}

export default WorkExperience;