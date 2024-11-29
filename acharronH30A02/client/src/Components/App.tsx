import React, { useState, useEffect } from 'react';
import '../Styles/App.css';
import List from './List';

type MoviesJson = {
  "Key": number,
  "Title": string,
  "Genre": string[],
  "Actors": string[],
  "Year": number,
  "Runtime": number,
  "Revenue": number
}[]

function App() {
  const [moviesArr, setMoviesArr] = useState<MoviesJson>()
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
      <List />
    </div>
  );
}

export default App;
