import React, { useEffect, useState, useContext } from 'react';
import '../styles/pixel.scss';
import { PenSizeContext } from './Editor'; // Importieren Sie den erstellten Kontext

function Pixel({ selectedColor, size }) {
  const [pixelColor, setPixelColor] = useState('#fff');
  const [oldColor, setOldColor] = useState(pixelColor);
  const [canChangeColor, setCanChangeColor] = useState(true);
  const context = useContext(PenSizeContext); // Verwenden Sie useContext, um auf den Wert des Kontextes zuzugreifen

  const applyColor = () => {
    setPixelColor(selectedColor);
    setCanChangeColor(false);
  };

  const changeColorOnHover = () => {
    setOldColor(pixelColor);  //making a reserved color to the old pixel color
    setPixelColor(selectedColor);
  };

  const resetColor = () => {
    if (canChangeColor) {
      setPixelColor(oldColor);
    }

    setCanChangeColor(true);
  };

  const getPixelsInCircle = (x, y, radius) => {
    const pixelsInCircle = [];
    for (let dx = -radius; dx <= radius; dx++) {
      for (let dy = -radius; dy <= radius; dy++) {
        if (dx * dx + dy * dy <= radius * radius) {
          const sampleX = Math.round(x + dx);
          const sampleY = Math.round(y + dy);
          pixelsInCircle.push({ x: sampleX, y: sampleY });
        }
      }
    }
    return pixelsInCircle;
  };

  
  const removeColor = () => {
    setPixelColor('#fff');
    setOldColor('#fff');
    setCanChangeColor(true);
  };
  const getPixelsByColor = (color) => {
    const pixels = document.getElementsByClassName('pixel');
    const pixelsWithColor = Array.from(pixels).filter((pixel) => {
      return pixel.style.backgroundColor === color;
    });
    return pixelsWithColor;
  };
  const handleClick = (e) => {
    e.preventDefault();
    if (e.type === 'click') {
      if(context.fill) {
        const doc = document.elementFromPoint(e.clientX, e.clientY);
        if(doc && doc.className.startsWith("pixel")){
          const pixelsToFill = getPixelsByColor(doc.style.backgroundColor);
          pixelsToFill.forEach((pixel) => {
            pixel.style.backgroundColor = selectedColor;
          })
        }
      } else {

      

        const radius = context.penSize; // Radius basierend auf der Stiftgröße
        const pixelsToColor = getPixelsInCircle(e.clientX, e.clientY, radius); // Funktion, um die Pixel im Radius zu erhalten
        pixelsToColor.forEach((pixel) => {
          const pixelAtPointD = getPixelAt(pixel.x, pixel.y)
          if(pixelAtPointD && pixelAtPointD.className.startsWith("pixel"))
            pixelAtPointD.style.backgroundColor = selectedColor;
        });
      }
    } else if (e.type === 'contextmenu') {
      removeColor();
    }
  }

  const getPixelAt = (x, y) => {
    // Hier wird der Pixel an den Koordinaten (x, y) über das DOM abgerufen
    // Zum Beispiel:
    const pixelElement = document.elementFromPoint(x, y);
    return pixelElement; // Rückgabe des DOM-Elements, das den Pixel repräsentiert
  };

  const handleMouseMove = (e) => {
    if(e.buttons === 1){
      const radius = context.penSize;
      const pixelsToColor = getPixelsInCircle(e.clientX, e.clientY, radius);
      pixelsToColor.forEach((pixel) => {
        const pixelAtPointD = getPixelAt(pixel.x, pixel.y)
        if(pixelAtPointD && pixelAtPointD.className.startsWith("pixel"))
          pixelAtPointD.style.backgroundColor = selectedColor;
          
      });
    } else if(e.buttons === 2){
      const radius = context.penSize;
      const pixelsToColor = getPixelsInCircle(e.clientX, e.clientY, radius);
      pixelsToColor.forEach((pixel) => {
        const pixelAtPointD = getPixelAt(pixel.x, pixel.y)
        if(pixelAtPointD && pixelAtPointD.className.startsWith("pixel"))
          pixelAtPointD.style.backgroundColor = '#fff';
      });
    }
  };

  return (
    <div 
      className='pixel' 
      style={{backgroundColor: pixelColor, width: size + "px", height: size + "px"}}
      onContextMenu={handleClick}
      onClick={handleClick} 
      onMouseMove={handleMouseMove} 
    >
    </div>
  )
}

export default Pixel;