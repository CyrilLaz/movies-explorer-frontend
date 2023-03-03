import { Link, NavLink } from 'react-router-dom';
import './SliderNavigation.css';

function SliderNavigation(props) {
  console.log('render slider');
  return (
    <>
      <div
        onClick={props.toggleSlider}
        className="slider-navigation__burger"
      ></div>
      <div
        className={`slider-navigation__overlay ${
          props.sliderIsOpen ? ' slider-navigation__overlay_visible' : ''
        }`}
      >
        <div
          className={`slider-navigation__container${
            props.sliderIsOpen ? ' slider-navigation__container_visible' : ''
          }`}
        >
          <div
            onClick={props.toggleSlider}
            className="slider-navigation__close-button"
          ></div>
          <nav className="slider-navigation__menu">
            <p className="slider-navigation__header">Главная</p>
            <ul className="slider-navigation__list">
              <li className="slider-navigation__menu-item">
                <ul className="slider-navigation__links">
                  <li className="slider-navigation__links-item">
                    <NavLink className={({isActive})=>`slider-navigation__link${isActive?' slider-navigation__link_active':''}`} to={'/movies'}>
                      Фильмы
                    </NavLink>
                  </li>
                  <li className="slider-navigation__links-item">
                    <NavLink className={({isActive})=>`slider-navigation__link${isActive?' slider-navigation__link_active':''}`} to={'/'}>
                      Сохранённые фильмы
                    </NavLink>
                  </li>
                </ul>
              </li>

              <li className="slider-navigation__menu-item">
                <Link className="slider-navigation__slider-button" to={''}>
                  Аккаунт
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

export default SliderNavigation;
