import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useMatch } from 'react-router-dom';
import useWindowDimensions from '../../hooks/useWindowDimentions';
import Main from '../Main/Main';

import Movie from '../Movie/Movie';
import SavedMovies from '../SavedMovies/SavedMovies';
import { cards, saved as savedCards } from '../../constants/cards';
import './App.css';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import SliderNavigation from '../SliderNavigation/SliderNavigation';
import MovieNavigation from '../MovieNavigation/MovieNavigation';
import MainNavigation from '../MainNavigation/MainNavigation';
import Header from '../Header/Header';

function App() {
  const [sliderIsOpen, setSliderIsOpen] = useState(false);
  const [isShortMovie, setIsShortMovie] = useState(false);
  const [isPreloaderVisible, setShowPreloader] = useState(false);
  const history = useLocation();
  const { width } = useWindowDimensions();
  const [isSliderNavigation, setIsSliderNavigation] = useState(width <= 800);

  function toggleSlider() {
    setSliderIsOpen(!sliderIsOpen);
  }

  useEffect(() => {
    setSliderIsOpen(false);
    console.log(isSliderNavigation);
  }, [history, isSliderNavigation]);

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
          <Route
            exact
            path="/"
            element={
              <Main
                header={<Header children={<MainNavigation />} isMain={true} />}
              />
            }
          />
          <Route
            path="/movies"
            element={
              <Movie
                header={
                  <Header
                    children={
                      isSliderNavigation ? (
                        <SliderNavigation
                          toggleSlider={toggleSlider}
                          sliderIsOpen={sliderIsOpen}
                        />
                      ) : (
                        <MovieNavigation />
                      )
                    }
                    isMain={false}
                  />
                }
                cards={cards}
                handlerCard={() => console.log('Сохранить мувик')}
                handlerPage={() => console.log('Следующая страница')}
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
                header={
                  <Header
                    children={
                      isSliderNavigation ? (
                        <SliderNavigation
                          toggleSlider={toggleSlider}
                          sliderIsOpen={sliderIsOpen}
                        />
                      ) : (
                        <MovieNavigation />
                      )
                    }
                    isMain={false}
                  />
                }
                cards={savedCards}
                handlerCard={() => console.log('удалить карточку')}
                handlerPage={() => console.log('Следующая страница')}
                isShortMovie={isShortMovie}
                toShowShortMovie={toShowShortMovie}
                isPreloaderVisible={isPreloaderVisible}
              />
            }
          />
          <Route path="/signup" element={<Register />} />
          <Route
            path="/profile"
            element={
              <Profile
                headerChildren={
                  isSliderNavigation ? (
                    <SliderNavigation
                      toggleSlider={toggleSlider}
                      sliderIsOpen={sliderIsOpen}
                    />
                  ) : (
                    <MovieNavigation />
                  )
                }
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
