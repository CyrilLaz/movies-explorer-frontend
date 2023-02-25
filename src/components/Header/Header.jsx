import './Header.css';
function Header({ Navigation, isMain }) {
  return (
    <header className={`header${isMain ? ' main-header' : ''}`}>
      <div className="header__container">
        <div className="header__logo"></div>
        <Navigation/>
      </div>
    </header>
  );
}

export default Header;
