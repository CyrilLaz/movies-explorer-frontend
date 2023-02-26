import AboutProject from '../AboutProject/AboutProject';
import Promo from '../Promo/Promo';
import Techs from '../Techs/Techs';
import './Main.css';
function Main() {
  return (
    <main className="Main">
      <Promo />
      <AboutProject />
      <Techs />
    </main>
  );
}

export default Main;
