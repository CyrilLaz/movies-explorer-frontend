import { Link, NavLink } from 'react-router-dom';
import './MovieNavigation.css';
function MovieNavigation() {
  return (
    <nav className="movie-navigation">
      <ul className="movie-navigation__list">
        <li>
          <NavLink className="movie-navigation__link" to={'*'}>
            Фильмы
          </NavLink>
        </li>
        <li>
          <NavLink className="movie-navigation__link" to={'*'}>
            Сохраненные фильмы
          </NavLink>
        </li>
      </ul>
      <Link className="movie-navigation__button">Аккаунт</Link>
    </nav>
  );
}
export default MovieNavigation;
