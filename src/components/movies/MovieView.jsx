import { useMovie } from "@/hooks/movieHooks";
import Image from "next/image";
import Loader from "../Loader";
import slugify from "slugify";
import Head from "next/head";
import { capitalize } from "@/helpers/string";
import ShowtimesView from "../hall/ShowtimesView";
import { useAuthContext } from "@/contexts/AuthContext";
import println from "@/helpers/print";
import { isSuperAdmin } from "@/helpers/roleCheck";
import { useRouter } from "next/router";
import { deleteMovie } from "@/db/movies";
import { useDispatch } from "react-redux";
import { setNotice } from "@/store/slices/common";

function MovieView({ type, movie: slug_title, slugify: shouldSlugify = false, basic }) {
    if (shouldSlugify) slug_title = slugify(slug_title, { lower: true, strict: true });
    const { user: { user: { id, role } } } = useAuthContext();
    const { data: movieDetails, isLoading, isFetched } = useMovie(id, type === 'search' ? true : false, slug_title);
    const router = useRouter();
    const dispatch = useDispatch();
    return (
        <>
            <Head>
                <title>myshow.com | {capitalize(movieDetails?.title)}</title>
            </Head>
            <div className="w-[80%] m-auto full-page">
                {movieDetails ?
                    <div className="movie-details mt-8 row content-around place-items-start">
                        <div className="">
                            {/* title */}
                            <h1 className="text-2xl font-semibold capitalize row justify-between">{movieDetails?.title}
                                {
                                    isSuperAdmin(role) &&
                                    <button onClick={async () => {
                                        const res = await deleteMovie(movieDetails?.id);
                                        if (res) router.back();
                                        else dispatch(setNotice('Unable to delete!'));
                                    }}><i className="bi bi-trash"></i></button>
                                }
                            </h1>
                            {/* image */}
                            <Image className="my-4 w-auto" height={500} width={500} src={movieDetails?.imageURL} alt={movieDetails?.title} priority={true} />
                            {/* release-date */}
                            <h1 className="font-semibold text-base">Release Date : <span>{movieDetails?.release_date}</span></h1>
                            {/* description */}
                            <p className="p-1 my-2">{movieDetails?.description}</p>
                        </div>
                        {/* shows-time */}
                        <div className="ml-[2.5rem] font-semibold">
                            {!basic &&
                                <ul className="flex">
                                    {movieDetails?.slug &&
                                        <ShowtimesView movie={movieDetails?.slug} />
                                    }
                                </ul>
                            }
                        </div>
                    </div> : isLoading ? <Loader /> :
                        <>{
                            isFetched &&
                            <h1 className="font-semibold text-xl">Movie Not Found!</h1>
                        }
                        </>
                }
            </div>
        </>
    )
}

export default MovieView;