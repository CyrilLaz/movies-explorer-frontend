// import { Children } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
function Header({ children, isMain, ...props }) {
  return (
    <header className={`header${isMain ? ' main-header' : ''}`}>
      <div className="header__container">
        <Link to={'/'} className="header__logo"></Link>
        {children}
      </div>
    </header>
  );
}

export default Header;
