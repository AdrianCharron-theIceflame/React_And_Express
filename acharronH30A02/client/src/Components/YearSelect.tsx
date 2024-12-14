import { useState } from "react"
import { YearSelectPropsType } from "./moviesTypes"
export default function YearSelect(props: YearSelectPropsType) {
    const { searchYear } = props
    const [year, setSearchYear] = useState<number | null>(null)
    const [yearBoundsErr, setYearBoundsErr] = useState<boolean>(false)
    const [yearNaNErr, setYearNaNErr] = useState(false)
    let currentYear = (new Date()).getFullYear()

    /**
     * Reads for a change event to change the stored name
     * @param e the change event registered to the html input element
     */
    function inputChange(e: React.ChangeEvent<HTMLInputElement>) {
        let fldYearIn = e.target.value
        let yearRegX = /^\d+$/
        if (yearRegX.test(fldYearIn)) {
            let year = Number(fldYearIn)
            setYearNaNErr(false)
            if (year >= 1920 && year <= currentYear) {
                setYearBoundsErr(false)
                setSearchYear(year)
            } else {
                setSearchYear(null)
                setYearBoundsErr(true)
            }
        } else {
            if (fldYearIn.length === 0) {
                setYearBoundsErr(false)
                setYearNaNErr(false)
                setSearchYear(null)
            } else {
                setYearBoundsErr(false)
                setYearNaNErr(true)
                setSearchYear(null)
            }
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
            <input onKeyDown={actionPerformed_searchYear} onChange={inputChange} type="text" name="fldYear" id="fldYear" />
            <label className="error">{yearNaNErr ? `* Year must be a number` : yearBoundsErr ? `* Year must be between 1920 and ${currentYear}` : null}</label>
            <button onClick={actionPerformed_searchYear}>Search for Year</button>
        </div>
    )
}