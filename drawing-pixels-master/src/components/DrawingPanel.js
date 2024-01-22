import React, { useEffect, useRef, useState } from 'react';
import Row from './Row';
import { exportComponentAsPNG, exportComponentAsJPEG } from 'react-component-export-image';
import html2canvas from 'html2canvas';

import '../styles/drawingPanel.scss';

function DrawingPanel({ width, height, selectedColor, size }) {
  const componentRef = useRef();
  
  const [rows, setRows] = useState([]);
  
  
  useEffect(() => {
    let rows = [];
    for (let i = 0; i < height; i++) {
      rows.push(<Row key={i} width={width} selectedColor={selectedColor} size={size} />)
    }
    setRows(rows);
  }, [size, selectedColor]);
  
  const exportToBase64 = async () => {
    try {
      const canvas = await html2canvas(componentRef.current);
      const scaledCanvas = document.createElement('canvas');
      scaledCanvas.width = 64;
      scaledCanvas.height = 64;
      const ctx = scaledCanvas.getContext('2d');
      ctx.drawImage(canvas, 0, 0, 64, 64);
      const base64Image = scaledCanvas.toDataURL("image/jpeg");
      
      uploadPicture(base64Image);

    } catch (error) {
      console.error("Fehler beim Exportieren des Bildes als Base64", error);
    }
  };
  async function uploadPicture(base64Image) {
    try {
      const formData = new FormData();
      // Konvertieren Sie das Base64-Bild in ein Blob-Objekt
      const blob = await (await fetch(base64Image)).blob();
      // Fügen Sie das Blob-Objekt dem FormData-Objekt hinzu
      formData.append('image', blob, 'image.jpg');
  
      const uploadResponse = await fetch('http://localhost:5001/picture/post', {
        method: 'POST',
        body: formData
      });
      const result = await uploadResponse.json();
      console.log(result.msg);
    } catch (error) {
      console.error('Fehler beim Hochladen des Bildes:', error);
    }
  }

  return (
    <div id="drawing-panel">
      <div id="pixels" ref={componentRef}>
        {rows}
      </div>
      <button 
        className='button-outline'
        onClick={() => exportComponentAsPNG(componentRef)}
      > Export as PNG
      </button>
      <button 
        className='button-outline'
        onClick={() => exportComponentAsJPEG(componentRef)}
      > Export as JPG
      </button>
      <button 
        className='button-outline'
        onClick={exportToBase64}
      > Upload
      </button>
    </div>
  )
}

export default DrawingPanel;