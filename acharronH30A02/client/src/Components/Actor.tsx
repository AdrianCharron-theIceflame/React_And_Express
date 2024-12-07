type ActorProps = {
    actors: string[]
}
export default function Actor(props: ActorProps) {
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