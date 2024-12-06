export type AllMoviesType = {
    Key:number,
    Title: string,
    Year: number
}
type ListProps = {
    movies: AllMoviesType[]
}
export default function List(props: ListProps) {
    const {movies} = props
    return (
        <ul>
            {movies.map(el => (<li key={el.Key}>{`${el.Title} from ${el.Year}`}</li>))}
        </ul>
    )
}