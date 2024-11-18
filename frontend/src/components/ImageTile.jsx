import React from 'react';
import './imagetile.css';

function ImageTile({ image, reverseOrder }) {
    return (
        <div className="image-tile">
            <div className={`tile-container ${reverseOrder ? 'order-2' : 'order-1'}`}>
                <img src={image} alt="Gallery Item" className="tile-image" />
            </div>
        </div>
    );
}

export default ImageTile;