"use strict";

const express = require(`express`)
const path = require(`path`)
const app = express()
const moviesFile = require(`./data/movies.json`)
const PORT = 8888
const WEBROOT = path.join(__dirname, `client`, `build`)
app.use(express.static(WEBROOT))

app.route(`/movies/:id?`).get((req, res) => {
    res.setHeader(`H30`, `Assignment 4`)
    if (req.params.id) {
        let foundMovie = moviesFile.find((el) => el.Key == req.params.id)
        if (foundMovie) {
            res.json(foundMovie)
        } else {
            res.status(404)
                .end(`<h1>Movie Not Found</h1>`)
        }
    } else {
        res.json(moviesFile)
    }
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})