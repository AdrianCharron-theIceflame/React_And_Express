import { useContext } from "react"
import { SelectorContext } from "./Context"
import { ListPropsType } from "./moviesTypes"
export default function List(props: ListPropsType) {
    const { movies } = props
    const { chooseMovie } = useContext(SelectorContext)
    return (
        <div className="List">
            <ul>
                {movies.map(el => (<li key={el.Key} onClick={() => { chooseMovie(el.Key) }}>{`${el.Title} from ${el.Year}`}</li>))}
            </ul>
        </div>
    )
}