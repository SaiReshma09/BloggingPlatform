import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, TextField, List, ListItem, ListItemText } from '@mui/material';
import Header from './Header';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from './Footer';
import Divider from '@mui/material/Divider';

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
  const [replyContent, setReplyContent] = useState('');
  const [replies, setReplies] = useState(() => {
    const storedReplies = localStorage.getItem(`replies-${postId}`);
    return storedReplies ? JSON.parse(storedReplies) : [];
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostFromLocalStorage = () => {
      const localStorageData = localStorage.getItem(postId);
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

  const handleSectionClick = (id) => {
    navigate(`/view-post-grid/${id}`);
  };

  const navigateHome = () => {
    navigate('/');
  };

  const navigateToCreatePost = () => {
    navigate('/create-post');
  };

  const handleDeletePost = () => {
    // Logic to delete post goes here
    console.log('Post deleted');
  };

  const handleReplyChange = (event) => {
    setReplyContent(event.target.value);
  };

  const handleSubmitReply = (event) => {
    event.preventDefault();
    console.log('Reply submitted:', replyContent);
    setReplies([...replies, replyContent]);
    setReplyContent('');
  };

  useEffect(() => {
    // Update local storage when replies change
    localStorage.setItem(`replies-${postId}`, JSON.stringify(replies));
  }, [replies, postId]);

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
          showDeleteButton={true} // Pass showDeleteButton prop
          onDelete={handleDeletePost} // Pass onDelete prop with the delete function
        />

        <Container maxWidth="lg">
          {post && (
            <>
              <Typography variant="h4">{post.title}</Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>{post.author}</Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>{post.createdDate}</Typography>
              <br />
              <br />
              <Typography variant="body1" dangerouslySetInnerHTML={{ __html: post.content }} style={{ textAlign: 'justify' }} />
            </>
          )}

          <Divider sx={{ width: 'calc(100% - 48px)', marginLeft: '24px', marginTop: '24px' }} />

          {/* Reply Section */}
          <Typography variant="h5" style={{ marginTop: '24px' }}>Reply</Typography>
          <form onSubmit={handleSubmitReply}>
            <TextField
              id="reply-content"
              label="Your Reply"
              multiline
              fullWidth
              value={replyContent}
              onChange={handleReplyChange}
              variant="outlined"
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
              Submit Reply
            </Button>
          </form>

          {/* List of Replies */}
          <Typography variant="h5" style={{ marginTop: '24px' }}>Replies</Typography>
          <List>
            {replies.map((reply, index) => (
              <ListItem key={index}>
                <ListItemText primary={reply} />
              </ListItem>
            ))}
          </List>
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
