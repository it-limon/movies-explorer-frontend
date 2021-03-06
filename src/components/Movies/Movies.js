import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { lsHelper } from '../../utils/helpers';
import MoviesSearchForm from '../MoviesSearchForm/MoviesSearchForm';
import './Movies.css';

export default function Movies() {
  const movies = useContext(CurrentUserContext).movies;
  const isEmptyResult = useContext(CurrentUserContext).isEmptyResult;

  const getMoviesSettings = useCallback(() => {
    const width = window.innerWidth;

    let startingCounter;
    let moviesPerLine;

    if (width < 768) {
      startingCounter = 5;
      moviesPerLine = 2;
    } else {
      if (width < 1280) {
        startingCounter = 8;
        moviesPerLine = 2;
      } else {
        startingCounter = 12;
        moviesPerLine = 3;
      }
    }

    return {
      startingCounter: lsHelper.moviesCounter() ?? startingCounter,
      moviesPerLine,
    };
  }, []);

  const initialSetting = useMemo(() => getMoviesSettings(), [getMoviesSettings]);
  const [filteredMovies, setFilteredMovies] = useState(movies.slice(0, initialSetting.startingCounter));
  const [moviesSettings, setMoviesSettings] = useState(initialSetting);

  const resizeWindow = useCallback(() => {
    const newMoviesSettings = getMoviesSettings();

    if ((newMoviesSettings.moviesPerLine !== moviesSettings.moviesPerLine) ||
        (newMoviesSettings.startingCounter !== moviesSettings.startingCounter)) {
          setMoviesSettings(newMoviesSettings);
    }
  }, [getMoviesSettings, moviesSettings]);

  useEffect(() => {
    window.addEventListener('resize', resizeWindow);
    return () => window.removeEventListener('resize', resizeWindow);
  }, [resizeWindow]);

  const handleBtnMoreClick = useCallback(() => {
    setFilteredMovies(prevMovies => {
      const newLength = prevMovies.length + moviesSettings.moviesPerLine;
      lsHelper.setMoviesCounter(newLength);
      return [...prevMovies, ...movies.slice(prevMovies.length, newLength)];
    });
  }, [movies, moviesSettings]);

  return (
    <>
      <Header />
      <main>
        <MoviesSearchForm />
        <section className='movies'>
          {isEmptyResult ? (
            <p className='movies__not-found'>???????????? ???? ??????????????</p>
          ) : (
            <MoviesCardList
              movies={filteredMovies}
            />)
          }
          {filteredMovies.length < movies.length && (
            <button className='button movies__button-more' onClick={handleBtnMoreClick}>??????</button>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
