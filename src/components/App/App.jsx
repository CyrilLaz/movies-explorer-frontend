import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';

import Movie from '../Movie/Movie';
import './App.css';

function App() {
  const [sliderIsOpen, setSliderIsOpen] = useState(false);
  const [isShortMovie, setIsShortMovie] = useState(false);
  const [isPreloaderVisible, setShowPreloader] = useState(false);

  function toggleSlider() {
    setSliderIsOpen(!sliderIsOpen);
  }

  function toShowShortMovie() {
    setIsShortMovie(!isShortMovie);
  }

  function showPreloader() {
    setShowPreloader(!isPreloaderVisible);
  }

  return (
    <div className="App">
      <div className="App__container">
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route
            path="/movies"
            element={
              <Movie
                toggleSlider={toggleSlider}
                sliderIsOpen={sliderIsOpen}
                isShortMovie={isShortMovie}
                toShowShortMovie={toShowShortMovie}
                isPreloaderVisible={isPreloaderVisible}
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
