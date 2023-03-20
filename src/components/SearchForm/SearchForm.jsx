import { useState } from 'react';
import './SearchForm.css';

function SearchForm(props) {
  const [isEmptyInput, setIsEmptyInput] = useState(false);
  
  function onSubmit(e) {
    e.preventDefault();
    if (isEmptyInput) return;
    if (!props.value.search || props.value.search === '') {
      setIsEmptyInput(true);
      setTimeout(() => {
        setIsEmptyInput(false);
      }, 2000);
      return;
    }
    props.onSubmit();
  }
  return (
    <form className="search-form" onSubmit={onSubmit} noValidate>
      <fieldset className="search-form__field search-form__search-container">
        <input
          type="text"
          name="search"
          className="search-form__input"
          maxLength="63"
          required
          placeholder="Фильм"
          onChange={props.onChange}
          value={props.value.search || ''}
        />
        <button type="submit" className="my-button search-form__submit">
          Найти
        </button>
      </fieldset>
      <span className="search-form__error">
        {isEmptyInput ? 'Нужно ввести ключевое слово' : ''}
      </span>
      <fieldset className="search-form__field search-form__switch-container">
        <label className="search-form__label">
          <input
            className="search-form__checkbox"
            type="checkbox"
            onChange={() => props.toShowShortMovie()}
            checked={props.isShortMovie}
          />
          <span className="search-form__switcher"></span>
        </label>
        <span className="search-form__text">Короткометражки</span>
      </fieldset>
    </form>
  );
}

export default SearchForm;
