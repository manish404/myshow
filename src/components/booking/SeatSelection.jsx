import generateSeatNames from "@/helpers/seatNames";
import Seat from "./Seat";
import Info from "../Info";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useBookingContext } from "@/contexts/BookingContext";
import Loader from "../Loader";
import println from "@/helpers/print";

function SeatColorHint({ name, color }) {
    return (
        <div className="row items-center">
            <div className={`${color} w-4 h-4 rounded-full`}></div>
            <h5>{name}</h5>
        </div>
    )
}

function SeatSelection({ hallID, hall, showID }) {
    const router = useRouter();
    if (!hall) router.replace('/halls');
    const [seats, setSeats] = useState([]);
    const { date: { today, maxDate }, info: { getBooking }, dbActions: { bookSeats },
        booked: { bookedSeats }, reserved: { reservedSeats, resetReservedSeats } } = useBookingContext();
    // For Seat.jsx
    // 
    useEffect(() => {
        if (hallID && hall && showID) {
            const seatNames = generateSeatNames(hallID, showID, hall?.rows, hall?.columns);
            setSeats(seatNames);
        }
    }, []);
    return (
        <div className="mt-4">
            {(hall && seats.length > hall?.rows) &&
                <div className="relative">
                    <h1 className="font-semibold mb-4">
                        Select Seat
                        <Info data="Can book upto 10 seats at once." />
                    </h1>
                    <div className="">
                        <input onChange={(e) => {
                            updateBookingDetails('date', e.target.value);
                        }} type="date" min={today} max={maxDate} value={today} />
                        <Info data="Can book from today upto 7 days." />
                    </div>
                    {/* color-guide */}
                    <div className="color-guide row w-[40%] my-6 justify-between">
                        <SeatColorHint name={"Mine"} color={"bg-green-500"} />
                        <SeatColorHint name={"Booked (Not Paid)"} color={"bg-yellow-500"} />
                        <SeatColorHint name={"Booked"} color={"bg-red-500"} />
                        {/* <div className="row items-center">
                            <div className="bg-green-500 w-4 h-4 rounded-full"></div>
                            <h5>Mine</h5>
                        </div> */}
                        {/* <div className="row items-center">
                            <div className="bg-yellow-500 w-4 h-4 rounded-full"></div>
                            <h5>Booked (Not Paid)</h5>
                        </div> */}
                        {/* <div className="row items-center">
                            <div className="bg-red-500 w-4 h-4 rounded-full"></div>
                            <h5>Booked</h5>
                        </div> */}
                    </div>
                    {/* seat booking section */}
                    {bookedSeats ?
                        <ul className={`gap-1 grid`} style={{
                            gridTemplateColumns: `repeat(${hall?.columns}, 1fr)`
                        }}>
                            {
                                seats.map((seat, i) => {
                                    const reserved = seat in reservedSeats;
                                    const booked = seat in bookedSeats;
                                    const paid = booked && bookedSeats[seat];
                                    return <Seat key={seat} seat={seat} status={{
                                        reserved,
                                        booked,
                                        paid
                                    }} />
                                })
                            }
                        </ul> : <Loader />
                    }
                    {/* book-button */}
                    <div className="row absolute -top-0 right-10 font-semibold">
                        <button type="button"
                            onClick={() => {
                                resetReservedSeats();
                            }}>
                            Clear
                        </button>
                        <button type="button" className="text-green-600"
                            onClick={async () => {
                                println(getBooking());
                                await bookSeats();
                            }}>
                            Book
                        </button>
                    </div>
                </div>}
        </div>
    )
}

export default SeatSelection;