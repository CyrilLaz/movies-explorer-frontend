import { Link } from 'react-router-dom';
import './MovieCard.css';
function MovieCard(props) {
  const cardButtonClassName = `my-button movies-card__button${
    props.isLiked
      ? props.isSaved
        ? ' movies-card__button_type_remove'
        : ' movies-card__button_type_active-like'
      : ' movies-card__button_type_like'
  }`;

  return (
    <li className="movies-card">
      <figure className="movies-card__container">
        <Link className="movies-card__link" to={props.trailerLink} target='_blank'>
          <img
            className="movies-card__picture"
            src={props.image}
            alt={`Картинка с названием "${props.nameRU}"`}
          />
        </Link>
        <figcaption className="movies-card__capture">
          <div className="movies-card__description">
            <h2 className="movies-card__title">{props.nameRU}</h2>
            <span className="movies-card__duration">{props.duration}</span>
          </div>
          <button
            className={cardButtonClassName}
            onClick={props.handleCard}
          ></button>
        </figcaption>
      </figure>
    </li>
  );
}

export default MovieCard;
