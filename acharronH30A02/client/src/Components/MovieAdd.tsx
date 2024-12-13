import { useState } from "react"
import { $$ } from "./Functions"
export default function MovieAdd() {
    document.title = `Movies - Add A Movie`
    // error state variables
    const [titleErr, setTitleErr] = useState(false)
    const [genreErr, setGenreErr] = useState(false)
    const [actorsErr, setActorsErr] = useState(false)
    const [yearNaNErr, setYearNaNErr] = useState(false)
    const [yearBoundsErr, setYearBoundsErr] = useState(false)
    const [runtimeErr, setRuntimeErr] = useState(false)
    const [revenueErr, setRevenueErr] = useState(false)
    const errClass = `err`
    let currentYear = (new Date()).getFullYear()

    function checkIfFieldEmpty(e: React.ChangeEvent<HTMLInputElement>) {
        let id = e.target.id
        checkIfEmpty(id)
    }

    function checkIfEmpty(id: string) {
        let fld = $$(`#${id}`)
        if (fld) {
            switch (id) {
                case `title`:
                    setTitleErr(fld.value.length <= 0)
                    break
                case `genre`:
                    setGenreErr(fld.value.length <= 0)
                    break
                case `actors`:
                    setActorsErr(fld.value.length <= 0)
                    break
                default:
                    console.log(`an unknown input was triggered`)
            }
        } else console.log(`Error finding the title field`)
    }

    function onYearChange() {
        let fldYear = $$(`#year`)
        let yearRegEx = /^\d+$/
        if (fldYear) {
            let input = fldYear.value
            setYearNaNErr(!yearRegEx.test(input))
            let numInput = Number(input)
            setYearBoundsErr(numInput < 1920 || numInput > currentYear)
        }
    }

    function onRuntimeChange() {
        let fldRuntime = $$(`#runtime`)
        let runtimeRegEx = /^\d+$/
        if (fldRuntime) {
            let input = fldRuntime.value
            setRuntimeErr(!runtimeRegEx.test(input))
        }
        return runtimeErr
    }

    function onRevenueChange() {
        let fldRevenue = $$(`#revenue`)
        let revenueRegEx = /^\d+(\.\d+)?$/
        if (fldRevenue) {
            let input = fldRevenue.value
            setRevenueErr(!revenueRegEx.test(input))
        }
        return runtimeErr
    }

    /**
     * Tries to submit the movie to the server
     * @param e form submit event
     */
    function submitMovie(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        checkIfEmpty(`title`)
        checkIfEmpty(`genre`)
        checkIfEmpty(`actors`)
        onYearChange()
        onRuntimeChange()
        onRevenueChange()
        if (!(
            titleErr ||
            genreErr ||
            actorsErr ||
            yearBoundsErr ||
            yearNaNErr ||
            runtimeErr ||
            revenueErr
        )) {
            let arraySplitter = /, ?/
            let title = $$(`#title`)?.value
            let genreIn = $$(`#genre`)?.value
            let genre: string[] | undefined
            if (genreIn)
                genre = genreIn.split(arraySplitter)
            let actorsIn = $$(`#actors`)?.value
            let actors: string[] | undefined
            if (actorsIn)
                actors = actorsIn.split(arraySplitter)
            let yearIn = $$(`#year`)?.value
            let year: number | undefined
            if (yearIn)
                year = Number(yearIn)
            let runtimeIn = $$(`#runtime`)?.value
            let runtime: number | undefined
            if (runtimeIn)
                runtime = Number(runtimeIn)
            let revenueIn = $$(`#revenue`)?.value
            let revenue: number | undefined
            if (revenueIn)
                revenue = Number(revenueIn)
            if (title && genre && actors && year && runtime && revenue) {
                let newMovie = {
                    "Title": title,
                    "Genre": genre,
                    "Actors": actors,
                    "Year": year,
                    "Runtime": runtime,
                    "Revenue": revenue
                };
                (async function () {
                    await fetch(`/movies`, {
                        method: `post`,
                        body: JSON.stringify(newMovie),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                        .then(response => response.json())
                        .then(data => console.log(data))
                        .catch(err => console.log(err))
                })()
            }
        }
    }

    return (
        <div className="movieAdd">
            <form onSubmit={submitMovie}>
                <label htmlFor="title">Movie Title:</label>
                <input className={titleErr ? errClass : ``} onChange={checkIfFieldEmpty} placeholder="Doe" type="text" name="title" id="title" />
                <label className="err">{titleErr ? `* Title cannot be empty` : null}</label>
                <label htmlFor="genre">Genres: (separate multiple with commas ',')</label>
                <input className={genreErr ? errClass : ``} onChange={checkIfFieldEmpty} placeholder="Action, Romance, etc" type="text" name="genre" id="genre" />
                <label className="err">{genreErr ? `* Genre cannot be empty` : null}</label>
                <label htmlFor="actors">Actors: (separate multiple with commas ',')</label>
                <input className={actorsErr ? errClass : ``} onChange={checkIfFieldEmpty} placeholder="John Doe, Jane Doe, etc" type="text" name="actors" id="actors" />
                <label className="err">{actorsErr ? `* Actors cannot be empty` : null}</label>
                <label htmlFor="year">Year:</label>
                <input className={yearBoundsErr || yearNaNErr ? errClass : ``} onChange={onYearChange} placeholder={`${currentYear}`} type="number" name="year" id="year" />
                <label className="err">{yearNaNErr ? `* Year must be a number and cannot be empty` : yearBoundsErr ? `* Year must be between 1920 and ${currentYear}` : null}</label>
                <label htmlFor="runtime">Runtime (in minutes):</label>
                <input className={runtimeErr ? errClass : ``} onChange={onRuntimeChange} placeholder="90" type="text" name="runtime" id="runtime" />
                <label className="err">{runtimeErr ? `* Runtime must be a number and cannot be empty` : null}</label>
                <label htmlFor="revenue">Revenue:</label>
                <input className={revenueErr ? errClass : ``} onChange={onRevenueChange} type="text" name="revenue" id="revenue" />
                <label className="err">{revenueErr ? `* Runtime must be a number and cannot be empty` : null}</label>
                <input type="submit" value="Add Movie" />
            </form>
        </div>
    )
}