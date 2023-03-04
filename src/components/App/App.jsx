import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import useWindowDimensions from '../../hooks/useWindowDimentions';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';

import Movie from '../Movie/Movie';
import './App.css';

function App() {
  const [sliderIsOpen, setSliderIsOpen] = useState(false);
  const [isShortMovie, setIsShortMovie] = useState(false);
  const [isPreloaderVisible, setShowPreloader] = useState(false);
  const [isSliderNavigation, setIsSliderNavigation] = useState(false);

  const { width } = useWindowDimensions();

  function toggleSlider() {
    setSliderIsOpen(!sliderIsOpen);
  }

  function toShowShortMovie() {
    setIsShortMovie(!isShortMovie);
  }

  function showPreloader() {
    setShowPreloader(!isPreloaderVisible);
  }

  useEffect(() => {
    if (width<=800) {
      setIsSliderNavigation(true);
    } else {
      setIsSliderNavigation(false);
    }
  }, [width]);

// console.log(isSliderNavigation);
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
                isSliderNavigation={isSliderNavigation}
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
