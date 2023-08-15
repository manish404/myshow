import HallView from "@/components/hall/HallView";
import Layout from "@/components/layouts/Layout";
import MovieView from "@/components/movies/MovieView";
import Head from "next/head";
import { useRouter } from "next/router";

function SearchView() {
    const router = useRouter();
    let { type, input } = router.query;
    return (
        <Layout>
            <Head>
                <title>myshow.com | Search ${input}</title>
            </Head>
            <div className="w-[80%] m-auto">
                <div className="text-2xl font-semibold"> Search result for "{input}"!</div>
                <div>
                    {
                        type === 'movie' &&
                        <MovieView type={"search"} slugify={true} movie={input} basic={false} />
                    }
                    {type === 'hall' &&
                        <HallView type={"search"} hallName={input} />
                    }
                </div>
            </div>
        </Layout>
    )
}

export default SearchView;