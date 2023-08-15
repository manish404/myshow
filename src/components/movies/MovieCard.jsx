import println from "@/helpers/print";
import { useMovie } from "@/hooks/movieHooks";
import moment from "moment/moment";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const fakePoster = `https://fakeimg.pl/300x300/`;

function MovieCard({ index = 1, movie = null, slug = null, basic = true }) {
    /**
     * useMovie here is not needed, but to reduce request to database
     * this way of caching could be the best way!
     */
    if (slug) {
        ({ data: movie } = useMovie(slug));
    } else {
        useMovie(null, movie);
    }
    const priority = index < 4 ? true : false;
    useEffect(() => {
    }, []);
    return (
        <>
            {movie &&
                <div className="row">
                    <Link href={`/movies?movie=${movie.slug}`} >
                        <div className="movie-card">
                            <p className="title">{movie.title}</p>
                            <Image priority={priority} loading={priority ? 'eager' : 'lazy'} src={movie.imageURL || fakePoster} width={300} height={300} alt={movie.title} className="w-[350px] h-[200px] my-2"
                                onContextMenu={(e) => e.preventDefault()} />
                            <p>{moment(movie.release_date).calendar()}</p>
                        </div>
                    </Link>
                    {
                        !basic &&
                        <p>
                            {movie.description}
                        </p>
                    }
                </div>
            }
        </>
    )
}

export default MovieCard;