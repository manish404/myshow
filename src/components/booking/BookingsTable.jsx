import { useState } from "react";
import BillsSection from "../bill/BillsSection";
import { useAuthContext } from "@/contexts/AuthContext";
import { Tooltip } from "@material-tailwind/react";
import { makePayment } from "@/methods/khalti";
import supabase from "@/db/supabase";

function BookingsTable({ bookings }) {
    const { user: { user } } = useAuthContext();
    const item = bookings && bookings[0] || {};
    const hasHall = item?.halls?.name ? true : false;
    const [bill, setBill] = useState(null);

    async function generateBill(data) {
        let freshData;
        try {
            ({ data: freshData } = await supabase.from("bookings")
                .select('booked').eq("id", data.id).limit(1));
            freshData = freshData[0];
        } catch (e) {
            return;
        }
        return {
            date: data?.date || '',
            hall: data?.halls?.name || '',
            address: data?.halls?.cities?.name || '',
            movie: data?.movies?.title || '',
            show_time: data?.showtimes?.time || '',
            booked_seats: data?.seats || [],
            price: data?.showtimes?.ticket_price || '',
            paid: freshData?.booked === true || (data?.booked === true ? true : false),
            user: {
                name: user?.full_name || user?.name || '',
                email: user?.email || '',
            }
        }
    }

    return (
        <>
            <BillsSection bill={bill} onClose={() => {
                setBill(null);
            }} />
            {!bill && <table className="w3-table w3-bordered text">
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
                            <th>Actions</th>
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
                                    <td>
                                        <div className="flex items-center justify-around">
                                            <Tooltip className="bg-black p-1" content="Print bill">
                                                <button className="cursor-pointer"
                                                    onClick={async () => {
                                                        const _bill = await generateBill(booking);
                                                        setBill(_bill);
                                                    }}>
                                                    <i className={`bi bi-printer text-gray-400`} />
                                                </button>
                                            </Tooltip>
                                            <Tooltip className="bg-black p-1" content={`${booking?.booked ? "Already paid" : "Pay with khalti"}`}>
                                                <button className="cursor-pointer" disabled={booking?.booked} onClick={() => {
                                                    const tsxId = booking.id, //booking.id;
                                                        username = user?.full_name || user?.name || '',
                                                        tsxName = `${booking.movies.title} at ${booking.halls.name} by ${username}`,
                                                        tsxAmount = booking?.showtimes?.ticket_price || null;

                                                    if (tsxId, tsxAmount) {
                                                        makePayment(location.origin, tsxId, tsxName, tsxAmount);
                                                    }
                                                }}>
                                                    <i className={`bi bi-wallet2 ${booking?.booked ? 'text-gray-400' : 'text-violet-700'}`}></i>
                                                </button>
                                            </Tooltip>
                                            <Tooltip className="bg-black p-1" content={`${booking?.booked ? "Already paid" : "Pay (Cash)"}`}>
                                                <button className="cursor-pointer" disabled={booking?.booked} onClick={async () => {
                                                    if (confirm("Are you sure to make this payment?")) {
                                                        try {
                                                            await supabase.from("bookings")
                                                                .update({ booked: true })
                                                                .eq('id', booking.id)
                                                        } catch (e) { }
                                                    }
                                                }}>
                                                    <i className={`bi bi-wallet2 ${booking?.booked ? '' : 'text-gray-400'}`}></i>
                                                </button>
                                            </Tooltip>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
            }
        </>
    )
}

export default BookingsTable;