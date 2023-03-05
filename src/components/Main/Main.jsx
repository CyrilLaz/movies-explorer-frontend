import AboutMe from '../AboutMe/AboutMe';
import AboutProject from '../AboutProject/AboutProject';
import Promo from '../Promo/Promo';
import Techs from '../Techs/Techs';
import Header from '../Header/Header';
import MainNavigation from '../MainNavigation/MainNavigation';
import Footer from '../Footer/Footer';
import './Main.css';

function Main() {
  return (
    <>
      <Header Navigation={MainNavigation} isMain={true} />
      <main className="Main">
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
      </main>
      <Footer />
    </>
  );
}

export default Main;
