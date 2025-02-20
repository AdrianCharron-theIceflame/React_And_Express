import express from "express";
import path from "path";
import moviesJson from "./data/movies.json";
import fs from "fs";

const app = express()
const PORT = 8888
const WEBROOT = path.join(__dirname, `client`, `dist`)
const a2Headers: [string, string] = [`H30`, `Assignment 2`]
const dataRoot = path.join(__dirname, `data`, `movies.json`)

type AllMoviesType = {
    Key: number,
    Title: string,
    Year: number
}

app.use(express.static(WEBROOT, {
    setHeaders(res) {
        res.setHeader(...a2Headers)
    },
}))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.route(`/api/movies/:id?`)
    .get((req, res) => {
        res.setHeader(...a2Headers)
        if (req.params.id) {
            let foundMovie = moviesJson.find((el) => el.Key === Number(req.params.id))
            if (foundMovie) {
                res.json(foundMovie)
            } else {
                res.status(404)
                    .end(`<h1>Movie Not Found</h1>`)
            }
        } else {
            let allMovies: AllMoviesType[] = moviesJson.map(movie => {
                return createMovieObject(movie)
            }).sort((movie, movie2) => movie.Title.localeCompare(movie2.Title))
            res.json(allMovies)
        }
    })
    .post((req, res) => {
        let outStream = fs.createWriteStream(dataRoot)
        let newKey: number = 1
        moviesJson.forEach(movie => {
            if (movie.Key >= newKey)
                newKey = movie.Key + 1
        })
        let newMovie = {
            "Key": newKey,
            "Title": req.body.Title,
            "Genre": req.body.Genre,
            "Actors": req.body.Actors,
            "Year": req.body.Year,
            "Runtime": req.body.Runtime,
            "Revenue": req.body.Revenue
        }
        moviesJson.push(newMovie)
        moviesJson.sort(el => el.Key)
        outStream.write(JSON.stringify(moviesJson), err => {
            if (err) {
                res.status(500).end(`Problem writing to file`)
            }
            else {
                console.log(`Movie Added!!`)
                res.status(200).end(`Movie received and written`)
            }
        })
        outStream.close()
    })

app.route(`/api/actors/:name`).get((req, res) => {
    let actorName = req.params.name.toLowerCase()
    actorName = actorName.replaceAll(`+`, " ")
    let actorRegex = new RegExp(actorName, "i")
    res.setHeader(...a2Headers)
    let actorMovies: AllMoviesType[] = new Array(0)
    moviesJson.forEach(movie => {
        if (movie.Actors.find(actor => actorRegex.test(actor)))
            actorMovies.push(createMovieObject(movie))
    })
    actorMovies.sort((el, el2) => el.Title.localeCompare(el2.Title))
    res.json(actorMovies)
})

app.route(`/api/years/:year`).get((req, res) => {
    res.setHeader(...a2Headers)
    let yearMovies: AllMoviesType[] = new Array(0)
    let year = Number(req.params.year)
    moviesJson.forEach(movie => {
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
