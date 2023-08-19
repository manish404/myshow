import Loader from "../Loader";
import MovieCard from "./MovieCard";
import { useMovies } from "@/hooks/movieHooks";
import ArrowButton from "../buttons/ArrowButton";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/router";

function MoviesView() {
    const { user: { user: { role, id } } } = useAuthContext();
    const { isError, data: movies } = useMovies(id);
    if (isError) {
        const router = useRouter();
        router.push('/');
    }
    return (
        <div>
            <div>
                <ul className="w-screen mt-[2rem] flex flex-row flex-wrap">
                    {movies ?
                        movies.map(
                            (movie, i) => <MovieCard index={i} key={i} movie={movie} />
                        ) :
                        <div className="w-full grid place-items-center">
                            <Loader />
                        </div>
                    }
                </ul>
            </div>
        </div>
    )
}

export default MoviesView;