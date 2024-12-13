import { useState, useEffect, } from 'react';
import '../Styles/App.css';
import List from './List';
import Movie from './Movie';
import { SelectorContext } from './Context';
import { MovieType, AllMoviesType } from './moviesTypes';
import ActorSelect from './ActorSelect';
import YearSelect from './YearSelect';
import MovieAdd from './MovieAdd';

const main = `MAIN_PAGE`
const form = `FORM_PAGE`

function App() {
  const [currentScreen, setCurrentScreen] = useState<string | null>(main)
  const [selectedActor, setSelectedActor] = useState<string | null>(null)
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [moviesArr, setMoviesArr] = useState<AllMoviesType[]>(new Array<AllMoviesType>())
  const [selectedMovie, setSelectedMovie] = useState<MovieType | null>(null)
  useEffect(() => {
    if (selectedActor === null && selectedYear === null) {
      (async function () {
        setMoviesArr(await fetch(`/movies`, {
          method: "GET"
        })
          .then(res => res.json())
          .then(data => data)
        )
      })();
      document.title = `Movies - Home`
    }
    else if (selectedActor !== null && selectedYear === null) {
      (async function () {
        setMoviesArr(await fetch(`/actors/${selectedActor}`)
          .then(res => res.json())
          .then(data => data)
        )
      })();
      document.title = `Movies - Actor Name "${selectedActor}"`
    }
    else if (selectedActor === null && selectedYear !== null) {
      (async function () {
        setMoviesArr(await fetch(`/years/${selectedYear}`)
          .then(res => res.json())
          .then(data => data)
        )
      })();
      document.title = `Movies - Year ${selectedYear}`
    }
  }, [selectedActor, selectedYear])

  /**
   * Sends a fetch request for a movie with the selected id
   * @param id the id to be sent in the fetch request or null for no vies selected
   */
  function chooseMovie(id: number | null = null) {
    if (id !== null) {
      (async function () {
        setSelectedMovie(await fetch(`movies/${id}`)
          .then(res => res.json())
          .then(data => data)
        )
      })();
    }
    else {
      setSelectedMovie(null)
      if (selectedActor) {
        document.title = `Movies - Actor Name "${selectedActor}"`
      } else if (selectedYear) {
        document.title = `Movies - Year ${selectedYear}`
      } else {
        document.title = `Movies - Home`
      }
    }
  }

  /**
   * Sets the name of the actor to be searched for
   * @param name a string or null for name of actor to search for
   */
  function searchActor(name: string | null = null) {
    setSelectedMovie(null)
    setSelectedYear(null)
    if (name) {
      if (name.includes(` `))
        name.replace(` `, `+`)
      setSelectedActor(name)
    }
    else setSelectedActor(null)
  }

  /**
   * Sets the year of movies to show
   * @param year a number or null for year of movies to show
   */
  function searchYear(year: number | null = null) {
    setSelectedMovie(null)
    setSelectedActor(null)
    if (year)
      setSelectedYear(year)
    else setSelectedYear(null)
  }

  /**
   * Changes the current Screen to 
   * @param e clicking event on "home" or "add a movie" buttons
   */
  function chooseCurrentScreen(e: React.MouseEvent<HTMLButtonElement>) {
    let button = e.target as HTMLButtonElement
    setCurrentScreen(button.value)
  }

  return (
    <div className='app'>
      <ActorSelect searchActor={searchActor} />
      <YearSelect searchYear={searchYear} />
      <button onClick={chooseCurrentScreen} value={main}>Home</button>
      <button onClick={chooseCurrentScreen} value={form}>Add A Movie</button>
      {currentScreen === main ?
        <SelectorContext.Provider value={{ chooseMovie: chooseMovie }}>
          {(selectedMovie === null) && (moviesArr.length > 0) ?
            <List movies={moviesArr} yearSelected={selectedYear !== null} selectedActor={selectedActor} /> :
            (selectedMovie) ?
              <Movie movie={selectedMovie} /> :
              <h2>No movies for {selectedActor && !selectedYear ? `actor: ${selectedActor}` : `year: ${selectedYear}`}</h2>
          }
        </SelectorContext.Provider> :
        <MovieAdd />
      }
    </div>
  );
}

export default App;
