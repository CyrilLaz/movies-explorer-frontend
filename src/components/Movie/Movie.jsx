import { useEffect } from 'react';
import usePaginator from '../../hooks/usePaginator';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movie.css';

function Movie(props) {
  const [
    setColumns,
    setArray,
    getArray,
    nextState,
    isPaginator,
    resetState,
  ] = usePaginator();

  useEffect(() => {
    setColumns(props.countColumn);
  }, [props.countColumn, setColumns]);

  useEffect(() => {
    setArray(props.cards);
  }, [props.cards, setArray]);

  return (
    <main className="Movie">
      <SearchForm
        onSubmit={(submit) => {
          resetState();
          props.onSubmitSearch(submit);
        }}
        onChange={props.onChangeSearch}
        value={props.valueSearch}
        isShortMovie={props.isShortMovie}
        toShowShortMovie={props.toShowShortMovie}
      />
      <MoviesCardList
        cards={getArray()}
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
