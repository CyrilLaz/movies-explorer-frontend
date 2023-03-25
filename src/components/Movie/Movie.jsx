import { useEffect } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movie.css';

function Movie({ paginator, setSearchInputs, nextState, isPaginator, setCards, ...props }) {

  useEffect(() => {
    setCards(JSON.parse(localStorage.getItem('searchMovies'))||[]);
    setSearchInputs(JSON.parse(localStorage.getItem('searchInputs'))||{});
  }, [setSearchInputs, setCards]);

  return (
    <main className="Movie">
      <SearchForm
        onSubmit={props.onSubmitSearch}
        onChange={props.onChangeSearch}
        value={props.valueSearch}
        toShowShortMovie={props.toShowShortMovie}
      />
      <MoviesCardList
        cards={props.cards}
        putLike={props.handleSave}
        deleteLike={props.handleDelete}
        isPreloader={props.isPreloader}
        isPaginator={isPaginator}
        nextStep={nextState}
        isEmpty={props.isEmpty}
      />
    </main>
  );
}

export default Movie;
