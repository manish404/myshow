import BookingsTable from "@/components/booking/BookingsTable";
import { useAuthContext } from "@/contexts/AuthContext";
import { useBookings } from "@/hooks/bookingHooks";


function MyBookings() {
    const { user: { user: { id } } } = useAuthContext();
    const { data: mybookings } = useBookings(id);

    return (
        <div className="overflow-y-auto h-[100%]">
            <BookingsTable bookings={mybookings} />
        </div>
    )
}

export default MyBookings;