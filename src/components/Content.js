import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Card, CardContent, Typography, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from './Footer';
import data from '../data.json'; // Import the data from data.json
import Divider from '@mui/material/Divider';
import { deletePost } from './DeletePost';

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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // State to control delete confirmation dialog
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    topic: '',
    content: '',
    author: '',
    shortdescription: '',
    replies: []
  });

  const user=localStorage.getItem('user');
  var isuser = false;
  if(user==='kevin')
  {
    isuser=true;
  } else{
    isuser=false;
  }

  useEffect(() => {
    // Find the post with the provided postId
    const foundPost = data.posts.find(post => post.id === postId);
    if (foundPost) {
      // Set the post if found
      setPost(foundPost);
    } else {
      // Navigate back to home page if postId is not found
      navigate('/');
    }
  }, [postId, navigate]);

  const handleReplyChange = (event) => {
    setReplyContent(event.target.value);
  };

  const handleSubmitReply = async (e) => {
    e.preventDefault();

    // Fetch user detail from localStorage
    const user = localStorage.getItem('user');
    console.log(user)
    // Create a new reply object with user detail
    const newReply = {
      content: replyContent,
      user: user,
    };

    const updatedReplies = [...post.replies, newReply]; // Add the new reply to the existing replies

    const response = await fetch(`http://localhost:3001/posts/${postId}`, {
      method: 'PATCH', // Use PATCH method for partial updates
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ replies: updatedReplies }), // Send updated replies array in the request body
    });

    if (response.ok) {
      console.log('Reply submitted successfully');
      // Optionally update UI or reset form fields
      setPost({ ...post, replies: updatedReplies }); // Update the local state with the updated replies
      setReplyContent(''); // Reset the reply content
    } else {
      console.error('Failed to submit reply');
    }
  };

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
    setDeleteDialogOpen(true); // Open the delete confirmation dialog
  };

  const confirmDeletePost = async () => {
    const deleted = await deletePost(postId);
    if (deleted) {
      navigate(`/view-post-grid/${post.topic}`); // Redirect to the section post grid page after deleting the post
    } else {
      console.error('Failed to delete post');
    }
  };

  const cancelDeletePost = () => {
    setDeleteDialogOpen(false); // Close the delete confirmation dialog
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="true">
        <Header
          //title="Blog"
          sections={sections.map((section) => ({
            ...section,
            onClick: () => handleSectionClick(section.id),
          }))}
          login={localStorage.getItem('login') === 'true'}
          user={localStorage.getItem('user')}
          extra={
            <>
              <Button color="inherit" onClick={navigateHome}>Home</Button>
              <Button color="inherit" onClick={navigateToCreatePost}>Create</Button>
            </>
          }
          showDeleteButton={isuser} // Pass showDeleteButton prop
          onDelete={handleDeletePost} // Pass onDelete prop with the delete function
        />
        <main>
          {post ? (
            <>

              {/* Post content and reply section container */}
              <div style={{ marginLeft: '24px', width: 'calc(100% - 48px)' }}>
                <Typography variant="h4">{post.title}</Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>{post.author}</Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>{post.createdDate}</Typography>
                <br />
                <br />
                {/* Post content */}
                <div>
                  {/* Render HTML content using dangerouslySetInnerHTML */}
                  <Typography variant="body1" dangerouslySetInnerHTML={{ __html: post.content }} style={{ textAlign: 'justify' }} />
                </div>

                {/* Reply section */}
                <Divider sx={{ width: '100%', marginTop: '24px' }} />
                <div style={{ marginTop: '24px' }}>
                  <Typography variant="h5">Reply</Typography>
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
                  <div style={{ marginTop: '24px' }}>
                    {post.replies.map((reply, index) => (
                      <Card key={index} style={{ marginBottom: '12px' }}>
                        <CardContent>
                          <Typography variant="body1">
                            <strong>{reply.user}</strong><br />
                            {reply.content}
                          </Typography>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <Typography variant="body1">Post with ID {postId} is invalid.</Typography>
          )}
        </main>
        <Footer
          title="Footer"
          description="Something here to give the footer a purpose!"
        />
      </Container>
      {/* Delete confirmation dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={cancelDeletePost}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Post?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDeletePost} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeletePost} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default Content;
