import React from 'react';
import './Galerii.css';
import ImageTile from '../components/ImageTile';

function Galerii() {
    const images = [
        '/hood_jook.jpg',
        '/hood_naine.jpg',
        '/hood_dj.jpg',
        '/hood_rahvas.jpg',
        '/hood_rahvas.jpg',
        '/hood_rahvas.jpg',
        '/hood_rahvas.jpg',
        '/hood_rahvas.jpg',
        '/hood_rahvas.jpg',
        '/hood_rahvas.jpg',
    ];

    return (
        <div className="galerii-container">
            <div className="piltide-galerii">
            {images.map((image, index) => (
                <div key={index} className="pilt-container">
                    <ImageTile image={image} />
                </div>
            ))}
            </div>
        </div>
    );
}

export default Galerii;