import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movie.css';

function Movie(props) {
  return (
    <main className="Movie">
      <SearchForm {...props} />
      <MoviesCardList
        handlerPage={props.handlerPage}
        handlerCard={props.handlerCard}
        cards={props.cards}
        isPreloader={props.isPreloader}
        isPaginator={props.isPaginator}
      />
    </main>
  );
}

export default Movie;
