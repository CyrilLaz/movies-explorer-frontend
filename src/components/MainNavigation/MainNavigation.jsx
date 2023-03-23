import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import './MainNavigation.css';
function MainNavigation(props) {
  const { user } = useContext(UserContext);
  return (
    <nav className="main-navigation">
      {props.loggedIn ? (
        <ul className="main-navigation__list">
          <li className="main-navigation__item">
            <Link className="my-link main-navigation__link" onClick={props.onLogout}>
              Выйти
            </Link>
          </li>
          <li className="main-navigation__item">
            <Link
              className="my-button main-navigation__link main-navigation__link_type_button"
              to="/movies"
            >
              {`Войти, как ${user.email}`}
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="main-navigation__list">
          <li className="main-navigation__item">
            <Link className="my-link main-navigation__link" to={'/signup'}>
              Регистрация
            </Link>
          </li>
          <li className="main-navigation__item">
            <Link
              className="my-button main-navigation__link main-navigation__link_type_button"
              to="/signin"
            >
              Войти
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
export default MainNavigation;
