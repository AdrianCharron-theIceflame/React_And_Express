"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const movies_json_1 = __importDefault(require("../data/movies.json"));
const PORT = 8888;
app.route(`/movies/:id?`).get((req, res) => {
    res.setHeader(`H30`, `Assignment 4`);
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
        res.json(movies_json_1.default);
    }
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
