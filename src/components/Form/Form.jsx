import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import './Form.css';

function Form(props) {
  return (
    <div className="signing">
      <Header isForm={true} />
      <h1 className="signing__greeting">{props.greeting}</h1>
      <form onSubmit={props.onSubmit} name={props.formName} className="form" noValidate>
        <ul className="form__inputs">
          {props.inputs.map((input, index) => (
            <li key={index} className="form__inputs-item">
              <label htmlFor={input.id} className="form__label">
                {input.label}
              </label>
              <input
                {...input}
                className='form__input'
              />
              <span className={`form__error`}>{props[input.name]}</span>
            </li>
          ))}
        </ul>
        <button className="my-button form__submit-button">{props.button}</button>
      </form>
      <div className="signing__entry">
        <span className="signing__entry-text">{props.entryText}</span>
        <Link to={props.entryLinkPath} className="my-link signing__entry-link">
          {props.entryLinkText}
        </Link>
      </div>
    </div>
  );
}

export default Form;
