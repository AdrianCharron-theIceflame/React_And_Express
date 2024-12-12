"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const movies_json_1 = __importDefault(require("./data/movies.json"));
const app = (0, express_1.default)();
const PORT = 8888;
const WEBROOT = path_1.default.join(__dirname, `client`, `build`);
const a2Headers = [`H30`, `Assignment 2`];
app.use(express_1.default.static(WEBROOT, {
    setHeaders(res, path, stat) {
        res.setHeader(...a2Headers);
    },
}));
app.route(`/movies/:id?`).get((req, res) => {
    res.setHeader(...a2Headers);
    if (req.params.id) {
        let foundMovie = movies_json_1.default.find((el) => el.Key === Number(req.params.id));
        if (foundMovie) {
            res.json(foundMovie);
        }
        else {
            res.status(404)
                .end(`<h1>Movie Not Found</h1>`);
        }
    }
    else {
        let allMovies = movies_json_1.default.map(movie => {
            return createMovieObject(movie);
        }).sort((movie, movie2) => movie.Title.localeCompare(movie2.Title));
        res.json(allMovies);
    }
});
app.route(`/actors/:name`).get((req, res) => {
    let actorName = req.params.name.toLowerCase();
    actorName.replaceAll(`+`, " ");
    let actorRegex = new RegExp(actorName, "i");
    res.setHeader(...a2Headers);
    let actorMovies = new Array(0);
    movies_json_1.default.forEach(movie => {
        if (movie.Actors.find(actor => actorRegex.test(actor)))
            actorMovies.push(createMovieObject(movie));
    });
    actorMovies.sort((el, el2) => el.Title.localeCompare(el2.Title));
    res.json(actorMovies);
});
app.route(`/years/:year`).get((req, res) => {
    res.setHeader(...a2Headers);
    let yearMovies = new Array(0);
    let year = Number(req.params.year);
    movies_json_1.default.forEach(movie => {
        if (movie.Year === year)
            yearMovies.push(createMovieObject(movie));
    });
    yearMovies.sort((el1, el2) => el1.Title.localeCompare(el2.Title));
    res.json(yearMovies);
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
/**
 * Converts a movie object to one with only the key, title and year
 * @param movie the movie object passed in from the JSON file
 * @returns a smaller movie object with "Key", "Year", and "Title"
 */
function createMovieObject(movie) {
    return {
        "Key": movie.Key,
        "Title": movie.Title,
        "Year": movie.Year
    };
}
