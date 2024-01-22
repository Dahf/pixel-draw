import React, { useState, useEffect } from 'react';
import Pixel from './Pixel';
import '../styles/row.scss';

function Row({ width, selectedColor, size }) {
  
  const [pixels, setPixels] = useState([]);
  
  useEffect(() => {
    let pixels = [];
    for (let i = 0; i < width; i++) {
      pixels.push(<Pixel key={i} selectedColor={selectedColor} size={size} />);
    }
    setPixels(pixels);
  }, [size, selectedColor]);
  
  return (
    <div className='row'>{pixels}</div>
  )
}

export default Row;