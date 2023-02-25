import { Link } from 'react-router-dom';
import './MainNavigation.css';
function MainNavigation() {
  return (
    <nav className="main-navigation">
      <li className="main-navigation__list">
        <ul className="main-navigation__item">
          <Link className='main-navigation__link' to={'/'}>Регистрация</Link>
        </ul>
        <ul className="main-navigation__item">
          <Link className='main-navigation__link main-navigation__link_type_button' to={'/'}>Войти</Link>
        </ul>
      </li>
    </nav>
  );
}
export default MainNavigation;
