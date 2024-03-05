import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header'; // Make sure this path matches where your Header component is located
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Button } from '@mui/material'; // Import Button for the Home button
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

  const handleSectionClick = (id) => {
    navigate(`/view-post-grid/${id}`);
  };

  const navigateHome = () => {
    navigate('/'); // Navigate to home route
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
          // Assuming Header can accept additional components or JSX
          extra={
            <Button color="inherit" onClick={navigateHome}>Home</Button>
          }
        />
        <main>
          <h1>Viewing Posts for Section: {sectionId}</h1>
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
