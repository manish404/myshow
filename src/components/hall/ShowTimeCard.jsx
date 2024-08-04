import { isAdmin, isUser } from "@/helpers/roleCheck";
import { setNotice } from "@/store/slices/common";
import Link from "next/link";
import { useDispatch } from "react-redux";

function ShowTimeCard({ hallID, showTime, role }) {
    const dispatch = useDispatch();
    let link = '/';
    return (
        <li className="show-time">
            {(isUser(role) || isAdmin(role)) ?
                <Link aria-label="myshow" href={`/booking?hall=${hallID}&show=${showTime?.id}`}>
                    {showTime.time} {showTime.shift === 0 ? 'am' : 'pm'}
                </Link> :
                <button onClick={() => {
                    if (!role) dispatch(setNotice('Please Login first!'));
                    else dispatch(setNotice('Not allowed for booking!'));
                }}>
                    {showTime.time} {showTime.shift === 0 ? 'am' : 'pm'}
                </button>
            }
        </li>
    )
}

export default ShowTimeCard;