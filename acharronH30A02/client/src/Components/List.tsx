export type AllMoviesType = {
    Key: number,
    Title: string,
    Year: number
}
type ListProps = {
    movies: AllMoviesType[],
    chooseMovie: (id: number) => void
}
export default function List(props: ListProps) {
    const { movies, chooseMovie } = props
    return (
        <div className="List">
            <ul>
                {movies.map(el => (<li key={el.Key} onClick={() => { chooseMovie(el.Key) }}>{`${el.Title} from ${el.Year}`}</li>))}
            </ul>
        </div>
    )
}