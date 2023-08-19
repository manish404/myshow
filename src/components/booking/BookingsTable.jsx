function BookingsTable({ bookings }) {
    const item = bookings && bookings[0] || {};
    const hasHall = item?.halls?.name ? true : false;
    return (
        <table className="w3-table w3-bordered text">
            <thead>
                {
                    bookings &&
                    <tr>
                        <th>Date</th>
                        <th>Movie</th>
                        {hasHall && <th>Hall</th>}
                        <th>Show</th>
                        <th>Paid?</th>
                        <th>Seats</th>
                    </tr>
                }
            </thead>
            <tbody>
                {bookings &&
                    bookings.map((booking, i) => {
                        return (
                            <tr key={i}>
                                <td>{booking?.date}</td>
                                <td className="capitalize">{booking?.movies?.title}</td>
                                {hasHall && <td className="capitalize">{booking?.halls?.name}</td>}
                                <td>{booking?.showtimes?.time} &nbsp; {booking?.showtimes?.shift === 0 ? 'am' : 'pm'}</td>
                                <td><i className={`bi bi-${booking?.booked ? 'check-lg' : 'hourglass'}`}></i></td>
                                <td>{booking?.seats?.length}</td>
                            </tr>
                        )
                    })}
            </tbody>
        </table>
    )
}

export default BookingsTable;