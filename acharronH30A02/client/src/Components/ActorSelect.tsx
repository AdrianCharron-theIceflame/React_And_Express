import { useState } from "react"
import { ActorSelectorPropsType } from "./moviesTypes"
export default function ActorSelect(props: ActorSelectorPropsType) {
    const { searchActor } = props
    const [searchName, setSearchName] = useState(``)
    
    /**
     * Reads for a change event to change the stored name
     * @param e the change event registered to the html input element
     */
    function inputChange(e: React.ChangeEvent<HTMLInputElement>) {
        let name = e.target.value
        if (name.includes(` `)) {
            name.replaceAll(` `, `+`)
        }
        setSearchName(name)
    }

    /**
     * Action performed when the search button is clicked or when enter is clicked on the field
     * @param e is a button click event or an "Enter" key event
     */
    function actionPerformed_searchName(e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) {
        if (e.target instanceof HTMLButtonElement || (e.target instanceof HTMLInputElement && (e as React.KeyboardEvent<HTMLInputElement>).key === "Enter")) {
            if (searchName === ``)
                searchActor(null)
            else
                searchActor(searchName)
        }
    }
    return (
        <div className="actorSelector">
            <label htmlFor="fldActorName">Search for an actors's name: </label><input onChange={inputChange} onKeyDown={actionPerformed_searchName} type="text" name="fldActorName" id="fldActorName" />
            <button onClick={actionPerformed_searchName}>Search</button>
        </div>
    )
}