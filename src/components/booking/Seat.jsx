import { useBookingContext } from "@/contexts/BookingContext";
import { setNotice } from "@/store/slices/common";
import { useDispatch } from "react-redux";

function Seat({ seat, status: { paid, reserved, booked } }) {
    const { reserved: { reserveSeat, rSize } } = useBookingContext();
    // const [isReserved, setIsReserved] = useState(false);
    const dispatch = useDispatch();

    function saveSeat() {
        // console.log(rSize);
        if ((!reserved && rSize < 10) || (reserved && rSize <= 10)) {
            const stat = reserveSeat(seat);
            // setIsReserved(stat);
        } else {
            dispatch(setNotice('You can only select or book upto 10 seats!'));
        }
    }

    const handleMouseOver = (ev) => {
        if (ev.ctrlKey) saveSeat();
    };
    const handleClick = (e) => {
        saveSeat();
    }
    return (
        <li className={`w-7 h-7 shadow-md border-[1px] border-blue-500 rounded-full`}>
            <button className={`h-full w-full rounded-full ${(booked && paid) ? 'bg-red-500 cursor-not-allowed' : booked ? 'bg-yellow-500 cursor-progress' : reserved ? 'bg-green-500' : 'cursor-pointer'}`} onMouseOver={!booked ? handleMouseOver : () => { }}
                onClick={!booked ? handleClick : () => { }}></button>
        </li>
    )
}

export default Seat;