import './SearchForm.css';

function SearchForm({...props}) {
  // console.log(props.isShortMovie);
  return (
    <form className="search-form">
      <fieldset className="search-form__field search-form__search-container">
        <input type="text" className="search-form__input" maxLength="63" />
        <button
          onClick={(e) => {
            e.preventDefault();
            console.log('submit search');
          }}
          type="submit"
          className="my-button search-form__submit"
        >
          Найти
        </button>
      </fieldset>
      <fieldset className="search-form__field search-form__switch-container">
        <label className="search-form__label">
          <input
            className="search-form__checkbox"
            type="checkbox"
            onChange={()=>props.toShowShortMovie()}
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
