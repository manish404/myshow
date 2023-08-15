import { useShowTimes } from "@/hooks/showtimeHooks";
import Info from "../Info";
import { useAuthContext } from "@/contexts/AuthContext";
import ShowTimeCard from "./ShowTimeCard";

export default function ShowtimesView({ hallID, movie }) {
    const { data: showTimes, error } = useShowTimes(hallID, movie);
    const { user: { user: { role } } } = useAuthContext();
    // 
    return (
        <div className="my-4">
            <h1 className="w-[10rem] font-semibold row">Show times
                <Info data={"Available show times."} />
            </h1>
            {showTimes &&
                <ul className="flex">
                    {
                        showTimes.map((showTime, i) => (
                            <ShowTimeCard key={i} hallID={hallID || showTime?.hall} showTime={showTime} role={role} />
                        ))
                    }
                </ul>}
            {error &&
                <h1>No show time available!</h1>
            }
        </div>
    )
}