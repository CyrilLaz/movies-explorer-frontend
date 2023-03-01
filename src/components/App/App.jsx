import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';

import Movie from '../Movie/Movie';
import './App.css';

function App() {
  const [sliderIsOpen, setSliderIsOpen] = useState(false);

  function toggleSlider() {
    setSliderIsOpen(!sliderIsOpen);
  }

  return (
    <div className="App">
      <div className="App__container">
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route
            path="/movies"
            element={
              <Movie toggleSlider={toggleSlider} sliderIsOpen={sliderIsOpen} />
            }
          />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
