import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from './Footer';
import Content from './Content';

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

const ViewPostGrid = () => {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const [postContent, setPostContent] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch posts based on sectionId
    const fetchPosts = async () => {
      try {
        const response = await fetch('/data.json'); // Relative path to data.json
        if (!response.ok) {
          throw new Error('data.json not found');
        }
        const jsonData = await response.json();
        const posts = jsonData.posts.filter(post => post.topic === sectionId);
        setPostContent(posts);
      } catch (error) {
        setError(error);
      }
    };

    fetchPosts();
  }, [sectionId]);

  const handleSectionClick = (id) => {
    navigate(`/view-post-grid/${id}`);
  };

  const navigateHome = () => {
    navigate('/');
  };

  const navigateToCreatePost = () => {
    navigate('/create-post');
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
              <Button color="inherit" onClick={navigateToCreatePost}>Create</Button>
            </>
          }
        />
        <main>
          <Content posts={postContent} />
        </main>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
};

export default ViewPostGrid;