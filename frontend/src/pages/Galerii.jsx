import React from 'react';
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
        <div className="galerii-page">
            {images.map((image, index) => (
                <ImageTile
                    key={index}
                    image={image}
                    reverseOrder={index % 2 !== 0}
                />
            ))}
        </div>
    );
}

export default Galerii;