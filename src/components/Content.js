import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';
import Header from './Header';
import CssBaseline from '@mui/material/CssBaseline';
import DeleteIcon from '@mui/icons-material/Delete';
import { createTheme, ThemeProvider } from '@mui/material/styles'; // Import ThemeProvider from @mui/material/styles
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

const Content = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  const handleSectionClick = (id) => {
    navigate(`/view-post-grid/${id}`);
  };

  const navigateHome = () => {
    navigate('/');
  };

  const navigateToCreatePost = () => {
    navigate('/create-post');
  };

  useEffect(() => {
    const fetchPostFromLocalStorage = () => {
      const localStorageData = localStorage.getItem(postId);
      console.log(localStorageData)
      if (localStorageData) {
        const postData = JSON.parse(localStorageData);
        setPost(postData);
      } else {
        // Handle case when post data is not found in local storage
        navigate('/');
      }
    };

    fetchPostFromLocalStorage();
  }, [postId, navigate]);

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
              <Button color="inherit" onClick={navigateToCreatePost}>Create</Button>
            </>
          }
        />
        <Container maxWidth="lg">
          {post && (
            <>
              <Typography variant="h4">{post.title}</Typography>
              <Typography variant="subtitle1">Author: {post.author}</Typography>
              <Typography variant="subtitle2">Created Date: {post.createdDate}</Typography>
              <Typography variant="body1">{post.content}</Typography>
            </>
          )}
        </Container>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
};

export default Content;
