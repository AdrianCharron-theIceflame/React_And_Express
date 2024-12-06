import { useState, useEffect } from 'react';
import '../Styles/App.css';
import List from './List';
import { AllMoviesType } from './List';
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
        <List movies={moviesArr} />
    </div>
  );
}

export default App;
