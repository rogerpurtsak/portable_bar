
import React from 'react';
import './backgroundsct.css';

function BackgroundSection({ title, text1, imageSrc, customStyles, contentStyle, imageContainerStyle }) {
    return (
        <div className="background-section" style={customStyles}>
            <div className="text1" style={contentStyle}>
                {title && <h2 className="background-section-title">{title}</h2>}
                <p className="background-section-content">{text1}</p>
            </div>
            <div className="image-container" style={imageContainerStyle}>
                <img src={imageSrc} alt="" className="side-image" />
            </div>
        </div>
    );
}

export default BackgroundSection;
