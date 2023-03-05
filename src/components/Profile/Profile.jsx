import Header from '../Header/Header';
import MovieNavigation from '../MovieNavigation/MovieNavigation';
import SliderNavigation from '../SliderNavigation/SliderNavigation';
import './Profile.css'

function Profile(props) {
  return (
    <>
      <Header
        Navigation={
          props.isSliderNavigation ? SliderNavigation : MovieNavigation
        }
        isMain={false}
        {...props}
      />
      <main className="profile">
        <h1 className="profile__title">{`Привет, ${props.name}!`}</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log('Изменить данные пользователя');
          }}
          className="profile__form"
        >
          <ul className="profile__inputs-list">
            <li className="profile__inputs-item">
              <label htmlFor='name' className="profile__label">Имя</label>
              <input id='name' type="text" defaultValue={props.name} className="profile__input" />
            </li>
            <li className="profile__inputs-item">
              <label htmlFor='email' className="profile__label">E-mail</label>
              <input id='email' type="email" defaultValue={props.email} className="profile__input" />
            </li>
          </ul>
          <button
            type="submit"
            className="profile__button profile__button_type_submit"
          >
            Редактировать
          </button>
        </form>
        <button
          onClick={() => console.log('Выход из аккаунта')}
          className="profile__button profile__button_type_logout"
        >
          Выйти из аккаунта
        </button>
      </main>
    </>
  );
}

export default Profile;
