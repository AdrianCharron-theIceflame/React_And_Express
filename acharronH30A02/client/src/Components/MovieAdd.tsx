export default function MovieAdd() {
    return (
        <div className="movieAdd">
            <form action="/movies" method="post">
                <label htmlFor="Title">Movie Title:</label>
                <input type="text" name="Title" id="Title" />
                <label htmlFor="Genre">Genres:</label>
                <input type="text" name="Genre" id="Genre" />
                <label htmlFor="Actors">Actors:</label>
                <input type="text" name="Actors" id="Actors" />
                <label htmlFor="Year">Year:</label>
                <input type="number" name="Year" id="Year" />
                <label htmlFor="Runtime">Runtime:</label>
                <input type="text" name="Runtime" id="Runtime" />
                <label htmlFor="Revenue">Revenue:</label>
                <input type="text" name="Revenue" id="Revenue" />
                <input type="submit" value="Add Movie" />
            </form>
        </div>
    )
}