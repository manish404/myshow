import { useMovie } from "@/hooks/movieHooks";
import moment from "moment/moment";
import Image from "next/image";
import Link from "next/link";
import MarkFavouriteButton from "./MarkFavouriteButton";
import { useAuthContext } from "@/contexts/AuthContext";

const fakePoster = `https://fakeimg.pl/300x300/`;

function MovieCard({ index = 1, movie = null, slug = null, basic = true }) {
    /**
     * useMovie here is not needed, but to reduce request to database
     * this way of caching could be the best way!
     */
    const { user: { user: { id: userId } } } = useAuthContext();
    if (slug) {
        ({ data: movie } = useMovie(userId, false, slug));
    } else {
        useMovie(userId, null, movie);
    }
    const priority = index < 5 ? true : false;
    return (
        <>
            {movie &&
                <div className="row">
                    <Link aria-label={`${movie.title} - myshow`} href={`/movies?movie=${movie?.slug}`} >
                        <div className="movie-card">
                            <span className="title">{movie.title}</span>
                            <Image priority={priority} loading={priority ? 'eager' : 'lazy'} src={movie?.imageURL || fakePoster} width={300} height={300} alt={movie.title || 'myshow'} className="w-[350px] h-[200px] my-2"
                                onContextMenu={(e) => e.preventDefault()} />
                            <div className="row items-center justify-between">
                                <span>{moment(movie.release_date).calendar()}</span>
                                {
                                    userId &&
                                    <MarkFavouriteButton userId={userId} movieId={movie.id} isLiked={movie.isLiked} />
                                }
                            </div>
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