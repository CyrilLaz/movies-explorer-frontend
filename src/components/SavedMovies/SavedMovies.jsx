import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';

import './SavedMovies.css';

function SavedMovies(props) {
  return (
    <>
      <main className="SavedMovies">
        <SearchForm {...props} />
        <Preloader handle={props.isPreloaderVisible} />
        <MoviesCardList
          handlerPage={props.handlerPage}
          handlerCard={props.handlerCard}
          isLiked={true}
          isSaved={true}
          cards={props.cards}
        />
      </main>
    </>
  );
}

export default SavedMovies;
