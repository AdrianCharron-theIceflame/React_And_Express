import { useContext } from "react"
import { ListContext } from "./ListContext"
export default function List() {
    const movies = useContext(ListContext)
    return (
        <ul>
            {movies.map(el => (<li key={el.key}>{`${el.title} from ${el.year}`}</li>))}
        </ul>
    )
}