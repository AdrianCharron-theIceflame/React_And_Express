import express from "express";
import path from "path";
import movies from "./data/movies.json";
const app = express()
const PORT = 8888
const WEBROOT = path.join(__dirname, `client`, `build`)

app.use(express.static(WEBROOT))

app.route(`/movies/:id?`).get((req, res) => {
    res.setHeader(`H30`, `Assignment 2`)
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
            return {
                "Key": movie.Key,
                "Title": movie.Title,
                "Year": movie.Year
            }
        }).sort((movie, movie2) => movie.Title.localeCompare(movie2.Title))
        res.json(allMovies)
    }
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})