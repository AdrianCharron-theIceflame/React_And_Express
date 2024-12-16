import { useContext } from "react"
import { SelectorContext } from "./Context"
import { ListPropsType } from "./moviesTypes"
export default function List(props: ListPropsType) {
    const { movies, yearSelected, selectedActor, sortTypeChange } = props
    const { chooseMovie } = useContext(SelectorContext)
    return (
        <div className="list">
            <p>{`Sort by: `}
                <select onChange={sortTypeChange} name="sortBy" id="sortBy">
                <option value="title">Title</option>
                <option value="year">Year</option>
            </select>
            </p>
            {yearSelected ? <h2>Year {movies[0].Year}</h2> : selectedActor ? <h2>Search results for:<br />{selectedActor}</h2> : <h2>All Movies</h2>}
            <ul>
                {movies.map(el => (<li key={el.Key} ><a href={`/#${el.Key}`} onClick={() => { chooseMovie(el.Key) }}>{el.Title} {yearSelected ? null : `from ${el.Year}`}</a></li>))}
            </ul>
        </div>
    )
}