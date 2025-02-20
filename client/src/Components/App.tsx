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
        setMoviesArr(await fetch(`/api/movies`, {
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
        setMoviesArr(await fetch(`/api/actors/${selectedActor}`)
          .then(res => res.json())
          .then(data => data)
        )
      })();
      document.title = `Movies - Actor Name "${selectedActor}"`
    }
    else if (selectedActor === null && selectedYear !== null) {
      (async function () {
        setMoviesArr(await fetch(`/api/years/${selectedYear}`)
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
        setSelectedMovie(await fetch(`/api/movies/${id}`)
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
    setCurrentScreen(main)
    window.scrollTo(0, 0)
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
    setCurrentScreen(main)
    window.scrollTo(0, 0)
  }

  /**
   * Changes the current Screen to 
   * @param e clicking event on "home" or "add a movie" buttons
   */
  function chooseCurrentScreen(e: React.MouseEvent<HTMLButtonElement>) {
    let button = e.target as HTMLButtonElement
    setCurrentScreen(button.value)
    setSelectedActor(null)
    setSelectedYear(null)
    window.scrollTo(0, 0)
  }

  function sortMoviesList(e: React.ChangeEvent<HTMLSelectElement>) {
    let select = e.target as HTMLSelectElement
    let cloneArr = moviesArr.slice()
    if (select.value === `title`)
      cloneArr.sort((mov1, mov2) => {
        return mov1.Title.localeCompare(mov2.Title)
      })
    else if (select.value === `year`)
      cloneArr.sort((mov1, mov2) => {
        if (
          mov1.Year > mov2.Year ||
          (mov1.Year === mov2.Year &&
            mov1.Title.localeCompare(mov2.Title) > 0)
        ) {
          return 1
        } else if (
          mov1.Year < mov2.Year ||
          (mov1.Year === mov2.Year &&
            mov1.Title.localeCompare(mov2.Title) < 0)
        ) {
          return -1
        } else
          return 0
      })
    setMoviesArr(cloneArr)
  }

  return (
    <div className='app'>
      <header>
        <h1>Movie System</h1>
        <div id="search">
          <ActorSelect searchActor={searchActor} />
          <YearSelect searchYear={searchYear} />
        </div>
        <nav>
          <button onClick={chooseCurrentScreen} value={main}>Home</button>
          <button onClick={chooseCurrentScreen} value={form}>Add A Movie</button>
        </nav>
      </header>
      <main>
        {currentScreen === main ?
          <SelectorContext.Provider value={{ chooseMovie: chooseMovie }}>
            {(selectedMovie === null) && (moviesArr.length > 0) ?
              <List movies={moviesArr} yearSelected={selectedYear !== null} selectedActor={selectedActor} sortTypeChange={sortMoviesList} /> :
              (selectedMovie) ?
                <Movie movie={selectedMovie} /> :
                <h2>No movies for {selectedActor && !selectedYear ? `actor: ${selectedActor}` : `year: ${selectedYear}`}</h2>
            }
          </SelectorContext.Provider> :
          <MovieAdd />
        }
      </main>
    </div>
  );
}

export default App;
