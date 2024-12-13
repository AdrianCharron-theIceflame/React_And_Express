import { useContext } from "react"
import { SelectorContext } from "./Context"
import { ListPropsType } from "./moviesTypes"
export default function List(props: ListPropsType) {
    const { movies, yearSelected } = props
    const { chooseMovie } = useContext(SelectorContext)
    return (
        <div className="list">
            {yearSelected ? <h3>Year {movies[0].Year}</h3> : null}
            <ul>
                {movies.map(el => (<li key={el.Key} onClick={() => { chooseMovie(el.Key) }}>{el.Title} {yearSelected ? null : `from ${el.Year}`}</li>))}
            </ul>
        </div>
    )
}