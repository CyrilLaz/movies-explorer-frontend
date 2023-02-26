import { Link } from 'react-router-dom';
import "./Promo.css";

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container centred-block">
        <div className="promo__presentation">
          <h1 className="promo__title">
            Учебный проект студента факультета Веб&#8209;разработки.
          </h1>
          <p className="promo__subtitle">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
          <Link to={'/'} className="promo__link">
            Узнать больше
          </Link>
        </div>
        <div className="promo__label"></div>
      </div>
    </section>
  );
}

export default Promo;
