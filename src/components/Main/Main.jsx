import AboutMe from '../AboutMe/AboutMe';
import AboutProject from '../AboutProject/AboutProject';
import Promo from '../Promo/Promo';
import Techs from '../Techs/Techs';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Main.css';

function Main(props) {
  return (
    <>
      {props.header}
      <main className="Main">
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
      </main>
      <Footer isMain={true}/>
    </>
  );
}

export default Main;
