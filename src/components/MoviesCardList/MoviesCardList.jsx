import MovieCard from '../MovieCard/MovieCard';
import './MoviesCardList.css';

function MoviesCardList(props) {
  return (
    <section className="movies-cards">
      <ul className="movies-cards_list">
        {props.cards.map((elem, index) => (
          <MovieCard
            handler={props.handlerCard}
            key={index}
            isLiked={props.isLiked}
            isSaved={props.isLiked}
            {...elem}
          />
        ))}
      </ul>
      <button className="my-button movies-cards__paginator" onClick={props.handlerPage}>Ещё</button>
    </section>
  );
}

export default MoviesCardList;
