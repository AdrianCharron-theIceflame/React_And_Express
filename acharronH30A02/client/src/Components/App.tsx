import { useState, useEffect } from 'react';
import '../Styles/App.css';
import List from './List';
import { ListContext, AllMoviesType } from './ListContext';

function App() {
  const [moviesArr, setMoviesArr] = useState<AllMoviesType[]>(new Array<AllMoviesType>())
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
      <ListContext.Provider value={moviesArr}>
        <List />
      </ListContext.Provider>
    </div>
  );
}

export default App;
