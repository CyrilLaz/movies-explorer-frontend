import { useContext, useEffect } from 'react';
import { UserContext } from '../../context/userContext';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

import './SavedMovies.css';

function SavedMovies(props) {
  const {userCards} = useContext(UserContext);

  return (
      <main className="SavedMovies">
        <SearchForm
          onSubmit={props.onSubmitSearch}
          onChange={props.onChangeSearch}
          value={props.valueSearch}
          isShortMovie={props.isShortMovie}
          toShowShortMovie={props.toShowShortMovie}
        />
        <MoviesCardList
          handleCard = {props.handleDelete}
          isLiked={true}
          isSaved={true}
          cards={userCards}
        />
      </main>
  );
}

export default SavedMovies;
