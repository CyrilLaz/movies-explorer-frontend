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
import usePaginator from '../../hooks/usePaginator';

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('logged'));
  const [
    handleValidForm,
    errors,
    isButtonDisabled,
    resetForm,
    toggleButtonDisable,
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
  const [isPreloader, setShowPreloader] = useState(false);
  const [userCards, setUserCards] = useState([]);
  const [user, setUser] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const [isSliderNavigation, setIsSliderNavigation] = useState(width <= 800);
  const [countColumn, setCountColumn] = useState(0);
  const [isMain, setIsMain] = useState(location.pathname === '/');
  const [isProfile, setIsProfile] = useState(location.pathname === '/profile');
  const [modalSettings, setModalSettings] = useState({
    isOpen: false,
    message: '',
  });
  const [inputs, setInputs] = useState({});
  const [isEmpty, setIsEmpty] = useState(false);
  const [searchInputs, setSearchInputs] = useState({});
  const [
    setColumns,
    setArray,
    getArray,
    nextState,
    isPaginator,
    resetState,
  ] = usePaginator();

  useEffect(() => {
    setColumns(countColumn);
  }, [countColumn, setColumns]);

  const getInitialData = useCallback(() => {
    Promise.all([MainApi.getUserData(), MainApi.getUserMovie()])
      .then(([userData, userMovie]) => {
        setUser(userData.data);
        setUserCards(userMovie.data);
      })
      .catch((err) => {
        localStorage.removeItem('logged'); // отработка ошибки с токеном
        setLoggedIn(false);
        if (err.status === 400)
          return setModalSettings({
            isOpen: true,
            message:
              'При авторизации произошла ошибка. Токен не передан или передан не в том формате.',
          });
      });
  }, []);

  useEffect(() => {
    getInitialData();
  }, [getInitialData]);

  function onRegister(e) {
    e.preventDefault();
    toggleButtonDisable(true);
    const { name, email, password } = inputs;
    MainApi.register(name, email, password)
      .then((res) => {
        if (!res.data) throw res;
        login(email, password);
      })
      .catch((err) => {
        if (err.status === 409) {
          return setModalSettings({
            isOpen: true,
            message: 'Пользователь с таким email уже существует.',
          });
        }
        setModalSettings({
          isOpen: true,
          message: 'При регистрации пользователя произошла ошибка.',
        });
      });
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
      .catch((err) => {
        if (err.status === 401)
          return setModalSettings({
            isOpen: true,
            message: 'Вы ввели неправильный логин или пароль.',
          });
      });
  }

  function onLogin(e) {
    e.preventDefault();
    toggleButtonDisable(true);
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
        localStorage.removeItem('search');
        localStorage.removeItem('searchMovies');
        localStorage.removeItem('searchInputs');
      })
      .catch((err) => {
        if (err.status === 500) {
          return setModalSettings({
            isOpen: true,
            message: 'На сервере произошла ошибка.',
          });
        }
        setModalSettings({
          isOpen: true,
          message: 'При выходе с учетной записи произошла ошибка',
        });
      });
  }

  function onUpdateUser(name, email, editMode) {
    return MainApi.updateUser(name, email)
      .then(({ data, ...res }) => {
        if (!data) throw res;
        setUser({ ...data });
        editMode(false);
      })
      .catch((err) => {
        if (err.status === 409) {
          return setModalSettings({
            isOpen: true,
            message: 'Пользователь с таким email уже существует.',
          });
        }
        if (err.status === 500) {
          return setModalSettings({
            isOpen: true,
            message: 'На сервере произошла ошибка.',
          });
        }
        setModalSettings({
          isOpen: true,
          message: 'При обновлении профиля произошла ошибка.',
        });
      });
  }

  function searchMovies() {
    setArray([]);
    setShowPreloader(true);
    resetState()
    MoviesApi.getMovieList()
      .then((data) => {
        const movies = searcher(
          data,
          '' + searchInputs.search,
          searchInputs.isShortMovie
        ).map((elem) => {
          elem.thumbnail =
            'https://api.nomoreparties.co' + elem.image.formats.thumbnail.url;
          elem.image = 'https://api.nomoreparties.co' + elem.image.url;
          if (userCards.find((card) => card.id === elem.id)) {
            elem.isLiked = true;
          }
          return elem;
        });

        if (movies.length > 0) {
          setArray(movies);
          setIsEmpty(false);
        } else {
          setArray(movies);
          setIsEmpty(true);
        }
        localStorage.setItem('searchMovies', JSON.stringify(movies));
        localStorage.setItem('searchInputs', JSON.stringify(searchInputs));
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
    MainApi.saveMovie(card)
      .then(({ data }) => {
        setUserCards([...userCards, data]);
        setArray((cards) =>
          cards.map((c) => {
            if (c.id === card.id) {
              c.isLiked = true;
              return c;
            } else {
              return c;
            }
          })
        );
      })
      .catch((err) => console.log(err));
  }

  function handleDelete(card) {
    MainApi.deleteMovie(card._id)
      .then((res) => {
        setUserCards((cards) => cards.filter((c) => c.id !== card.id));
        setArray((cards) =>
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

      .catch((err) => console.log(err));
  }

  function closeModal() {
    setModalSettings({ isOpen: false, message: '' });
  }

  function toggleSlider() {
    setSliderIsOpen(!sliderIsOpen);
  }

  useEffect(() => {
    if (isSliderNavigation === true) setSliderIsOpen(false);
    resetForm();
    setInputs({});
  }, [location, isSliderNavigation, resetForm]); // закрываем слайдер после перехода на другой адрес или после того как слайдер перестал быть нужным

  useEffect(() => {
    setIsSliderNavigation(width <= 800);
    setCountColumn(width > 1065 ? 3 : width > 700 ? 2 : 1);
  }, [width]);

  useEffect(() => {
    setIsMain(location.pathname === '/');
    setIsProfile(location.pathname === '/profile');
  }, [location.pathname]);

  function toShowShortMovie(state) {
    setSearchInputs({
      ...searchInputs,
      isShortMovie: state.target.checked,
    });
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
                      <MainNavigation loggedIn={loggedIn} onLogout={onLogout}/>
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
                    setInputs={setInputs}
                    setSearchInputs={setSearchInputs}
                    setArray={setArray}
                    nextState={nextState}
                    isPaginator={isPaginator}
                    countColumn={countColumn}
                    loggedIn={loggedIn}
                    cards={getArray()}
                    handleSave={handleSave}
                    handleDelete={handleDelete}
                    isSliderNavigation={isSliderNavigation}
                    toShowShortMovie={toShowShortMovie}
                    isPreloader={isPreloader}
                    onSubmitSearch={searchMovies}
                    onChangeSearch={(e) => {
                      setSearchInputs({
                        ...searchInputs,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    valueSearch={searchInputs}
                    isEmpty={isEmpty}
                  />
                }
              />
              <Route
                path="saved-movies"
                element={
                  <ProtectedRoute
                    component={SavedMovies}
                    loggedIn={loggedIn}
                    setSearchInputs={setSearchInputs}
                    handleDelete={handleDelete}
                    toShowShortMovie={toShowShortMovie}
                    isPreloader={isPreloader}
                    onChangeSearch={(e) =>
                      setInputs({ ...inputs, [e.target.name]: e.target.value })
                    }
                    valueSearch={searchInputs}
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
                    toggleButtonDisable={toggleButtonDisable}
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
