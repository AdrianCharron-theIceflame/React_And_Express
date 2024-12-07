type GenreProps = {
    genres: string[]
}
export default function Genre(props: GenreProps) {
    const { genres } = props
    if (genres.length === 1) {
        return (
            <p>A {genres[0]} movie</p>
        )
    } else {
        return (
            <>
                <p>Genres:</p>
                <ul>
                    {genres.map((genre, indx) => <li key={indx}>{genre}</li>)}
                </ul>
            </>
        )
    }
}