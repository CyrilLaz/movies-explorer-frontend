import { NavLink } from 'react-router-dom';
import './SliderNavigation.css';

function SliderNavigation(props) {
  return (
    <>
      <div
        onClick={props.toggleSlider}
        className="my-button slider-navigation__burger"
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
            className="my-button slider-navigation__close-button"
          ></div>
          <nav className="slider-navigation__menu">
            <ul className="slider-navigation__list">
              <li className="slider-navigation__menu-item">
                <ul className="slider-navigation__links">
                  <li className="slider-navigation__links-item">
                    <NavLink className={({isActive})=>`my-link slider-navigation__link${isActive?' slider-navigation__link_active':''}`} to={'/'}>
                    Главная
                    </NavLink>
                  </li>
                  <li className="slider-navigation__links-item">
                    <NavLink className={({isActive})=>`my-link slider-navigation__link${isActive?' slider-navigation__link_active':''}`} to={'/movies'}>
                      Фильмы
                    </NavLink>
                  </li>
                  <li className="slider-navigation__links-item">
                    <NavLink className={({isActive})=>`my-link slider-navigation__link${isActive?' slider-navigation__link_active':''}`} to={'/saved-movies'}>
                      Сохранённые фильмы
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="slider-navigation__menu-item">
                <NavLink className={({isActive})=>`my-button slider-navigation__slider-button${isActive?' slider-navigation__slider-button_active':''}`} to={'/profile'}>
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
