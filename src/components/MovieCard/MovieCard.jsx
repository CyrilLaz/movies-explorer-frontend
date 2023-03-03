import './MovieCard.css';
function MovieCard(props) {
  return (
    <li className="movies-card">
      <figure className="movies-card__container">
        <img
          className="movies-card__picture"
          src={props.link}
          alt={`Картинка с названием "${props.name}"`}
        />
        <figcaption className="movies-card__capture">
          <div className="movies-card__description">
            <h2 className="movies-card__title">{props.name}</h2>
            <span className="movies-card__duration">{props.duration}</span>
          </div>
          <button
            className="movies-card__like movies-card__like_active"
            onClick={() => console.log('Like')}
          ></button>
        </figcaption>
      </figure>
    </li>
  );
}

export default MovieCard;
