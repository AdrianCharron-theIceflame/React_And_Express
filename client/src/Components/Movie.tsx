import { useContext } from "react"
import { MoviePropsType } from "./moviesTypes"
import { SelectorContext } from "./Context"
import Actor from "./Actor"
import Genre from "./Genre"
export default function Movie(props: MoviePropsType) {
    const { movie } = props
    const { chooseMovie } = useContext(SelectorContext)
    document.title = `Movies - ${movie.Title}`
    return (
        <div className="movie">
            <button onClick={() => chooseMovie()}>Back</button>
            <section className="Movie">
                <h2>{movie.Title}</h2>
                <p>Year released: {movie.Year}</p>
                <p>Movie runtime: {movie.Runtime}</p>
                <p>Revenue: ${(movie.Revenue * 1000000).toLocaleString()}</p>
                <Actor actors={movie.Actors} />
                <Genre genres={movie.Genre} />
            </section>
        </div>
    )
}