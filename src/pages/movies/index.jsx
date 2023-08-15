import Layout from "@/components/layouts/Layout";
import { useRouter } from "next/router";
import MoviesView from "@/components/movies/MoviesView";
import MovieView from "@/components/movies/MovieView";
import Head from "next/head";

// 
function MoviesPage() {
    const router = useRouter();
    const { movie } = router.query;

    return (
        <Layout>
            <Head>
                <title>myshow.com | Movies</title>
            </Head>
            {
                movie ?
                    <MovieView movie={movie} />
                    :
                    <>
                        <h1 className="font-semibold text-lg">Movies List</h1>
                        <MoviesView />
                    </>
            }
        </Layout>
    )
}

export default MoviesPage;