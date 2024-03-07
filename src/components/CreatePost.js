import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
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
    shortdescription: '',
    replies: []
  });
  const [dialogOpen, setDialogOpen] = useState(false); // State to control dialog visibility

  const handleSectionClick = (id) => {
    navigate(`/view-post-grid/${id}`);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContentChange = (content) => {
    setFormData({ ...formData, content });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formData, "Details")
    const currentDate = new Date();
    const formattedDate = `${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}-${currentDate.getFullYear()}`; // Format: YYYY-MM-DD
    const { title, topic, content, author, shortdescription, replies } = formData;

    const response = await fetch('http://localhost:3001/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, topic, content, author, shortdescription, createdDate: formattedDate, replies: [] }),
    });

    if (response.ok) {
      console.log('Post added successfully');
      setDialogOpen(true); // Open the dialog if post added successfully
    } else {
      console.error('Failed to add post');
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false); // Close the dialog
    navigate(`/view-post-grid/${formData.topic}`); // Navigate to the home page
  };

  const navigateHome = () => {
    navigate('/');
  };

  const centerButtonStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px', // Add margin to separate the button from the form
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
    height: '250px', // Adjust the height as needed
  };

  const formStyle = {
    marginBottom: '50px', // Add margin to create gap between editor and button
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header
          title="Blog"
          sections={sections.map((section) => ({
            ...section,
            onClick: () => handleSectionClick(section.id),
          }))}
          extra={
            <>
              <Button color="inherit" onClick={navigateHome}>Home</Button>
            </>
          }
          login={localStorage.getItem('login') === 'true'}
          user={localStorage.getItem('user')}
        />
        <main>
          <div style={formStyle}>
            <form onSubmit={handleFormSubmit}>
              <div style={centerButtonStyle}>
                <Typography variant="h4">Create New Post</Typography>
              </div>
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
                multiline
                rows={3}
              />
              <ReactQuill
                value={formData.content}
                onChange={handleContentChange}
                modules={modules}
                formats={['header', 'font', 'size', 'bold', 'italic', 'underline', 'color', 'background', 'align']}
                theme="snow"
                style={editorStyle}
              />
              <br />
              <br />
              <br />
              <div style={centerButtonStyle}>
                <Button type="submit" variant="contained" color="primary">
                  Create Post
                </Button>
              </div>
            </form>
          </div>
          {/* Dialog for post creation success */}
          <Dialog
            open={dialogOpen}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Post Created Successfully!"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Your post has been created successfully.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} autoFocus>
                OK
              </Button>
            </DialogActions>
          </Dialog>
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
