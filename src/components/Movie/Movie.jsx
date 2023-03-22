import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movie.css';

function Movie(props) {
  return (
    <main className="Movie">
      <SearchForm
        onSubmit={props.onSubmitSearch}
        onChange={props.onChangeSearch}
        value={props.valueSearch}
        isShortMovie={props.isShortMovie}
        toShowShortMovie={props.toShowShortMovie}
      />
      <MoviesCardList
        cards={props.cards}
        handleCard={props.handleSave}
        isPreloader={props.isPreloader}
        handlerPage={props.handlerPage}
        isPaginator={props.isPaginator}
      />
    </main>
  );
}

export default Movie;
