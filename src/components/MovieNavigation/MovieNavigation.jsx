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
                  `my-link movie-navigation__link${
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
                  `my-link movie-navigation__link${
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
          <NavLink className={({isActive})=>`my-button movie-navigation__button${isActive?' movie-navigation__button_active':''}`} to={'/profile'}>
            Аккаунт
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
export default MovieNavigation;
