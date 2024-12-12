import { useState, useEffect, } from 'react';
import '../Styles/App.css';
import List from './List';
import Movie from './Movie';
import { SelectorContext } from './Context';
import { MovieType, AllMoviesType } from './moviesTypes';
import ActorSelector from './ActorSelector';
function App() {
  const [selectedActor, setSelectedActor] = useState<string | null>(null)
  const [moviesArr, setMoviesArr] = useState<AllMoviesType[]>(new Array<AllMoviesType>())
  const [selectedMovie, setSelectedMovie] = useState<MovieType | null>(null)
  useEffect(() => {
    if (selectedActor === null){
      (async function () {
        setMoviesArr(await fetch(`/movies`)
          .then(res => res.json())
          .then(data => data)
        )
      })()
    }
    else
      (async function () {
        setMoviesArr(await fetch(`/actors/${selectedActor}`)
          .then(res => res.json())
          .then(data => data)
        )
      })()
  }, [selectedActor])
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
  function searchActor(name: string | null = null) {
    if (name) {
      if (name.includes(` `))
        name.replace(` `, `+`)
      setSelectedActor(name)
    }
    else setSelectedActor(null)
  }
  return (
    <div className='App'>
      <ActorSelector searchActor={searchActor} />
      <SelectorContext.Provider value={{ chooseMovie: chooseMovie }}>
        {(selectedMovie === null) && (moviesArr.length > 0) ?
          <List movies={moviesArr} /> :
          (selectedMovie) ?
            <Movie movie={selectedMovie} /> :
            <h2>No movies for actor {selectedActor}</h2>
        }
      </SelectorContext.Provider>
    </div>
  );
}

export default App;
