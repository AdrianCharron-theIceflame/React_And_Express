import { useContext } from "react"
import { ListContext } from "./ListContext"
export default function List() {
    const movies = useContext(ListContext)
    return (
        <ul>
            {movies.map(el => (<li key={el.Key}>{`${el.Title} from ${el.Year}`}</li>))}
        </ul>
    )
}