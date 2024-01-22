import React, { useState, useEffect } from 'react';

const ImageDisplay = ({ imageId }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // Ersetzen Sie 'http://localhost:3000' mit der tatsächlichen Basis-URL Ihres Servers
    const fetchImageUrl = `http://localhost:5001/picture/${imageId}`;
    setImageUrl(fetchImageUrl);
  }, [imageId]);

  return (
    <div>
      <h1>Bildanzeige</h1>
      {imageUrl ? (
        <img id="image" src={imageUrl} alt="Bild wird geladen..." />
      ) : (
        <p>Bild wird geladen...</p>
      )}
    </div>
  );
};

export default ImageDisplay;