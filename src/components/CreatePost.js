import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from './Footer';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    topic: '',
    content: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContentChange = (content) => {
    setFormData({ ...formData, content });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Construct a JavaScript object containing the form data
    const postData = {
      title: formData.title,
      author: formData.author,
      topic: formData.topic,
      content: formData.content
    };

    // Convert the JavaScript object to a JSON string
    const jsonData = JSON.stringify(postData);

    // Create a Blob object containing the JSON string
    const blob = new Blob([jsonData], { type: 'application/json' });

    // Create a URL for the Blob object
    const url = URL.createObjectURL(blob);

    // Create a link element and simulate a click to trigger the file download
    const link = document.createElement('a');
    link.href = url;
    link.download = `${formData.title}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const navigateHome = () => {
    navigate('/');
  };

  const modules = {
    // Toolbar configuration for ReactQuill
    // (Omitted for brevity)
  };

  const editorStyle = {
    height: '300px', // Adjust the height as needed
  };

  const formStyle = {
    marginBottom: '60px', // Add margin to create gap between editor and button
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
        />
        <main>
          <div style={formStyle}>
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
              <TextField
                name="author"
                label="Author"
                fullWidth
                value={formData.author}
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
              <ReactQuill
                value={formData.content}
                onChange={handleContentChange}
                modules={modules}
                formats={['header', 'font', 'size', 'bold', 'italic', 'underline', 'color', 'background', 'align']}
                theme="snow"
                style={editorStyle}
              />
              <Button type="submit" variant="contained" color="primary">
                Create Post
              </Button>
            </form>
          </div>
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
