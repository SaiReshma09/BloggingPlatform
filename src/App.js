import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Blog from './components/Blog';
import ViewPostsList from './components/ViewPostsList';
import CreatePost from './components/CreatePost';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/view-post-grid/:sectionId" element={<ViewPostsList />} />
        <Route path="/create-post/:sectionId" element={<CreatePost />} />
      </Routes>
    </Router>
  );
}

export default App;