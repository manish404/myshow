import { useMovie } from "@/hooks/movieHooks";
import Image from "next/image";
import Loader from "../Loader";
import slugify from "slugify";
import Head from "next/head";
import { capitalize } from "@/helpers/string";
import ShowtimesView from "../hall/ShowtimesView";

function MovieView({ type, movie: slug_title, slugify: shouldSlugify, basic }) {
    if (shouldSlugify) slug_title = slugify(slug_title, { lower: true, strict: true });
    const { data: movieDetails } = useMovie(slug_title);

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
                            <h1 className="text-2xl font-semibold capitalize">{movieDetails?.title}</h1>
                            {/* image */}
                            <Image className="my-4" height={500} width={500} src={movieDetails?.imageURL} alt={movieDetails?.title} priority={true} />
                            {/* release-date */}
                            <h1 className="font-semibold text-base">Release Date : <span>{movieDetails?.release_date}</span></h1>
                            {/* description */}
                            <p className="p-1 my-2">{movieDetails?.description}</p>
                        </div>
                        {/* shows-time */}
                        <div className="ml-[2.5rem] font-semibold">
                            {!basic &&
                                <ul className="flex">
                                    {slug_title &&
                                        <ShowtimesView movie={slug_title} />
                                    }
                                </ul>
                            }
                        </div>
                    </div> :
                    <Loader />
                }
            </div>
        </>
    )
}

{/* <li key={i} className="">
                                                    {show.time} &nbsp; {show.day}
                                                </li> */}

export default MovieView;