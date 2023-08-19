import AuthenticatedPage from "@/components/AuthenticatedPage";
import Layout from "@/components/layouts/Layout";
import MovieCard from "@/components/movies/MovieCard";
import { useAuthContext } from "@/contexts/AuthContext";
import { useSavedMovies } from "@/hooks/movieHooks";

function _SavedMoviesPage() {
    const { user: { user: { id: userId } } } = useAuthContext();
    const { data: savedMovies, error } = useSavedMovies(userId);
    return (
        <Layout>
            {savedMovies ?
                savedMovies.map((movie, i) => {
                    return (<MovieCard key={i} movie={movie} />)
                }) :
                <h1 className="font-semibold text-lg">No movies were saved!</h1>
            }
        </Layout>
    )
}

export default function SavedMoviesPage() {
    return (
        <AuthenticatedPage>
            <_SavedMoviesPage />
        </AuthenticatedPage>
    )
};