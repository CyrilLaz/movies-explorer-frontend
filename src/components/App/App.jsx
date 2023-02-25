import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';
import MainNavigation from '../MainNavigation/MainNavigation';
import Movie from '../Movie/Movie';
import MovieNavigation from '../MovieNavigation/MovieNavigation';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="App__container">
        <Header children={MainNavigation} isMain={true} />
        <Main />
        <Footer />

        <Header children={MovieNavigation} />
        <Movie />
        <Footer />
      </div>
    </div>
  );
}

export default App;
