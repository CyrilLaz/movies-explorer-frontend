import useWindowDimensions from '../../hooks/useWindowDimentions';
import Header from '../Header/Header';
import MovieNavigation from '../MovieNavigation/MovieNavigation';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import SliderNavigation from '../SliderNavigation/SliderNavigation.jsx';
import './Movie.css';

function Movie(props) {
  console.log(props);
  const { width } = useWindowDimensions();
  return (
    <>
      <Header
        Navigation={width <= 800 ? SliderNavigation : MovieNavigation}
        isMain={false}
        {...props}
      />
      <main className="Movie">
        <SearchForm {...props}/>
        <Preloader handle={props.isPreloaderVisible}/>
      </main>
    </>
  );
}

export default Movie;
