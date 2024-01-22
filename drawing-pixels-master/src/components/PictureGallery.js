import React, { useState, useEffect } from 'react';

const PicturesGallery = () => {
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    const fetchPictures = async () => {
      try {
        const response = await fetch('http://localhost:5001/pictures', {
          method: 'GET',
        }).then(response => response.json())
        .then(data => {
          // Hier kannst du die Daten aus der Antwort verwenden
          setPictures(data)
          console.log(data)
        })
        .catch(error => {
          // Hier kannst du Fehlerbehandlung durchführen
          console.error('Fehler:', error);
        });
      } catch (error) {
        console.error('Fehler beim Abrufen der Bilder:', error);
      }
    };

    fetchPictures();
  }, []);
  const imgStyle = {
    padding: '10px'
  };
  return (
    <div>
      <h1>Bildergalerie</h1>
      {pictures.map((picture, index) => (
        <img key={index} src={`data:image/png;base64, ${picture.image}`} style={imgStyle} />
      ))}
    </div>
  );
};

export default PicturesGallery;