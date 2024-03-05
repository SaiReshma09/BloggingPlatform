import React from 'react';
import { useParams } from 'react-router-dom';

const ViewPostGrid = () => {
  const { sectionId } = useParams();

  // Example content selection based on sectionId
  // Extend this logic based on your application's needs
  const getContentForSection = (id) => {
    switch (id) {
      case 'academic-resources':
        return <p>Content for Academic Resources</p>;
      case 'career-services':
        return <p>Content for Career Services</p>;
      // Add more cases for other sections
      default:
        return <p>Section not found</p>;
    }
  };

  return (
    <div>
      <h1>Viewing posts for section: {sectionId}</h1>
      {getContentForSection(sectionId)}
    </div>
  );
};

export default ViewPostGrid;
