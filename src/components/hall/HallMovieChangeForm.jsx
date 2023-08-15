import supabase from "@/db/supabase";
import println from "@/helpers/print";
import { useMovies } from "@/hooks/movieHooks";
import { setNotice } from "@/store/slices/common";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Info from "../Info";
import { capitalize } from "@/helpers/string";

export default function HallMovieChangeForm({ hallID, prevMovie }) {
    let { data: comingMovies } = useMovies(true);
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    /**
     * TODO:
     * onChange : update 'movie' column in hall with movie's slug;
     */
    async function deleteShowTimes() {
        if (hallID && prevMovie.slug) await supabase.from('showtimes')
            .delete().filter(`hall.eq.${hallID}`, `movie.eq.${prevMovie.slug}`);
    }
    async function updateRunningMovie(e) {
        const confirmed = confirm(`Are you sure to change the movie? It will delete all the show-times of "${capitalize(prevMovie.title)}".`)
        if (!confirmed) return;
        await deleteShowTimes(); // removing show-times assigned to this hall for this movie;
        const { value: movie } = e.target;
        const movieName = e.target.options[e.target.selectedIndex].textContent;
        if (hallID && movie) {
            println(`Updating ${movie} @hall#${hallID}`);
            const { data, error } = await supabase.from('halls')
                .upsert(
                    { 'movie': movie },
                    { onConflict: ['movie'] }
                ).eq('id', hallID);
            dispatch(setNotice(`Updated movie:"${movieName}" @hall#${hallID}`));
            queryClient.invalidateQueries(`hall-${hallID}`);
        } else {
            alert('Something went wrong!');
        }
    }
    // 
    return (
        <>
            <div className="mt-4 col">
                <h1 className="text-base font-semibold">
                    Change Running Movie
                    <Info data={`Changing this will remove all the showtimes of movie "${capitalize(prevMovie.title)}".`} />
                </h1>
                <select onChange={updateRunningMovie} value={prevMovie.slug}>
                    <option value="">Select New Movie</option>
                    {/* if movie is not in upcoming-movies-list */}
                    {(comingMovies && !comingMovies.includes(prevMovie.slug)) &&
                        <option value={prevMovie.slug}>{capitalize(prevMovie.title)}</option>
                    }
                    {/* upcoming-movies-options */}
                    {
                        comingMovies &&
                        comingMovies.map((movie, i) => (
                            <option key={i} value={movie.slug}>
                                {capitalize(movie.title)}
                            </option>
                        ))
                    }
                </select>
            </div>
        </>
    )
}