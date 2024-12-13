import { useState } from "react"
import { YearSelectPropsType } from "./moviesTypes"
export default function YearSelect(props: YearSelectPropsType) {
    const { searchYear } = props
    const [year, setSearchYear] = useState<number | null>(null)
    const [error, setError] = useState<boolean>(false)

    /**
     * Reads for a change event to change the stored name
     * @param e the change event registered to the html input element
     */
    function inputChange(e: React.ChangeEvent<HTMLInputElement>) {
        let fldYearIn = e.target.value
        let yearRegX = /\d{4}/
        if (yearRegX.test(fldYearIn)) {
            setError(false)
            setSearchYear(Number(fldYearIn))
        } else {
            setError(true)
            setSearchYear(null)
        }
    }

    /**
     * Action performed when the search button is clicked or when enter is clicked on the field
     * @param e is a button click event or an "Enter" key event
     */
    function actionPerformed_searchYear(e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) {
        if (e.target instanceof HTMLButtonElement || (e.target instanceof HTMLInputElement && (e as React.KeyboardEvent<HTMLInputElement>).key === "Enter")) {
            if (year === null)
                searchYear(null)
            else
                searchYear(year)
        }
    }

    return (
        <div className="yearSelect">
            <label htmlFor="fldYear">Search for a specific year: </label>
            <input onKeyDown={actionPerformed_searchYear} onChange={inputChange} type="number" name="fldYear" id="fldYear" />
            {error ? <label className="error">* Invalid year format</label> : null}
            <button onClick={actionPerformed_searchYear}>Search for Year</button>
        </div>
    )
}