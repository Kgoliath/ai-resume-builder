import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

function TemplateClassic({ data }) {
  return (
    <Paper elevation={1} sx={{ p: 4, fontFamily: 'Georgia, serif', backgroundColor: '#fafafa' }}>
      {/* Header */}
      <Box textAlign="center" sx={{ mb: 4 }}>
        <Typography variant="h3" fontWeight="normal">
          {data.personalInfo.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {data.personalInfo.email} • {data.personalInfo.phone} • {data.personalInfo.linkedin}
        </Typography>
      </Box>

      {/* Two-column layout */}
      <Box sx={{ display: 'flex', gap: 4 }}>
        {/* Main Content */}
        <Box sx={{ flex: 2 }}>
          {data.personalInfo.summary && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ borderBottom: '1px solid #000', pb: 0.5, mb: 2 }}>
                Profile
              </Typography>
              <Typography variant="body1">
                {data.personalInfo.summary}
              </Typography>
            </Box>
          )}

          {data.workExperience.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ borderBottom: '1px solid #000', pb: 0.5, mb: 2 }}>
                Work Experience
              </Typography>
              {data.workExperience.map((job, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="h6">
                    {job.title} | {job.company}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', mb: 1 }}>
                    {job.startDate} - {job.endDate || 'Present'}
                  </Typography>
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                    {job.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>

        {/* Sidebar */}
        <Box sx={{ flex: 1 }}>
          {data.education.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ borderBottom: '1px solid #000', pb: 0.5, mb: 2 }}>
                Education
              </Typography>
              {data.education.map((edu, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {edu.degree}
                  </Typography>
                  <Typography variant="body2">
                    {edu.school}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {edu.field}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {edu.startDate} - {edu.endDate}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}

          {data.skills.length > 0 && (
            <Box>
              <Typography variant="h5" sx={{ borderBottom: '1px solid #000', pb: 0.5, mb: 2 }}>
                Skills
              </Typography>
              {data.skills.map((skill, index) => (
                <Typography key={index} variant="body2" sx={{ display: 'block', mb: 0.5 }}>
                  • {skill}
                </Typography>
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  );
}

export default TemplateClassic;