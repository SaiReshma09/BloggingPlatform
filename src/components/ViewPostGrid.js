import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from './Header';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Button, Card, CardContent, CardActions, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
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

const ViewPostGrid = () => {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const [postContent, setPostContent] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostsFromLocalStorage = () => {
      const localStorageData = localStorage.getItem(sectionId);
      if (localStorageData) {
        setPostContent(JSON.parse(localStorageData));
      } else {
        setPostContent([]);
        setError('Data not found in local storage');
      }
    };

    fetchPostsFromLocalStorage();
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

  const handleCardClick = (postId) => {
    // Check if the key for the post ID is already available in local storage
    const existingPost = localStorage.getItem(postId);
    if (existingPost) {
      console.log(`Post with ID ${postId} already exists in local storage.`);
    } else {
      const post = postContent.find((post) => post.id === postId);
      if (post) {
        // Create a new entry in local storage with the post ID as the key and the JSON data as the value
        localStorage.setItem(postId, JSON.stringify(post));
        console.log(`New entry created in local storage for post with ID ${postId}`);
      } else {
        console.error(`Post with ID ${postId} not found`);
      }
    }
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
          {postContent.length > 0 ? (
            postContent.map((post, index) => (
              <Link key={index} to={`/content/${post.id}`} style={{ textDecoration: 'none' }} onClick={() => handleCardClick(post.id)}>
                <Card style={{ margin: '20px', position: 'relative' }}>
                  <CardContent>
                    <Typography variant="h5" component="h2" style={{ fontWeight: 'bold' }}>
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      {post.author}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      {post.createdDate}
                    </Typography>
                    <br />
                    <Typography variant="body2" component="p" style={{ textAlign: 'justify' }}>
                      {post.shortdescription}
                    </Typography>
                  </CardContent>
                  <CardActions style={{ position: 'absolute', top: '5px', right: '5px' }}>
                    <IconButton aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Link>
            ))
          ) : (
            <Typography variant="body1">No content available for this section.</Typography>
          )}
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
