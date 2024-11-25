import React from 'react';
import './FloatingIcon.css';

const FloatingIcon = ({ src, alt, link }) => {
  return (
    <div className="floating-icon">
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img src={src} alt={alt} />
      </a>
    </div>
  );
};

export default FloatingIcon;
