import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MovieNavigation from '../MovieNavigation/MovieNavigation';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import SliderNavigation from '../SliderNavigation/SliderNavigation.jsx';
import './SavedMovies.css';

function SavedMovies(props) {
  return (
    <>
      <Header
        Navigation={
          props.isSliderNavigation ? SliderNavigation : MovieNavigation
        }
        isMain={false}
        {...props}
      />
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
      <Footer />
    </>
  );
}

export default SavedMovies;
