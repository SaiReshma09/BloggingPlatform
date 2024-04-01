import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import Footer from './Footer';
import photo from './blogpage.png';

// Updated sections array to include an 'id' for each section
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

export default function Blog() {
  const navigate = useNavigate();
  const users=localStorage.getItem('users')
  console.log(users)

  // Updated to navigate to dynamic route based on the section id
  const handleSectionClick = (id) => {
    navigate(`/view-post-grid/${id}`);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="true">
        <Header
          sections={sections.map((section) => ({
            ...section,
            onClick: () => handleSectionClick(section.id),
          }))}
          login={localStorage.getItem('login') === 'true'}
          user={localStorage.getItem('user')}
        />
        <main>
        <div style={{ marginLeft: '24px', width: 'calc(100% - 24px)', textAlign: 'center' }}>
          <Typography variant="h4">
                Welcome to the Blogging platform!
          </Typography>
          <br />
          <img src={photo} style={{ width: '55%', height: '50%', alignItems: 'center', justifyContent: 'center' }} />
          <br />
          <Typography variant="body1" style={{ marginBottom: '24px' }}>
            Welcome to InspireHub!
              Explore a world of thoughts and experiences shared by our community. From the latest trends to personal stories, find inspiration that sparks your curiosity.
          </Typography>
          <Typography variant="body1">
            Whether you're navigating academia as a student, seeking career wisdom as a professional, or simply passionate about life, InspireHub is your platform to engage, connect, and cultivate new ideas. Join the conversation, share your unique stories, and let's collectively shape a hub that fosters learning, empowerment, and a sense of belonging."
          </Typography>
        </div>

          {/* Rest of your content */}
        </main>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
}