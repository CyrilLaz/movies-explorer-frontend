import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer centred-block">
      <p className="footer__head">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__container">
        <p className="footer__copy">&copy; 2020</p>
        <ul className="footer__list">
          <li className="footer__item">
            <Link className="footer__link" to={'*'}>
              Яндекс.Практикум
            </Link>
          </li>
          <li className="footer__item">
            <Link className="footer__link" to={'*'}>
              Github
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
