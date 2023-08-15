import { setNotice } from "@/store/slices/common";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const noticeAutoClosingTime = 7 * 1000;

function Notice() {
    const notice = useSelector(state => state.common.notice);
    const dispatch = useDispatch();
    let timeoutId;
    useEffect(() => {
        timeoutId = setTimeout(() => {
            dispatch(setNotice(''));
        }, noticeAutoClosingTime);
        return () => clearTimeout(timeoutId);
    }, [notice]);
    return (
        <>
            <div className={`notice ${notice ? 'show-notice' : ''} row items-start`}>
                <span>{notice}</span>
                &nbsp;
                &nbsp;
                <button onClick={() => {
                    dispatch(setNotice(''));
                    clearTimeout(timeoutId)
                }}>
                    <i className="bi bi-x-circle text-black text-sm"></i>
                </button>
            </div>
        </>
    )
}

export default Notice;