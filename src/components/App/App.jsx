import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import useWindowDimensions from '../../hooks/useWindowDimentions';
import Main from '../Main/Main';
import Api from '../../utils/MainApi';

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
import { user, UserContext } from '../../context/userContext';
import Modal from '../Modal/Modal';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const [sliderIsOpen, setSliderIsOpen] = useState(false);
  const [isShortMovie, setIsShortMovie] = useState(false);
  const [isPreloader, setShowPreloader] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const [isSliderNavigation, setIsSliderNavigation] = useState(width <= 800);
  const [errorMessages, setErrorMessages] = useState({});
  const [isMain, setIsMain] = useState(location.pathname === '/');
  const [isProfile, setIsProfile] = useState(location.pathname === '/profile');
  const [modalSettings, setModalSettings] = useState({
    isOpen: false,
    message:
      'При авторизации произошла ошибка. Токен не передан или передан не в том формате.',
  });
  const [inputs, setInputs] = useState({});

  function registration(e) {
    e.preventDefault();
    console.log(inputs);
  }

  function login(e) {
    e.preventDefault();
    console.log(inputs);
  }

  function openModal() {
    setModalSettings({
      ...modalSettings,
      isOpen: true,
      message: 'Произошло что-то непредвиденное, поворот не туда',
    });
  }

  function closeModal() {
    setModalSettings({ isOpen: false, message: '' });
  }

  function toggleSlider() {
    setSliderIsOpen(!sliderIsOpen);
  }

  useEffect(() => {
    if (isSliderNavigation === true) setSliderIsOpen(false);
  }, [location, isSliderNavigation]); // закрываем слайдер после перехода на другой адрес или после того как слайдер перестал быть нужным

  useEffect(() => {
    setIsSliderNavigation(width <= 800);
  }, [width]);

  useEffect(() => {
    setIsMain(location.pathname === '/');
    setIsProfile(location.pathname === '/profile');
  }, [location.pathname]);

  function toShowShortMovie() {
    setIsShortMovie(!isShortMovie);
  }

  function showPreloader() {
    setShowPreloader(!isPreloader);
  }

  return (
    <UserContext.Provider value={user}>
      <div className="App">
        <div
          className={`App__container${isMain ? ' App__container_main' : ''}`}
        >
          <Modal {...modalSettings} close={closeModal} />
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
                    handlerPage={() => showPreloader()}
                    isShortMovie={isShortMovie}
                    isSliderNavigation={isSliderNavigation}
                    toShowShortMovie={toShowShortMovie}
                    isPreloader={isPreloader}
                    isPaginator={true}
                  />
                }
              />
              <Route
                path="saved-movies"
                element={
                  <SavedMovies
                    cards={savedCards}
                    handlerCard={() => console.log('удалить карточку')}
                    handlerPage={() => showPreloader()}
                    isShortMovie={isShortMovie}
                    toShowShortMovie={toShowShortMovie}
                    isPreloader={isPreloader}
                    isPaginator={false}
                  />
                }
              />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route
              path="/signup"
              element={
                <RegisterWithForm
                  onChange={(e) =>
                    setInputs({ ...inputs, [e.target.name]: e.target.value })
                  }
                  values={{ ...inputs }}
                  onSubmit={registration}
                />
              }
            />
            <Route
              path="/signin"
              element={
                <LoginWithForm
                  onChange={(e) =>
                    setInputs({ ...inputs, [e.target.name]: e.target.value })
                  }
                  values={{ ...inputs }}
                  onSubmit={login}
                />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
