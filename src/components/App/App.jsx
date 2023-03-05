import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import useWindowDimensions from '../../hooks/useWindowDimentions';
import Main from '../Main/Main';

import Movie from '../Movie/Movie';
import SavedMovies from '../SavedMovies/SavedMovies';
import { cards, saved as savedCards } from '../../constants/cards';
import './App.css';
import Profile from '../Profile/Profile';

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
    // хренеово сделанная хрень

    if (width <= 800) {
      setIsSliderNavigation(true);
    } else {
      setIsSliderNavigation(false);
    }
  }, [width]);

  return (
    <div className="App">
      <div className="App__container">
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route
            path="/movies"
            element={
              <Movie
                cards={cards}
                handlerCard={() => console.log('Сохранить мувик')}
                handlerPage={() => console.log('Следующая страница')}
                toggleSlider={toggleSlider}
                sliderIsOpen={sliderIsOpen}
                isShortMovie={isShortMovie}
                isSliderNavigation={isSliderNavigation}
                toShowShortMovie={toShowShortMovie}
                isPreloaderVisible={isPreloaderVisible}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <SavedMovies
                cards={savedCards}
                handlerCard={() => console.log('удалить карточку')}
                handlerPage={() => console.log('Следующая страница')}
                toggleSlider={toggleSlider}
                sliderIsOpen={sliderIsOpen}
                isShortMovie={isShortMovie}
                toShowShortMovie={toShowShortMovie}
                isPreloaderVisible={isPreloaderVisible}
                isSliderNavigation={isSliderNavigation}
              />
            }
          />
          <Route path="/signup" element={<>signup</>} />
          <Route
            path="/profile"
            element={
              <Profile
                toggleSlider={toggleSlider}
                sliderIsOpen={sliderIsOpen}
                isShortMovie={isShortMovie}
                isSliderNavigation={isSliderNavigation}
                name="Васёк"
                email="vas@vasvas.dep"
              />
            }
          />
          <Route path="/signin" element={<>signin</>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
