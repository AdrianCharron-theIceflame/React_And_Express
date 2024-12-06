import { MovieType } from "./App"
type MoviePropsType = {
    movie: MovieType,
    chooseMovie: (id: number | null) => void
}
export default function Movie(props: MoviePropsType) {
    const { movie, chooseMovie } = props
    return (
        <div className="Movie">
            <button onClick={() => chooseMovie(null)}>Back</button>
            <section className="Movie">
                <h2>{movie.Title}: {movie.Year}</h2>
                <p>Movie runtime: {movie.Runtime}</p>
                <p>Revenue: ${(movie.Revenue*1000000).toLocaleString()}</p>
            </section>
        </div>
    )
}