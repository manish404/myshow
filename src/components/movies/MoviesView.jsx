import MovieCard from "./MovieCard";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import Loader from "../Loader";
import { useMovies } from "@/hooks/movieHooks";

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