export type MovieType = {
  Key: number,
  Title: string,
  Genre: string[],
  Actors: string[],
  Year: number,
  Runtime: number,
  Revenue: number
}
export type MoviePropsType = {
    movie: MovieType,
}

export type ActorPropsType = {
    actors: string[]
}

export type GenrePropsType = {
    genres: string[]
}

export type AllMoviesType = {
    Key: number,
    Title: string,
    Year: number
}
export type ListPropsType = {
    movies: AllMoviesType[],
    yearSelected: boolean
}
export type ActorSelectorPropsType = {
    searchActor: (name: string | null) => void
}

export type YearSelectPropsType = {
    searchYear: (name: number | null) => void
}
