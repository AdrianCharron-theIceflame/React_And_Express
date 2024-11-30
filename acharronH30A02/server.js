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
app.use(express_1.default.static(WEBROOT));
app.route(`/movies/:id?`).get((req, res) => {
    res.setHeader(`H30`, `Assignment 2`);
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
            return {
                "Key": movie.Key,
                "Title": movie.Title,
                "Year": movie.Year
            };
        }).sort((movie, movie2) => movie.Title.localeCompare(movie2.Title));
        res.json(allMovies);
    }
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
