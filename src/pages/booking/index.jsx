import Layout from "@/components/layouts/Layout";
import AuthenticatedPage from "@/components/AuthenticatedPage";
import Head from "next/head";
import { useRouter } from "next/router";
import { useHall } from "@/hooks/hallHooks";
import HallInfo from "@/components/hall/HallInfo";
import SeatSelection from "@/components/booking/SeatSelection";
import { useAuthContext } from "@/contexts/AuthContext";
import BookingContextProvider, { useBookingContext } from "@/contexts/BookingContext";
import { useEffect, useState } from "react";

function BookingComponent({ hallID, showID }) {
    const { info: { updateBookingDetails } } = useBookingContext();
    const { data: hall } = useHall(hallID);
    const [showGuide, setShowGuide] = useState(localStorage.getItem('show_guide') === 'false' ? false : true);
    useEffect(() => {
        if (hall) updateBookingDetails('movie', hall?.movies?.slug);
    }, [hall]);
    return (
        <div>
            <HallInfo hall={hall} />
            <div className="my-4">
                <h1 className="font-semibold">
                    Guides
                    <button onClick={() => {
                        const update = showGuide ? false : true;
                        localStorage.setItem('show_guide', update);
                        setShowGuide(update);
                    }}>
                        {showGuide ?
                            <i className="bi bi-caret-up-fill"></i>
                            :
                            <i className="bi bi-caret-down-fill"></i>
                        }
                    </button>
                </h1>
                {showGuide &&
                    <ol className="list-disc guide pl-10 bg-green-50 py-2 rounded-md">
                        <li>[Ctrl+Hover] over the seats or click to select them.</li>
                        <li>Can select/book upto 10 seats.</li>
                        <li>After you book, you must complete payment within 2 minutes.</li>
                    </ol>
                }
            </div>
            {
                hall &&
                <SeatSelection hallID={hallID} hall={hall} showID={showID} />
            }
        </div>
    )
}


// booking.js;
export default function Page() {
    const { user: { user: { id: uid } } } = useAuthContext();
    const router = useRouter();
    const { hall, show } = router.query;
    return (
        <AuthenticatedPage >
            <Head>
                <title>myshow.com | Booking</title>
            </Head>
            <Layout>
                <BookingContextProvider show={show} uid={uid} hall={hall}>
                    <BookingComponent hallID={hall} showID={show} />
                </BookingContextProvider>
            </Layout>
        </AuthenticatedPage>
    )
}