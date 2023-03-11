import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import './Movie.css';

function Movie(props) {
  return (
    <main className="Movie">
      <SearchForm {...props} />
      <Preloader handle={props.isPreloaderVisible} />
      <MoviesCardList
        handlerPage={props.handlerPage}
        handlerCard={props.handlerCard}
        cards={props.cards}
      />
    </main>
  );
}

export default Movie;
