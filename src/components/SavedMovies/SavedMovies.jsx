import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/userContext';
import searcher from '../../utils/searcher';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

import './SavedMovies.css';

function SavedMovies({ setSearchInputs, setCards, ...props }) {
  const { userCards } = useContext(UserContext);
  const [sortedCards, setSortedCards] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    setSearchInputs({});
  }, [setSearchInputs]);


  function onSubmitSearch() {
    const result = searcher(
      userCards,
      '' + props.valueSearch.search,
      props.isShortMovie
    );
    if(result.length > 0) {
      setSortedCards(result);
      setIsEmpty(false);
      return;
    }
   setSortedCards(result);
   setIsEmpty(true);
  }

  return (
    <main className="SavedMovies">
      <SearchForm
        onSubmit={onSubmitSearch}
        onChange={props.onChangeSearch}
        value={props.valueSearch}
        toShowShortMovie={props.toShowShortMovie}
      />
      <MoviesCardList
        isEmpty={isEmpty}
        handleCard={props.handleDelete}
        isLiked={true}
        isSaved={true}
        cards={sortedCards || userCards}
      />
    </main>
  );
}

export default SavedMovies;
