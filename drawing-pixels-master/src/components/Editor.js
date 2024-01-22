import React, { useEffect, useState, useContext, createContext } from 'react';
import { ChromePicker  } from 'react-color';
import DrawingPanel from './DrawingPanel';

import '../styles/editor.scss';
export const PenSizeContext = createContext();

function Editor() {
  const [canvasWidth, setCanvasWidth] = useState(64);
  const [canvasHeight, setCanvasHeight] = useState(64);
  const [size, setSize] = useState(10);
  const [penSize, setPenSize] = useState(3);
  const [fill, setFill] = useState(false);
  const [hideOptions, setHideOptions] = useState(false);
  const [hideDrawingCanvas, setHideDrawingCanvas] = useState(true);
  const [selectedColor, setSelectedColor] = useState('#f44336');

  const widthHandler = (e) => {
    setCanvasWidth(e.target.value);
  };

  const heightHandler = (e) => {
    setCanvasHeight(e.target.value);
  };

  const sizeHandler = (e) => {
    setSize(e.target.value);
  };
  const fillHandler = (e) => {
    setFill(e.target.checked);
  };
  const penSizeHandler = (e) => {
    
    setPenSize(e.target.value);
  };

  const initializeCanvas = () => {
    setHideOptions(!hideOptions);
    setHideDrawingCanvas(!hideDrawingCanvas);
  };

  const changeColorHandler = (color) => {
    setSelectedColor(color.hex);
  };

  const handleGoBack = () => {
    setHideOptions(false);
    setHideDrawingCanvas(true);
  };

  useEffect(() => {
    initializeCanvas();
  },[])

  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };
  
  const popover = {
    position: 'absolute',
    zIndex: '2',
  }
  const cover = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  }
  return (
    <div id="editor">
      <h1>Pixel Art Editor</h1>
      {hideDrawingCanvas && <h2>Enter Your Canvas Dimensions</h2>}
      {hideDrawingCanvas && (
      <div id="options">
        <div className='option'>
          <input 
            type='number' 
            className='panelInput' 
            defaultValue={canvasWidth} 
            onChange={widthHandler}
          />
          <span>Width</span>
        </div>
        <div className='option'>
          <input 
            type='number' 
            className='panelInput' 
            defaultValue={canvasHeight} 
            onChange={heightHandler}
          />
          <span>Height</span>
        </div>
      </div> )}

      {hideDrawingCanvas && (
        <button 
          className='button'
          onClick={initializeCanvas}
        > Start Drawing
        </button>
      )}



      {hideOptions && (
        <>
          <button 
            className='button-back'
            onClick={handleGoBack}
          > Go back home
          </button>
          <button onClick={ handleClick }>Pick Color</button>

          { displayColorPicker ? <div style={ popover }>
          <div style={ cover } onClick={ handleClose }/>
            <ChromePicker color={selectedColor} 
            onChangeComplete={changeColorHandler} />
          </div> : null }
          
          <input 
            type='number' 
            className='panelInput' 
            value={size} 
            onChange={sizeHandler}
          />
          <span>Size</span>
          <br />
          <input 
            type='number' 
            className='panelInput' 
            value={penSize} 
            onChange={penSizeHandler}
          />
          <span>PenSize</span>
          <br />
          <input 
            type='checkbox' 
            className='panelInput' 
            value={fill} 
            onChange={fillHandler}
          />
          
          <span>Fill</span>
          <PenSizeContext.Provider value={{penSize,fill}}>
            <DrawingPanel 
              size={size}
              width={canvasWidth}
              height={canvasHeight}
              selectedColor={selectedColor}
            />  
          </PenSizeContext.Provider>
        </>
      )}

    </div> 
  )
}

export default Editor;