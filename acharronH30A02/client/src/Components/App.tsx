import { useState, useEffect } from 'react';
import '../Styles/App.css';
import List from './List';
import { AllMoviesType } from './List';
import Movie from './Movie';
export type MovieType = {
  Key: number,
  Title: string,
  Genre: string[],
  Actors: string[],
  Year: number,
  Runtime: number,
  Revenue: number
}
function App() {
  const [moviesArr, setMoviesArr] = useState<AllMoviesType[]>(new Array<AllMoviesType>())
  const [selectedMovie, setSelectedMovie] = useState<MovieType | null>(null)
  useEffect(() => {
    (async function () {
      setMoviesArr(await fetch(`/movies`)
        .then(res => res.json())
        .then(data => data)
      )
    })()
  }, [])
  function chooseMovie(id: number | null) {
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
  return (
    <div className='App'>
      {selectedMovie === null ? <List movies={moviesArr} chooseMovie={chooseMovie} /> : <Movie movie={selectedMovie} chooseMovie={chooseMovie} />}

    </div>
  );
}

export default App;
