import './MovieCard.css';
function MovieCard(props) {

  const cardButtonClassName = `movies-card__button${
    props.isLiked
      ? props.isSaved
        ? ' movies-card__button_type_remove'
        : ' movies-card__button_type_active-like'
      : ' movies-card__button_type_like'
  }`;

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
            className={cardButtonClassName}
            onClick={props.handler}
          ></button>
        </figcaption>
      </figure>
    </li>
  );
}

export default MovieCard;
