import { useQuery } from "@tanstack/react-query";
import { getMovie, getMovies } from "@/db/movies";

const staleTime = (process.env.NODE_ENV === 'development' ? 20 : 5)
    * 60 * 1000; // cache-time in minutes

const useMovie = (slug_title = null /**slug/title */, movie = null) => {
    const keys = slug_title ?
        [`movie-${slug_title}`] :
        [`movie-${movie.slug}`];
    return useQuery(keys, () => getMovie(slug_title, movie), { staleTime })
}

const useMovies = (releasing_soon = false) => {
    return useQuery(
        [`movies-${releasing_soon ? 'admin' : 'user'}`],
        () => getMovies(releasing_soon),
        { staleTime })
}

export { useMovies, useMovie };