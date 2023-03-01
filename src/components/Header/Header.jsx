import './Header.css';
function Header({ Navigation, isMain, ...props }) {
  return (
    <header className={`header${isMain ? ' main-header' : ''}`}>
      <div className="header__container">
        <div className="header__logo"></div>
        <Navigation {...props}/>
      </div>
    </header>
  );
}

export default Header;
