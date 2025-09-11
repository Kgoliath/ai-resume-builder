// frontend/src/components/Education.jsx
import React, { useState } from 'react';
import { TextField, Button, Box, Grid, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function Education({ data, onUpdate }) {
  const [newEducation, setNewEducation] = useState({ 
    school: '', 
    degree: '', 
    field: '', 
    startDate: '', 
    endDate: '' 
  });

  const handleAdd = () => {
    if (newEducation.school && newEducation.degree) {
      onUpdate([...data, newEducation]);
      setNewEducation({ school: '', degree: '', field: '', startDate: '', endDate: '' });
    }
  };

  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    onUpdate(updatedData);
  };

  return (
    <Box sx={{ mt: 2 }}>
      {/* Form for new education entry */}
      <Grid container spacing={2}>
        <Grid size= {{ xs: 12, sm: 6}}>
          <TextField
            fullWidth
            label="School/University"
            value={newEducation.school}
            onChange={(e) => setNewEducation({...newEducation, school: e.target.value})}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6}}>
          <TextField
            fullWidth
            label="Degree"
            value={newEducation.degree}
            onChange={(e) => setNewEducation({...newEducation, degree: e.target.value})}
          />
        </Grid>
        <Grid size={{ xs: 12}}>
          <TextField
            fullWidth
            label="Field of Study"
            value={newEducation.field}
            onChange={(e) => setNewEducation({...newEducation, field: e.target.value})}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6}}>
          <TextField
            fullWidth
            label="Start Date"
            value={newEducation.startDate}
            onChange={(e) => setNewEducation({...newEducation, startDate: e.target.value})}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6}}>
          <TextField
            fullWidth
            label="End Date"
            value={newEducation.endDate}
            onChange={(e) => setNewEducation({...newEducation, endDate: e.target.value})}
          />
        </Grid>
        <Grid size={{ xs: 12}}>
          <Button variant="contained" onClick={handleAdd}>
            Add Education
          </Button>
        </Grid>
      </Grid>

      {/* List of existing education */}
      {data.map((edu, index) => (
        <Box key={index} sx={{ mt: 2, p: 2, border: '1px solid #ccc', borderRadius: 1 }}>
          <Grid container alignItems="center">
            <Grid size={{ xs: 11}}>
              <strong>{edu.degree}</strong> in {edu.field} at {edu.school} ({edu.startDate} - {edu.endDate})
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

export default Education;