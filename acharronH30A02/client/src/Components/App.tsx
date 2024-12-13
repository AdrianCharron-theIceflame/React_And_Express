import { useState, useEffect, } from 'react';
import '../Styles/App.css';
import List from './List';
import Movie from './Movie';
import { SelectorContext } from './Context';
import { MovieType, AllMoviesType } from './moviesTypes';
import ActorSelect from './ActorSelect';
import YearSelect from './YearSelect';
function App() {
  const [selectedActor, setSelectedActor] = useState<string | null>(null)
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [moviesArr, setMoviesArr] = useState<AllMoviesType[]>(new Array<AllMoviesType>())
  const [selectedMovie, setSelectedMovie] = useState<MovieType | null>(null)
  useEffect(() => {
    if (selectedActor === null && selectedYear === null) {
      (async function () {
        setMoviesArr(await fetch(`/movies`)
          .then(res => res.json())
          .then(data => data)
        )
      })()
    }
    else if (selectedActor !== null && selectedYear === null)
      (async function () {
        setMoviesArr(await fetch(`/actors/${selectedActor}`)
          .then(res => res.json())
          .then(data => data)
        )
      })()
    else if (selectedActor === null && selectedYear !== null) {
      (async function () {
        setMoviesArr(await fetch(`/years/${selectedYear}`)
          .then(res => res.json())
          .then(data => data)
        )
      })()
    }
  }, [selectedActor, selectedYear])
  /**
   * Sends a fetch request for a movie with the selected id
   * @param id the id to be sent in the fetch request or null for no vies selected
   */
  function chooseMovie(id: number | null = null) {
    if (id !== null)
      (async function () {
        setSelectedMovie(await fetch(`movies/${id}`)
          .then(res => res.json())
          .then(data => data)
        )
      })()
    else
      setSelectedMovie(null)
  }
  /**
   * Sets the name of the actor to be searched for
   * @param name the name of the actor
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

  function searchYear(year: number | null = null) {
    setSelectedMovie(null)
    setSelectedActor(null)
    if (year)
      setSelectedYear(year)
    else setSelectedYear(null)
  }
  return (
    <div className='app'>
      <ActorSelect searchActor={searchActor} />
      <YearSelect searchYear={searchYear} />
      <SelectorContext.Provider value={{ chooseMovie: chooseMovie }}>
        {(selectedMovie === null) && (moviesArr.length > 0) ?
          <List movies={moviesArr} yearSelected={selectedYear !== null} /> :
          (selectedMovie) ?
            <Movie movie={selectedMovie} /> :
            <h2>No movies for {selectedActor && !selectedYear ? `actor: ${selectedActor}` : `year: ${selectedYear}`}</h2>
        }
      </SelectorContext.Provider>
    </div>
  );
}

export default App;
