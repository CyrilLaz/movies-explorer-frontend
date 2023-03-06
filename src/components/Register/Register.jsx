import { Link } from 'react-router-dom';
import './Register.css'

function Register(props) {
  return (
    <>
      <main className="register">
        <Link to={'/'} className="register__logo"></Link>
        <h1 className="register__greeting">Добро пожаловать!</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log('регистрация');
          }}
          className="register__form"
        >
          <ul className="register__inputs">
            <li className="register__inputs-item">
              <label htmlFor="name" className="register__label">
                Имя
              </label>
              <input type="text" id="name" name='name' className="register__input" />
              <span className="register__error">Что-то пошло не так...</span>
            </li>
            <li className="register__inputs-item">
              <label htmlFor="email" className="register__label">
                E-mail
              </label>
              <input type="email" name='email' id="email" className="register__input" />
              <span className="register__error">Что-то пошло не так...</span>
            </li>
            <li className="register__inputs-item">
              <label htmlFor="password" className="register__label">
                Пароль
              </label>
              <input
                type="password"
                id="password"
                name='password'
                defaultValue={'123456789'}
                className="register__input register__input_errored"
              />
              <span className="register__error register__error_visible">Что-то пошло не так...</span>
            </li>
          </ul>
          <button className="register__submit-button">
            Зарегистрироваться
          </button>
        </form>
        <div className="register__entry">
          <span className="register__entry-text">Уже зарегистрированы?</span>
          <Link to={'/signin'} className="register__entry-link">
            Войти
          </Link>
        </div>
      </main>
    </>
  );
}

export default Register;
