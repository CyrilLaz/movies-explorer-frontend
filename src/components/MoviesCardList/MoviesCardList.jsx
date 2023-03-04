import MovieCard from '../MovieCard/MovieCard';
import './MoviesCardList.css';

function MoviesCardList(props) {
  return (
    <section className="movies-cards">
      <ul className="movies-cards_list">
        <MovieCard {...props}/>
        <MovieCard {...props}/>
        <MovieCard name = '33 слова о дизайне' link = 'https://cdn.smartfacts.ru/202395/conversions/soyuzniki_0-small.jpg' duration = '128 minute'/>
        <MovieCard {...props}/>
        <MovieCard {...props}/>
        <MovieCard name = '33 слова о дизайне' link = 'https://cdn.smartfacts.ru/202395/conversions/soyuzniki_0-small.jpg' duration = '128 minute'/>
        <MovieCard {...props}/>
        <MovieCard {...props}/>
        <MovieCard {...props}/>
        <MovieCard {...props}/>
        <MovieCard name = '33 слова о дизайне' link = 'https://i.ytimg.com/vi/e8nUcYH0EjA/mqdefault.jpg' duration = '128 minute'/>
        <MovieCard {...props}/>
        <MovieCard {...props}/>
        <MovieCard {...props}/>
      </ul>
      <button className="movies-cards__paginator">Ещё</button>
    </section>
  );
}

export default MoviesCardList;
