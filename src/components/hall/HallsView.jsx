import { useHalls } from "@/hooks/hallHooks";
import HallCard from "./HallCard";
import Loader from "../Loader";

function HallsView({ uid = null, role, cityID = null, limit = null }) {
    const { data: halls } = useHalls(uid, cityID, limit);

    return (
        <div className="w-full full-page">
            <>
            </>
            {halls ?
                <ul className="mt-8 flex flex-wrap">
                    {
                        halls.map((hall, i) => <HallCard role={role} key={i} hall={hall} />)
                    }
                </ul> :
                <div className="w-full grid place-items-center">
                    <Loader />
                </div>
            }
        </div>
    )
}

export default HallsView;