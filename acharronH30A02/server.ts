import express from "express";
import path from "path";
import movies from "./data/movies.json";
const app = express()
const PORT = 8888
const WEBROOT = path.join(__dirname, `client`, `build`)
const a2Headers: [string, string] = [`H30`, `Assignment 2`]

type AllMoviesType = {
    Key: number,
    Title: string,
    Year: number
}

app.use(express.static(WEBROOT, {
    setHeaders(res, path, stat) {
        res.setHeader(...a2Headers)
    },
}))

app.route(`/movies/:id?`).get((req, res) => {
    res.setHeader(...a2Headers)
    if (req.params.id) {
        let foundMovie = movies.find((el) => el.Key === Number(req.params.id))
        if (foundMovie) {
            res.json(foundMovie)
        } else {
            res.status(404)
                .end(`<h1>Movie Not Found</h1>`)
        }
    } else {
        let allMovies: AllMoviesType[] = movies.map(movie => {
            return createMovieObject(movie)
        }).sort((movie, movie2) => movie.Title.localeCompare(movie2.Title))
        res.json(allMovies)
    }
})

app.route(`/actors/:name`).get((req, res) => {
    let actorName = req.params.name.toLowerCase()
    actorName.replaceAll(`+`, " ")
    let actorRegex = new RegExp(actorName, "i")
    res.setHeader(...a2Headers)
    let actorMovies: AllMoviesType[] = new Array(0)
    movies.forEach(movie => {
        if (movie.Actors.find(actor => actorRegex.test(actor)))
            actorMovies.push(createMovieObject(movie))
    })
    actorMovies.sort((el, el2) => el.Title.localeCompare(el2.Title))
    res.json(actorMovies)
})

app.route(`/years/:year`).get((req, res) => {
    res.setHeader(...a2Headers)
    let yearMovies: AllMoviesType[] = new Array(0)
    let year = Number(req.params.year)
    movies.forEach(movie => {
        if (movie.Year === year)
            yearMovies.push(createMovieObject(movie))
    })
    yearMovies.sort((el1, el2) => el1.Title.localeCompare(el2.Title))
    res.json(yearMovies)
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

/**
 * Converts a movie object to one with only the key, title and year
 * @param movie the movie object passed in from the JSON file
 * @returns a smaller movie object with "Key", "Year", and "Title"
 */
function createMovieObject(
    movie: {
        Key: number,
        Title: string,
        Genre: string[],
        Actors: string[],
        Year: number,
        Runtime: number,
        Revenue: number
    }
): AllMoviesType {
    return {
        "Key": movie.Key,
        "Title": movie.Title,
        "Year": movie.Year
    };
}
