import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

import './SavedMovies.css';

function SavedMovies(props) {
  return (
    <>
      <main className="SavedMovies">
        <SearchForm {...props} />
        <MoviesCardList
          handlerPage={props.handlerPage}
          handlerCard={props.handlerCard}
          isLiked={true}
          isSaved={true}
          cards={props.cards}
          isPaginator={props.isPaginator}
        />
      </main>
    </>
  );
}

export default SavedMovies;
