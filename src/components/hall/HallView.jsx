import { useHall } from "@/hooks/hallHooks";
import { useRouter } from "next/router";
import { isAdmin } from "@/helpers/roleCheck";
import Loader from "../Loader";
import HallMovieChangeForm from "./HallMovieChangeForm";
import ShowtimesView from "./ShowtimesView";
import ShowtimeForm from "./ShowtimeForm";
import Head from "next/head";
import { capitalize } from "@/helpers/string";
import { useAuthContext } from "@/contexts/AuthContext";
import HallInfo from "./HallInfo";
import println from "@/helpers/print";

function HallView({ type, hallID, hallName }) {
    // println('hello', typeof hallID, hallName);
    const { data: hall, error } = useHall(hallID || hallName);
    const router = useRouter();
    const { user: isFromAdmin } = router.query;
    const { user: { user: { role } } } = useAuthContext();
    // 
    return (
        <>
            <Head>
                {
                    (hall && hall?.movies) &&
                    <title>myshow.com | {hall?.name} | {capitalize(hall?.movies?.title)}</title>
                }
            </Head>
            <div className="col">
                {
                    hall ?
                        <div className="mt-8 m-auto sm:[90%] lg:w-1/2">
                            {/* hall-details */}
                            <HallInfo hall={hall} />
                            {(hall?.movies?.slug) &&
                                <ShowtimesView hallID={hallID || hall?.id} movie={hall?.movies?.slug} />
                            }
                            {/* ADMIN SECTION */}
                            {isFromAdmin && (isAdmin(role) && hall?.movies?.slug) &&
                                <>
                                    <HallMovieChangeForm prevMovie={hall?.movies} hallID={hallID} />
                                    <>
                                        {hall?.movies?.slug &&
                                            <ShowtimeForm hallID={hallID} movie={hall?.movies?.slug} />
                                        }
                                    </>
                                </>
                            }
                        </div> :
                        <Loader />
                }
            </div>
        </>
    )
}

export default HallView;