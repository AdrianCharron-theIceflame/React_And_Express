import express from "express";
import path from "path";
import movies from "./data/movies.json";
const app = express()
const PORT = 8888
const WEBROOT = path.join(__dirname, `client`, `build`)
const a2Headers: [string, string] = [`H30`, `Assignment 2`]

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
        let allMovies: { "Key": number, "Title": string, "Year": number }[] = movies.map(movie => {
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
    let actorMovies: { "Title": string, "Year": number, "Key": number }[] = new Array(0)
    movies.forEach(movie => {
        if (movie.Actors.find(actor => actorRegex.test(actor)))
            actorMovies.push(createMovieObject(movie))
    })
    actorMovies.sort((el, el2) => el.Title.localeCompare(el2.Title))
    res.json(actorMovies)
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

function createMovieObject(
    movie: {
        Key: number;
        Title: string;
        Genre: string[];
        Actors: string[];
        Year: number;
        Runtime: number;
        Revenue: number;
    }
): { Title: string; Year: number; Key: number; } {
    return {
        "Key": movie.Key,
        "Title": movie.Title,
        "Year": movie.Year
    };
}
