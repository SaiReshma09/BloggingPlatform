import React from 'react';
import { Card, CardContent, Typography, CardActions, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const PostCard = ({ title, content, author }) => {
    const handleDelete = () => {
        // Implement delete functionality here
        console.log("Delete button clicked");
    };

    return (
        <Card style={{
            margin: "30px",
            padding:"10px",
            // backgroundColor: "#FFDEE9",
            backgroundImage: "linear-gradient(to right top, #ffffff, #eef0f6, #d8e3ed, #bfd7e1, #a7cbd0)"
        }}>
            <CardActions style={{ justifyContent: 'space-between' }}>
                <Typography variant="h" component="h2">
                    {title}
                    Animal
                </Typography>
                <IconButton aria-label="delete" onClick={handleDelete}>
                    <DeleteIcon />
                </IconButton>
            </CardActions>
            <CardContent>
                <Typography variant="body2" component="p" style={{
                    marginLeft:"50px",
                    marginRight:"50px"
                }}>
                    {content}
                    A paragraph is a group of sentences that fleshes out a single idea. In order for a paragraph to be effective,
                    it must begin with a topic sentence, 
                    have sentences that support the main idea of that paragraph, and maintain a consistent flow.
                    it must begin with a topic sentence, 
                    have sentences that support the main idea of that paragraph, and maintain a consistent flow.
                    it must begin with a topic sentence, 
                    have sentences that support the main idea of that paragraph, and maintain a consistent flow.
                </Typography>
            </CardContent>
            <CardActions style={{ justifyContent: 'flex-end' }}>
                <Typography variant="caption">
                    By: {author}
                    Nirbhay
                </Typography>
            </CardActions>
        </Card>
    );
};

export default PostCard;