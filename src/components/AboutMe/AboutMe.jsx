import { Link } from 'react-router-dom';
import myPhoto from '../../images/my-photo.jpg';
import Portfolio from '../Portfolio/Portfolio';
import './AboutMe.css';

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__header section-header">Студент</h2>
      <div className="about-me__info-container">
        <article className="about-me__biography">
          <h3 className="about-me__name">Виталий</h3>
          <p className="about-me__job">Фронтенд&#8209;разработчик, 30 лет</p>
          <p className="about-me__info">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб&#8209;разработке, начал
            заниматься фриланс&#8209;заказами и ушёл с постоянной работы.
          </p>
          <Link className="about-me__link" to={'*'}>
            Github
          </Link>
        </article>
        <img className='about-me__photo' src={myPhoto} alt="Моя фотография" />
      </div>
      <Portfolio />
    </section>
  );
}

export default AboutMe;