import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movie.css';

function Movie(props) {
  return (
    <main className="Movie">
      <SearchForm {...props} />
      <MoviesCardList
        cards={props.cards}
        handlerCard={props.handlerCard}
        isPreloader={props.isPreloader}
        handlerPage={props.handlerPage}
        isPaginator={props.isPaginator}
      />
    </main>
  );
}

export default Movie;
