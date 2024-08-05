import { useAuthContext } from "@/contexts/AuthContext";
import { useHalls } from "@/hooks/hallHooks";
import println from "@/helpers/print";
import { useEffect, useState } from "react";
import BookingsTable from "@/components/booking/BookingsTable";
import { useBookings } from "@/hooks/bookingHooks";
import TODO from "@/components/TODO";

function BookingsInHall({ hall }) {
    const { data: bookings } = useBookings(null, hall);
    useEffect(() => { }, [hall]);
    return (
        <>
            {bookings?.length > 0 ?
                <div className="overflow-y-auto h-[100%]">
                    <BookingsTable bookings={bookings} />
                </div> :
                <h1 className="font-semibold text-xl">No bookings were done!</h1>
            }
        </>
    )
}

function Bookings() {
    const { user: { user: { id: adminId } } } = useAuthContext();
    const { data: halls } = useHalls(adminId);
    const [hall, setHall] = useState('');
    return (
        <div>
            <>
                <select onChange={(e) => {
                    setHall(e.target.value);
                }} className="capitalize">
                    <option value="">Select hall</option>
                    {halls &&
                        halls.map((hall, i) => {
                            return (
                                <option key={i} value={hall.id}>{hall.name}</option>
                            )
                        })}
                </select>
            </>
            {
                hall ?
                    <BookingsInHall hall={hall} />
                    :
                    <h1 className="font-semibold text-xl">No hall is selected!</h1>
            }
            {/* <TODO todos={[
                'pagination'
            ]} /> */}
        </div>
    )
}

export default Bookings;