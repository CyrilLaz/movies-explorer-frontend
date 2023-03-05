import { Link, NavLink } from 'react-router-dom';
import './MovieNavigation.css';

function MovieNavigation() {
  // console.log('render MovieNavigation');
  return (
    <nav className="movie-navigation">
      <ul className="movie-navigation__list">
        <li className="movie-navigation__item">
          <ul className="movie-navigation__links">
            <li>
              <NavLink
                className={({ isActive }) =>
                  `movie-navigation__link${
                    isActive ? ' movie-navigation__link_active' : ''
                  }`
                }
                to={'/movies'}
              >
                Фильмы
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `movie-navigation__link${
                    isActive ? ' movie-navigation__link_active' : ''
                  }`
                }
                to={'/saved-movies'}
              >
                Сохраненные фильмы
              </NavLink>
            </li>
          </ul>
        </li>
        <li className="movie-navigation__item">
          {/* lдиблированная кнопка */}
          <Link className="movie-navigation__button" to={'/profile'}>
            Аккаунт
          </Link>
        </li>
      </ul>
    </nav>
  );
}
export default MovieNavigation;
