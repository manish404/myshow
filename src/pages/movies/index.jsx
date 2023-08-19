import Layout from "@/components/layouts/Layout";
import { useRouter } from "next/router";
import MoviesView from "@/components/movies/MoviesView";
import MovieView from "@/components/movies/MovieView";
import Head from "next/head";

// 
function MoviesPage() {
    const router = useRouter();
    const { movie: slug } = router.query;

    return (
        <Layout>
            <Head>
                <title>myshow.com | Movies</title>
            </Head>
            {
                slug ?
                    <MovieView movie={slug} />
                    :
                    <>
                        <MoviesView />
                    </>
            }
        </Layout>
    )
}

export default MoviesPage;