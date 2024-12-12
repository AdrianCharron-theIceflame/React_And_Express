import { useState } from "react"
import { ActorSelectorPropsType } from "./moviesTypes"
export default function ActorSelector(props: ActorSelectorPropsType) {
    const { searchActor } = props
    const [searchName, setSearchName] = useState(``)
    function inputChange(e: React.ChangeEvent<HTMLInputElement>) {
        let name = e.target.value
        if (name.includes(` `)) {
            name.replaceAll(` `, `+`)
        }
        setSearchName(name)
    }
    function actionPerformed_searchActor() {
        if (searchName === ``)
            searchActor(null)
        else
            searchActor(searchName)
    }
    function actionPerformed_enterKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === `Enter`)
            actionPerformed_searchActor()
    }
    return (
        <div className="ActorSelector">
            <label htmlFor="actorName">Search for an actors's name: </label><input onChange={inputChange} onKeyDown={actionPerformed_enterKeyPress} type="text" name="actorName" id="actorName" />
            <button onClick={actionPerformed_searchActor}>Search</button>
        </div>
    )
}