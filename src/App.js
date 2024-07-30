import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import ScrollContainer from 'react-indiana-drag-scroll';

function App() {
  const [movies, setMovies] = useState([]);

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=291e653c`;
    const response = await fetch(url);
    const responseJson = await response.json();
    const searchResult = responseJson.Search;
    // if (searchResult.Poster === "N/A") {
    //   setMovies(searchResult)
    // };
    if (searchResult)
      setMovies(searchResult);
    console.log(searchResult);
  };

  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (searchValue.length > 3) {
      getMovieRequest(searchValue);
    }
  }, [searchValue]);

  const [fav, setFav] = useState([]);

  useEffect(() => {
    const movieFav = JSON.parse(localStorage.getItem('fav'));
    if (movieFav) {
      setFav(movieFav);
    }
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('fav', JSON.stringify(items));
  };

  const addFav = (m) => {
    const newList = [...fav, m];
    setFav(newList);
    saveToLocalStorage(newList);
  };

  const removeFav = (m) => {
    const newList = fav.filter(
      (f) => f.imdbID !== m.imdbID
    );

    setFav(newList);
    saveToLocalStorage(newList);
  }

  return (
    <div className='container-fluid movie-app'>
      <div className='row align-items-center my-4'>
        <MovieListHeading heading='Movies' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>

      <ScrollContainer className='row scroll-container'>
        <MovieList movies={movies} handleClick={addFav} addMovie={true} />
      </ScrollContainer>

      <div className='row align-items-center my-4'>
        <MovieListHeading heading='My Favorites' className='myfav' />
      </div>

      <ScrollContainer className='row scroll-container'>
        <MovieList movies={fav} handleClick={removeFav} addMovie={false} />
      </ScrollContainer>

    </div>
  );
}

export default App;