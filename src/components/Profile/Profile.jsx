import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import './Profile.css';

function Profile(props) {
  const user = useContext(UserContext);
  return (
    <main className="profile">
      <h1 className="profile__title">{`Привет, ${user.name}!`}</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log('Изменить данные пользователя');
        }}
        className="profile__form"
      >
        <ul className="profile__inputs-list">
          <li className="profile__inputs-item">
            <label htmlFor="name" className="profile__label">
              Имя
            </label>
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={user.name}
              className="profile__input"
            />
            <span className={`profile__input-error`}>{props.name}</span>
          </li>
          <li className="profile__inputs-item">
            <label htmlFor="email" className="profile__label">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={user.email}
              className="profile__input"
            />
            <span className={`profile__input-error`}>{props.email}</span>
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
  );
}

export default Profile;
