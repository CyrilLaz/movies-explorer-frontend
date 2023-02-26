import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';
import MainNavigation from '../MainNavigation/MainNavigation';
import Movie from '../Movie/Movie';
import MovieNavigation from '../MovieNavigation/MovieNavigation';
import './App.css';

function App() {
  const [switcher, setSwitcher] = useState(true);

  return (
    <div className="App">
      <div className="App__container">
        <Header Navigation={MainNavigation} isMain={switcher} />
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route path="/movies" element={<Movie />} />
          {/* <Header children={MovieNavigation} /> */}
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
