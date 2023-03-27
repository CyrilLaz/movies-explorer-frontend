import { useCallback, useEffect, useState } from 'react';
import { isEmail } from 'validator';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
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
import useStateIsSave from '../../hooks/useStateIsSave';
import {paginatorSettings, shortMovieDuration} from '../../constants/appSettings'

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
  const [isPreloader, setShowPreloader] = useState(false);
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
  const [setColumns, setArray, getArray, nextState, isPaginator, resetState] =
    usePaginator(paginatorSettings);
  const [cards, userCards, setCards, setUserCards] = useStateIsSave(); // хук для установки состояний карточек

  const toggleShortMovie = useCallback(
    (array) => {
      return array.filter((item) =>
        searchInputs.isShortMovie ? item.duration <= shortMovieDuration : item
      );
    },
    [searchInputs.isShortMovie]
  );

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
  }, [setUserCards]);

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
      .then(async (res) => {
        if (!res.data) throw res;
        const { data } = await MainApi.getUserMovie();
        setUserCards(data);
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
        setModalSettings({
          isOpen: true,
          message: 'При попытке войти учетную запись произошла ошибка',
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
        setModalSettings({
          isOpen: true,
          message: 'Успешно поменяли свои данные',
          isResponse: true,
        });
        toggleButtonDisable(true);
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
    resetState();
    MoviesApi.getMovieList()
      .then((data) => {
        const movies = searcher(
          data,
          '' + searchInputs.search
        ).map((elem) => {
          elem.thumbnail =
            'https://api.nomoreparties.co' + elem.image.formats.thumbnail.url;
          elem.image = 'https://api.nomoreparties.co' + elem.image.url;
          return elem;
        });
        localStorage.setItem('searchMovies', JSON.stringify(movies));
        localStorage.setItem('searchInputs', JSON.stringify(searchInputs));
        setCards(movies);
      })
      .catch((err) => {
        setModalSettings({
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
      })
      .catch((err) =>
        setModalSettings({
          isOpen: true,
          message: 'Во время запроса произошла ошибка.',
        })
      );
  }

  function handleDelete(card) {
    MainApi.deleteMovie(card._id)
      .then((res) => {
        setUserCards((cards) => cards.filter((c) => c.id !== card.id));
      })
      .catch((err) =>
        setModalSettings({
          isOpen: true,
          message: 'Во время запроса произошла ошибка.',
        })
      );
  }

  function closeModal() {
    setModalSettings({ isOpen: false, message: '', isResponse: false });
  }

  useEffect(() => {
    const filteredCards = toggleShortMovie(cards);
    setIsEmpty(filteredCards.length === 0);
    setArray(filteredCards);
  }, [cards, setArray, toggleShortMovie]);

  useEffect(() => {
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
    if(location.pathname === 'movies')
{    localStorage.setItem(
      'searchInputs',
      JSON.stringify({
        ...searchInputs,
        isShortMovie: state.target.checked,
      })
    );
    setCards(cards); // обновляем до актуального состояние
  }
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
                      <MainNavigation
                        isSliderNavigation={isSliderNavigation}
                        loggedIn={loggedIn}
                      />
                    ) : (
                      <MovieNavigation
                        isSliderNavigation={isSliderNavigation}
                      />
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
                    setCards={setCards}
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
                    toggleShortMovie={toggleShortMovie}
                    loggedIn={loggedIn}
                    setSearchInputs={setSearchInputs}
                    handleDelete={handleDelete}
                    toShowShortMovie={toShowShortMovie}
                    isPreloader={isPreloader}
                    onChangeSearch={(e) => {
                      setSearchInputs({
                        ...searchInputs,
                        [e.target.name]: e.target.value,
                      });
                    }}
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
                loggedIn ? (
                  <Navigate to={'/'} />
                ) : (
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
                )
              }
            />
            <Route
              path="/signin"
              element={
                loggedIn ? (
                  <Navigate to={'/'} />
                ) : (
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
                )
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
