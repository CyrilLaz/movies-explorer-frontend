import { useCallback, useEffect, useState } from 'react';
import { isEmail } from 'validator';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import useWindowDimensions from '../../hooks/useWindowDimentions';
import Main from '../Main/Main';
import MainApi from '../../utils/MainApi';
import Movie from '../Movie/Movie';
import SavedMovies from '../SavedMovies/SavedMovies';
import './App.css';
import Profile from '../Profile/Profile';
import SliderNavigation from '../SliderNavigation/SliderNavigation';
import MovieNavigation from '../MovieNavigation/MovieNavigation';
import MainNavigation from '../MainNavigation/MainNavigation';
import RegisterWithForm from '../RegisterWithForm/RegisterWithForm';
import LoginWithForm from '../LoginWithForm/LoginWithForm';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Layout from '../Layout/Layout';
import { UserContext } from '../../context/userContext';
import Modal from '../Modal/Modal';
import { useFormValidator } from '../../hooks/useFormValidator';
import ProtectedRoute from '../ProtectedRouter/ProtectedRoute';
import MoviesApi from '../../utils/MoviesApi';
import searcher from '../../utils/searcher';

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('logged'));
  const [
    handleValidForm,
    errors,
    isButtonDisabled,
    resetForm,
    toggleButtonDisabling,
  ] = useFormValidator((e) => {
    // проверка адреса почты с помощью стороннего модуля
    if (e.target.name === 'email') {
      if (!isEmail(e.target.value)) {
        return e.target.setCustomValidity('Не верный формат для адреса почты');
      } else {
        return e.target.setCustomValidity('');
      }
    }
  });
  const [sliderIsOpen, setSliderIsOpen] = useState(false);
  const [isShortMovie, setIsShortMovie] = useState(false);
  const [isPreloader, setShowPreloader] = useState(false);
  const [cards, setCards] = useState([]);
  const [userCards, setUserCards] = useState([]);
  const [user, setUser] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const [isSliderNavigation, setIsSliderNavigation] = useState(width <= 800);

  const [isMain, setIsMain] = useState(location.pathname === '/');
  const [isProfile, setIsProfile] = useState(location.pathname === '/profile');
  const [modalSettings, setModalSettings] = useState({
    isOpen: false,
    message: '',
  });
  const [inputs, setInputs] = useState({});

  const getInitialData = useCallback(() => {
    Promise.all([MainApi.getUserData(), MainApi.getUserMovie()])
      .then(([userData, userMovie]) => {
        setUser(userData.data);
        setUserCards(userMovie.data);
      })
      .catch((err) => {
        localStorage.removeItem('logged'); // отработка ошибки с токеном
        // setLoggedIn(false);
        // setModalSettings({
        //   isOpen: true,
        //   message: 'Что т опроизошло при попытке авторизации',
        // });
      });
  }, []);

  useEffect(() => {
    getInitialData();
  }, [getInitialData]);

  function onRegister(e) {
    e.preventDefault();
    toggleButtonDisabling(true);
    const { name, email, password } = inputs;
    MainApi.register(name, email, password)
      .then((res) => {
        if (!res.data)
          throw new Error('Что т опроизошло при попытке регистрации');
        login(email, password);
      })
      .catch((err) =>
        setModalSettings({
          ...modalSettings,
          isOpen: true,
          message: err.message,
        })
      );
  }

  function login(email, password) {
    return MainApi.login(email, password)
      .then((res) => {
        if (!res.data) throw res;
        setLoggedIn(true);
        localStorage.setItem('logged', JSON.stringify(true));
        setUser(res.data);
        navigate('/movies');
      })
      .catch((err) =>
        setModalSettings({
          ...modalSettings,
          isOpen: true,
          message: err.message,
        })
      );
  }

  function onLogin(e) {
    e.preventDefault();
    toggleButtonDisabling(true);
    const { email, password } = inputs;
    login(email, password);
  }

  function onLogout() {
    return MainApi.logout()
      .then((res) => {
        if (!res) throw res;
        setLoggedIn(false);
        setUser({});
        navigate('/');
      })
      .catch((err) => {
        setModalSettings({
          ...modalSettings,
          isOpen: true,
          message: 'произошло не предвиденное',
        });
      });
  }

  function onUpdateUser(name, email) {
    return MainApi.updateUser(name, email)
      .then(({ data, ...res }) => {
        if (!data) throw res;
        setUser({ ...data });
      })
      .catch((err) => {
        setModalSettings({
          ...modalSettings,
          isOpen: true,
          message: 'произошла ошибка при изменении профиля',
        });
      });
  }

  function searchMovies() {
    setCards([]);
    setShowPreloader(true);
    MoviesApi.getMovieList()
      .then((data) => {
        const movies = searcher(data,''+inputs.search,isShortMovie).map((elem) => {
          elem.thumbnail =
            'https://api.nomoreparties.co' + elem.image.formats.thumbnail.url;
          elem.image = 'https://api.nomoreparties.co' + elem.image.url;
          if(userCards.find((card)=>card.id===elem.id)) {
            elem.isLiked = true;
          }
          return elem;
        });
        setCards(movies);
      })
      .catch((err) => {
        setModalSettings({
          ...modalSettings,
          isOpen: true,
          message:
            'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
        });
      })
      .finally(() => {
        setShowPreloader(false);
      });
  }

  function handleSave(card) {
    delete card.created_at;
    delete card.updated_at;
    delete card.isLiked;
    MainApi.saveMovie(card).then(({ data }) => {
      setUserCards([...userCards, data]);
      setCards((cards) =>
        cards.map((c) => {
          if (c.id === card.id) {
            c.isLiked = true;
            return c;
          } else {
            return c;
          }
        })
      );
    }).catch(err=>console.log(err));
  }

  function handleDelete(card) {
    MainApi.deleteMovie(card._id)
      .then((res) => {
        setUserCards((cards) => cards.filter((c) => c.id !== card.id));
        setCards((cards) =>
          cards.map((c) => {
            if (c.id === card.id) {
              c.isLiked = false;
              return c;
            } else {
              return c;
            }
          })
        );
      })

      .catch(err=>console.log(err));
  }

  function closeModal() {
    setModalSettings({ isOpen: false, message: '' });
  }

  function toggleSlider() {
    setSliderIsOpen(!sliderIsOpen);
  }

  useEffect(() => {
    if (isSliderNavigation === true) setSliderIsOpen(false);
    resetForm(); // !! каждый раз когда меняется адрес будет сбрасываться форма!!! можно сделать лучше ()
    setInputs({});
  }, [location, isSliderNavigation, resetForm]); // закрываем слайдер после перехода на другой адрес или после того как слайдер перестал быть нужным

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
    <UserContext.Provider value={{ user, userCards }}>
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
                      <MainNavigation loggedIn={loggedIn} />
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
                  <ProtectedRoute
                    component={Movie}
                    loggedIn={loggedIn}
                    cards={cards}
                    handleSave={handleSave}
                    handleDelete={handleDelete}
                    isShortMovie={isShortMovie}
                    isSliderNavigation={isSliderNavigation}
                    toShowShortMovie={toShowShortMovie}
                    isPreloader={isPreloader}
                    onSubmitSearch={searchMovies}
                    onChangeSearch={(e) =>
                      setInputs({ ...inputs, [e.target.name]: e.target.value })
                    }
                    valueSearch={inputs}
                  />
                }
              />
              <Route
                path="saved-movies"
                element={
                  <ProtectedRoute
                    component={SavedMovies}
                    loggedIn={loggedIn}
                    handleDelete={handleDelete}
                    isShortMovie={isShortMovie}
                    toShowShortMovie={toShowShortMovie}
                    isPreloader={isPreloader}
                    onSubmitSearch={() =>
                      console.log('поиск среди своих фильмов')
                    }
                    onChangeSearch={(e) =>
                      setInputs({ ...inputs, [e.target.name]: e.target.value })
                    }
                    valueSearch={inputs}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    component={Profile}
                    loggedIn={loggedIn}
                    onLogout={onLogout}
                    handleValidForm={handleValidForm}
                    toggleButtonDisabling={toggleButtonDisabling}
                    onSubmit={onUpdateUser}
                    values={inputs}
                    setInputs={setInputs}
                    {...errors}
                    isButtonDisabled={isButtonDisabled}
                    resetError={resetForm}
                  />
                }
              />
            </Route>
            <Route
              path="/signup"
              element={
                <RegisterWithForm
                  onChange={(e) => {
                    setInputs({ ...inputs, [e.target.name]: e.target.value });
                    handleValidForm(e);
                  }}
                  values={{ ...inputs }}
                  onSubmit={onRegister}
                  {...errors}
                  isButtonDisabled={isButtonDisabled}
                />
              }
            />
            <Route
              path="/signin"
              element={
                <LoginWithForm
                  onChange={(e) => {
                    setInputs({ ...inputs, [e.target.name]: e.target.value });
                    handleValidForm(e);
                  }}
                  values={{ ...inputs }}
                  onSubmit={onLogin}
                  {...errors}
                  isButtonDisabled={isButtonDisabled}
                />
              }
            />
            <Route
              path="*"
              element={
                <ProtectedRoute loggedIn={loggedIn} component={NotFoundPage} />
              }
            />
          </Routes>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
