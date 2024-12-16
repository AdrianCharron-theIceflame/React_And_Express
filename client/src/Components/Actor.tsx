import { ActorPropsType } from "./moviesTypes"
export default function Actor(props: ActorPropsType) {
    const { actors } = props
    return (
        <>
            <p>Stars</p>
            <ul>
                {actors.map((actor, index) => <li key={index}>{actor}</li>)}
            </ul>
        </>
    )
}