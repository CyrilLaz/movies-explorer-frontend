import { Link } from 'react-router-dom';
import './Header.css';
function Header({ children, isForm, isMain }) {
  return (
    <header className={`header${isMain ? ' main-header' : ''}`}>
      <div
        className={`header__container ${
          isMain ? ' header__container_main' : ''
        }${isForm ? ' header__container_form' : ''}`}
      >
        <Link
          to={'/'}
          className={`header__logo${isForm ? ' header__logo_form' : ''}`}
        ></Link>
        {children}
      </div>
    </header>
  );
}

export default Header;
