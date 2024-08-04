import { useQuery } from "@tanstack/react-query";
import { getMovie, getMovies, getSavedMovies } from "@/db/movies";
import println from "@/helpers/print";

const staleTime = (process.env.NODE_ENV === 'development' ? 5 : 1)
    * 60 * 1000; // cache-time in minutes

const useSearchMovie = (input) => {
    println(`Searching "${input}";`);
    return useQuery([`movie-search-${input}`], () => getMovie(null, input), { staleTime: (1 / 3) * 60 * 100 });
}

const useMovie = (userId, searching = false, slug_title = null /**slug/title */, movie = null) => {
    if (searching) return useSearchMovie(slug_title);
    const keys = movie ?
        [`movie-${movie?.slug}`] :
        [`movie-${slug_title}`];
    return useQuery(keys, () => getMovie(userId, slug_title, movie), { staleTime: (1 / 2) * 60 * 1000 })
}

const useMovies = (userId, releasing_soon = false) => {
    return useQuery(
        [`movies-${releasing_soon ? 'admin' : 'user'}`],
        () => getMovies(userId, releasing_soon),
        { staleTime: 2 * 60 * 1000 })
}

const useSavedMovies = (userId) => {
    return useQuery(
        [`movies-saved-${userId}`],
        () => getSavedMovies(userId),
        { staleTime }
    )
}

export { useMovies, useMovie, useSavedMovies };