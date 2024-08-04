import { getShowTimes, getShowTimesByMovie } from "@/db/showtime";
import { useQuery } from "@tanstack/react-query";

const staleTime = (process.env.NODE_ENV === 'development' ? 5 : 1)
    * 60 * 1000; // cache-time in minutes, converted to ms;

export const useShowTimes = (hallID = null, movie = null) => {
    // console.log(`"${movie}"`);
    return useQuery(
        [`show-${hallID}-${movie}`],
        () => hallID ? getShowTimes(hallID, movie) : getShowTimesByMovie(movie),
        { staleTime }
    )
}
