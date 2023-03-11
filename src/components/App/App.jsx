import { useEffect, useState } from 'react';
import { Route, Routes, useLocation} from 'react-router-dom';
import useWindowDimensions from '../../hooks/useWindowDimentions';
import Main from '../Main/Main';

import Movie from '../Movie/Movie';
import SavedMovies from '../SavedMovies/SavedMovies';
import { cards, saved as savedCards } from '../../constants/cards';
import './App.css';
import Profile from '../Profile/Profile';
import SliderNavigation from '../SliderNavigation/SliderNavigation';
import MovieNavigation from '../MovieNavigation/MovieNavigation';
import MainNavigation from '../MainNavigation/MainNavigation';
import RegisterWithForm from '../RegisterWithForm/RegisterWithForm';
import LoginWithForm from '../LoginWithForm/LoginWithForm';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Layout from '../Layout/Layout';

function App() {
  const [sliderIsOpen, setSliderIsOpen] = useState(false);
  const [isShortMovie, setIsShortMovie] = useState(false);
  const [isPreloaderVisible, setShowPreloader] = useState(false);
  const location = useLocation();
  const { width } = useWindowDimensions();
  const [isSliderNavigation, setIsSliderNavigation] = useState(width <= 800);
  const [toggleErrors, setToggleErrors] = useState({
    nameIsError: false,
    emailIsError: false,
    passwordIsError: false,
  });
  const [isMain, setIsMain] = useState(location.pathname === '/');
  const [isProfile, setIsProfile] = useState(location.pathname === '/profile');

  function toggleSlider() {
    setSliderIsOpen(!sliderIsOpen);
  }

  useEffect(() => {
    if (isSliderNavigation === true) setSliderIsOpen(false);
  }, [location, isSliderNavigation]); // закрываем слайдер после перехода на другой адрес или после того как слайдер перестал быть нужным

  useEffect(() => {
    setIsMain(location.pathname === '/');
    setIsProfile(location.pathname === '/profile');
  }, [location.pathname]);

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
      <div className={`App__container${isMain ? ' App__container_main' : ''}`}>
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                header={{
                  children: isMain ? (
                    <MainNavigation />
                  ) : isSliderNavigation ? (
                    <SliderNavigation
                      toggleSlider={toggleSlider}
                      sliderIsOpen={sliderIsOpen}
                    />
                  ) : (
                    <MovieNavigation />
                  ),
                }}
                isMain={isMain}
                isHiddenFooter={isProfile}
              />
            }
          >
            <Route index element={<Main />} />
            <Route
              path="movies"
              element={
                <Movie
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
              path="saved-movies"
              element={
                <SavedMovies
                  cards={savedCards}
                  handlerCard={() => console.log('удалить карточку')}
                  handlerPage={() => console.log('Следующая страница')}
                  isShortMovie={isShortMovie}
                  toShowShortMovie={toShowShortMovie}
                  isPreloaderVisible={isPreloaderVisible}
                />
              }
            />
            <Route
              path="/profile"
              element={<Profile name="Васёк" email="vas@vasvas.dep" />}
            />
          </Route>
          <Route
            path="/signup"
            element={<RegisterWithForm {...toggleErrors} />}
          />
          <Route path="/signin" element={<LoginWithForm {...toggleErrors} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
