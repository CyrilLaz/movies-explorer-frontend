import { NavLink } from 'react-router-dom';
import './SliderNavigation.css';

function SliderNavigation(props) {
  const linkClassName = ({ isActive }) =>
    `my-link slider-navigation__link${
      isActive ? ' slider-navigation__link_active' : ''
    }`;
  const buttonClassName = ({ isActive }) =>
    `my-button slider-navigation__slider-button${
      isActive ? ' slider-navigation__slider-button_active' : ''
    }`;
  const sliderNavigationClassName = `slider-navigation ${
    props.sliderIsOpen ? ' slider-navigation_visible' : ''
  }`;
  const sliderNavigationContainerClassName = `slider-navigation__container${
    props.sliderIsOpen ? ' slider-navigation__container_visible' : ''
  }`;

  return (
    <>
      <div
        onClick={props.toggleSlider}
        className="my-button header__burger"
      ></div>
      <div className={sliderNavigationClassName}>
        <div className={sliderNavigationContainerClassName}>
          <div
            onClick={props.toggleSlider}
            className="my-button slider-navigation__close-button"
          ></div>
          <nav className="slider-navigation__menu">
            <ul className="slider-navigation__list">
              <li className="slider-navigation__menu-item">
                <ul className="slider-navigation__links">
                  <li className="slider-navigation__links-item">
                    <NavLink className={linkClassName} to={'/'}>
                      Главная
                    </NavLink>
                  </li>
                  <li className="slider-navigation__links-item">
                    <NavLink className={linkClassName} to={'/movies'}>
                      Фильмы
                    </NavLink>
                  </li>
                  <li className="slider-navigation__links-item">
                    <NavLink className={linkClassName} to={'/saved-movies'}>
                      Сохранённые фильмы
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="slider-navigation__menu-item">
                <NavLink className={buttonClassName} to={'/profile'}>
                  Аккаунт
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default SliderNavigation;
