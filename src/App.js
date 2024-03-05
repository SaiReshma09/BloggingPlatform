import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Blog from './components/Blog';
import ViewPostGrid from './components/ViewPostGrid';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/view-post-grid/:sectionId" element={<ViewPostGrid />} />
      </Routes>
    </Router>
  );
}

export default App;