import { useContext } from "react"
import { SelectorContext } from "./Context"
export type AllMoviesType = {
    Key: number,
    Title: string,
    Year: number
}
type ListProps = {
    movies: AllMoviesType[],
}
export default function List(props: ListProps) {
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