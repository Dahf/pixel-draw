import Editor from './components/Editor';
import ImageDisplay from './components/ImageDisplay';
import PicturesGallery from './components/PictureGallery';
import './styles/App.scss';

function App() {
  return (
    <div className="App">
      <div className='container'>
      <Editor />
      <ImageDisplay imageId={1} />
      <PicturesGallery />
      </div>
    </div>
  );
}

export default App;
