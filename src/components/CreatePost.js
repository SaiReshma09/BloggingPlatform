import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from './Footer';

const sections = [
  { title: 'Academic Resources', id: 'academic-resources' },
  { title: 'Career Services', id: 'career-services' },
  { title: 'Campus', id: 'campus' },
  { title: 'Culture', id: 'culture' },
  { title: 'Local Community Resources', id: 'local-community-resources' },
  { title: 'Social', id: 'social' },
  { title: 'Sports', id: 'sports' },
  { title: 'Health and Wellness', id: 'health-and-wellness' },
  { title: 'Technology', id: 'technology' },
  { title: 'Travel', id: 'travel' },
  { title: 'Alumni', id: 'alumni' },
];

const defaultTheme = createTheme();

const CreatePost = () => {
  const { sectionId } = useParams(); // Retrieve sectionId from the URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    topic: sectionId, // Set the initial value of topic to the sectionId
    content: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here, e.g., submit data to server
    console.log(formData);
  };

  const navigateHome = () => {
    navigate('/');
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header
          title="Blog"
          sections={sections}
          extra={
            <Button color="inherit" onClick={navigateHome}>Home</Button>
          }
          login={localStorage.getItem('login') === 'true'}
        />
        <main>
          <form onSubmit={handleFormSubmit}>
            <Typography variant="h4">Create New Post</Typography>
            <TextField
              name="title"
              label="Title"
              fullWidth
              value={formData.title}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="topic-label">Topic</InputLabel>
              <Select
                labelId="topic-label"
                id="topic"
                name="topic"
                value={formData.topic}
                onChange={handleInputChange}
                required
              >
                {sections.map((section) => (
                  <MenuItem key={section.id} value={section.id}>{section.title}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              name="content"
              label="Content"
              multiline
              rows={8}
              fullWidth
              value={formData.content}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <Button type="submit" variant="contained" color="primary">
              Create Post
            </Button>
          </form>
        </main>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
};

export default CreatePost;
