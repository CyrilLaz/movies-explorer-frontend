import { useEffect } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movie.css';

function Movie({ paginator, setSearchInputs, setArray, nextState, isPaginator, ...props }) {

  useEffect(() => {
    setArray(JSON.parse(localStorage.getItem('searchMovies'))||[]);
    setSearchInputs(JSON.parse(localStorage.getItem('searchInputs'))||{});
  }, [setSearchInputs, setArray]);

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
        handleCard={props.handleSave}
        isPreloader={props.isPreloader}
        isPaginator={isPaginator}
        nextStep={nextState}
        isEmpty={props.isEmpty}
      />
    </main>
  );
}

export default Movie;
