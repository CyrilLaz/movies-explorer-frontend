import { Link } from 'react-router-dom';
import './MainNavigation.css';
function MainNavigation() {
  return (
    <nav className="main-navigation">
      <ul className="main-navigation__list">
        <li className="main-navigation__item">
          <Link className='main-navigation__link' to={'/signup'}>Регистрация</Link>
        </li>
        <li className="main-navigation__item">
          <Link className='main-navigation__link main-navigation__link_type_button' to={'/movies'}>Войти</Link>
        </li>
      </ul >
    </nav>
  );
}
export default MainNavigation;
