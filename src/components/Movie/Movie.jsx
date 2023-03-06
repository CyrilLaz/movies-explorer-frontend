import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import './Movie.css';

function Movie(props) {
  return (
    <>
     {props.header}
      <main className="Movie">
        <SearchForm {...props} />
        <Preloader handle={props.isPreloaderVisible} />
        <MoviesCardList handlerPage={props.handlerPage} handlerCard={props.handlerCard} cards={props.cards} />
      </main>
      <Footer />
    </>
  );
}

export default Movie;
