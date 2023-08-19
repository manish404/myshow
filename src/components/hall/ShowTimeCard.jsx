import { isUser } from "@/helpers/roleCheck";
import { setNotice } from "@/store/slices/common";
import Link from "next/link";
import { useDispatch } from "react-redux";

function ShowTimeCard({ hallID, showTime, role }) {
    const dispatch = useDispatch();
    let link = '/';
    isUser(role) && (link = `/booking?hall=${hallID}&show=${showTime.id}`);
    return (
        <li className="show-time">
            {isUser(role) ?
                <Link aria-label="myshow" href={link}>
                    {showTime.time} {showTime.shift === 0 ? 'am' : 'pm'}
                </Link> :
                <button onClick={() => {
                    if (!role) dispatch(setNotice('Please Login first!'));
                }}>
                    {showTime.time} {showTime.shift === 0 ? 'am' : 'pm'}
                </button>
            }
        </li>
    )
}

export default ShowTimeCard;