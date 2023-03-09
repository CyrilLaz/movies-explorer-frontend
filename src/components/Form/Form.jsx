import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import './Form.css';

function Form(props) {
  return (
    <div className="form-container">
      <Header isForm={true} />
      <h1 className="form__greeting">{props.greeting}</h1>
      <form onSubmit={props.onSubmit} name={props.formName} className="form">
        <ul className="form__inputs">
          {props.inputs.map((input, index) => (
            <li key={index} className="form__inputs-item">
              <label htmlFor={input.id} className="form__label">
                {input.label}
              </label>
              <input
                {...input}
                className={`form__input ${
                  props[`${input.name}IsError`] ? ' form__input_errored' : ''
                }`}
              />
              <span className={`form__error`}>{props[input.name]}</span>
            </li>
          ))}
        </ul>
        <button className="form__submit-button">{props.button}</button>
      </form>
      <div className="form__entry">
        <span className="form__entry-text">{props.entryText}</span>
        <Link to={props.entryLinkPath} className="form__entry-link">
          {props.entryLinkText}
        </Link>
      </div>
    </div>
  );
}

export default Form;
