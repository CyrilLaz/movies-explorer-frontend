import { NavLink } from 'react-router-dom';
import './MovieNavigation.css';

function MovieNavigation() {
  const linkClassName = ({ isActive }) =>
    `my-link movie-navigation__link${
      isActive ? ' movie-navigation__link_active' : ''
    }`;
  const buttonClassName = ({ isActive }) =>
    `my-button movie-navigation__button${
      isActive ? ' movie-navigation__button_active' : ''
    }`;
  return (
    <nav className="movie-navigation">
      <ul className="movie-navigation__list">
        <li className="movie-navigation__item">
          <ul className="movie-navigation__links">
            <li>
              <NavLink className={linkClassName} to={'/movies'}>
                Фильмы
              </NavLink>
            </li>
            <li>
              <NavLink className={linkClassName} to={'/saved-movies'}>
                Сохраненные фильмы
              </NavLink>
            </li>
          </ul>
        </li>
        <li className="movie-navigation__item">
          <NavLink className={buttonClassName} to={'/profile'}>
            Аккаунт
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
export default MovieNavigation;
