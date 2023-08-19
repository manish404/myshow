import BookingsTable from "@/components/booking/BookingsTable";
import { useAuthContext } from "@/contexts/AuthContext";
import { useBookings } from "@/hooks/bookingHooks";


function MyBookings() {
    const { user: { user: { id } } } = useAuthContext();
    const { data: mybookings } = useBookings(id);
    return (
        <>
            <BookingsTable bookings={mybookings} />
            {/* <table className="w3-table w3-bordered text">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Movie</th>
                    <th>Hall</th>
                    <th>Show</th>
                    <th>Paid?</th>
                    <th>Seats</th>
                </tr>
            </thead>
            <tbody>
                {mybookings &&
                    mybookings.map((booking, i) => {
                        return (
                            <tr key={i}>
                                <td>{booking?.date}</td>
                                <td className="capitalize">{booking?.movies?.title}</td>
                                <td className="capitalize">{booking?.halls.name}</td>
                                <td>{booking?.showtimes?.time} &nbsp; {booking?.showtimes?.shift === 0 ? 'am' : 'pm'}</td>
                                <td><i className={`bi bi-${booking?.booked ? 'check-lg' : 'hourglass'}`}></i></td>
                                <td>{booking?.seats?.length}</td>
                            </tr>
                        )
                    })}
            </tbody>
        </table> */}
        </>
    )
}

export default MyBookings;