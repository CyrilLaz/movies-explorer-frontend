import useWindowDimensions from '../../hooks/useWindowDimentions';
import Header from '../Header/Header';
import MovieNavigation from '../MovieNavigation/MovieNavigation';
import SliderNavigation from '../SliderNavigation/SliderNavigation.jsx';
import './Movie.css';

function Movie(props) {
  const { width } = useWindowDimensions();
  return (
    <>
      <Header
        Navigation={width <= 800 ? SliderNavigation : MovieNavigation}
        isMain={false}
        {...props}
      />
      <main className="Movie">
        <h2>movie</h2>
      </main>
    </>
  );
}

export default Movie;
