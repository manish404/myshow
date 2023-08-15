function MovieSearchBar() {
    // is same to search,
    return (
        <div className="row justify-between w-1/2">
            <label htmlFor="movie_name">Search Movie</label>
            <input className="w-[20rem] border-b-2 outline-none" type="search" name="movie_name" placeholder="Movie Name" />
        </div>
    )
}
function SPMoviesView() {
    return (
        <div>
            SP can see all the movies
            <MovieSearchBar />
        </div>
    )
}

export default SPMoviesView;