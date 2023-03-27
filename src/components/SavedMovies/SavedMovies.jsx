import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/userContext';
import searcher from '../../utils/searcher';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

import './SavedMovies.css';

function SavedMovies({
  setSearchInputs,
  toggleShortMovie,
  valueSearch,
  ...props
}) {
  const { userCards } = useContext(UserContext);
  const [sortedCards, setSortedCards] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [cards, setCards] = useState([]);
  const [isSearchMode, setIsSearchMode] = useState(false);

  useEffect(() => {
    setSearchInputs({});
    setCards(userCards);
  }, [setSearchInputs, userCards]);

  function onSubmitSearch() {
    setIsSearchMode(true);
    const result = searcher(userCards, '' + valueSearch.search);
    setCards(result);
  }

  useEffect(() => {
    if (isSearchMode) {
      const filteredCards = toggleShortMovie(cards);
      setIsEmpty(filteredCards.length === 0);
      setSortedCards(filteredCards);
    }
  }, [cards, isSearchMode, toggleShortMovie]);

  return (
    <main className="SavedMovies">
      <SearchForm
        onSubmit={onSubmitSearch}
        onChange={props.onChangeSearch}
        value={valueSearch}
        toShowShortMovie={props.toShowShortMovie}
        isFormInvalid={props.isFormInvalid}
      />
      <MoviesCardList
        isEmpty={isEmpty}
        deleteLike={props.handleDelete}
        isLiked={true}
        isSaved={true}
        cards={sortedCards}
      />
    </main>
  );
}

export default SavedMovies;
