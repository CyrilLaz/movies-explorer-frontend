import './Header.css';
function Header({ children, isMain }) {
  return (
    <header className={`header${isMain ? ' main-header' : ''}`}>
      <div className="header__container">
        <div className="header__logo"></div>
        {children()}
      </div>
    </header>
  );
}

export default Header;
