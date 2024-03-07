// Content.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography } from '@mui/material';

const Content = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostFromLocalStorage = () => {
      const localStorageData = localStorage.getItem(postId);
      if (localStorageData) {
        const postData = JSON.parse(localStorageData);
        setPost(postData);
      } else {
        // Handle case when post data is not found in local storage
        navigate('/'); // Redirect to home page or any other page
      }
    };

    fetchPostFromLocalStorage();
  }, [postId, navigate]);

  return (
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
  );
};

export default Content;
