import Layout from "@/components/layouts/Layout";
import { useState } from "react";
import { useSelector } from "react-redux";
import Seat from "@/components/booking/Seat";
import Khalti from "@/components/payment/Khalti";
import println from "@/helpers/print";

function BookingPage() {
    const generateSeatNames = (hallId, floor, rows, columns) => {
        const seatNames = [];

        for (let row = 1; row <= rows; row++) {
            for (let column = 1; column <= columns; column++) {
                const seatName = `${hallId}-${floor}-${row}-${column}`;
                seatNames.push(seatName);
            }
        }

        return seatNames;
    };
    const { selectedSeats, bookedSeats } = useSelector(state => state.booking);
    const x = useSelector(state => state.user.user);
    const [movie, setMovie] = useState('');
    const [view, setView] = useState({
        ground: false,
        top: false
    })
    // i'll get this data from db;
    const [hall, setHall] = useState({
        name: 'QFX Cine Hall',
        id: '156',
        seatStructure: {
            ground: {
                rows: 20,
                columns: 15
            },
            top: {
                rows: 10,
                columns: 15
            }
        }
    })
    return (
        <Layout>
            <div className="py-8">
                <button className="fixed right-8 bottom-8 bg-slate-500 py-2 px-4 rounded-sm text-white font-semibold" onClick={() => {
                    println(x, movie, hall.id, selectedSeats);
                }}>Book</button>
                <Khalti />
                <h1 className="text-2xl font-semibold">{hall.name}</h1>
                <div className="mid w-[70%] m-auto">
                    {
                        <select value={movie} name="movie" className="font-semibold" onChange={(e) => {
                            setMovie(e.target.value);
                        }}>
                            <option value="movie1">Movie 1</option>
                            <option value="movie2">Movie 2</option>
                            <option value="movie3">Movie 3</option>
                        </select>
                    }
                    {/*  */}
                    {
                        Object.keys(hall.seatStructure).map((floor, i1) => (
                            <div key={i1}>
                                <div className="floor">
                                    <h1 className="capitalize font-semibold mb-4 row text-center row items-center">
                                        {floor} floor
                                        <button onClick={() => {
                                            setView({
                                                ...view,
                                                [floor]: !view[floor]
                                            })
                                        }}>
                                            {
                                                view[floor] ?
                                                    <i className="bi bi-caret-up-fill"></i> :
                                                    <i className="bi bi-caret-down-fill"></i>
                                            }
                                        </button>
                                    </h1>
                                    {/*  */}
                                    <ul className={`gap-1 ${view[floor] ? 'grid' : 'hidden'}`} style={{
                                        gridTemplateColumns: `repeat(${hall.seatStructure[floor].columns}, 1fr)`
                                    }}>
                                        {
                                            generateSeatNames(hall.id, floor, hall.seatStructure.ground.rows, hall.seatStructure.ground.columns)
                                                .map((seat, i) => {
                                                    return <Seat key={i} seat={seat} />
                                                })
                                        }
                                    </ul>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Layout>
    )
}

export default BookingPage;