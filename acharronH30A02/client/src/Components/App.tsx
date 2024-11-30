import { useState, useEffect } from 'react';
import '../Styles/App.css';
import List from './List';
import { ListContext } from './ListContext';

type MoviesJson = {
  "Key": number,
  "Title": string,
  "Genre": string[],
  "Actors": string[],
  "Year": number,
  "Runtime": number,
  "Revenue": number
}

function App() {
  const [moviesArr, setMoviesArr] = useState<MoviesJson[]>(new Array<MoviesJson>())
  useEffect(() => {
    (async function () {
      setMoviesArr(await fetch(`/movies`)
        .then(res => res.json())
        .then(data => data)
      )
    })()
  }, [])
  return (
    <div>
      <ListContext.Provider value={moviesArr.map(el => { return { key:el.Key, title: el.Title, year: el.Year } })}>
        <List />
      </ListContext.Provider>
    </div>
  );
}

export default App;
