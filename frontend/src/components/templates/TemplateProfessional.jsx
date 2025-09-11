import React from 'react';
import { Paper, Typography, Box, Divider, Chip } from '@mui/material';

function TemplateProfessional({ data }) {
  return (
    <Paper elevation={2} sx={{ p: 4, fontFamily: 'Arial, sans-serif', backgroundColor: '#ffffff' }}>
      {/* Header with side bar */}
      <Box sx={{ display: 'flex', mb: 4 }}>
        {/* Main Content (70%) */}
        <Box sx={{ flex: 7, pr: 3 }}>
          <Typography variant="h3" fontWeight="bold" color="primary" gutterBottom>
            {data.personalInfo.name}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {data.personalInfo.email} | {data.personalInfo.phone} | {data.personalInfo.linkedin}
          </Typography>
          
          {data.personalInfo.summary && (
            <Box sx={{ mt: 2, mb: 3 }}>
              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                {data.personalInfo.summary}
              </Typography>
            </Box>
          )}

          {/* Work Experience */}
          {data.workExperience.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h4" color="primary" sx={{ borderBottom: '2px solid', borderColor: 'primary.main', pb: 1, mb: 2 }}>
                PROFESSIONAL EXPERIENCE
              </Typography>
              {data.workExperience.map((job, index) => (
                <Box key={index} sx={{ mb: 2.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography variant="h6" fontWeight="bold">
                      {job.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                      {job.startDate} - {job.endDate || 'Present'}
                    </Typography>
                  </Box>
                  <Typography variant="subtitle1" color="primary" fontWeight="medium" gutterBottom>
                    {job.company}
                  </Typography>
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
                    {job.description}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                </Box>
              ))}
            </Box>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <Box>
              <Typography variant="h4" color="primary" sx={{ borderBottom: '2px solid', borderColor: 'primary.main', pb: 1, mb: 2 }}>
                EDUCATION
              </Typography>
              {data.education.map((edu, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="h6" fontWeight="bold">
                    {edu.degree}
                  </Typography>
                  <Typography variant="subtitle1" color="primary">
                    {edu.school}
                  </Typography>
                  <Typography variant="body2">
                    {edu.field} | {edu.startDate} - {edu.endDate}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>

        {/* Sidebar (30%) */}
        <Box sx={{ flex: 3, pl: 2, borderLeft: '1px solid', borderColor: 'divider' }}>
          {/* Skills */}
          {data.skills.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" color="primary" gutterBottom>
                TECHNICAL SKILLS
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {data.skills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    color="primary"
                    variant="filled"
                    sx={{ mb: 1, fontWeight: 'medium' }}
                  />
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  );
}

export default TemplateProfessional;