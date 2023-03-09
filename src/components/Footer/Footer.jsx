import { Link } from 'react-router-dom';
import './Footer.css';

function Footer({isMain}) {
  return (
    <footer className="footer">
      <p className="footer__head">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className={`footer__container${isMain?' footer__container_main':''}`}>
        <p className="footer__copy">&copy; 2023</p>
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
