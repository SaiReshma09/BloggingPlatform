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
    content: '',
    author: '',
    shortdescription: ''
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
    const { title, topic, content, author, shortdescription } = formData;
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`; // Format: YYYY-MM-DD
    const postData = {
      id: Date.now(),
      title,
      content,
      author,
      shortdescription,
      createdDate: formattedDate
    };
    
    // Retrieve existing data from localStorage
    let existingData = localStorage.getItem(topic);
    existingData = existingData ? JSON.parse(existingData) : [];

    // Append new post data
    existingData.push(postData);

    // Save updated data back to localStorage
    localStorage.setItem(topic, JSON.stringify(existingData));

    console.log('Data saved successfully');
    navigate('/');
  };

  const navigateHome = () => {
    navigate('/');
  };

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'size': [] }],
      ['bold', 'italic', 'underline'],
      [{ 'color': [] }, { 'background': [] }],          
      [{ 'align': [] }],
      ['clean'],                                        
    ],
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
                name="author"
                label="Author"
                fullWidth
                value={formData.author}
                onChange={handleInputChange}
                margin="normal"
                required
              />
              <TextField
                name="shortdescription"
                label="Short Description"
                fullWidth
                value={formData.shortdescription}
                onChange={handleInputChange}
                margin="normal"
                required
              />
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
