import React from 'react';
import { Paper, Typography, Box, Chip } from '@mui/material';

function TemplateModern({ data }) {
  return (
    <Paper elevation={2} sx={{ p: 4, fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <Box textAlign="center" sx={{ borderBottom: '2px solid #1976d2', pb: 2, mb: 3 }}>
        <Typography variant="h3" fontWeight="bold" color="primary">
          {data.personalInfo.name}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {data.personalInfo.email} | {data.personalInfo.phone} | {data.personalInfo.linkedin}
        </Typography>
        {data.personalInfo.summary && (
          <Typography variant="body1" sx={{ mt: 2, fontStyle: 'italic' }}>
            {data.personalInfo.summary}
          </Typography>
        )}
      </Box>

      {/* Work Experience */}
      {data.workExperience.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" color="primary" sx={{ borderBottom: '1px solid #ddd', pb: 1, mb: 2 }}>
            Professional Experience
          </Typography>
          {data.workExperience.map((job, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="h6" fontWeight="bold">
                {job.title}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                {job.company} | {job.startDate} - {job.endDate || 'Present'}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, whiteSpace: 'pre-wrap' }}>
                {job.description}
              </Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" color="primary" sx={{ borderBottom: '1px solid #ddd', pb: 1, mb: 2 }}>
            Education
          </Typography>
          {data.education.map((edu, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="h6" fontWeight="bold">
                {edu.degree}
              </Typography>
              <Typography variant="subtitle1">
                {edu.school} | {edu.field}
              </Typography>
              <Typography variant="body2">
                {edu.startDate} - {edu.endDate}
              </Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <Box>
          <Typography variant="h4" color="primary" sx={{ borderBottom: '1px solid #ddd', pb: 1, mb: 2 }}>
            Skills
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {data.skills.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                color="primary"
                variant="filled"
                sx={{ 
                  color: 'white',
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: 'primary.dark'
                  }
                }}
              />
            ))}
          </Box>
        </Box>
      )}
    </Paper>
  );
}

export default TemplateModern;