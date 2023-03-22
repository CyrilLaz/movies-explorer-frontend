import { useContext, useState } from 'react';
import { UserContext } from '../../context/userContext';
import searcher from '../../utils/searcher';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

import './SavedMovies.css';

function SavedMovies(props) {
  const { userCards } = useContext(UserContext);
  const [sortedCards, setSortedCards] = useState(null);

  function onSubmitSearch() {
    setSortedCards(
      searcher(userCards, '' + props.valueSearch.search, props.isShortMovie)
    );
  }

  return (
    <main className="SavedMovies">
      <SearchForm
        onSubmit={onSubmitSearch}
        onChange={props.onChangeSearch}
        value={props.valueSearch}
        isShortMovie={props.isShortMovie}
        toShowShortMovie={props.toShowShortMovie}
      />
      <MoviesCardList
        handleCard={props.handleDelete}
        isLiked={true}
        isSaved={true}
        cards={sortedCards || userCards}
      />
    </main>
  );
}

export default SavedMovies;
